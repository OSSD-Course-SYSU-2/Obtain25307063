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

import { BusinessError } from '@kit.BasicServicesKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { PageProperty, ImgInfo, WindowWidthHeight } from '../model/ImgModel';
import { WindowAvoidAreaUtils } from '../utils/WindowAvoidAreaUtils';
import { ImageRenderingPage } from './ImageRenderingPage';
import { ImageDataView } from '../view/ImageDataView';
import { Constants } from '../constants/Constants';

const TAG: string = '[ImageDataPage]';

@ComponentV2
export struct ImageDataPage {
  @Local imgInfo: ImgInfo = new ImgInfo();
  @Local pageProperty: PageProperty = new PageProperty();
  private windowWidthHeight: WindowWidthHeight = new WindowWidthHeight();
  private pageStack: NavPathStack = new NavPathStack();
  private homeTitle: NavigationCustomTitle = {
    builder: this.customTitleBuilder,
    height: 94
  };

  aboutToAppear(): void {
    this.windowWidthHeight = WindowAvoidAreaUtils.getInstance().getWindowAvoidData();
  }

  async aboutToDisappear(): Promise<void> {
  }

  @Builder
  pageMap(pageName: string): void {
    if (pageName === Constants.IMAGE_RENDERING_PAGE_NAME) {
      ImageRenderingPage({ imgInfo: this.imgInfo });
    }
  }

  @LocalBuilder
  customTitleBuilder() {
    Row() {
      Text($r('app.string.home_title'))
        .fontSize(26)
        .fontColor($r('sys.color.font_primary'))
        .fontWeight(FontWeight.Bold)
    }
    .width('100%')
    .height('100%')
    .margin({ left: 16, top: 18 })
  }

  build() {
    Column() {
      Navigation(this.pageStack) {
        Column() {
          Row() {
            ImageDataView(this.imgInfo, this.pageProperty)
          }
          .padding({
            right: 16,
            left: 16
          })

          Divider()
            .visibility(this.imgInfo.imgMessage.length > 1 ? Visibility.Visible : Visibility.Hidden)
            .backgroundColor($r('sys.color.comp_divider'))
            .opacity(0.2)
          Grid() {
            GridItem() {
              Button($r('app.string.http_request_data'), { type: ButtonType.Capsule, stateEffect: true })
                .backgroundColor($r('sys.color.comp_background_tertiary'))
                .fontColor($r('sys.color.font_emphasize'))
                .width('48%')
                .height(40)
            }

            GridItem() {
              Button($r('app.string.rcp_request_data'), { type: ButtonType.Capsule, stateEffect: true })
                .backgroundColor($r('sys.color.comp_background_tertiary'))
                .fontColor($r('sys.color.font_emphasize'))
                .width('48%')
                .height(40)
            }

            GridItem() {
              Button($r('app.string.picture_rendering'), {
                type: ButtonType.Capsule,
                stateEffect: this.imgInfo.imgMessage.length === 0 ? false : true
              })
                .backgroundColor($r('sys.color.comp_background_tertiary'))
                .fontColor($r('sys.color.font_emphasize'))
                .width('100%')
                .height(40)
                .opacity(this.imgInfo.imgMessage.length === 0 ? 0.4 : 1)
                .onClick(() => {
                  if (this.imgInfo.imgMessage.length !== 0) {
                    this.pageStack.pushDestinationByName(Constants.IMAGE_RENDERING_PAGE_NAME, null, true)
                      .catch((error: BusinessError) => {
                        hilog.error(0x0000, TAG,
                          `pushDestinationByName failed. Code: ${error.code}, message: ${error.message}`);
                      });
                  }
                })
            }
          }
          .width('100%')
          .rowsGap(12)
          .columnsGap(12)
          .padding({
            top: 10,
            right: 16,
            left: 16
          })
        }
        .padding({
          bottom: this.windowWidthHeight.naviIndicatorHeight + 100
        })
      }
      .title(this.homeTitle)
      .titleMode(NavigationTitleMode.Mini)
      .hideBackButton(true)
      .width('100%')
      .height('100%')
      .navDestination(this.pageMap)
      .hideTitleBar(false)
      .hideToolBar(true)
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('sys.color.point_color_checked'))
  }
}