/*
 * Copyright (c) 2026 Huawei Device Co., Ltd.
 * Licensed under the Apache License,Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { EditableLeftIconType, EditableTitleBar } from '@kit.ArkUI';
import { BusinessError } from '@kit.BasicServicesKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { ImgInfo, ImgMessage, WindowWidthHeight } from '../model/ImgModel';
import { WindowAvoidAreaUtils } from '../utils/WindowAvoidAreaUtils';
import { Constants } from '../constants/Constants';

interface ImageDetailParams {
  imageUrl: ResourceStr;
  imageIndex: number;
  totalImages: number;
}

@ComponentV2
export struct ImageRenderingPage {
  @Require @Param imgInfo: ImgInfo;
  @Local isBlur?: boolean; // 设置状态栏、标题栏是否模糊
  private windowWidthHeight: WindowWidthHeight = new WindowWidthHeight();
  private pageInfos: NavPathStack = new NavPathStack();
  private scroller: Scroller = new Scroller();

  aboutToAppear(): void {
    this.windowWidthHeight = WindowAvoidAreaUtils.getInstance().getWindowAvoidData();
  }

  // 处理图片点击事件，跳转到图片详情页面
  private handleImageClick(item: ImgMessage, index: number): void {
    const TAG: string = '[ImageRenderingPage]';
    try {
      // 构建参数对象
      const params: ImageDetailParams = {
        imageUrl: item.url,
        imageIndex: index,
        totalImages: this.imgInfo.imgMessage.length
      };
      
      // 跳转到图片详情页面
      this.pageInfos.pushDestinationByName(Constants.IMAGE_DETAIL_PAGE_NAME, params, true)
        .catch((error: BusinessError) => {
          hilog.error(0x0000, TAG, 
            `pushDestinationByName failed. Code: ${error.code}, message: ${error.message}`);
        });
    } catch (error) {
      hilog.error(0x0000, TAG, `handleImageClick failed. Error: ${error}`);
    }
  }

  build() {
    NavDestination() {
      Stack({ alignContent: Alignment.TopStart }) {
        Column() {
          Grid(this.scroller) {
            ForEach(this.imgInfo.imgMessage, (item: ImgMessage, index?: number) => {
              GridItem() {
                Row() {
                  Image(item.url)
                    .autoResize(true)
                    .draggable(false)
                    .alt($r('app.media.pic0'))
                    .borderRadius(16)
                    .onClick(() => {
                      this.handleImageClick(item, index ?? 0);
                    })
                }
                .width('100%')
              }
            }, (item: ImgMessage) => item.id.toString())
          }
          .width('100%')
          .columnsTemplate('1fr 1fr')
          .columnsGap(8)
          .rowsGap(12)
          .scrollBar(BarState.Off)
          .padding({
            top: (this.windowWidthHeight.statusBarHeight ?? 0) + 48,
            bottom: 16
          })
          .onDidScroll(() => {
            // 当Y轴的滚动总偏移量达到或超过10时，即图片上方与标题栏区域重合时，将isBlur属性设置为true。反之，将isBlur属性设置为false
            if (this.scroller.currentOffset().yOffset >= 10) {
              this.isBlur = true;
            } else {
              this.isBlur = false;
            }
          })
        }
        .padding({
          top: 16,
          right: 16,
          left: 16
        })

        Column() {
          EditableTitleBar({
            leftIconStyle: EditableLeftIconType.Back,
            title: $r('app.string.render_network_image'),
            isSaveIconRequired: false,
            onCancel: () => {
              if (this.pageInfos.size() > 0) {
                this.pageInfos.pop();
              }
            }
          })
          Divider()
            .visibility(this.imgInfo.imgMessage.length > 1 ? Visibility.Visible : Visibility.Hidden)
            .backgroundColor($r('sys.color.comp_divider'))
            .opacity(0.3)
        }
        .justifyContent(FlexAlign.SpaceBetween)
        .height(92)
        .width('100%')
        // 判断是否为状态栏、标题栏添加模糊效果。是，添加厚材质模糊效果。反之，关闭模糊
        .backgroundBlurStyle(this.isBlur ? BlurStyle.BACKGROUND_ULTRA_THICK : BlurStyle.NONE)
        .backgroundColor(this.isBlur ? Color.Transparent : Color.White)
        .padding({
          top: 28
        })
      }
    }
    .hideTitleBar(true)
    .backgroundColor($r('sys.color.point_color_checked'))
    .onBackPressed(() => {
      if (this.pageInfos.size() > 0) {
        this.pageInfos.pop();
      }
      return true;
    })
    .onReady((context: NavDestinationContext) => {
      this.pageInfos = context.pathStack;
    })
  }
}