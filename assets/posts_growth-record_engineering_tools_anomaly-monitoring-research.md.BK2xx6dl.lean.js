import{j as o,b as i,c as l,L as e,aa as a,s as t,f as d,G as n}from"./chunks/framework.D8w0pJIA.js";const j=JSON.parse('{"title":"异常监控管理工具调研","description":"","frontmatter":{"title":"异常监控管理工具调研","date":"2020-03-22T20:00:00.000Z","tags":["前端工程化"],"categories":["前端进击"]},"headers":[],"relativePath":"posts/growth-record/engineering/tools/anomaly-monitoring-research.md","filePath":"posts/growth-record/engineering/tools/anomaly-monitoring-research.md","lastUpdated":1713495015000}'),h={name:"posts/growth-record/engineering/tools/anomaly-monitoring-research.md"},s=a("",5),c=a("",12),_=a("",14),p=t("p",null,"在收集异常阶段，可根据第二节划分的异常后果来判断异常的严重程度，在发生异常时选择对应的上报方案进行上报。",-1),u=t("h4",{id:"_5-2-异常整理",tabindex:"-1"},[d("5.2. 异常整理： "),t("a",{class:"header-anchor",href:"#_5-2-异常整理","aria-label":'Permalink to "5.2. 异常整理："'},"​")],-1),b=t("p",null,"（1）前端日志存储： 单纯一条异常日志并不能帮助我们快速定位问题根源，找到解决方案。但如果要收集用户的行为日志，又要采取一定的技巧，而不能用户每一个操作后，就立即将该行为日志传到服务器，对于具有大量用户同时在线的应用，如果用户一操作就立即上传日志，无异于对日志服务器进行 DDOS 攻击。因此，我们先将这些日志存储在用户客户端本地，达到一定条件之后，再同时打包上传一组日志。",-1),g=t("p",null,"我们不可能直接将这些日志用一个变量保存起来，这样会挤爆内存，而且一旦用户进行刷新操作，这些日志就丢失了，因此，我们自然而然想到前端数据持久化方案。",-1),m=t("p",null,"目前，可用的持久化方案可选项也比较多了，主要有：Cookie、localStorage、sessionStorage、IndexedDB、webSQL 、FileSystem 等等。那么该如何选择呢？我们通过一个表来进行对比：",-1),k=t("p",null,"综合之后，IndexedDB 是最好的选择，它具有容量大、异步的优势，异步的特性保证它不会对界面的渲染产生阻塞。而且 IndexedDB 是分库的，每个库又分 store，还能按照索引进行查询，具有完整的数据库管理思维，比localStorage 更适合做结构化数据管理。但是它有一个缺点，就是 API 非常复杂，不像 localStorage 那么简单直接。针对这一点，我们可以使用 hello-indexeddb 这个工具，它用 Promise 对复杂 API 进行来封装，简化操作，使 IndexedDB 的使用也能做到 localStorage 一样便捷。另外，IndexedDB 是被广泛支持的 HTML5 标准，兼容大部分浏览器，因此不用担心它的发展前景。",-1),q=a("",5),S=a("",3),I=t("p",null,"上图展示了上报的一个大致流程。对于合并上报这种情况，一次的数据量可能要十几k，对于日 pv 大的站点来说，产生的流量还是很可观的。所以有必要对数据进行压缩上报。lz-string 是一个非常优秀的字符串压缩类库，兼容性好，代码量少，压缩比高，压缩时间短，压缩率达到惊人的 60%。但它基于LZ78压缩，如果后端不支持解压，可选择 gzip 压缩，一般而言后端会默认预装 gzip，因此，选择 gzip 压缩数据也可以，工具包 pako 中自带了 gzip 压缩，可以尝试使用。",-1),f=t("h3",{id:"六、异常日志接收、存储与分析",tabindex:"-1"},[d("六、异常日志接收、存储与分析： "),t("a",{class:"header-anchor",href:"#六、异常日志接收、存储与分析","aria-label":'Permalink to "六、异常日志接收、存储与分析："'},"​")],-1),P=t("h4",{id:"_6-1-接入层与消息队列",tabindex:"-1"},[d("6.1. 接入层与消息队列： "),t("a",{class:"header-anchor",href:"#_6-1-接入层与消息队列","aria-label":'Permalink to "6.1. 接入层与消息队列："'},"​")],-1),x=t("p",null,"一般通过提供独立的日志服务器接收客户端日志，接收过程中，要对客户端日志内容的合法性、安全性等进行甄别，防止被人攻击。而且由于日志提交一般都比较频繁，多客户端同时并发的情况也常见。通过消息队列将日志信息逐一处理后写入到数据库进行保存也是比较常用的方案。",-1),T=a("",51);function A(w,y,D,B,C,V){const r=n("CustomImage");return i(),l("div",null,[s,e(r,{src:"/growth-record/engineering/tools/monitoring01.webp"}),c,e(r,{src:"/growth-record/engineering/tools/monitoring02.webp"}),_,e(r,{src:"/growth-record/engineering/tools/monitoring03.webp"}),p,u,b,g,m,e(r,{src:"/growth-record/engineering/tools/monitoring04.webp"}),k,e(r,{src:"/growth-record/engineering/tools/monitoring05.webp"}),q,e(r,{src:"/growth-record/engineering/tools/monitoring06.webp"}),S,e(r,{src:"/growth-record/engineering/tools/monitoring07.webp"}),I,f,P,x,e(r,{src:"/growth-record/engineering/tools/monitoring08.webp"}),T])}const J=o(h,[["render",A]]);export{j as __pageData,J as default};