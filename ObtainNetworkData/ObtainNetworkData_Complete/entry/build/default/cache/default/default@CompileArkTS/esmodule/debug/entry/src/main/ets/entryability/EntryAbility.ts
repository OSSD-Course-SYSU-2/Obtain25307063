import ConfigurationConstant from "@ohos:app.ability.ConfigurationConstant";
import UIAbility from "@ohos:app.ability.UIAbility";
import type { BusinessError } from "@ohos:base";
import hilog from "@ohos:hilog";
import type window from "@ohos:window";
import { WindowAvoidAreaUtils } from "@normalized:N&&&entry/src/main/ets/utils/WindowAvoidAreaUtils&";
const TAG: string = '[EntryAbility]';
export default class EntryAbility extends UIAbility {
    onCreate(): void {
        try {
            this.context.getApplicationContext().setColorMode(ConfigurationConstant.ColorMode.COLOR_MODE_NOT_SET);
        }
        catch (error) {
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
            }
            catch (error) {
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
        }
        catch (error) {
            hilog.error(0x0000, TAG, `GetMainWindowSync failed. Cause code: ${error.code}, message: ${error.message}`);
        }
    }
}
