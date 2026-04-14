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

import { hilog } from '@kit.PerformanceAnalysisKit';
import { rcp } from '@kit.RemoteCommunicationKit';

const IMAGE_URL: string =
  'https://raw.gitcode.com/HarmonyOS_Codelabs/ObtainNetworkData/raw/master/Resources/rawfile/response.json';
const TAG: string = 'RCPUtils';

/**
 * RCPUtils 提供了通过 RCP 访问网络的功能
 */
export class RCPUtils {
  rcpSession?: rcp.Session;

  constructor() {
    this.rcpCreateSession();
  }

  rcpCreateSession(): void {
    try {
      this.rcpSession = rcp.createSession(); // 创建通信会话对象rcpSession
    } catch (error) {
      hilog.error(0x0000, TAG, `createSession failed, code: ${error.code}, message: ${error.message.toString()}`);
    }
  }

  /**
   * 通过 RCP 发起 GET 请求的方法
   */
  getRCPRequest(): Promise<rcp.Response> | undefined {
    if (this.rcpSession) {
      let promise = this.rcpSession.get(IMAGE_URL).catch(() => {
        throw new Error('rcp get failed');
      });
      return promise;
    }
    return;
  }

  /**
   * 关闭 RCP 会话的方法
   */
  destroySession() {
    if (this.rcpSession) {
      this.rcpSession.close();
    }
  }
}