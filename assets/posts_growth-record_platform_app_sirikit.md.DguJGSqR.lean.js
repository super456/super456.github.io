import{_ as r,D as n,c as p,o as l,j as i,I as t,a6 as e,a}from"./chunks/framework.BOyJDVBP.js";const gi=JSON.parse('{"title":"iOS SiriKit 开发指南","description":"","frontmatter":{"title":"iOS SiriKit 开发指南","date":"2023-06-30T20:07:09.000Z","tags":["iOS","uni-app","App"],"categories":["前端进击"]},"headers":[],"relativePath":"posts/growth-record/platform/app/sirikit.md","filePath":"posts/growth-record/platform/app/sirikit.md","lastUpdated":1713694052000}'),o={name:"posts/growth-record/platform/app/sirikit.md"},h=i("h1",{id:"ios-sirikit-开发指南",tabindex:"-1"},[a("iOS SiriKit 开发指南 "),i("a",{class:"header-anchor",href:"#ios-sirikit-开发指南","aria-label":'Permalink to "iOS SiriKit 开发指南"'},"​")],-1),c=i("h2",{id:"需求背景",tabindex:"-1"},[a("需求背景 "),i("a",{class:"header-anchor",href:"#需求背景","aria-label":'Permalink to "需求背景"'},"​")],-1),k=i("p",null,"公司业务需求，开发 Hi siri 响应功能数据展示回应需求",-1),d=e("",8),g=i("ol",null,[i("li",null,"如果需要开发⼀个原⽣插件包的形式，创建项⽬的时候选择哪个模版？"),i("li",null,"信息列表属性可以配置值为中⽂吗？"),i("li",null,"怎么打包运⾏到真机上？"),i("li",null,"打包构建的配置信息怎么设置？")],-1),E=e("",3),u=e("",9),_=i("ol",{start:"2"},[i("li",null,"运⾏打开，默认选择运⾏终端选项：Mac 和 iPhone 即可")],-1),m=i("p",null,"提⽰特性：",-1),f=i("ol",null,[i("li",null,"创建项⽬：")],-1),B=i("ol",{start:"2"},[i("li",null,"Team： Organization identifier："),i("li",null,"项⽬添加siri启动配置：")],-1),C=i("p",null,"切换运⾏的模拟器：",-1),y=i("p",null,"运⾏到真机上必须是开发者团队才可以：",-1),A=i("p",null,"⼿机需要开启开发者模式：设置=》隐私与安全性=》开发者模式",-1),F=i("p",null,"如果没有配置开发者团队的话，需要在这⾥配置设置：",-1),S=i("p",null,"使⽤Siri默认语⾳提⽰配置：",-1),b=i("p",null,"使⽤ intent 扩展提⽰报错，需要打钩上这些引⼊包选项：",-1),w=i("p",null,"给对应的应⽤设置Siri权限：",-1),v=i("p",null,[a("快捷指令的应⽤⽆需调⽤访问 Siri 的权限： "),i("a",{href:"https://developer.apple.com/documentation/sirikit/intent_handling_infrastructure/requesting_",target:"_blank",rel:"noreferrer"},"https://developer.apple.com/documentation/sirikit/intent_handling_infrastructure/requesting_"),a(" authorization_to_use_siri")],-1),D=i("p",null,"官⽅创建意图扩展教程：Creating an Intents App Extension | Apple Developer Documentation 并且：⾸次安装扩展应⽤时，Siri 并不会⽴⻢识别这个快捷指令，需要等待⼏分钟在进⾏测试使⽤，包 括更新扩展⽂件也是的",-1),q=i("p",null,"应⽤连不上⽹络问题是：应⽤需要允许⽆线局域⽹开启连接，⾸次安装应⽤会有弹出授权⽆线局域⽹ 的弹窗提⽰，开启的话可以在：设置=》⽆线局域⽹=》使⽤⽆线局域⽹与蜂窝⽹络的 App=》找到该应 ⽤是否存在",-1),P=i("p",null,[i("a",{href:"https://www.jianshu.com/p/81d0b7f06eba",target:"_blank",rel:"noreferrer"},"https://www.jianshu.com/p/81d0b7f06eba"),a(" 出现这种Siri提⽰直接点击打开这个应⽤即可，跳转到对应的应⽤打开蜂窝⽹络数据或⽆线⽹络权限")],-1),I=i("p",null,"接⼝调⽤成功：",-1),x=i("p",null,[a("Xcode 模拟器不⽀持 Siri 功能使⽤："),i("a",{href:"https://developer.apple.com/forums/thread/131319",target:"_blank",rel:"noreferrer"},"https://developer.apple.com/forums/thread/131319")],-1),T=e("",14),K=i("h2",{id:"uni-app-原生插件开发",tabindex:"-1"},[a("Uni-app 原⽣插件开发 "),i("a",{class:"header-anchor",href:"#uni-app-原生插件开发","aria-label":'Permalink to "Uni-app 原⽣插件开发"'},"​")],-1),O=i("p",null,"官⽅⽂档：",-1),j=i("ul",null,[i("li",null,[i("a",{href:"https://uniapp.dcloud.net.cn/",target:"_blank",rel:"noreferrer"},"uts for iOS | uni-app官⽹")]),i("li",null,[i("a",{href:"https://nativesupport.dcloud.net.cn/NativePlugin/",target:"_blank",rel:"noreferrer"},"简介 | uni⼩程序SDK")])],-1),V=i("p",null,"注意：仅⽀持 iOS11 及以上系统版本",-1),N=e("",3),X=i("p",null,"打包配置：",-1),U=i("p",null,"注意：要有该应⽤的开发权限",-1),z=i("p",null,"编译报错：",-1),W=i("p",null,"取消勾选即可：",-1),M=i("p",null,"苹果官⽅管理后台添加应⽤ Siri 能⼒配置：",-1),R=i("p",null,[a("打包插件不显⽰ build ⽂件问题："),i("a",{href:"https://juejin.cn/post/7026978788395188237",target:"_blank",rel:"noreferrer"},"Xcode 13新建项⽬查看Products⽬录 - 掘⾦")],-1),H=i("p",null,"因为编译根⽬录⽂件找不到的问题，每次打包需要⼿动添加对应的⽂件到uni-app⾥⾯去：",-1),L=i("p",null,"⼿动【快捷指令】添加的Siri⽆法触发⾃定义Siri意图指令，需要⼿动添加⽂件映射：",-1),$=i("p",null,"添加意图扩展⽂件报错：",-1),G=i("p",null,"解决复制意图扩展⽂件到跟⽬录：",-1),J=i("p",null,"查看打包⽂件地址：",-1),Q=i("p",null,"查看具体包⽂件内容：",-1),Z=i("p",null,"XBuilder 本地打包 ipa 配置：",-1),Y=i("p",null,"HBuilder-云打包报错：",-1),ii=i("p",null,"升级替换这个⽂件：在苹果开发者后台下载对应的⽂件替换",-1),si=i("p",null,[a("下载ipa包到真机iPhone上： "),i("a",{href:"https://blog.csdn.net/u011193452/article/details/106385352#:~:text=iPhone%2C%20iPad%20%E5%AE%89%E8%A3%85%20ipa%20%E6%96%87%E4%BB%B6%201%201.%20%E7%88%B1%E6%80%9D%E5%8A%A9%E6%89%8B%E5%AE%98%E7%BD%91%E5%9C%B0%E5%9D%80,3.%20%E6%89%93%E5%BC%80%E5%8A%A9%E6%89%8B%EF%BC%8C%E7%82%B9%E5%87%BB%E4%B8%8B%E8%BD%BD%E6%8C%89%E9%92%AE%E5%A6%82%E5%9B%BE%EF%BC%9A%204%204.%20%E7%82%B9%E5%87%BB%E4%B8%8B%E8%BD%BD%E6%8C%89%E9%92%AE%E5%BC%B9%E5%87%BA%E5%AF%B9%E8%AF%9D%E6%A1%86%EF%BC%8C%E7%82%B9%E5%87%BB%E6%B7%BB%E5%8A%A0%E6%9C%AC%E5%9C%B0%E6%96%87%E4%BB%B6%EF%BC%8C%E9%80%89%E6%8B%A9.ipa%E6%96%87%E4%BB%B6%EF%BC%8C%E7%82%B9%E6%89%93%E5%BC%80%EF%BC%8C%E6%B7%BB%E5%8A%A0%E5%88%B0%E5%BA%94%E7%94%A8%E5%88%97%E8%A1%A8%E4%B8%AD%EF%BC%8C%E7%82%B9%E5%87%BB%E5%88%97%E8%A1%A8%E4%B8%AD%E5%AE%89%E8%A3%85%E6%8C%89%E9%92%AE%EF%BC%8C%E5%A6%82%E5%9B%BE%EF%BC%9A%205%205.%20%E7%82%B9%E5%87%BB%E5%AE%89%E8%A3%85%E6%8C%89%E9%92%AE%E4%B9%8B%E5%90%8E%EF%BC%8C%E5%BC%80%E5%A7%8B%E5%AE%89%E8%A3%85%E5%88%B0%E6%89%8B%E6%9C%BA%EF%BC%8C%E5%AE%89%E8%A3%85%E8%BF%9B%E5%BA%A6%E6%8F%90%E7%A4%BA%EF%BC%8C%E6%8F%90%E7%A4%BA%E5%AE%89%E8%A3%85%E6%88%90%E5%8A%9F%EF%BC%8C%E6%AD%A4%E6%97%B6iphone%E6%89%8B%E6%9C%BA%E5%B7%B2%E6%9C%89%E8%AF%A5%E8%BD%AF%E4%BB%B6%EF%BC%8C%E5%AE%8C%E6%88%90%E6%93%8D%E4%BD%9C%E3%80%82",target:"_blank",rel:"noreferrer"},"iPhone, iPad 安装 ipa ⽂件_爱思助⼿安装ipa⽂件_Hanyang Li的博客-CSDN博客")],-1),ti=i("p",null,[a("IPA 解包及导⼊真机 "),i("a",{href:"http://dantheman827.github.io/ios-app-signer/",target:"_blank",rel:"noreferrer"},"http://dantheman827.github.io/ios-app-signer/")],-1),ai=i("p",null,"将HBuilder⽣成的ipa包进⾏重命名解压（修改后缀格式为：zip）：",-1),ei=i("ol",null,[i("li",null,"传输 ipa 包到真机⼯具：苹果官⽅软件，⽐爱思助⼿安全可靠且⽅便")],-1),ri=e("",2);function ni(pi,li,oi,hi,ci,ki){const s=n("CustomImage");return l(),p("div",{"data-pagefind-body":!0},[h,c,k,t(s,{src:"/growth-record/platform/app/sirikit-00.png"}),d,t(s,{src:"/growth-record/platform/app/sirikit-01.png"}),g,t(s,{src:"/growth-record/platform/app/sirikit-02.png"}),E,t(s,{src:"/growth-record/platform/app/sirikit.png"}),u,t(s,{src:"/growth-record/platform/app/sirikit-03.png"}),_,t(s,{src:"/growth-record/platform/app/sirikit-04.png"}),m,t(s,{src:"/growth-record/platform/app/sirikit-05.png"}),f,t(s,{src:"/growth-record/platform/app/sirikit-06.png"}),t(s,{src:"/growth-record/platform/app/sirikit-07.png"}),B,t(s,{src:"/growth-record/platform/app/sirikit-08.png"}),t(s,{src:"/growth-record/platform/app/sirikit-09.png"}),t(s,{src:"/growth-record/platform/app/sirikit-10.png"}),C,t(s,{src:"/growth-record/platform/app/sirikit-11.png"}),y,A,t(s,{src:"/growth-record/platform/app/sirikit-12.png"}),F,t(s,{src:"/growth-record/platform/app/sirikit-13.png"}),S,t(s,{src:"/growth-record/platform/app/sirikit-14.png"}),b,t(s,{src:"/growth-record/platform/app/sirikit-15.png"}),w,t(s,{src:"/growth-record/platform/app/sirikit-16.png"}),v,t(s,{src:"/growth-record/platform/app/sirikit-17.png"}),D,t(s,{src:"/growth-record/platform/app/sirikit-18.png"}),q,t(s,{src:"/growth-record/platform/app/sirikit-19.png"}),P,t(s,{src:"/growth-record/platform/app/sirikit-20.png"}),I,t(s,{src:"/growth-record/platform/app/sirikit-21.png"}),x,t(s,{src:"/growth-record/platform/app/sirikit-22.png"}),T,t(s,{src:"/growth-record/platform/app/sirikit-23.png"}),K,O,j,V,t(s,{src:"/growth-record/platform/app/sirikit-24.png"}),N,t(s,{src:"/growth-record/platform/app/sirikit-25.png"}),X,t(s,{src:"/growth-record/platform/app/sirikit-26.png"}),U,t(s,{src:"/growth-record/platform/app/sirikit-27.png"}),z,t(s,{src:"/growth-record/platform/app/sirikit-28.png"}),W,t(s,{src:"/growth-record/platform/app/sirikit-29.png"}),t(s,{src:"/growth-record/platform/app/sirikit-30.png"}),M,t(s,{src:"/growth-record/platform/app/sirikit-31.png"}),R,H,t(s,{src:"/growth-record/platform/app/sirikit-32.png"}),L,t(s,{src:"/growth-record/platform/app/sirikit-33.png"}),t(s,{src:"/growth-record/platform/app/sirikit-34.png"}),$,t(s,{src:"/growth-record/platform/app/sirikit-35.png"}),G,t(s,{src:"/growth-record/platform/app/sirikit-36.png"}),t(s,{src:"/growth-record/platform/app/sirikit-37.png"}),t(s,{src:"/growth-record/platform/app/sirikit-38.png"}),t(s,{src:"/growth-record/platform/app/sirikit-39.png"}),J,t(s,{src:"/growth-record/platform/app/sirikit-40.png"}),Q,t(s,{src:"/growth-record/platform/app/sirikit-41.png"}),Z,t(s,{src:"/growth-record/platform/app/sirikit-42.png"}),Y,t(s,{src:"/growth-record/platform/app/sirikit-43.png"}),ii,t(s,{src:"/growth-record/platform/app/sirikit-44.png"}),si,ti,t(s,{src:"/growth-record/platform/app/sirikit-45.png"}),ai,t(s,{src:"/growth-record/platform/app/sirikit-46.png"}),ei,t(s,{src:"/growth-record/platform/app/sirikit-47.png"}),ri])}const Ei=r(o,[["render",ni]]);export{gi as __pageData,Ei as default};
