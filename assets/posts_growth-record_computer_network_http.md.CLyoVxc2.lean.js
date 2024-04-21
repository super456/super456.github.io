import{j as a,b as r,c as n,L as l,aa as d,s as t,f as o,G as i}from"./chunks/framework.BdPFiiJb.js";const q=JSON.parse('{"title":"HTTP 学习笔记","description":"","frontmatter":{"title":"HTTP 学习笔记","date":"2018-06-26T20:07:05.000Z","tag":["计算机网络"],"categories":["前端进击"]},"headers":[],"relativePath":"posts/growth-record/computer/network/http.md","filePath":"posts/growth-record/computer/network/http.md","lastUpdated":1713677507000}'),s={name:"posts/growth-record/computer/network/http.md"},T=d("",8),h=t("p",null,"需要注意的是：",-1),p=t("ul",null,[t("li",null,"HTTP无连接状态：无连接的含义是限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间。"),t("li",null,"HTTP媒体独立状态：只要客户端和服务器知道如何处理的数据内容，任何类型的数据都可以通过HTTP发送。客户端以及服务器指定使用适合的MIME-type内容类型。"),t("li",null,"HTTP无状态：无状态是指协议对于事务处理没有记忆能力。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的数据量增大。另一方面，在服务器不需要先前信息时它的应答就较快。")],-1),c=t("h2",{id:"_2-http的消息结构",tabindex:"-1"},[o("2. HTTP的消息结构 "),t("a",{class:"header-anchor",href:"#_2-http的消息结构","aria-label":'Permalink to "2. HTTP的消息结构"'},"​")],-1),f=t("blockquote",null,[t("p",null,'HTTP是基于客户端/服务端（C/S）的架构模型，通过一个可靠的链接来交换信息，是一个无状态的请求/响应协议。 一个HTTP"客户端"是一个应用程序（Web浏览器或其他任何客户端），通过连接到服务器达到向服务器发送一个或多个HTTP的请求的目的，和通过接收客户端的请求并向客户端发送HTTP响应数据。 HTTP使用统一资源标识符（Uniform Resource Identifiers, URI）来传输数据和建立连接。一旦建立连接后，数据消息就通过类似Internet邮件所使用的格式[RFC5322]和多用途Internet邮件扩展（MIME）[RFC2045]来传送。')],-1),g=t("p",null,"客户端发送请求结构图：",-1),y=t("p",null,"服务器响应消息图：",-1),x=d("",13);function _(P,u,H,b,m,k){const e=i("CustomImage");return r(),n("div",null,[T,l(e,{src:"/growth-record/computer/network/http-01.png"}),h,p,c,f,g,l(e,{src:"/growth-record/computer/network/http-02.png"}),y,l(e,{src:"/growth-record/computer/network/http-03.png"}),x])}const E=a(s,[["render",_]]);export{q as __pageData,E as default};
