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

import { PageProperty, ImgInfo, ImgMessage } from '../model/ImgModel';

@Builder
export function ImageDataView(imgInfo: ImgInfo, pageProperty: PageProperty ) {
  Column() {
    Row() {
      Scroll() {
        Column() {
          Row() {
            Text($r('app.string.network_request_data'))
              .fontSize(18)
              .fontWeight(FontWeight.Bold)
          }
          .width('100%')
          .height(40)
          .margin({ top: 8 })

          // 网络请求数据，加载中
          if (pageProperty.isLoading) {
            Column() {
              LoadingProgress()
                .width(72)
                .height(72)
                .color('#666666')
              Text($r('app.string.loading_data'))
                .fontSize(14)
                .opacity(0.6)
            }
            .width('100%')
            .height('80%')
            .justifyContent(FlexAlign.Center)
          } else if (!pageProperty.isNetwork) { // 当设备无网络时，页面显示“网络错误”
            Column() {
              Image($r('app.media.network_error'))
                .width(120)
                .height(120)
              Text($r('app.string.network_error'))
                .fontSize(14)
                .opacity(0.6)
            }
            .width('100%')
            .height('80%')
            .justifyContent(FlexAlign.Center)
          } else if (imgInfo.imgMessage.length === 0) { // 当页面无数据时，页面显示“暂无数据”
            Column() {
              Image($r('app.media.null_data'))
                .width(120)
                .height(120)
              Text($r('app.string.no_data'))
                .fontSize(14)
                .opacity(0.6)
            }
            .width('100%')
            .height('80%')
            .justifyContent(FlexAlign.Center)
          } else { // 当页面有数据时，加载列表
            Grid() {
              GridItem() {
                Text($r('app.string.serial_number'))
                  .width('100%')
                  .textAlign(TextAlign.Center)
                  .fontWeight(FontWeight.Bold)
              }
              .height(40)
              .borderWidth(0.6)
              .borderColor($r('sys.color.comp_divider'))
              .borderRadius({ topLeft: 12 })

              GridItem() {
                Text($r('app.string.web_image_address'))
                  .fontWeight(FontWeight.Bold)
              }
              .height(40)
              .borderWidth(0.6)
              .borderColor($r('sys.color.comp_divider'))
              .borderRadius({ topRight: 12 })

              ForEach(imgInfo.imgMessage, (item: ImgMessage) => {
                GridItem() {
                  Text(item.id)
                    .textAlign(TextAlign.Center)
                }
                .height(86)
                .borderWidth(0.6)
                .borderColor($r('sys.color.comp_divider'))

                GridItem() {
                  Text(item.url)
                    .width('90%')
                }
                .height(86)
                .borderWidth(0.6)
                .borderColor($r('sys.color.comp_divider'))
              }, (item: ImgMessage) => item.id.toString())
            }
            .borderRadius(12)
            .borderWidth(0.6)
            .borderColor($r('sys.color.comp_divider'))
            .width('100%')
            .columnsTemplate('1fr 5fr')
            .scrollBar(BarState.Off)
          }
        }
      }
      .scrollBar(BarState.Off)
    }
  }
  .width('100%')
  .height('100%')
  .backgroundColor($r('sys.color.point_color_checked'))
}
