/*
 * Copyright (c) 2026 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { window } from '@kit.ArkUI';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { WindowWidthHeight } from '../model/ImgModel';

const TAG: string = 'WindowAvoidAreaUtils';

/**
 * 获取屏幕顶部状态栏、导航条的高度
 */
export class WindowAvoidAreaUtils {
  private static instance: WindowAvoidAreaUtils;
  public mainWindow: window.Window | undefined;
  private statusBarHeight: number = 0; // 顶部状态栏高度
  private indicatorHeight: number = 0; // 导航栏区域的高度

  public static getInstance(): WindowAvoidAreaUtils {
    if (!WindowAvoidAreaUtils.instance) {
      WindowAvoidAreaUtils.instance = new WindowAvoidAreaUtils();
    }
    return WindowAvoidAreaUtils.instance;
  }

  public setWindow(mainWindow: window.Window) {
    this.mainWindow = mainWindow;
  }

  /**
   * 获取屏幕顶部状态栏、导航条的高度数据
   */
  getWindowAvoidData(): WindowWidthHeight {
    let systemAvoidAreaType = window.AvoidAreaType.TYPE_SYSTEM; // 系统默认区域
    let navigationIndicatorType = window.AvoidAreaType.TYPE_NAVIGATION_INDICATOR; // 底部导航区域
    if (this.mainWindow) {
      try {
        this.statusBarHeight = this.mainWindow?.getUIContext()
          .px2vp(this.mainWindow.getWindowAvoidArea(systemAvoidAreaType).topRect.height);
        this.indicatorHeight = this.mainWindow?.getUIContext()
          .px2vp(this.mainWindow.getWindowAvoidArea(navigationIndicatorType).bottomRect.height);
      } catch (error) {
        hilog.error(0x0000, TAG, `getWindowAvoidArea failed. Cause code: ${error.code}, message: ${error.message}`);
      }
    }
    return new WindowWidthHeight(this.statusBarHeight, this.indicatorHeight);
  }
}