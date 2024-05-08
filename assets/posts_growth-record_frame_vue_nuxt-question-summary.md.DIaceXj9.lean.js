import{j as n,b as s,c as i,L as r,aa as o,s as e,f as t,G as l}from"./chunks/framework.D8w0pJIA.js";const E=JSON.parse('{"title":"Nuxt 开发问题总结","description":"","frontmatter":{"title":"Nuxt 开发问题总结","date":"2020-07-11T20:00:00.000Z","tags":["Vue","Nuxt"],"categories":["前端进击"]},"headers":[],"relativePath":"posts/growth-record/frame/vue/nuxt-question-summary.md","filePath":"posts/growth-record/frame/vue/nuxt-question-summary.md","lastUpdated":1713625033000}'),c={name:"posts/growth-record/frame/vue/nuxt-question-summary.md"},d=o("",4),h=e("p",null,"打开控制台报错信息：",-1),u=o("",10),p=e("p",null,"然后问题出现了，启动本地这个项目的服务（已经关闭了上图的 start 服务了），修改了代码谷歌浏览器无法正常调试（没有任何效果），控制台 Console 一直报这个提示：",-1),_=e("p",null,"重启电脑也没用（因为以为关闭端口后就好了的问题，但是查了电脑进程是没有这个端口服务的），但换个浏览器就可以，才发现是谷歌浏览器的。所以是谷歌浏览器的 PWA 问题。",-1),m=e("h3",{id:"二、问题分析-1",tabindex:"-1"},[t("二、问题分析 "),e("a",{class:"header-anchor",href:"#二、问题分析-1","aria-label":'Permalink to "二、问题分析"'},"​")],-1),g=e("p",null,[t("这个问题是在执行了 "),e("code",null,"yarn build"),t(" 之后，谷歌浏览器对访问这个项目服务注册了一个类似谷歌应用程序的工具，导致数据一直访问都是之前打包好的。跟谷歌浏览器的 Service Workers 自动设置也有关，保存了 SW 缓存数据，每次这个端口号都是返回这个缓存数据的服务。")],-1),b=e("h3",{id:"三、解决方法-1",tabindex:"-1"},[t("三、解决方法 "),e("a",{class:"header-anchor",href:"#三、解决方法-1","aria-label":'Permalink to "三、解决方法"'},"​")],-1),f=e("p",null,"1、查看这个应用程序是否存在：",-1),x=e("p",null,"2、关闭这个已经存在的应用程序服务：",-1),k=e("h2",{id:"component-切换组件与插槽问题",tabindex:"-1"},[t("component 切换组件与插槽问题 "),e("a",{class:"header-anchor",href:"#component-切换组件与插槽问题","aria-label":'Permalink to "component 切换组件与插槽问题"'},"​")],-1),q=e("h3",{id:"一、问题描述-2",tabindex:"-1"},[t("一、问题描述 "),e("a",{class:"header-anchor",href:"#一、问题描述-2","aria-label":'Permalink to "一、问题描述"'},"​")],-1),v=e("p",null,[t("使用 "),e("code",null,"<component></component>"),t(" 根据默认设置 "),e("code",null,"current"),t(" 变量设置默认赋值及切换不同的组件时候，因为服务端渲染的原因，会报错误，且，组件内使用插槽，会重复渲染两次，但当 "),e("code",null,"current"),t(" 生命周期内切换就不会了。")],-1),T=e("p",null,[t("当 "),e("code",null,"current"),t(" 有默认值时候服务端报渲染错误（图上），组件内使用插槽，会重复渲染两次（图下）：")],-1),P=o("",8),y=e("p",null,"dev 环境报错： TypeError:n.setAttribute is not a function",-1),w=e("p",null,[e("strong",null,"排查手段："),t(" 在相关页面通过关闭一些组件来寻找是否还是报错。一般问题是出现在"),e("strong",null,"v-if"),t("身上，本次错误是有个组件用了 "),e("code",null,"v-if"),t(" 判断，而该值又是在 "),e("code",null,"process.client"),t(" 之后才确定是 "),e("code",null,"false"),t(" 还是 "),e("code",null,"true"),t("，导致服务端没渲染出这个，而客户端又有了这个，然后报错了。")],-1),A=o("",6);function C(S,D,N,V,F,I){const a=l("CustomImage");return s(),i("div",null,[d,r(a,{src:"/growth-record/frame/vue/nuxt-question-01.png"}),h,r(a,{src:"/growth-record/frame/vue/nuxt-question-02.png"}),u,r(a,{src:"/growth-record/frame/vue/nuxt-question-03.png"}),p,r(a,{src:"/growth-record/frame/vue/nuxt-question-04.png"}),_,m,g,b,f,r(a,{src:"/growth-record/frame/vue/nuxt-question-05.png"}),x,r(a,{src:"/growth-record/frame/vue/nuxt-question-06.webp"}),k,q,v,r(a,{src:"/growth-record/frame/vue/nuxt-question-07.png"}),T,r(a,{src:"/growth-record/frame/vue/nuxt-question-08.png"}),P,r(a,{src:"/growth-record/frame/vue/nuxt-question-09.png"}),y,r(a,{src:"/growth-record/frame/vue/nuxt-question-10.png"}),w,r(a,{src:"/growth-record/frame/vue/nuxt-question-11.png"}),r(a,{src:"/growth-record/frame/vue/nuxt-question-12.webp"}),A])}const M=n(c,[["render",C]]);export{E as __pageData,M as default};