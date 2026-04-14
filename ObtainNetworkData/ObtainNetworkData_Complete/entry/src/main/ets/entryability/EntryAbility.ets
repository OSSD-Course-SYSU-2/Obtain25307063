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

import { ConfigurationConstant, UIAbility } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { window } from '@kit.ArkUI';
import { WindowAvoidAreaUtils } from '../utils/WindowAvoidAreaUtils';

const TAG: string = '[EntryAbility]';

export default class EntryAbility extends UIAbility {
  onCreate(): void {
    try {
      this.context.getApplicationContext().setColorMode(ConfigurationConstant.ColorMode.COLOR_MODE_NOT_SET);
    } catch (error) {
      hilog.error(0x0000, TAG, 'Failed to set colorMode. Cause: %{public}s', JSON.stringify(error));
    }
    hilog.info(0x0001, TAG, 'Ability onCreate');
  }

  onDestroy(): void {
    hilog.info(0x0001, TAG, 'Ability onDestroy');
  }

  onWindowStageCreate(windowStage: window.WindowStage): void {
    hilog.info(0x0001, TAG, 'Ability onWindowStageCreate');

    windowStage.loadContent('pages/Index', (err) => {
      if (err.code) {
        hilog.error(0x0000, TAG, 'Failed to load the content. Cause: %{public}s', JSON.stringify(err));
        return;
      }
      try {
        WindowAvoidAreaUtils.getInstance().setWindow(windowStage.getMainWindowSync());
      } catch (error) {
        hilog.error(0x0000, TAG, `GetMainWindowSync failed. Cause code: ${error.code}, message: ${error.message}`);
      }
      this.immersionFunc(windowStage);
      hilog.info(0x0001, TAG, 'Succeeded in loading the content.');
    });
  }

  onWindowStageDestroy(): void {
    hilog.info(0x0001, TAG, 'Ability onWindowStageDestroy');
  }

  onForeground(): void {
    hilog.info(0x0001, TAG, 'Ability onForeground');
  }

  onBackground(): void {
    hilog.info(0x0001, TAG, 'Ability onBackground');
  }

  /**
   * 窗口沉浸式
   */
  immersionFunc(windowStage: window.WindowStage): void {
    try {
      let windowClass: window.Window = windowStage.getMainWindowSync();
      windowClass.setWindowLayoutFullScreen(true).catch((err: BusinessError) => {
        hilog.error(0x0000, TAG, `LockAsync failed. Cause code: ${err.code}, message: ${err.message}`);
      });
    } catch (error) {
      hilog.error(0x0000, TAG, `GetMainWindowSync failed. Cause code: ${error.code}, message: ${error.message}`);
    }
  }
}