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
import { WindowWidthHeight } from '../model/ImgModel';
import { WindowAvoidAreaUtils } from '../utils/WindowAvoidAreaUtils';

@ComponentV2
export struct ImageDetailPage {
  @Require @Param imageUrl: ResourceStr;
  @Require @Param imageIndex: number;
  @Require @Param totalImages: number;
  @Local isBlur?: boolean; // 设置状态栏、标题栏是否模糊
  @Local isLoading: boolean = true; // 图片加载状态
  @Local loadError: boolean = false; // 图片加载错误状态
  private windowWidthHeight: WindowWidthHeight = new WindowWidthHeight();
  private pageInfos: NavPathStack = new NavPathStack();

  aboutToAppear(): void {
    this.windowWidthHeight = WindowAvoidAreaUtils.getInstance().getWindowAvoidData();
  }

  // 处理图片加载完成
  private handleImageLoad(): void {
    this.isLoading = false;
    this.loadError = false;
  }

  // 处理图片加载错误
  private handleImageError(): void {
    this.isLoading = false;
    this.loadError = true;
  }



  build() {
    NavDestination() {
      Stack({ alignContent: Alignment.TopStart }) {
        // 图片显示区域
        Column() {
          // 图片容器
          Stack() {
            // 图片显示
            Image(this.imageUrl)
              .autoResize(true)
              .draggable(false)
              .alt($r('app.media.pic0'))
              .width('100%')
              .height('100%')
              .objectFit(ImageFit.Contain)
              .interpolation(ImageInterpolation.High)
              .renderMode(ImageRenderMode.Original)
              .onComplete(() => {
                this.handleImageLoad();
              })
              .onError(() => {
                this.handleImageError();
              })

            // 加载指示器
            if (this.isLoading) {
              Row() {
                LoadingProgress()
                  .color(Color.White)
                  .width(40)
                  .height(40)
              }
              .justifyContent(FlexAlign.Center)
              .alignItems(VerticalAlign.Center)
              .width('100%')
              .height('100%')
              .backgroundColor(Color.Black)
              .opacity(0.7)
            }

            // 加载错误提示
            if (this.loadError) {
              Column() {
                Image($r('app.media.pic0'))
                  .width(80)
                  .height(80)
                  .margin({ bottom: 16 })
                Text('图片加载失败')
                  .fontSize(16)
                  .fontColor(Color.White)
                  .margin({ bottom: 8 })
                Text('请检查网络连接或稍后重试')
                  .fontSize(14)
                  .fontColor(Color.Gray)
              }
              .justifyContent(FlexAlign.Center)
              .alignItems(HorizontalAlign.Center)
              .width('100%')
              .height('100%')
              .backgroundColor(Color.Black)
              .opacity(0.9)
            }
          }
          .width('100%')
          .height('100%')
          .backgroundColor(Color.Black)
          .clip(true) // 裁剪超出部分

          // 图片索引指示器
          Row() {
            Text(`${this.imageIndex + 1} / ${this.totalImages}`)
              .fontSize(16)
              .fontColor(Color.White)
              .backgroundColor(Color.Black)
              .opacity(0.7)
              .padding(8)
              .borderRadius(16)
          }
          .justifyContent(FlexAlign.Center)
          .width('100%')
          .margin({ bottom: 48 })
        }
        .width('100%')
        .height('100%')
        .padding({
          top: (this.windowWidthHeight.statusBarHeight ?? 0) + 48,
          bottom: 16
        })

        // 标题栏
        Column() {
          EditableTitleBar({
            leftIconStyle: EditableLeftIconType.Back,
            title: 'Image Detail',
            isSaveIconRequired: false,
            onCancel: () => {
              if (this.pageInfos.size() > 0) {
                this.pageInfos.pop();
              }
            }
          })
          Divider()
            .visibility(Visibility.Visible)
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
    .backgroundColor(Color.Black)
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