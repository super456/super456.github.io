---
title: iOS SiriKit 开发指南
date: 2023-06-30 20:07:09
tags:
 - iOS
 - uni-app
 - App
categories:
 - 前端进击
---
# iOS SiriKit 开发指南
## 需求背景
公司业务需求，开发 Hi siri 响应功能数据展示回应需求
<CustomImage src='/growth-record/platform/app/sirikit-00.png' />

明确需求确定技术实现方案：
1. 第⼀阶段：通过快捷指令实现，通过指导⽤⼾安装定制的快捷指令即可：
- 优点：不启动 APP，直接在弹出的扩展进程中处理相关指令操作；
- 痛点：需要定期替换 token，⼿动体验不是很好，⽽且维护成本⽐较⾼，容易泄露信息；

2. 第⼆阶段：打通应⽤⸺通过 Siri 指令唤起：
直接启动 APP，在 APP 独⽴进程中处理相关指令操作，⽐如展⽰今天项⽬的报表，直接进⼊
⻚⾯展⽰；

### 开发准备
- 我的开发者账号信息：https://appstoreconnect.apple.com/login
- 官⽅开发者⽂档：https://developer.apple.com/cn/
- 团队名称：xxx
- 账⼾ID：xxx
- Bundle Identifier：xxx
- uni-app 应⽤后台：https://dev.dcloud.net.cn/pages/common/login
- SiriKit 开发官⽅说明：https://developer.apple.com/videos/play/wwdc2020/10073/

1. 作为 App 的⼀种扩展插件形式执⾏处理，并不需要打开 App；
2. 10 秒超时时间限制；

### 前置⽬标
<CustomImage src='/growth-record/platform/app/sirikit-01.png' />

1. 如果需要开发⼀个原⽣插件包的形式，创建项⽬的时候选择哪个模版？
2. 信息列表属性可以配置值为中⽂吗？
3. 怎么打包运⾏到真机上？
4. 打包构建的配置信息怎么设置？
<CustomImage src='/growth-record/platform/app/sirikit-02.png' />

5. 信息存储本地化；
6. 应⽤⽣命周期及⼊⼝⽂件？

a. [Managing your app’s life cycle | Apple Developer Documentation](https://developer.apple.com/documentation/uikit/app_and_environment/managing_your_app_s_life_cycle)<br />
b. [About the app launch sequence | Apple Developer Documentation](https://developer.apple.com/documentation/uikit/app_and_environment/responding_to_the_launch_of_your_app/about_the_app_launch_sequence)

7. 是否需要添加 Siri 的访问权限？
处理应⽤程序 SiriKit 的权限版本：
https://developer.apple.com/documentation/uikit/uiapplicationdelegate/3548063-application
<CustomImage src='/growth-record/platform/app/sirikit.png' />

## 操作说明
1. iOS 系统限制 10.0+/ 12+ custom intent，iOS 13+，因为之前版本仅⽀持快捷⽅式添加到快捷指
令，不⽀持输⼊询问参数

**在 iOS 13.1 中，Apple 赋予了 SiriKit 更多权限，可以通过 Siri 对话框在⾃定义 Intent 中询问⽤⼾输⼊参数**

2. 确保⼿机有【快捷指令】App 和 iOS 12+；

### 开发说明
Xcode 开发⼯具版本：V14.3.1

注意：
• 应⽤运⾏到模拟器并不代表真实的运⾏环境，还是需要真机预览的，但是真机预览需要付费开发者
会员才可以；

开发环境搭建
1. Xcode 软件下载：App Store 直接搜索 Xcode 下载即可，**注意有 MacOS 系统版本限制**
<CustomImage src='/growth-record/platform/app/sirikit-03.png' />

2. 运⾏打开，默认选择运⾏终端选项：Mac 和 iPhone 即可
<CustomImage src='/growth-record/platform/app/sirikit-04.png' />

提⽰特性：
<CustomImage src='/growth-record/platform/app/sirikit-05.png' />

1. 创建项⽬：
<CustomImage src='/growth-record/platform/app/sirikit-06.png' />
<CustomImage src='/growth-record/platform/app/sirikit-07.png' />

2. Team：
Organization identifier：
1. 项⽬添加siri启动配置：
<CustomImage src='/growth-record/platform/app/sirikit-08.png' />
<CustomImage src='/growth-record/platform/app/sirikit-09.png' />
<CustomImage src='/growth-record/platform/app/sirikit-10.png' />

切换运⾏的模拟器：
<CustomImage src='/growth-record/platform/app/sirikit-11.png' />

运⾏到真机上必须是开发者团队才可以：

⼿机需要开启开发者模式：设置=》隐私与安全性=》开发者模式
<CustomImage src='/growth-record/platform/app/sirikit-12.png' />

如果没有配置开发者团队的话，需要在这⾥配置设置：
<CustomImage src='/growth-record/platform/app/sirikit-13.png' />

使⽤Siri默认语⾳提⽰配置：
<CustomImage src='/growth-record/platform/app/sirikit-14.png' />

使⽤ intent 扩展提⽰报错，需要打钩上这些引⼊包选项：
<CustomImage src='/growth-record/platform/app/sirikit-15.png' />

给对应的应⽤设置Siri权限：
<CustomImage src='/growth-record/platform/app/sirikit-16.png' />

快捷指令的应⽤⽆需调⽤访问 Siri 的权限：
https://developer.apple.com/documentation/sirikit/intent_handling_infrastructure/requesting_
authorization_to_use_siri
<CustomImage src='/growth-record/platform/app/sirikit-17.png' />

官⽅创建意图扩展教程：Creating an Intents App Extension | Apple Developer Documentation
并且：⾸次安装扩展应⽤时，Siri 并不会⽴⻢识别这个快捷指令，需要等待⼏分钟在进⾏测试使⽤，包
括更新扩展⽂件也是的
<CustomImage src='/growth-record/platform/app/sirikit-18.png' />

应⽤连不上⽹络问题是：应⽤需要允许⽆线局域⽹开启连接，⾸次安装应⽤会有弹出授权⽆线局域⽹
的弹窗提⽰，开启的话可以在：设置=》⽆线局域⽹=》使⽤⽆线局域⽹与蜂窝⽹络的 App=》找到该应
⽤是否存在
<CustomImage src='/growth-record/platform/app/sirikit-19.png' />

https://www.jianshu.com/p/81d0b7f06eba
出现这种Siri提⽰直接点击打开这个应⽤即可，跳转到对应的应⽤打开蜂窝⽹络数据或⽆线⽹络权限
<CustomImage src='/growth-record/platform/app/sirikit-20.png' />

接⼝调⽤成功：
<CustomImage src='/growth-record/platform/app/sirikit-21.png' />

Xcode 模拟器不⽀持 Siri 功能使⽤：https://developer.apple.com/forums/thread/131319
<CustomImage src='/growth-record/platform/app/sirikit-22.png' />

开发语法
1. 打印调试信息⽇志：
```sh
print("这个是调试信息")
```

1. 获取应⽤访问 Siri 权限：
```swift
1 import IntentsINPreferences.requestSiriAuthorization {
2 switch $0 {
3 case .authorized:
4 print("⽤⼾已授权")
5 break
6 case .notDetermined:
7 print("未决定")
8 break
9 case .restricted:
10 print("权限受限制")
11 break
12 case .denied:
13 print("拒绝授权")
14 break
15 }}
```

1. 是否需要添加 Siri 的访问权限？
2. SiriKit ⼊⼝开发说明：
https://developer.apple.com/documentation/uikit/uiapplicationdelegate/3548063-
application
1. 请求接⼝：https://developer.apple.com/documentation/uikit/uiapplication/1648685-open

```swift
1 func open(
2 _ url: URL,
3 options: [UIApplication.OpenExternalURLOptionsKey : Any] = [:],
4 completionHandler completion: ((Bool) -> Void)? = nil
5 )
```

https://developer.apple.com/documentation/uikit/uiapplication/openexternalurloptionskey
请求后端接⼝：
https://www.jianshu.com/p/9acee6fdc32d
Intent info.plist ⽂件说明

```swift
1 IntentsSupported：⽀持的 Intents 类型列表；
2 IntentsRestrictedWhileLocked：限制使⽤该 Intents 前必须解锁，也是⼀个列表；
3 NSExtensionPointIdentifier：必须为apple.intents-service；
4 NSExtensionPrincipalClass：Intents 扩展的⼊⼝⽂件，默认为
$(PRODUCT_MODULE_NAME).IntentHandler
```

官⽅解释：
https://developer.apple.com/documentation/bundleresources/information_property_list

### 语法上跟 JavaScript 差异
1. 默认的类型声明推到（Type Inference）；
2. 变量⽤ var 声明，常量⽤ let 声明；
3. If/switch/for/while/do while 等循环语句不需要写括号 () ；
4. Switch 中默认 case 匹配到了就不会往下执⾏，相当于默认写了 break ，匹配多个值⽤逗

```
1 // JavaScript
2 case "a":
3 case "b":
4 doSomething
5
6 // Swift
7 case "a", "b":
8 doSomething
```

5. 打包：
最新版iOS Xcode如何证书配置和ipa打包(附图⽂教程) - 掘⾦
⽣成导出的证书：钥匙串访问 =》
<CustomImage src='/growth-record/platform/app/sirikit-23.png' />

## Uni-app 原⽣插件开发

官⽅⽂档：
- [uts for iOS | uni-app官⽹](https://uniapp.dcloud.net.cn/)
- [简介 | uni⼩程序SDK](https://nativesupport.dcloud.net.cn/NativePlugin/)

注意：仅⽀持 iOS11 及以上系统版本
<CustomImage src='/growth-record/platform/app/sirikit-24.png' />

需要在 package.json ⾥添加如下配置：
```
1 "ios": {
2 "deploymentTarget": "11.0",
3 "validArchitectures": [
4 "arm64"
5 ],
6 }
```

本地离线打包测试：
配置AppKey：
<CustomImage src='/growth-record/platform/app/sirikit-25.png' />

打包配置：
<CustomImage src='/growth-record/platform/app/sirikit-26.png' />

注意：要有该应⽤的开发权限
<CustomImage src='/growth-record/platform/app/sirikit-27.png' />

编译报错：
<CustomImage src='/growth-record/platform/app/sirikit-28.png' />

取消勾选即可：
<CustomImage src='/growth-record/platform/app/sirikit-29.png' />
<CustomImage src='/growth-record/platform/app/sirikit-30.png' />

苹果官⽅管理后台添加应⽤ Siri 能⼒配置：
<CustomImage src='/growth-record/platform/app/sirikit-31.png' />

打包插件不显⽰ build ⽂件问题：[Xcode 13新建项⽬查看Products⽬录 - 掘⾦](https://juejin.cn/post/7026978788395188237)

因为编译根⽬录⽂件找不到的问题，每次打包需要⼿动添加对应的⽂件到uni-app⾥⾯去：
<CustomImage src='/growth-record/platform/app/sirikit-32.png' />

⼿动【快捷指令】添加的Siri⽆法触发⾃定义Siri意图指令，需要⼿动添加⽂件映射：
<CustomImage src='/growth-record/platform/app/sirikit-33.png' />
<CustomImage src='/growth-record/platform/app/sirikit-34.png' />

添加意图扩展⽂件报错：
<CustomImage src='/growth-record/platform/app/sirikit-35.png' />

解决复制意图扩展⽂件到跟⽬录：
<CustomImage src='/growth-record/platform/app/sirikit-36.png' />
<CustomImage src='/growth-record/platform/app/sirikit-37.png' />
<CustomImage src='/growth-record/platform/app/sirikit-38.png' />
<CustomImage src='/growth-record/platform/app/sirikit-39.png' />

查看打包⽂件地址：
<CustomImage src='/growth-record/platform/app/sirikit-40.png' />
查看具体包⽂件内容：
<CustomImage src='/growth-record/platform/app/sirikit-41.png' />
XBuilder 本地打包 ipa 配置：
<CustomImage src='/growth-record/platform/app/sirikit-42.png' />

HBuilder-云打包报错：
<CustomImage src='/growth-record/platform/app/sirikit-43.png' />

升级替换这个⽂件：在苹果开发者后台下载对应的⽂件替换
<CustomImage src='/growth-record/platform/app/sirikit-44.png' />

下载ipa包到真机iPhone上：
[iPhone, iPad 安装 ipa ⽂件_爱思助⼿安装ipa⽂件_Hanyang Li的博客-CSDN博客](https://blog.csdn.net/u011193452/article/details/106385352#:~:text=iPhone%2C%20iPad%20%E5%AE%89%E8%A3%85%20ipa%20%E6%96%87%E4%BB%B6%201%201.%20%E7%88%B1%E6%80%9D%E5%8A%A9%E6%89%8B%E5%AE%98%E7%BD%91%E5%9C%B0%E5%9D%80,3.%20%E6%89%93%E5%BC%80%E5%8A%A9%E6%89%8B%EF%BC%8C%E7%82%B9%E5%87%BB%E4%B8%8B%E8%BD%BD%E6%8C%89%E9%92%AE%E5%A6%82%E5%9B%BE%EF%BC%9A%204%204.%20%E7%82%B9%E5%87%BB%E4%B8%8B%E8%BD%BD%E6%8C%89%E9%92%AE%E5%BC%B9%E5%87%BA%E5%AF%B9%E8%AF%9D%E6%A1%86%EF%BC%8C%E7%82%B9%E5%87%BB%E6%B7%BB%E5%8A%A0%E6%9C%AC%E5%9C%B0%E6%96%87%E4%BB%B6%EF%BC%8C%E9%80%89%E6%8B%A9.ipa%E6%96%87%E4%BB%B6%EF%BC%8C%E7%82%B9%E6%89%93%E5%BC%80%EF%BC%8C%E6%B7%BB%E5%8A%A0%E5%88%B0%E5%BA%94%E7%94%A8%E5%88%97%E8%A1%A8%E4%B8%AD%EF%BC%8C%E7%82%B9%E5%87%BB%E5%88%97%E8%A1%A8%E4%B8%AD%E5%AE%89%E8%A3%85%E6%8C%89%E9%92%AE%EF%BC%8C%E5%A6%82%E5%9B%BE%EF%BC%9A%205%205.%20%E7%82%B9%E5%87%BB%E5%AE%89%E8%A3%85%E6%8C%89%E9%92%AE%E4%B9%8B%E5%90%8E%EF%BC%8C%E5%BC%80%E5%A7%8B%E5%AE%89%E8%A3%85%E5%88%B0%E6%89%8B%E6%9C%BA%EF%BC%8C%E5%AE%89%E8%A3%85%E8%BF%9B%E5%BA%A6%E6%8F%90%E7%A4%BA%EF%BC%8C%E6%8F%90%E7%A4%BA%E5%AE%89%E8%A3%85%E6%88%90%E5%8A%9F%EF%BC%8C%E6%AD%A4%E6%97%B6iphone%E6%89%8B%E6%9C%BA%E5%B7%B2%E6%9C%89%E8%AF%A5%E8%BD%AF%E4%BB%B6%EF%BC%8C%E5%AE%8C%E6%88%90%E6%93%8D%E4%BD%9C%E3%80%82)

IPA 解包及导⼊真机
http://dantheman827.github.io/ios-app-signer/
<CustomImage src='/growth-record/platform/app/sirikit-45.png' />

将HBuilder⽣成的ipa包进⾏重命名解压（修改后缀格式为：zip）：
<CustomImage src='/growth-record/platform/app/sirikit-46.png' />
1. 传输 ipa 包到真机⼯具：苹果官⽅软件，⽐爱思助⼿安全可靠且⽅便
<CustomImage src='/growth-record/platform/app/sirikit-47.png' />

## 参考资料
1. Sirikit 开发：
• 官⽅：在 iPhone 或 iPad 上创建⾃定快捷指令 ✅
• 学习：快捷指令库✅
• ⾯向开发者的 Siri✅
• 通过 Siri、“快捷指令”App 或“Siri 建议”运⾏快捷指令✅
• SiriKit官⽅⽂档📖
• SiriKit框架详细解析（⼀）⸺基本概览（⼀）✅
• 了解如何借助 Apple SiriKit 将 Siri 与您的应⽤程序集成📖
• Apple Siri接⼊开发 (⼀)✅
• iOS开发-SiriKit应⽤✅
• 玩转iOS开发：iOS 10 新特性《Siri Kit》✅
• iOS 开发：SiriKit 应⽤⼊⻔
• Introducing SiriKit Media Intents - WWDC19 - Videos - Apple Developer
• Introducing Parameters for Shortcuts - WWDC19 - Videos - Apple Developer
• Introduction to Siri Shortcuts - WWDC18 - Videos - Apple Developer
• 介绍SiriKit · SiriKit编程指南
• Simulator Help
• 创作者的 iOS 独⽴开发指南的⽬录 - 少数派
• Siri快捷指令 - 掘⾦
• SiriKit预研
• https://medium.com/@WeAreMobile1st/how-to-handle-and-donate-siri-shortcuts￾ea50f2409086
• https://developer.apple.com/tutorials/swiftui/creating-and-combining-views
• Siri，快捷指令以及 SiriKit - 探索 - Apple Developer
• SiriKit 新变化:让 Intent 更强⼤_普通⽹友的博客-CSDN博客
• sirikit - o.0...w - 博客园
• iOS12 Siri Shortcuts详解 - 掘⾦
• 【腾讯 Bugly ⼲货分享】iOS10 SiriKit QQ 适配详解 - 掘⾦

2. 实践⽂档：
• 爱奇艺iOS深度实践：SiriKit详解应⽤篇
• SiriKit 编程指南
• 使⽤SiriKit在iOS的⽤⼾体验设计⽅法 (UX)
• SiriKit 知⼀⼆ - Siri 捷径从设计到构建（上）
• 向远公园⽂章系列
• 阿⾥云社区⽤⼾关于这个教程开发
• 阿⾥云sirikit⽂章搜索⻚⾯
• Google 关于 sirikit的开发搜索
• https://medium.com/search?q=sirikit
• Siri Shortcuts intent 扩展开发
• https://www.jianshu.com/u/be22fcd3469d
• https://www.jianshu.com/search?q=sirikit&page=1&type=note
• https://www.jianshu.com/u/0cf7d455eb9e
• https://juejin.cn/search?
query=sirikit&utm_source=gold_browser_extension&utm_medium=search&sort=0
• https://juejin.cn/user/3227821827957710/posts
• SiriKit 新变化：让 Intent 更强⼤_intent
• Xamarin.iOS 中的 SiriKit - Xamarin
• https://s.geekbang.org/search/c=0/k=sirikit/t=
• 知乎 SiriKit 实战
• https://www.zhihu.com/search?type=content&q=sirikit
• https://zzk.cnblogs.com/s?w=sirikit
• https://medium.com/appcoda-tutorials/building-custom-siri-shortcut-intent-ui-extension-to￾display-remote-data-alfian-losari-efe891a44a70

3. Swift 编程开发：
• SwiftGG
• https://swift.gg/
• The Swift Programming Language (5.9 beta) | Documentation
• Swift学习笔记
• Swift知识介绍
• 调试技巧 - 掘⾦
• https://developer.apple.com/documentation/swift

4. 社区讨论：
• 掘⾦对应ios开发：不想做iOS了；
• Uni-app QQ群；

5. GitHub demo：
• https://github.com/AbMathur/SirikitDemoApp
• https://github.com/domeniconicoli/SiriKitIntentsUIExample
• https://github.com/hanyx1992/SiriKitDemo

6. Xcode ⼯具开发：
• 1.1 软件简介及准备⼯作 - 少数派
• Creating an Xcode project for an app | Apple Developer Documentation
• Xcode⼊⻔秘籍⸺很多iOS开发者都不知道的基本操作
• 初 识 Xcode · macOS开 发 教 程
• Xcode - 简体中⽂⽂档 - Apple Developer
• mac 下 Xcode 真机调试 - 掘⾦
• iOS⾃制framework总结 - 掘⾦

7. Uni-app 原⽣插件开发资料：
• ⼋、uni-app 原⽣插件开发04 - 开发原⽣插件
• ⼀、iOS 中的动态库、静态库和 framework
• 五年陈的 Weex，聊聊它的过去现在和未来
• WEEX
• UNIAPP---IOS端原⽣插件开发实战(⼀) - 掘⾦
