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
import { rcp } from '@kit.RemoteCommunicationKit';
import { http } from '@kit.NetworkKit';
import { PageProperty, ImgInfo, ImgMessage, WindowWidthHeight } from '../model/ImgModel';
import { WindowAvoidAreaUtils } from '../utils/WindowAvoidAreaUtils';
import { ImageRenderingPage } from './ImageRenderingPage';
import { ImageDetailPage } from './ImageDetailPage';
import { ImageDataView } from '../view/ImageDataView';
import { Constants } from '../constants/Constants';
import { RCPUtils } from '../utils/RCPUtils';

const IMAGE_URL: string =
  'https://raw.gitcode.com/HarmonyOS_Codelabs/ObtainNetworkData/raw/master/Resources/rawfile/response.json';
const TAG: string = '[ImageDataPage]';

@ComponentV2
export struct ImageDataPage {
  @Local imgInfo: ImgInfo = new ImgInfo();
  @Local pageProperty: PageProperty = new PageProperty();
  private windowWidthHeight: WindowWidthHeight = new WindowWidthHeight();
  private pageStack: NavPathStack = new NavPathStack();
  private rcpUtil: RCPUtils = new RCPUtils();
  private homeTitle: NavigationCustomTitle = {
    builder: this.customTitleBuilder,
    height: 94
  };

  aboutToAppear(): void {
    this.windowWidthHeight = WindowAvoidAreaUtils.getInstance().getWindowAvoidData();
  }

  async aboutToDisappear(): Promise<void> {
    this.rcpUtil.destroySession();
  }

  httpGetData(): void {
    this.pageProperty.isNetwork = true; // 设置默认参数：网络正常
    this.pageProperty.isLoading = true; // 请求数据前，页面显示数据加载中
    let httpRequest = http.createHttp(); // 创建HTTP请求
    httpRequest.request(IMAGE_URL, { // 根据URL地址，发起HTTP网络请求
      method: http.RequestMethod.GET, // 设置请求方式为GET
      connectTimeout: 15000 // 添加超时配置
    }).then((response: http.HttpResponse) => {
      if (response && response.responseCode === 200 && response.resultType === http.HttpDataType.STRING) { // 当有数据且返回状态码为200时，开始解析数据
        let imgArray: Array<ImgMessage> = JSON.parse(response.result as string); // 解析接口返回的数据
        this.imgInfo.imgMessage = imgArray; // 把解析好的数据进行存储
        this.pageProperty.isLoading = false; // 数据加载成功，隐藏加载中页面
      }
    }).catch((error: BusinessError) => { // 接口报错处理
      this.pageProperty.isNetwork = false; // 网络异常
      this.pageProperty.isLoading = false; // 数据加载失败，隐藏加载中页面
      this.imgInfo.imgMessage = []; // 清空数组
      hilog.error(0x0000, TAG, `httpRequest failed, code: ${error.code}, message: ${error.message}`);
    }).finally(() => {
      httpRequest.destroy();
    });
  }

  rcpGetData(): void {
    this.pageProperty.isNetwork = true; // 设置默认参数：网络正常
    this.pageProperty.isLoading = true; // 请求数据前，页面显示数据加载中
    this.rcpUtil.getRCPRequest()?.then((response: rcp.Response) => { // 发起get请求
      if (response && response.statusCode === 200) { // 当有数据且返回状态码为200时，开始解析数据
        let imgArray: Array<ImgMessage> = response.toJSON() as Array<ImgMessage>; // 解析接口返回的数据
        this.imgInfo.imgMessage = imgArray; // 把解析好的数据进行存储
        this.pageProperty.isLoading = false; // 数据加载成功，隐藏加载中页面
      }
    }).catch((error: BusinessError) => { // 接口报错处理
      this.pageProperty.isNetwork = false; // 网络异常
      this.pageProperty.isLoading = false; // 数据加载失败，隐藏加载中页面
      this.imgInfo.imgMessage = []; // 清空数组
      hilog.error(0x0000, TAG, `rcpGetData failed. Cause code: ${error.code}, message: ${error.message}`);
    });
  }

  @Builder
  pageMap(pageName: string): void {
    if (pageName === Constants.IMAGE_RENDERING_PAGE_NAME) {
      ImageRenderingPage({ imgInfo: this.imgInfo });
    } else if (pageName === Constants.IMAGE_DETAIL_PAGE_NAME) {
      ImageDetailPage();
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
              // “http请求数据”按钮
              Button($r('app.string.http_request_data'), { type: ButtonType.Capsule, stateEffect: true })
                .backgroundColor($r('sys.color.comp_background_tertiary'))
                .fontColor($r('sys.color.font_emphasize'))
                .width('48%')
                .height(40)
                .onClick(() => {
                  this.httpGetData(); // 点击按钮，发起RCP请求，获取网络图片数据
                })
            }

            GridItem() {
              // “rcp请求数据”按钮
              Button($r('app.string.rcp_request_data'), { type: ButtonType.Capsule, stateEffect: true })
                .backgroundColor($r('sys.color.comp_background_tertiary'))
                .fontColor($r('sys.color.font_emphasize'))
                .width('48%')
                .height(40)
                .onClick(() => {
                  this.rcpGetData(); // 点击按钮，发起RCP请求，获取网络图片数据
                })
            }

            GridItem() {
              // “图片渲染”按钮
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