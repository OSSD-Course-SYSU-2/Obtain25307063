# ObtainNetworkData

本示例基于ArkUI的http及rcp模块请求获取网络数据，实现从网络获取图片链接JSON数据并渲染至页面的功能。

本示例代码中包含ObtainNetworkData_Start和ObtainNetworkData_Complete两个工程以及一个资源文件Resources：
* ObtainNetworkData_Start工程缺乏核心代码，可参考Codelab的操作，逐步添加核心代码。以加深对Codelab内容的理解。
* ObtainNetworkData_Complete工程为完整的代码工程，可在真机上直接运行。
* Resources文件夹中包含该工程所需的网络图片以及JSON数据。
*增添了查看单个放大图片功能
*增添图片滤镜功能
![alt text](888cd59d0d4e10434f94772d7dfee957.png)
![alt text](73fbccbe5228fc5cfe10c0c1d49bda29.png)
1. 一次开发，多端部署
✅ 一套代码编译生成一个HAP包
✅ 应用市场会根据设备类型自动分发
✅ 无需为每种设备单独开发
2. 应用分发机制
当用户在不同设备上访问应用市场时：

📱 手机用户 → 自动下载适配手机的HAP
💻 平板用户 → 自动下载适配平板的HAP
🖥️ PC用户 → 自动下载适配PC的HAP
⌚ 手表用户 → 自动下载适配手表的HAP
🚗 车机用户 → 自动下载适配车机的HAP