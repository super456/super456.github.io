---
title: 微信网页授权开发指南
date: 2023-09-01 20:03:04
tag:
 - 微信网页
categories:
 - 前端进击
---
# 微信网页授权开发指南
## 开发背景
一般用于分享到微信环境（微信应用内打开，比如单聊、群聊、朋友圈等路径进入的链接）的网页需要获取当前访问用户信息，并处理相应的业务逻辑功能及跟踪埋点信息上报等操作

## 开发前提
1. 需要授权的应用是一个网页应用（一般是H5应用），类似微信公众号开发；
2. 需要微信公众平台账号，也就是 appId，需要官方微信公众平台配置信息；

确认具体需求：
1. 只需要微信公众号授权即可，无需借助微信能力；
2. 需要访问链接用户进行微信公众号授权及调用微信能力，比如分享好友、分享朋友圈等权限；

## 授权流程
<CustomImage src='/growth-record/platform/applet/weapp-01.png' />

授权链接

```javascript
https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URL&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect
```

| 字段	| 是否必填	| 含义 |	说明 |
|:---:|:---:|:---:|:---:|
|APPID	|是	|公众号唯一的APPID| |
|REDIRECT_URL	|是	|回调地址，需要进行urlEncode处理|	授权完后微信将会跳到该地址，如无特殊说明，该回调地址是后台接口，负责接收code，code以?code=123456的参数形式接在回调地址后面|
|STATE|	否	|重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节|	一般可以是前端告诉后台跳转授权前的页面地址，让后台获取code之后重定向到该地址，并且在该地址后带上token数据|
|response_type|	是	|返回类型，此处填写code| |
|scope|	是	|应用授权作用域：snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，即使在未关注的情况下，只要用户授权，也能获取其信息）| |
|#wechat_redirect	|是	|无论直接打开还是做页面302重定向时候，必须带此参数| |

## 开发规范
### 开发注意事项
1. 是否限制链接打开路径来源：
当非微信平台打开链接时，使用微信官方提示：
<CustomImage src='/growth-record/platform/applet/weapp-02.png' />

2. 是否需要占位符提示语控制

### 编码规范
1. 授权方法
```JavaScript
import { getStore, setStore } from '@/utils/util'
const qs = require('qs')

// 应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且，即使在未关注的情况下，只要用户授权，也能获取其信息）
const SCOPES = ['snsapi_base', 'snsapi_userinfo']

/**
 * @param { string } appid 公众号的唯一标识
 * @param { string } redirect_uri 授权后重定向的回调链接地址， 请使用 urlEncode 对链接进行处理
 * @param { string } scope 应用授权作用域，snsapi_base （不弹出授权页面，直接跳转，只能获取用户openid），snsapi_userinfo （弹出授权页面，可通过openid拿到昵称、性别、所在地。并且， 即使在未关注的情况下，只要用户授权，也能获取其信息 ）
 * @param { string } state 非必须 重定向后会带上state参数，开发者可以填写a-zA-Z0-9的参数值，最多128字节
 * @param #wechat_redirect 无论直接打开还是做页面302重定向时候，必须带此参数
 */
class WechatAuthPlugin {
  constructor() {
    this.appid = null
    this.redirect_uri = null
    this._scope = SCOPES[0] // 授权类型，默认使用静默授权
    this._code = null
    this._redirect_uri = null
  }

  // 设置随机state参数
  static makeState() {
    return (
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)
    )
  }

  // 公众号的唯一标识
  setAppId(appid) {
    this.appid = appid
  }

  /**
   * @description 设置授权后重定向的回调链接地址， 使用 urlEncode 对链接进行处理
   * @param { * } redirect_uri 访问的redirect_uri，非必须，不传自动获取当前url
   */
  set redirect_uri(redirect_uri) {
    this._redirect_uri = encodeURIComponent(redirect_uri)
  }

  // 获取redirect_uri
  get redirect_uri() {
    return this._redirect_uri
  }

  /**
   * @description 设置授权状态
   * @param { * } idx 0 - 静默授权，1 - 非静默授权
   */
  set scope(idx) {
    this._scope = SCOPES[idx]
  }

  // 获取scope
  get scope() {
    return this._scope
  }

  // 获取缓存中state,否则返回默认值'STATE'
  get state() {
    return ['null', 'undefined', '', null, undefined].includes(getStore('wechat_auth:state')) ? 'STATE' : getStore('wechat_auth:state')
  }

  // state存储在缓存中
  set state(state) {
    setStore('wechat_auth:state', state)
  }

  // 设置state值
  setState(value) {
    this.state = value || WechatAuthPlugin.makeState()
  }

  /**
   * @description 获取引导关注着打开访问链接
   */
  get authUrl() {
    if (this.appid === null) {
      throw new Error('appid must not be null')
    }
    if (this.redirect_uri === null) {
      throw new Error('redirect uri must not be null')
    }
    return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appid}&redirect_uri=${this.redirect_uri}&response_type=code&scope=${this.scope}&state=${this.state}#wechat_redirect`
  }

  // 用户同意授权，页面将跳转至 redirect_uri/?code=CODE&state=STATE，获取code参数
  returnFromWechat(redirect_uri) {
    const baseWithSearch = redirect_uri.split('#')[0]
    let parsedUrl = ''
    // 本地环境
    if (process.env.NODE_ENV === 'development') {
      parsedUrl = qs.parse(redirect_uri.split('?')[1])
      this.state = null
      this._code = parsedUrl.code
    } else {
      parsedUrl = qs.parse(baseWithSearch.split('?')[1])
      if (parsedUrl.code) {
        this._code = parsedUrl.code
      }
    }
  }

  get code() {
    if (this._code === null) {
      throw new Error('Not get the code from wechat server!')
    }
    const code = this._code
    this._code = null
    return code
  }

  /**
   * 处理url链接
   * @returns {string}
   */
  processUrl() {
    const url = window.location.href
    // 解决多次登录url添加重复的code与state问题
    const urlParams = qs.parse(url.split('?')[1])
    let redirectUrl = url

    if (urlParams.code && urlParams.state) {
      delete urlParams.code
      delete urlParams.state
      const query = qs.stringify(urlParams)
      if (query.length) {
        redirectUrl = `${url.split('?')[0]}?${query}`
      } else {
        redirectUrl = `${url.split('?')[0]}`
      }
    }
    return redirectUrl
  }
}
const wechatAuthPlugin = new WechatAuthPlugin()

export default wechatAuthPlugin
```

2.调用方法：
```JavaScript
import router from '@/router'
import wechatAuth from '@/utils/wechatAuth'
import { getStore, setStore } from '@/utils/util'
import { CONFIG_STORAGE } from '@/utils/configs'
import API from '@/api'

// 设置APPID
const WX_APPID = 'xxx'
wechatAuth.setAppId(WX_APPID)

router.beforeEach(async (to, from, next) => {
  // 授权态 0为未授权 1为授权返回code 2为使用code获取openid成功
  let authStatus = getStore(CONFIG_STORAGE.AuthStatusKey) // 微信授权状态
  authStatus = authStatus === null || undefined ? 0 : authStatus
  switch (Number(authStatus)) {
    case 0:
      // 获取h5页面地址赋值给redirect_uri
      wechatAuth.redirect_uri = wechatAuth.processUrl()
      // 更改授权状态为1
      setStore(CONFIG_STORAGE.AuthStatusKey, 1)
      // 跳转到获取code访问链接
      window.location.href = wechatAuth.authUrl
      break
    case 1: {
      // 获取code值
      wechatAuth.returnFromWechat(window.location.href)
      const code = wechatAuth.code
      // 判断code是否存在
      if (!code) {
        setStore(CONFIG_STORAGE.AuthStatusKey, 0)
      }
      // 使用cod换取eopenId
      API.getWxTokenApi({code})
        .then(res => {
          if (res.code === '0') {
            // 获取openId之后存储，并将状态更改为2
            setStore(CONFIG_STORAGE.openId, res.data)
            setStore(CONFIG_STORAGE.AuthStatusKey, 2)
            // 对路由重定向
            window.location.href = `${window.location.origin}${window.location.pathname}/${window.location.hash}`
          } else {
            setStore(CONFIG_STORAGE.AuthStatusKey, 0)
          }
        })
        .catch(err => {
          console.log(err)
          setStore(CONFIG_STORAGE.AuthStatusKey, 0)
        })
      break
    }
    case 2:
      // 若openId缺失，状态置为0，去首页重新授权
      if (!getStore(CONFIG_STORAGE.openId)) {
        setStore(CONFIG_STORAGE.AuthStatusKey, 0)
        next('/')
      } else {
        next()
      }
      break
    default:
      break
  }
})
```

## 参考资料
- [微信网页开发 /JS-SDK说明文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)
- [npm官方依赖包：wechat-jssdk](https://www.npmjs.com/package/wechat-jssdk)
- [微信网页授权官方文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)
- [花了两小时完成微信公众号授权 - 掘金](https://juejin.cn/post/6990423707214676005)
- [微信公众号开发 —— 微信网页授权小记 - 掘金](https://juejin.cn/post/6844903743507398670)
- [微信公众号服务号H5前端授权方法 - 掘金](https://juejin.cn/post/7011546266924482591)
