if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { EditableLeftIconType } from "@ohos:arkui.advanced.EditableTitleBar";
import { EditableTitleBar } from "@ohos:arkui.advanced.EditableTitleBar";
import type { BusinessError } from "@ohos:base";
import hilog from "@ohos:hilog";
import { WindowWidthHeight } from "@normalized:N&&&entry/src/main/ets/model/ImgModel&";
import type { ImgInfo, ImgMessage } from "@normalized:N&&&entry/src/main/ets/model/ImgModel&";
import { WindowAvoidAreaUtils } from "@normalized:N&&&entry/src/main/ets/utils/WindowAvoidAreaUtils&";
import { Constants } from "@normalized:N&&&entry/src/main/ets/constants/Constants&";
interface ImageDetailParams {
    imageUrl: ResourceStr;
    imageIndex: number;
    totalImages: number;
}
export class ImageRenderingPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("imgInfo", (params && "imgInfo" in params) ? params.imgInfo : undefined);
        this.isBlur = undefined;
        this.windowWidthHeight = new WindowWidthHeight();
        this.pageInfos = new NavPathStack();
        this.scroller = new Scroller();
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("imgInfo", (params && "imgInfo" in params) ? params.imgInfo : undefined);
        this.isBlur = undefined;
    }
    @Param
    readonly imgInfo: ImgInfo;
    @Local
    isBlur?: boolean; // 设置状态栏、标题栏是否模糊
    private windowWidthHeight: WindowWidthHeight;
    private pageInfos: NavPathStack;
    private scroller: Scroller;
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
                hilog.error(0x0000, TAG, `pushDestinationByName failed. Code: ${error.code}, message: ${error.message}`);
            });
        }
        catch (error) {
            hilog.error(0x0000, TAG, `handleImageClick failed. Error: ${error}`);
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Stack.create({ alignContent: Alignment.TopStart });
                }, Stack);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.padding({
                        top: 16,
                        right: 16,
                        left: 16
                    });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Grid.create(this.scroller);
                    Grid.width('100%');
                    Grid.columnsTemplate('1fr 1fr');
                    Grid.columnsGap(8);
                    Grid.rowsGap(12);
                    Grid.scrollBar(BarState.Off);
                    Grid.padding({
                        top: (this.windowWidthHeight.statusBarHeight ?? 0) + 48,
                        bottom: 16
                    });
                    Grid.onDidScroll(() => {
                        // 当Y轴的滚动总偏移量达到或超过10时，即图片上方与标题栏区域重合时，将isBlur属性设置为true。反之，将isBlur属性设置为false
                        if (this.scroller.currentOffset().yOffset >= 10) {
                            this.isBlur = true;
                        }
                        else {
                            this.isBlur = false;
                        }
                    });
                }, Grid);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = (_item, index?: number) => {
                        const item = _item;
                        {
                            const itemCreation2 = (elmtId, isInitialRender) => {
                                GridItem.create(() => { }, false);
                            };
                            const observedDeepRender = () => {
                                this.observeComponentCreation2(itemCreation2, GridItem);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Row.create();
                                    Row.width('100%');
                                }, Row);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Image.create(item.url);
                                    Image.autoResize(true);
                                    Image.draggable(false);
                                    Image.alt({ "id": 16777242, "type": 20000, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" });
                                    Image.borderRadius(16);
                                    Image.onClick(() => {
                                        this.handleImageClick(item, index ?? 0);
                                    });
                                }, Image);
                                Row.pop();
                                GridItem.pop();
                            };
                            observedDeepRender();
                        }
                    };
                    this.forEachUpdateFunction(elmtId, this.imgInfo.imgMessage, forEachItemGenFunction, (item: ImgMessage) => item.id.toString(), true, false);
                }, ForEach);
                ForEach.pop();
                Grid.pop();
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.justifyContent(FlexAlign.SpaceBetween);
                    Column.height(92);
                    Column.width('100%');
                    Column.backgroundBlurStyle(this.isBlur ? BlurStyle.BACKGROUND_ULTRA_THICK : BlurStyle.NONE);
                    Column.backgroundColor(this.isBlur ? Color.Transparent : Color.White);
                    Column.padding({
                        top: 28
                    });
                }, Column);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new EditableTitleBar(this, {
                                leftIconStyle: EditableLeftIconType.Back,
                                title: { "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" },
                                isSaveIconRequired: false,
                                onCancel: () => {
                                    if (this.pageInfos.size() > 0) {
                                        this.pageInfos.pop();
                                    }
                                }
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ImageRenderingPage.ets", line: 109, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    leftIconStyle: EditableLeftIconType.Back,
                                    title: { "id": 16777235, "type": 10003, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" },
                                    isSaveIconRequired: false,
                                    onCancel: () => {
                                        if (this.pageInfos.size() > 0) {
                                            this.pageInfos.pop();
                                        }
                                    }
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "EditableTitleBar" });
                }
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Divider.create();
                    Divider.visibility(this.imgInfo.imgMessage.length > 1 ? Visibility.Visible : Visibility.Hidden);
                    Divider.backgroundColor({ "id": 125831013, "type": 10001, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" });
                    Divider.opacity(0.3);
                }, Divider);
                Column.pop();
                Stack.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/ImageRenderingPage" });
            NavDestination.hideTitleBar(true);
            NavDestination.backgroundColor({ "id": 125833705, "type": 10001, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" });
            NavDestination.onBackPressed(() => {
                if (this.pageInfos.size() > 0) {
                    this.pageInfos.pop();
                }
                return true;
            });
            NavDestination.onReady((context: NavDestinationContext) => {
                this.pageInfos = context.pathStack;
            });
        }, NavDestination);
        NavDestination.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("imgInfo" in params) {
            this.updateParam("imgInfo", params.imgInfo);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
