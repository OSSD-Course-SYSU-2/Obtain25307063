if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
if (PUV2ViewBase.contextStack === undefined) {
    Reflect.set(PUV2ViewBase, "contextStack", []);
}
import type { BusinessError } from "@ohos:base";
import hilog from "@ohos:hilog";
import type rcp from "@hms:collaboration.rcp";
import http from "@ohos:net.http";
import { PageProperty, ImgInfo, WindowWidthHeight } from "@normalized:N&&&entry/src/main/ets/model/ImgModel&";
import type { ImgMessage } from "@normalized:N&&&entry/src/main/ets/model/ImgModel&";
import { WindowAvoidAreaUtils } from "@normalized:N&&&entry/src/main/ets/utils/WindowAvoidAreaUtils&";
import { ImageRenderingPage } from "@normalized:N&&&entry/src/main/ets/pages/ImageRenderingPage&";
import { ImageDetailPage } from "@normalized:N&&&entry/src/main/ets/pages/ImageDetailPage&";
import { ImageDataView } from "@normalized:N&&&entry/src/main/ets/view/ImageDataView&";
import { Constants } from "@normalized:N&&&entry/src/main/ets/constants/Constants&";
import { RCPUtils } from "@normalized:N&&&entry/src/main/ets/utils/RCPUtils&";
const IMAGE_URL: string = 'https://raw.gitcode.com/HarmonyOS_Codelabs/ObtainNetworkData/raw/master/Resources/rawfile/response.json';
const TAG: string = '[ImageDataPage]';
export class ImageDataPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.imgInfo = new ImgInfo();
        this.pageProperty = new PageProperty();
        this.windowWidthHeight = new WindowWidthHeight();
        this.pageStack = new NavPathStack();
        this.rcpUtil = new RCPUtils();
        this.homeTitle = {
            builder: this.customTitleBuilder,
            height: 94
        };
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.imgInfo = new ImgInfo();
        this.pageProperty = new PageProperty();
    }
    @Local
    imgInfo: ImgInfo;
    @Local
    pageProperty: PageProperty;
    private windowWidthHeight: WindowWidthHeight;
    private pageStack: NavPathStack;
    private rcpUtil: RCPUtils;
    private homeTitle: NavigationCustomTitle;
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
        httpRequest.request(IMAGE_URL, {
            method: http.RequestMethod.GET,
            connectTimeout: 15000 // 添加超时配置
        }).then((response: http.HttpResponse) => {
            if (response && response.responseCode === 200 && response.resultType === http.HttpDataType.STRING) { // 当有数据且返回状态码为200时，开始解析数据
                let imgArray: Array<ImgMessage> = JSON.parse(response.result as string); // 解析接口返回的数据
                this.imgInfo.imgMessage = imgArray; // 把解析好的数据进行存储
                this.pageProperty.isLoading = false; // 数据加载成功，隐藏加载中页面
            }
        }).catch((error: BusinessError) => {
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
        this.rcpUtil.getRCPRequest()?.then((response: rcp.Response) => {
            if (response && response.statusCode === 200) { // 当有数据且返回状态码为200时，开始解析数据
                let imgArray: Array<ImgMessage> = response.toJSON() as Array<ImgMessage>; // 解析接口返回的数据
                this.imgInfo.imgMessage = imgArray; // 把解析好的数据进行存储
                this.pageProperty.isLoading = false; // 数据加载成功，隐藏加载中页面
            }
        }).catch((error: BusinessError) => {
            this.pageProperty.isNetwork = false; // 网络异常
            this.pageProperty.isLoading = false; // 数据加载失败，隐藏加载中页面
            this.imgInfo.imgMessage = []; // 清空数组
            hilog.error(0x0000, TAG, `rcpGetData failed. Cause code: ${error.code}, message: ${error.message}`);
        });
    }
    pageMap(pageName: string, parent = null): void {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (pageName === Constants.IMAGE_RENDERING_PAGE_NAME) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new ImageRenderingPage(this, { imgInfo: this.imgInfo }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ImageDataPage.ets", line: 95, col: 7 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        imgInfo: this.imgInfo
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    imgInfo: this.imgInfo
                                });
                            }
                        }, { name: "ImageRenderingPage" });
                    }
                });
            }
            else if (pageName === Constants.IMAGE_DETAIL_PAGE_NAME) {
                this.ifElseBranchUpdateFunction(1, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new ImageDetailPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/ImageDataPage.ets", line: 97, col: 7 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {};
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {});
                            }
                        }, { name: "ImageDetailPage" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                });
            }
        }, If);
        If.pop();
    }
    customTitleBuilder = () => {
        const parent = PUV2ViewBase.contextStack && PUV2ViewBase.contextStack.length ? PUV2ViewBase.contextStack[PUV2ViewBase.contextStack.length - 1] : null;
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.width('100%');
            Row.height('100%');
            Row.margin({ left: 16, top: 18 });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777226, "type": 10003, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" });
            Text.fontSize(26);
            Text.fontColor({ "id": 125830982, "type": 10001, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
        }, Text);
        Text.pop();
        Row.pop();
    };
    initialRender() {
        PUV2ViewBase.contextStack && PUV2ViewBase.contextStack.push(this);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 125833705, "type": 10001, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(this.pageStack, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/ImageDataPage", isUserCreateStack: true });
            Navigation.title(this.homeTitle);
            Navigation.titleMode(NavigationTitleMode.Mini);
            Navigation.hideBackButton(true);
            Navigation.width('100%');
            Navigation.height('100%');
            Navigation.navDestination({ builder: this.pageMap.bind(this) });
            Navigation.hideTitleBar(false);
            Navigation.hideToolBar(true);
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.padding({
                bottom: this.windowWidthHeight.naviIndicatorHeight + 100
            });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.padding({
                right: 16,
                left: 16
            });
        }, Row);
        ImageDataView.bind(this)(this.imgInfo, this.pageProperty);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.visibility(this.imgInfo.imgMessage.length > 1 ? Visibility.Visible : Visibility.Hidden);
            Divider.backgroundColor({ "id": 125831013, "type": 10001, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" });
            Divider.opacity(0.2);
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.width('100%');
            Grid.rowsGap(12);
            Grid.columnsGap(12);
            Grid.padding({
                top: 10,
                right: 16,
                left: 16
            });
        }, Grid);
        {
            const itemCreation2 = (elmtId, isInitialRender) => {
                GridItem.create(() => { }, false);
            };
            const observedDeepRender = () => {
                this.observeComponentCreation2(itemCreation2, GridItem);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // “http请求数据”按钮
                    Button.createWithLabel({ "id": 16777227, "type": 10003, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" }, { type: ButtonType.Capsule, stateEffect: true });
                    // “http请求数据”按钮
                    Button.backgroundColor({ "id": 125831008, "type": 10001, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" });
                    // “http请求数据”按钮
                    Button.fontColor({ "id": 125830986, "type": 10001, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" });
                    // “http请求数据”按钮
                    Button.width('48%');
                    // “http请求数据”按钮
                    Button.height(40);
                    // “http请求数据”按钮
                    Button.onClick(() => {
                        this.httpGetData(); // 点击按钮，发起RCP请求，获取网络图片数据
                    });
                }, Button);
                // “http请求数据”按钮
                Button.pop();
                GridItem.pop();
            };
            observedDeepRender();
        }
        {
            const itemCreation2 = (elmtId, isInitialRender) => {
                GridItem.create(() => { }, false);
            };
            const observedDeepRender = () => {
                this.observeComponentCreation2(itemCreation2, GridItem);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // “rcp请求数据”按钮
                    Button.createWithLabel({ "id": 16777234, "type": 10003, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" }, { type: ButtonType.Capsule, stateEffect: true });
                    // “rcp请求数据”按钮
                    Button.backgroundColor({ "id": 125831008, "type": 10001, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" });
                    // “rcp请求数据”按钮
                    Button.fontColor({ "id": 125830986, "type": 10001, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" });
                    // “rcp请求数据”按钮
                    Button.width('48%');
                    // “rcp请求数据”按钮
                    Button.height(40);
                    // “rcp请求数据”按钮
                    Button.onClick(() => {
                        this.rcpGetData(); // 点击按钮，发起RCP请求，获取网络图片数据
                    });
                }, Button);
                // “rcp请求数据”按钮
                Button.pop();
                GridItem.pop();
            };
            observedDeepRender();
        }
        {
            const itemCreation2 = (elmtId, isInitialRender) => {
                GridItem.create(() => { }, false);
            };
            const observedDeepRender = () => {
                this.observeComponentCreation2(itemCreation2, GridItem);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    // “图片渲染”按钮
                    Button.createWithLabel({ "id": 16777233, "type": 10003, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" }, {
                        type: ButtonType.Capsule,
                        stateEffect: this.imgInfo.imgMessage.length === 0 ? false : true
                    });
                    // “图片渲染”按钮
                    Button.backgroundColor({ "id": 125831008, "type": 10001, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" });
                    // “图片渲染”按钮
                    Button.fontColor({ "id": 125830986, "type": 10001, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" });
                    // “图片渲染”按钮
                    Button.width('100%');
                    // “图片渲染”按钮
                    Button.height(40);
                    // “图片渲染”按钮
                    Button.opacity(this.imgInfo.imgMessage.length === 0 ? 0.4 : 1);
                    // “图片渲染”按钮
                    Button.onClick(() => {
                        if (this.imgInfo.imgMessage.length !== 0) {
                            this.pageStack.pushDestinationByName(Constants.IMAGE_RENDERING_PAGE_NAME, null, true)
                                .catch((error: BusinessError) => {
                                hilog.error(0x0000, TAG, `pushDestinationByName failed. Code: ${error.code}, message: ${error.message}`);
                            });
                        }
                    });
                }, Button);
                // “图片渲染”按钮
                Button.pop();
                GridItem.pop();
            };
            observedDeepRender();
        }
        Grid.pop();
        Column.pop();
        Navigation.pop();
        Column.pop();
        PUV2ViewBase.contextStack && PUV2ViewBase.contextStack.pop();
    }
    rerender() {
        PUV2ViewBase.contextStack && PUV2ViewBase.contextStack.push(this);
        this.updateDirtyElements();
        PUV2ViewBase.contextStack && PUV2ViewBase.contextStack.pop();
    }
}
