import window from "@ohos:window";
import hilog from "@ohos:hilog";
import { WindowWidthHeight } from "@normalized:N&&&entry/src/main/ets/model/ImgModel&";
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
        let systemAvoidAreaType = window.AvoidAreaType.TYPE_SYSTEM; // 系统默认区域。
        let navigationIndicatorType = window.AvoidAreaType.TYPE_NAVIGATION_INDICATOR; // 底部导航区域
        if (this.mainWindow) {
            try {
                this.statusBarHeight = this.mainWindow?.getUIContext()
                    .px2vp(this.mainWindow.getWindowAvoidArea(systemAvoidAreaType).topRect.height);
                this.indicatorHeight = this.mainWindow?.getUIContext()
                    .px2vp(this.mainWindow.getWindowAvoidArea(navigationIndicatorType).bottomRect.height);
            }
            catch (error) {
                hilog.error(0x0000, TAG, `getWindowAvoidArea failed. Cause code: ${error.code}, message: ${error.message}`);
            }
        }
        return new WindowWidthHeight(this.statusBarHeight, this.indicatorHeight);
    }
}
