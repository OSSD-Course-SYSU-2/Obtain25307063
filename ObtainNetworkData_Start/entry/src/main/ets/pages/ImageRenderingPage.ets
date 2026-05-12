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
import { ImgInfo, ImgMessage, WindowWidthHeight } from '../model/ImgModel';
import { WindowAvoidAreaUtils } from '../utils/WindowAvoidAreaUtils';

@ComponentV2
export struct ImageRenderingPage {
  @Require @Param imgInfo: ImgInfo;
  @Local isBlur?: boolean; // 设置状态栏、标题栏是否模糊
  private windowWidthHeight: WindowWidthHeight = new WindowWidthHeight();
  private pageInfos: NavPathStack = new NavPathStack();

  aboutToAppear(): void {
    this.windowWidthHeight = WindowAvoidAreaUtils.getInstance().getWindowAvoidData();
  }

  build() {
    NavDestination() {
      Stack({ alignContent: Alignment.TopStart }) {
        Column() {
          Grid() {
            ForEach(this.imgInfo.imgMessage, (item: ImgMessage) => {
              GridItem() {
                Row() {
                  Image(item.url)
                    .autoResize(true)
                    .draggable(false)
                    .alt($r('app.media.pic0'))
                    .borderRadius(16)
                }
                .width('100%')
              }
            }, (item: ImgMessage) => item.id.toString())
          }
          .width('100%')
          .scrollBar(BarState.Off)
          .padding({
            top: (this.windowWidthHeight.statusBarHeight ?? 0) + 48,
            bottom: 16
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