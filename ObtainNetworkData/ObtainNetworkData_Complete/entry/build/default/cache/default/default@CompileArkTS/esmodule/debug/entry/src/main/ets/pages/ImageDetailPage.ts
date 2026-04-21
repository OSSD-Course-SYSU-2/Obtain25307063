if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { EditableLeftIconType } from "@ohos:arkui.advanced.EditableTitleBar";
import { EditableTitleBar } from "@ohos:arkui.advanced.EditableTitleBar";
import { WindowWidthHeight } from "@normalized:N&&&entry/src/main/ets/model/ImgModel&";
import { WindowAvoidAreaUtils } from "@normalized:N&&&entry/src/main/ets/utils/WindowAvoidAreaUtils&";
interface ImageDetailParams {
    imageUrl: ResourceStr;
    imageIndex: number;
    totalImages: number;
}
export class ImageDetailPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.imageUrl = '';
        this.imageIndex = 0;
        this.totalImages = 0;
        this.isBlur = undefined;
        this.isLoading = true;
        this.loadError = false;
        this.windowWidthHeight = new WindowWidthHeight();
        this.pageInfos = new NavPathStack();
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.imageUrl = '';
        this.imageIndex = 0;
        this.totalImages = 0;
        this.isBlur = undefined;
        this.isLoading = true;
        this.loadError = false;
    }
    @Local
    imageUrl: ResourceStr;
    @Local
    imageIndex: number;
    @Local
    totalImages: number;
    @Local
    isBlur?: boolean; // 设置状态栏、标题栏是否模糊
    @Local
    isLoading: boolean; // 图片加载状态
    @Local
    loadError: boolean; // 图片加载错误状态
    private windowWidthHeight: WindowWidthHeight;
    private pageInfos: NavPathStack;
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
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            NavDestination.create(() => {
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Stack.create({ alignContent: Alignment.TopStart });
                }, Stack);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 图片显示区域
                    Column.create();
                    // 图片显示区域
                    Column.width('100%');
                    // 图片显示区域
                    Column.height('100%');
                    // 图片显示区域
                    Column.padding({
                        top: (this.windowWidthHeight.statusBarHeight ?? 0) + 48,
                        bottom: 16
                    });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 图片容器
                    Stack.create();
                    // 图片容器
                    Stack.width('100%');
                    // 图片容器
                    Stack.height('100%');
                    // 图片容器
                    Stack.backgroundColor(Color.Black);
                    // 图片容器
                    Stack.clip(true);
                }, Stack);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 图片显示
                    Image.create(this.imageUrl);
                    // 图片显示
                    Image.autoResize(true);
                    // 图片显示
                    Image.draggable(false);
                    // 图片显示
                    Image.alt({ "id": 16777242, "type": 20000, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" });
                    // 图片显示
                    Image.width('100%');
                    // 图片显示
                    Image.height('100%');
                    // 图片显示
                    Image.objectFit(ImageFit.Contain);
                    // 图片显示
                    Image.interpolation(ImageInterpolation.High);
                    // 图片显示
                    Image.renderMode(ImageRenderMode.Original);
                    // 图片显示
                    Image.onComplete(() => {
                        this.handleImageLoad();
                    });
                    // 图片显示
                    Image.onError(() => {
                        this.handleImageError();
                    });
                }, Image);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    // 加载指示器
                    if (this.isLoading) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create();
                                Row.justifyContent(FlexAlign.Center);
                                Row.alignItems(VerticalAlign.Center);
                                Row.width('100%');
                                Row.height('100%');
                                Row.backgroundColor(Color.Black);
                                Row.opacity(0.7);
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                LoadingProgress.create();
                                LoadingProgress.color(Color.White);
                                LoadingProgress.width(40);
                                LoadingProgress.height(40);
                            }, LoadingProgress);
                            Row.pop();
                        });
                    }
                    // 加载错误提示
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    // 加载错误提示
                    if (this.loadError) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Column.create();
                                Column.justifyContent(FlexAlign.Center);
                                Column.alignItems(HorizontalAlign.Center);
                                Column.width('100%');
                                Column.height('100%');
                                Column.backgroundColor(Color.Black);
                                Column.opacity(0.9);
                            }, Column);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Image.create({ "id": 16777242, "type": 20000, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" });
                                Image.width(80);
                                Image.height(80);
                                Image.margin({ bottom: 16 });
                            }, Image);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('图片加载失败');
                                Text.fontSize(16);
                                Text.fontColor(Color.White);
                                Text.margin({ bottom: 8 });
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create('请检查网络连接或稍后重试');
                                Text.fontSize(14);
                                Text.fontColor(Color.Gray);
                            }, Text);
                            Text.pop();
                            Column.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                // 图片容器
                Stack.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 图片索引指示器
                    Row.create();
                    // 图片索引指示器
                    Row.justifyContent(FlexAlign.Center);
                    // 图片索引指示器
                    Row.width('100%');
                    // 图片索引指示器
                    Row.margin({ bottom: 48 });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`${this.imageIndex + 1} / ${this.totalImages}`);
                    Text.fontSize(16);
                    Text.fontColor(Color.White);
                    Text.backgroundColor(Color.Black);
                    Text.opacity(0.7);
                    Text.padding(8);
                    Text.borderRadius(16);
                }, Text);
                Text.pop();
                // 图片索引指示器
                Row.pop();
                // 图片显示区域
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // 标题栏
                    Column.create();
                    // 标题栏
                    Column.justifyContent(FlexAlign.SpaceBetween);
                    // 标题栏
                    Column.height(92);
                    // 标题栏
                    Column.width('100%');
                    // 标题栏
                    Column.backgroundBlurStyle(this.isBlur ? BlurStyle.BACKGROUND_ULTRA_THICK : BlurStyle.NONE);
                    // 标题栏
                    Column.backgroundColor(this.isBlur ? Color.Transparent : Color.White);
                    // 标题栏
                    Column.padding({
                        top: 28
                    });
                }, Column);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new EditableTitleBar(this, {
                                leftIconStyle: EditableLeftIconType.Back,
                                title: 'Image Detail',
                                isSaveIconRequired: false,
                                onCancel: () => {
                                    if (this.pageInfos.size() > 0) {
                                        this.pageInfos.pop();
                                    }
                                }
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ImageDetailPage.ets", line: 146, col: 11 });
                            ViewPU.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    leftIconStyle: EditableLeftIconType.Back,
                                    title: 'Image Detail',
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
                    Divider.visibility(Visibility.Visible);
                    Divider.backgroundColor({ "id": 125831013, "type": 10001, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" });
                    Divider.opacity(0.3);
                }, Divider);
                // 标题栏
                Column.pop();
                Stack.pop();
            }, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/ImageDetailPage" });
            NavDestination.hideTitleBar(true);
            NavDestination.backgroundColor(Color.Black);
            NavDestination.onBackPressed(() => {
                if (this.pageInfos.size() > 0) {
                    this.pageInfos.pop();
                }
                return true;
            });
            NavDestination.onReady((context: NavDestinationContext) => {
                this.pageInfos = context.pathStack;
                // 获取传递的参数
                const params = context.pathStack.getParamByName('ImageDetailPage') as ImageDetailParams[];
                if (params && params.length > 0) {
                    this.imageUrl = params[0].imageUrl;
                    this.imageIndex = params[0].imageIndex;
                    this.totalImages = params[0].totalImages;
                }
            });
        }, NavDestination);
        NavDestination.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
