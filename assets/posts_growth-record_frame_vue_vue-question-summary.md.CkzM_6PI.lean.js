import{j as o,b as l,c as r,L as s,aa as n,s as e,f as a,G as i}from"./chunks/framework.D8w0pJIA.js";const w=JSON.parse('{"title":"Vue 开发问题总结","description":"","frontmatter":{"title":"Vue 开发问题总结","date":"2020-03-22T20:00:00.000Z","tag":["Vue"],"categories":["前端进击"]},"headers":[],"relativePath":"posts/growth-record/frame/vue/vue-question-summary.md","filePath":"posts/growth-record/frame/vue/vue-question-summary.md","lastUpdated":1713675008000}'),p={name:"posts/growth-record/frame/vue/vue-question-summary.md"},u=n("",4),c=n("",4),d=e("p",null,[a("从上图见得，调用它的是 "),e("code",null,"el.parentNode"),a("，通过 "),e("code",null,"alert"),a("，发现 "),e("code",null,"el.parentNode"),a(" 为 "),e("code",null,"null，parentNode"),a(" 为什么会为 "),e("code",null,"null？"),a(" MDN 给出了以下答案")],-1),h=e("p",null,[a("这个问题有点类似 **_ref的注册时间问题， _**解决这个问题需要关心的就是 "),e("strong",null,"生命周期")],-1),_=e("p",null,"回到我们本身的问题，注册指令时，官方也提供了几个生命周期",-1),m=n("",9),v=n("",5),g=n("",4),b=e("p",null,[a("添加一行代码："),e("code",null,"'vue$': 'vue/dist/vue.esm.js'"),a(" ，然后重新运行编译就可以了")],-1);function f(q,T,C,P,V,k){const t=i("CustomImage");return l(),r("div",null,[u,s(t,{src:"/growth-record/frame/vue/vue-question-01.png"}),c,s(t,{src:"/growth-record/frame/vue/vue-question-02.png"}),d,s(t,{src:"/growth-record/frame/vue/vue-question-03.png"}),h,_,s(t,{src:"/growth-record/frame/vue/vue-question-04.png"}),m,s(t,{src:"/growth-record/frame/vue/vue-question-05.png"}),v,s(t,{src:"/growth-record/frame/vue/vue-question-06.png"}),g,s(t,{src:"/growth-record/frame/vue/vue-question-07.png"}),b])}const S=o(p,[["render",f]]);export{w as __pageData,S as default};