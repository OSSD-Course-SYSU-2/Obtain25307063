import type { PageProperty, ImgInfo, ImgMessage } from '../model/ImgModel';
export function ImageDataView(imgInfo: ImgInfo, pageProperty: PageProperty, parent = null) {
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        Column.create();
        Column.width('100%');
        Column.height('100%');
        Column.backgroundColor({ "id": 125833705, "type": 10001, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" });
    }, Column);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        Row.create();
    }, Row);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        Scroll.create();
        Scroll.scrollBar(BarState.Off);
    }, Scroll);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        Column.create();
    }, Column);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        Row.create();
        Row.width('100%');
        Row.height(40);
        Row.margin({ top: 8 });
    }, Row);
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        Text.create({ "id": 16777231, "type": 10003, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" });
        Text.fontSize(18);
        Text.fontWeight(FontWeight.Bold);
    }, Text);
    Text.pop();
    Row.pop();
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        If.create();
        // 网络请求数据，加载中
        if (pageProperty.isLoading) {
            (parent ? parent : this).ifElseBranchUpdateFunction(0, () => {
                (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.height('80%');
                    Column.justifyContent(FlexAlign.Center);
                }, Column);
                (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                    LoadingProgress.create();
                    LoadingProgress.width(72);
                    LoadingProgress.height(72);
                    LoadingProgress.color('#666666');
                }, LoadingProgress);
                (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create({ "id": 16777228, "type": 10003, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" });
                    Text.fontSize(14);
                    Text.opacity(0.6);
                }, Text);
                Text.pop();
                Column.pop();
            });
        }
        else if (!pageProperty.isNetwork) { // 当设备无网络时，页面显示“网络错误”
            (parent ? parent : this).ifElseBranchUpdateFunction(1, () => {
                (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.height('80%');
                    Column.justifyContent(FlexAlign.Center);
                }, Column);
                (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 16777240, "type": 20000, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" });
                    Image.width(120);
                    Image.height(120);
                }, Image);
                (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create({ "id": 16777230, "type": 10003, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" });
                    Text.fontSize(14);
                    Text.opacity(0.6);
                }, Text);
                Text.pop();
                Column.pop();
            });
        }
        else if (imgInfo.imgMessage.length === 0) { // 当页面无数据时，页面显示“暂无数据”
            (parent ? parent : this).ifElseBranchUpdateFunction(2, () => {
                (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create();
                    Column.width('100%');
                    Column.height('80%');
                    Column.justifyContent(FlexAlign.Center);
                }, Column);
                (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create({ "id": 16777241, "type": 20000, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" });
                    Image.width(120);
                    Image.height(120);
                }, Image);
                (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create({ "id": 16777232, "type": 10003, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" });
                    Text.fontSize(14);
                    Text.opacity(0.6);
                }, Text);
                Text.pop();
                Column.pop();
            });
        }
        else { // 当页面有数据时，加载列表。
            (parent ? parent : this).ifElseBranchUpdateFunction(3, () => {
                (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                    Grid.create();
                    Grid.borderRadius(12);
                    Grid.borderWidth(0.6);
                    Grid.borderColor({ "id": 125831013, "type": 10001, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" });
                    Grid.width('100%');
                    Grid.columnsTemplate('1fr 5fr');
                    Grid.scrollBar(BarState.Off);
                }, Grid);
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        GridItem.create(() => { }, false);
                        GridItem.height(40);
                        GridItem.borderWidth(0.6);
                        GridItem.borderColor({ "id": 125831013, "type": 10001, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" });
                        GridItem.borderRadius({ topLeft: 12 });
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create({ "id": 16777236, "type": 10003, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" });
                            Text.width('100%');
                            Text.textAlign(TextAlign.Center);
                            Text.fontWeight(FontWeight.Bold);
                        }, Text);
                        Text.pop();
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        GridItem.create(() => { }, false);
                        GridItem.height(40);
                        GridItem.borderWidth(0.6);
                        GridItem.borderColor({ "id": 125831013, "type": 10001, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" });
                        GridItem.borderRadius({ topRight: 12 });
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create({ "id": 16777237, "type": 10003, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" });
                            Text.fontWeight(FontWeight.Bold);
                        }, Text);
                        Text.pop();
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
                (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                    ForEach.create();
                    const forEachItemGenFunction = _item => {
                        const item = _item;
                        {
                            const itemCreation2 = (elmtId, isInitialRender) => {
                                GridItem.create(() => { }, false);
                                GridItem.height(86);
                                GridItem.borderWidth(0.6);
                                GridItem.borderColor({ "id": 125831013, "type": 10001, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" });
                            };
                            const observedDeepRender = () => {
                                this.observeComponentCreation2(itemCreation2, GridItem);
                                (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(item.id);
                                    Text.textAlign(TextAlign.Center);
                                }, Text);
                                Text.pop();
                                GridItem.pop();
                            };
                            observedDeepRender();
                        }
                        {
                            const itemCreation2 = (elmtId, isInitialRender) => {
                                GridItem.create(() => { }, false);
                                GridItem.height(86);
                                GridItem.borderWidth(0.6);
                                GridItem.borderColor({ "id": 125831013, "type": 10001, params: [], "bundleName": "com.example.obtainnetworkdata", "moduleName": "entry" });
                            };
                            const observedDeepRender = () => {
                                this.observeComponentCreation2(itemCreation2, GridItem);
                                (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(item.url);
                                    Text.width('90%');
                                }, Text);
                                Text.pop();
                                GridItem.pop();
                            };
                            observedDeepRender();
                        }
                    };
                    (parent ? parent : this).forEachUpdateFunction(elmtId, imgInfo.imgMessage, forEachItemGenFunction, (item: ImgMessage) => item.id.toString(), false, false);
                }, ForEach);
                ForEach.pop();
                Grid.pop();
            });
        }
    }, If);
    If.pop();
    Column.pop();
    Scroll.pop();
    Row.pop();
    Column.pop();
}
