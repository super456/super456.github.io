---
title: 微信小程序常见功能解决方案
date: 2019-02-24 20:00:00
tag:
 - 微信小程序
categories:
 - 前端进击
---
# 微信小程序常见功能解决方案
### （1）、异常监控

```javascript
onError: function(msg) {
   this.pushErrorToServer({
       content:e,
       category:t,
       sec_category:n,
       level:"error"
   })
},
pushErrorToServer:function(errMsg){
    //异常信息上传到服务器
    wx.request(...)
}
```

### （2）、request 请求并获取新 token 重新请求返回数据

```javascript
/*
   * request()  发送http请求
   * method  get,post,put,delete
   * url     请求链接
   * data    请求数据
   * header  请求header
   * return  Promise
   * example app.request('get', 'login', {}).then()
   */
  request: function(method, api, data = {}) {
    let that = this;
    return new Promise((resolve, reject) => {
      wx.showLoading({
        title: '加载中...',
      })
      wx.request({
        url: url + api,
        data: data,
        method: method,
        success: function(r) {
          wx.hideLoading();
          // 请求资源成功
          if (r.statusCode == 200) {
            // 服务端返回数据状态判断
            if (r.data.status == 200) {
              // 数据获取成功
              resolve(r.data)
            } else if (r.data.status == 401) {
              // 用户token过期
              // 重新生成新的token
              console.error('request-401' + r.data.msg);
              that.againToken().then(ress => {
                console.log('这里是新的token');
                console.log(r.data);
                // resolve(r.data);
                // 重新请求接口
                data.token = wx.getStorageSync('access_token');

                that.request(method, api, data).then(thridRes => {
                  // 返回重新请求的数据
                  resolve(thridRes);
                }, thridRes => {
                  reject(thridRes);
                });
              }, ress => {
                console.log(ress)
              });
            } else if (r.data.status == 402) {
              // 无效的token
              // 重新生成新的token
              console.error('request-402' + r.data.msg);
              that.againToken().then(ress => {
                // resolve(r.data);
                // 重新请求接口
                data.token = wx.getStorageSync('access_token');

                that.request(method, api, data).then(thridRes => {
                  // 返回重新请求的数据
                  resolve(thridRes);
                }, thridRes => {
                  reject(thridRes);
                });
                console.warn('无效token');
              }, ress => {
                console.log(ress)
              });
            } else if (r.data.status == 403) {
              // 找不到用户信息，用户信息可能被删除
              reject(r.data.msg);
            } else if (r.data.status == 300) {
              // 用户操作失败
              reject(r.data.msg);
            } else if (r.data.status == 500) {
              // 缺少参数信息
              reject(r.data.msg);
            } else if (r.data.status == 501) {
              // 非法的userid（openid）
              reject(r.data.msg);
            } else if (r.data.status == 502) {
              // 非法的goodid
              reject(r.data.msg);
            } else {
              // 未知状态码错误
              reject(r.data.msg);
            }
            // 请求资源失败
          } else if (r.statusCode === 404) {
            reject('未找到页面(404)')
            // 请求资源找不到或路径出错
          } else if (r.statusCode === 500) {
            reject('服务器错误(500)')
          } else if (r.statusCode === 422) {
            reject(r.data)
          } else {
            // 请求资源未知错误
            reject('未知错误')
          }
        },
        fail: function(r) {
          wx.hideLoading();
          // 请求接口调用失败
          // 网络请求超时统一拦截
          reject(r.errMsg || '出现错误(http fail)')
          // console.log(r);
          wx.showToast({
            title: r.errMsg,
            icon: 'none',
            duration: 2000
          })
        }
      })
    })
  },
  // 获取新的token
  againToken: function() {
    let getOpenid = wx.getStorageSync('openID');
    return new Promise((resolve, reject) => {
      wx.request({
        url: url + '/api/xxx',
        method: 'POST',
        data: {
          openid: getOpenid
        },
        success: function(res) {
          if (res.data.status == 200) {
            console.log('获取新的token成功:' + res.data.data);
            wx.setStorage({
              key: "access_token",
              data: res.data.data,
              success: function(e) {
                resolve();
              },
              fail: function(e) {
              },
              complete: function() {
                // resolve();
              }
            })
          } else {
            console.error('其他错误！');
            console.error(res);
            reject(res);
          }
        },
        fail: function(res) {
          // 网络请求超时统一拦截
          wx.showToast({
            title: res.errMsg,
            icon: 'none',
            duration: 2000
          })
          reject(res);
        }
      })
    })
  },

```

### （3）、定位授权重复判断

```javascript
const that = this
wx.getLocation({
  type: 'wgs84',
  success(res) {
    // 用户点击了授权
    console.log(res)
    latitude = res.latitude
    longitude = res.longitude

    // 获取我的参观记录
    const data = {
      page: that.data.page,
      size: that.data.size,
      lat: latitude,
      lng: longitude,
      token: wx.getStorageSync('access_token'),
    }
    app.request('POST', '/api/xxx', data).then((res) => {
      console.dir(res)
      that.setData({
        tabInfos: res.data
      })
    }, (res) => {
      console.error(res)
    })
  },
  fail(res) {
    console.log('用户取消的授权信息')
    // 用户点击了取消选择地址信息
    console.log(res)
    // 当用户拒绝授权定位信息时调用
    // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
    wx.getSetting({
      success(res) {
        if (!res.authSetting['scope.userLocation']) {
          // 定位：用户没有授权
          wx.openSetting({
            success(res) {
              console.log(res.authSetting)
              // 用户已经同意小程序使用定位功能，后续调用 操作 接口不会弹窗询问
              wx.getLocation({
                type: 'wgs84',
                success(res) {
                  // 用户点击了授权
                  console.log(res)
                  latitude = res.latitude
                  longitude = res.longitude

                  // 获取我的参观记录
                  const data = {
                    page: that.data.page,
                    size: that.data.size,
                    lat: latitude,
                    lng: longitude,
                    token: wx.getStorageSync('access_token'),
                  }
                  app.request('POST', '/api/xxx', data).then((res) => {
                    console.dir(res)
                    that.setData({
                      tabInfos: res.data
                    })
                  }, (res) => {
                    console.error(res)
                  })
                },
                fail(res) {
                  console.error(res)
                }
              })
            },
            fail(res) {
              console.error(res)
            }
          })
        }
      }
    })
  }
})
```

### （四）、下拉刷新

```javascript
const that = this
console.log('触发底部刷新')
const localPage = that.data.page + 1 // 获取当期的起始获取索引值
wx.showLoading({
  title: '加载中...',
})

const data = {
  size: that.data.size,
  page: localPage,
}
app.request('POST', '/api/xxx', data).then((res) => {
  console.log(res)

  wx.hideLoading()
  // 判断获取后台内容是否为空
  if (res.data == '' && res.data.length == 0) {
    wx.showToast({
      title: '亲~，已经全部加载完了',
      icon: 'none',
      duration: 2000
    })
  }
  else {
    // 设置页码为当前的页码+1
    that.setData({
      page: localPage
    })
    let addNextRes = Array
    const addNext = that.data.commList
    addNextRes = res.data
    for (const item in addNextRes)
      addNext.push(addNextRes[item])

    that.setData({
      commList: addNext
    })
  }
}, (res) => {
  console.log(res)
})
```

### （五）、小程序线上提示更新

```javascript
// 线上版本发布后，迭代：让用户退出更新小程序为最新版本
const updateManager = wx.getUpdateManager()
wx.getUpdateManager().onUpdateReady(() => {
  wx.showModal({
    title: '更新提示',
    content: '新版本已经准备好，是否重启应用？',
    success(res) {
      if (res.confirm) {
        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        updateManager.applyUpdate()
      }
    }
  })
})
```

###  (六)、常用注意事项及小问题
- 上传图片和预览图片后会刷新 `onShow()==在用户是否选择图片后调用、onHide()用户点击删除图片操作事件就调用了` 函数页面；
- `toFixed()` 不能解析字符串，要转换成 `parseInt()`、`parseFloat()`；
- 线上版本（手机调试）跟开发工具调试 token 不统一，经常报 token 无效或 openid 无效 =》取消掉不校验合法域名和清除缓存数据、最好也清除掉使用的小程序记录数据；

### （七）、下载图片授权保存相册重复判断

```javascript
// util.js下载接口：
// 保存二维码图片
function downloadActCodeImg(imgurl) {
  wx.downloadFile({
    url: imgurl,
    success(res) {
      // console.log("下载文件：success");
      // console.log(res);

      // 保存图片到系统相册
      wx.saveImageToPhotosAlbum({
        filePath: res.tempFilePath,
        success(res) {
          // console.log("保存图片：success");
          wx.showToast({
            title: '保存二维码成功',
            duration: 2000
          })
        },
        fail(res) {
          // console.log("保存图片：fail");
          console.log(res)
        }
      })
    },
    fail(res) {
      // console.log("下载文件：fail");
      console.log(res)
    }
  })
}

// 点击判断事件：
if (!wx.saveImageToPhotosAlbum) {
  wx.showModal({
    title: '提示',
    content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
  })
  return
}
// 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.writePhotosAlbum" 这个 scope
wx.getSetting({
  success(res) {
    console.log('getSetting: success')
    if (!res.authSetting['scope.writePhotosAlbum']) {
      console.log('1-没有授权《保存图片》权限')

      // 接口调用询问
      wx.authorize({
        scope: 'scope.writePhotosAlbum',
        success() {
          console.log('2-授权《保存图片》权限成功')
          // 下载二维码图片
          util.downloadActCodeImg('http://xxx.png')
        },
        fail() {
          // 用户拒绝了授权
          console.log('2-授权《保存图片》权限失败')
          // 打开设置页面
          wx.openSetting({
            success(data) {
              console.log('openSetting: success')
            },
            fail(data) {
              console.log('openSetting: fail')
            }
          })
        }
      })
    }
    else {
      console.log('1-已经授权《保存图片》权限')
      // 下载二维码图片
      util.downloadActCodeImg('http://xxx.png')
    }
  },
  fail(res) {
    console.log('getSetting: success')
    console.log(res)
  }
})
```

### （八）、小程序坑：

1.  安卓手机不支持 `console.dir()` 方法，会报错停止执行代码 ===》小程序使用 `console.dir()`;导致安卓程序停止，苹果无影响！，尽量不要使用`console.dir()`;

### （九）、动态设置标题：

```javascript
wx.setNavigationBarTitle({
  title: that.data.mername// 页面标题为路由参数
})
```

### (十)、获取当前小程序路由

```javascript
// 使用getCurrentPages可以获取当前加载中所有的页面对象的一个数组，数组最后一个就是当前页面。

const pages = getCurrentPages() // 获取加载的页面

const currentPage = pages[pages.length - 1] // 获取当前页面的对象

const url = currentPage.route // 当前页面url
```

### （十一）、设置 textarea 换行并存储数据库

```javascript
// &hc表示换行  用于输出时候的转换（存入数据库的时候转换）
var str = that.data.content.split('\n').join('&hc')

// 替换拿到的数据（获取到的数据库数据将数据替换回来）
var str = res.data.content.split('&hc').join('\n')
```

### （十二）、获取指定类别选择器的容器属性（针对不同手机）

```javascript
const that = this
const qSearch = wx.createSelectorQuery()
qSearch.select('.swiper-tab').boundingClientRect()
qSearch.exec((res) => {
  console.log(`输出swiper-tab的高度${res[0].height}`)
  that.setData({
    useHeith: (Number.parseInt(that.data.useHeith) + Number.parseInt(res[0].height))
  })
  // timeAndTipsFixed高度
  const qKillOrder = wx.createSelectorQuery()
  qKillOrder.select('.timeAndTipsFixed').boundingClientRect()
  const result = qKillOrder.exec((resk) => {
    console.log(`输出timeAndTipsFixed的高度${resk[0].height}`)
    that.setData({
      useHeith: (Number.parseInt(that.data.useHeith) + Number.parseInt(resk[0].height))
    })
    // bannerType-view高度
    wx.getSystemInfo({
      success(resPhone) {
        // console.log('输出手机屏幕的值：')
        // console.dir(resPhone);
        console.warn(`前两个节点高度和：${that.data.useHeith}`)
        that.setData({
          canUseWidth: resPhone.windowWidth,
          canUseHeith: resPhone.windowHeight,
          scrollViewHeith: (Number.parseInt(resPhone.windowHeight) - Number.parseInt(that.data.useHeith))
        })
        console.error(`屏幕高度${that.data.scrollViewHeith}`)
      },
    })
  })
}) // 这一串都是为了设置scrollview高度
```

### (十三) 多图上传格式

```javascript
  // 图片上传
  uploadImgs: function (api, imgARR, keyName) {
    return new Promise((resolve, reject) => {
      let userImgARR = []; //定义一个数组来保存用户上传图片后返回的图片网络地址
      for (let i = 0; i < imgARR.length; i++) {
        wx.uploadFile({
          url: url + api,
          filePath: imgARR[i].path,
          name: keyName,
          formData: {
            token: wx.getStorageSync('access_token')
          },
          success: function (res) {
            let jsonARR = JSON.parse(res.data);
            userImgARR.push(jsonARR.data.src);
            if (i == imgARR.length - 1) {
              resolve(userImgARR); //返回上传后的图片数组
            }
          },
          fail: function (res) {
            // 网络请求超时统一拦截
            wx.showToast({
              title: res.errMsg,
              icon: 'none',
              duration: 2000
            })
          }
        })
      }
    })
  },
```

### （十五）、设置上一页的 setData 值

```javascript
const pages = getCurrentPages() // 获取加载的页面( 页面栈 )
const currentPage = pages[pages.length - 1] // 获取当前页面
const prevPage = pages[pages.length - 2] // 获取上一个页面
// 设置上一个页面的数据（可以修改，也可以新增）
prevPage.setData({
  back: true
})
// 返回上一个页面（这个API不允许跟参数）
wx.navgateBack({
  delta: 1 // 表示返回到上一个页面（如果值为2表示回退到上上一个页面）
})
```

### （十六）、获取当前页面的路径

console.log(`获取当前页面的路径：${this.route}`);

### (十七)、setData注意
- `setData` 函数用于将数据从逻辑层发送到视图层（异步），同时改变对应的 `this.data` 的值（同步）。

- 其中 `key` 可以以数据路径的形式给出，支持改变数组中的某一项或对象的某个属性，如 `array[2].message，a.b.c.d，`并且不需要在 `this.data` 中预先定义。

```javascript
this.setData({
  data: 'hello wrold'
}, () => {
  // setData引起的界面更新渲染完毕后的回调函数
})
```

### (十八)、小程序模块化
- 第一种写法
```javascript
// common.js
function sayHello(name) {
  console.log(`Hello ${name} !`)
}
function sayGoodbye(name) {
  console.log(`Goodbye ${name} !`)
}

module.exports.sayHello = sayHello
exports.sayGoodbye = sayGoodbye
```

- 第二种写法
```javascript
module.exports = {
  WxApiRoot: '123',
}
```

- 调用
```javascript
const common = require('common.js')// 只能是相对路径
Page({
  helloMINA() {
    common.sayHello('MINA')
  },
  goodbyeMINA() {
    common.sayGoodbye('MINA')
  }
})
```

### (二十)、checkbox 或 radio
`<checkbox checked="{{false}}"></checkbox>`
特别注意：不要直接写 checked="false"，其计算结果是一个字符串，转成 boolean 类型后代表真值。

### (二十一)、使用模板 template
可以同页面不同地方使用，也可以跨页面使用

- 定义一个模板页面
```html
<template name='template_demo'>
  <view>
    <text>{{index}}: {{msg}}</text>
    <text>Time: {{time}}</text>
  </view>
</template>
```

- 别个页面引用
```html
<import src="../templates/template.wxml"/>

<template is="template_demo" data="{{...item}}"></template>

```

### (二十二)、使用动画
```javascript
animation="{{updatePanelAnimationData}}"
```

```javascript
/**
 * 显示事项数据添加更新面板
 */
function showUpdatePanel() {
  const animation = wx.createAnimation({
    duration: 600
  })
  animation.translateY('-100%').step()
  this.setData({
    updatePanelAnimationData: animation.export()
  })
}
```
