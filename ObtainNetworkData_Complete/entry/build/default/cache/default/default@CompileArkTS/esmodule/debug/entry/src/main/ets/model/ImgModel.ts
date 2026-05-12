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
@ObservedV2
export class ImgInfo {
    @Trace
    public imgMessage: Array<ImgMessage>;
    constructor(imgMessage?: Array<ImgMessage>) {
        this.imgMessage = imgMessage ?? [];
    }
}
@ObservedV2
export class ImgMessage {
    @Trace
    public id: string;
    public url: ResourceStr;
    constructor(id: string, url: ResourceStr) {
        this.id = id ?? '';
        this.url = url ?? '';
    }
}
@ObservedV2
export class WindowWidthHeight {
    @Trace
    public statusBarHeight: number;
    @Trace
    public naviIndicatorHeight: number;
    constructor(statusBarHeight?: number, naviIndicatorHeight?: number) {
        this.statusBarHeight = statusBarHeight ?? 0;
        this.naviIndicatorHeight = naviIndicatorHeight ?? 0;
    }
}
@ObservedV2
export class PageProperty {
    @Trace
    public isShowHomeDivider: boolean;
    @Trace
    public isLoading: boolean;
    @Trace
    public isNetwork: boolean;
    constructor(isShowHomeDivider?: boolean, isLoading?: boolean, isNetwork?: boolean) {
        this.isShowHomeDivider = isShowHomeDivider ?? false;
        this.isLoading = isLoading ?? false;
        this.isNetwork = isNetwork ?? true;
    }
}
@ObservedV2
export class VisitImgUrl {
    @Trace
    public url: string = '';
    constructor(url: string) {
        this.url = url;
    }
}
