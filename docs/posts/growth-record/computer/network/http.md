---
title: HTTP 学习笔记
date: 2018-06-26 20:07:05
tag:
 - 计算机网络
categories:
 - 前端进击
---
# HTTP 学习笔记
#### 作为一个开发人员，如果您经常跟客户端、服务器打交道，肯定要懂点HTTP协议内容，对于开发调试至关重要。

>HTTP协议 （HyperText Transfer Protocol，超文本传输协议）是因特网上应用最为广泛的一种网络传输协议，所有的WWW文件都必须遵守这个标准。它是一个基于TCP/IP通信协议来传递数据（HTML 文件, 图片文件, 查询结果等）。

介绍一下内容：
1.  HTTP的工作原理
2.  HTTP的消息结构
3.  HTTP的请求方式
4.  HTTP的响应信息
5.  HTTP的状态码类
6.  HTTP Content-type

## 1. HTTP的工作原理

>HTTP协议工作于客户端-服务端架构为上。浏览器作为HTTP客户端通过URL向HTTP服务端即WEB服务器发送所有请求。

HTTP协议通信流程图：

<CustomImage src='/growth-record/computer/network/http-01.png' />

需要注意的是：

- HTTP无连接状态：无连接的含义是限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间。
- HTTP媒体独立状态：只要客户端和服务器知道如何处理的数据内容，任何类型的数据都可以通过HTTP发送。客户端以及服务器指定使用适合的MIME-type内容类型。
-  HTTP无状态：无状态是指协议对于事务处理没有记忆能力。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的数据量增大。另一方面，在服务器不需要先前信息时它的应答就较快。

## 2. HTTP的消息结构

>HTTP是基于客户端/服务端（C/S）的架构模型，通过一个可靠的链接来交换信息，是一个无状态的请求/响应协议。
>一个HTTP"客户端"是一个应用程序（Web浏览器或其他任何客户端），通过连接到服务器达到向服务器发送一个或多个HTTP的请求的目的，和通过接收客户端的请求并向客户端发送HTTP响应数据。
>HTTP使用统一资源标识符（Uniform Resource Identifiers, URI）来传输数据和建立连接。一旦建立连接后，数据消息就通过类似Internet邮件所使用的格式[RFC5322]和多用途Internet邮件扩展（MIME）[RFC2045]来传送。

客户端发送请求结构图：

<CustomImage src='/growth-record/computer/network/http-02.png' />

服务器响应消息图：

<CustomImage src='/growth-record/computer/network/http-03.png' />

## 3.  HTTP的请求方式

常用的请求方式列表：

| 序号  | 方法	| 描述 |
|-------------|:----------|:-------|
|1	 |GET	|请求指定的页面信息，并返回实体主体。|
|2	|HEAD	|类似于get请求，只不过返回的响应中没有具体的内容，用于获取报头|
|3    |	POST	|向指定资源提交数据进行处理请求（例如提交表单或者上传文件）。数据被包含在请求体中。POST请求可能会导致新的资源的建立和/或已有资源的修改。|
|4	|PUT	|从客户端向服务器传送的数据取代指定的文档的内容。|
|5	|DELETE	|请求服务器删除指定的页面。|
|6	|CONNECT	|HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器。|
|7	|OPTIONS	|允许客户端查看服务器的性能。|
|8	|TRACE	|回显服务器收到的请求，主要用于测试或诊断。|

## 4.  HTTP的响应信息

参数列表：

|应答头|说明|
|:-------|:-------|
|Allow|	服务器支持哪些请求方法（如GET、POST等）。|
|Content-Encoding	|文档的编码（Encode）方法。|
|Content-Length	|表示内容长度。|
|Content-Type	|表示后面的文档属于什么MIME类型。|
|Date	|当前的GMT时间。|
|Expires	|应该在什么时候认为文档已经过期，从而不再缓存它？|
|Last-Modified	|文档的最后改动时间。|
|Location|	表示客户应当到哪里去提取文档。|
|Refresh	|表示浏览器应该在多少时间之后刷新文档，以秒计。|
|Server	|服务器名字。Servlet一般不设置这个值，而是由Web服务器自己设置。|
|Set-Cookie	|设置和页面关联的Cookie。|
|WWW-Authenticate	|客户应该在Authorization头中提供什么类型的授权信息？|

## 5.  HTTP的状态码类

这是常见的HTTP状态码：

  -  200 - 请求成功
  -  301 - 资源（网页等）被永久转移到其它URL
  -  404 - 请求的资源（网页等）不存在
  -  500 - 内部服务器错误

具体分类表：

|分类	| 分类描述 |
|------------|:------------|
|1**|	信息，服务器收到请求，需要请求者继续执行操作|
|2**	|成功，操作被成功接收并处理|
|3**	|重定向，需要进一步的操作以完成请求|
|4**	|客户端错误，请求包含语法错误或无法完成请求|
|5**	|服务器错误，服务器在处理请求的过程中发生了错误|

## 6.  HTTP Content-type

>Content-Type，内容类型，一般是指网页中存在的Content-Type，用于定义网络文件的类型和网页的编码，决定浏览器将以什么形式、什么编码读取这个文件，这就是经常看到一些Asp网页点击的结果却是下载到的一个文件或一张图片的原因。
