---
title: React 学习笔记
date: 2024-04-18 20:00:00
tag:
 - React
categories:
 - 前端进击
---
# React 学习笔记
以中文和英文官方文档学习为主：
- [React 官方中文文档](https://react.docschina.org/)
- [React](https://react.dev/)
- [React 官方中文文档](https://zh-hans.react.dev/)

## 笔记📒
<CustomImage src='/growth-record/frame/react/react-study-01.png' />

## 知识点
#### 组件

1. 使用一个插槽组件，负责渲染包裹层写法：注意导出的写法，先声明组件函数再默认导出这个函数名
```javascript
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const AsideContainer = ({ children }: Props) => {
  return (
    <aside className="w-[260px] h-fit hidden lg:block ml-5 flex-none">
      {children}
    </aside>
  );
};

export default AsideContainer;

```

2. 组件内部拆分小组件，然后统一导出写法：
```javascript
'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from '@/styles/globals.module.scss';

const ToolbarItem = ({ alt = '', iconPath = '' }) => {
  const [src, setSrc] = useState(iconPath);

  return (
    src && (
      <div
        onMouseEnter={() => setSrc(iconPath + '-active')}
        onMouseLeave={() => setSrc(iconPath)}
        className="w-9 h-9 bg-white rounded-full flex justify-center items-center mb-4 cursor-pointer"
      >
        <Image alt={alt} src={src + '.svg'} width={20} height={20} />
      </div>
    )
  );
};

const CommonToolbar = () => {
  return (
    <div className={`${styles.commonToolbar} w-9 mr-6 hidden flex-col pt-16`}>
      <ToolbarItem alt="评论" iconPath="/icons/comment" />
      <ToolbarItem alt="微信" iconPath="/icons/wechat" />
      <ToolbarItem alt="微博" iconPath="/icons/weibo" />
      <ToolbarItem alt="沉浸阅读" iconPath="/icons/read" />
    </div>
  );
};

export default CommonToolbar;

```

#### CSS 处理

3. 组件文件使用模块化 CSS 处理，避免全局污染：使用 CSS in JS 也是可以的，用法类似
```javascript
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons'
import mediaVideo from '@assets/video/wkylin.skyline.mp4'
// 引入 CSS 模块化文件
import styles from './index.module.less'

const LandingPage = () => {
  const navigate = useNavigate()
  return (
    <>
      <section className={styles.landing}>
        <video autoPlay loop muted src={mediaVideo} />
        <section className={styles.overlay} />
        <Button
          className={styles.rollback}
          icon={<ArrowLeftOutlined style={{ fontSize: 18 }} />}
          type="text"
          size="large"
          onClick={() => navigate('/')}
        >
          Roll Back
        </Button>
      </section>
    </>
  )
}

export default LandingPage

```
<CustomImage src='/growth-record/frame/react/react-study-02.webp' />

#### useReducer

4. reducer 使用案例：
```javascript
/* eslint-disable prettier/prettier */
import { useReducer, useEffect } from 'react'

const initialState = {
  loading: false,
  data: null,
  error: null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...initialState, loading: true }
    case 'success':
      return { ...initialState, data: action.data }
    case 'error':
      return { ...initialState, error: action.error }
    default:
      throw new Error()
  }
}

const useApiCallOnMount = (service) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  useEffect(() => {
    dispatch({ type: 'loading' })
    service().then((data) => {
      dispatch({ type: 'success', data })
    }).catch((error) => {
      dispatch({ type: 'success', error })
    })
  }, [service])

  return [state.loading, state.data, state.error]
}

export default useApiCallOnMount

```

#### useContext
简单一点：
```javascript
import React from 'react'

export const ErrorBoundaryContext = React.createContext(() => {})

export const useErrorHandling = () => React.useContext(ErrorBoundaryContext)

```
```javascript
/* eslint-disable prettier/prettier */
import React, { createContext, useContext, useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import Home from '@src/pages/home'

const defaultValue = {
  activeKey: '',
  setActiveKey: () => {},
  panes: [],
  setPanes: () => {},
  removeTab: () => {},
}
const initialPanes = [
  {
    title: '首页',
    i18nKey: 'home',
    key: '/',
    content: <Home />,
    closable: false,
    path: '/',
  },
]
// TabViews 添加与删除； 使用 createContext 创建上下文
const ProTabContext = createContext(defaultValue)
const useProTabContext = () => {
  const context = useContext(ProTabContext)
  if (context === undefined) {
    throw new Error('useValue must be used within a ValueProvider')
  }
  return context
}

const ProTabProvider = ({ children }) => {
  const [activeKey, setActiveKey] = useState('')
  const [panes, setPanes] = useState(initialPanes)
  const navigate = useNavigate()

  const removeTab = useCallback((targetKey, callbackFun = () => {}) => {
      const delIndex = panes.findIndex((item) => item.key === targetKey)
      const filterPanes = panes.filter((pane) => pane.key !== targetKey)
      // 删除非当前/当前tab
      if (targetKey !== activeKey) {
        setPanes(filterPanes)
      } else {
        const nextPath = filterPanes[delIndex - 1].key
        navigate(nextPath)
        setActiveKey(nextPath)
        setPanes(filterPanes)
      }
      callbackFun()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeKey, panes]
  )

  const providerValue = useMemo(() => ({
      activeKey,
      setActiveKey,
      panes,
      setPanes,
      removeTab,
    }),
    [activeKey, setActiveKey, panes, setPanes, removeTab]
  )

  return <ProTabContext.Provider value={providerValue}>{children}</ProTabContext.Provider>
}

export { ProTabProvider, useProTabContext }
```

#### 自定义 Hooks

1. 防抖
```javascript
/* eslint-disable prettier/prettier */
import { useRef, useEffect, useCallback } from 'react'

// 防抖
// 每次触发定时器后，取消上一个定时器，然后重新触发定时器。
// 防抖一般用于用户未知行为的优化，比如搜索框输入弹窗提示，
// 因为用户接下来要输入的内容都是未知的，所以每次用户输入就弹窗是没有意义的，需要等到用户输入完毕后再进行弹窗提示。
const useDebounce = (fn, delay) => {
  const timerRef = useRef(null)
  const fnRef = useRef(fn)

  fnRef.current = fn

  useEffect(() => () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
  },[])

  const fnDebounced = useCallback(
    (...args) => {
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
      timerRef.current = setTimeout(() => {
        const that = this
        fnRef.current.apply(that, args)
      }, delay)
    },
    [delay]
  )

  return fnDebounced
}

export default useDebounce

```

2. 上传图片：
```javascript
import { useRef, useState, useEffect, useCallback } from 'react'

// ? 上传图片组件
const useUploadImage = () => {
  const [uploadProgress, setUploadProgress] = useState(0) // 设置上传进度
  const uploadRef = useRef<XMLHttpRequest | null>(null)

  useEffect(
    () => () => {
      if (uploadRef.current) {
        uploadRef.current.abort()
      }
    },
    []
  )

  const uploadImage = useCallback(
    async ({
      file,
      uploadURL,
      onUploadComplete,
      onUploadError,
    }: {
      file: File
      uploadURL: string
      // eslint-disable-next-line no-unused-vars
      onUploadComplete: (response: any) => void
      // eslint-disable-next-line no-unused-vars
      onUploadError?: (error: any) => void
    }) => {
      const formData = new FormData()
      formData.append('file', file)

      uploadRef.current = new XMLHttpRequest()
      uploadRef.current.open('PUT', uploadURL)
      uploadRef.current.upload.addEventListener('progress', ({ loaded, total }) => {
        setUploadProgress((loaded * 100) / total)
      })
      uploadRef.current.send(formData)

      uploadRef.current.onload = async () => {
        const response = uploadRef.current?.response
        if (response) {
          const jsonResponse = JSON.parse(response)
          uploadRef.current = null
          onUploadComplete(jsonResponse.data || jsonResponse)
        }
      }
      uploadRef.current.onerror = async () => {
        const error = uploadRef.current?.response
        if (onUploadError) {
          onUploadError(error)
        }
      }
    },
    []
  )

  return {
    uploadImage,
    uploadProgress,
  }
}

export default useUploadImage

```

3. 定时器：
```javascript
import { useEffect, useRef } from 'react'

const useInterval = (callback, delay) => {
  const savedCallback = useRef()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null && typeof delay === 'number') {
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export default useInterval

```

4. 判断组件是否挂载：
```javascript
import { useEffect, useRef } from 'react'

const useIsMount = () => {
  const isMountRef = useRef(true)
  useEffect(() => {
    isMountRef.current = false
  }, [])
  return isMountRef.current
}

export default useIsMount

```

5. 本地存储：
```javascript
import { useState, useEffect } from 'react'

function getStorageValue(key, defaultValue) {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem(key)
    return saved !== null ? JSON.parse(saved) : defaultValue
  }
}

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => getStorageValue(key, defaultValue))

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
export default useLocalStorage

```

6. 监听鼠标位置移动：
```javascript
import { useState, useEffect } from 'react'

export default function useMousePosition() {
  const [x, setX] = useState<number>(0)
  const [y, setY] = useState<number>(0)

  useEffect(() => {
    const updateMouse = () => {
      window.addEventListener('mousemove', (e) => {
        setX(e.clientX)
        setY(e.clientY)
      })
    }

    window.addEventListener('mousemove', updateMouse)

    return () => {
      window.removeEventListener('mousemove', updateMouse)
    }
  }, [])

  return { x, y }
}

```

7. 使用存储：
```javascript
import { useRef, useEffect } from 'react'

const usePreviousValue = (value) => {
  const ref = useRef()
  useEffect(() => (ref.current = value))
  return ref.current
}

export default usePreviousValue

```

8. 创建脚本：
```javascript
import { useEffect } from 'react'

const useScript = (url, integrity, async = true, crossOrigin = 'anonymous') => {
  useEffect(() => {
    const script = document.createElement('script')

    script.src = url

    script.async = async

    if (integrity) {
      script.integrity = integrity
    }

    script.crossOrigin = crossOrigin

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [url, integrity, async, crossOrigin])
}

export default useScript

```

9. 节流：
```javascript
const useThrottle = (func, delay = 1000) => {
  let prev = 0
  return (...args) => {
    const now = new Date().getTime()
    if (now - prev > delay) {
      prev = now
      return func(...args)
    }
  }
}

export default useThrottle
```

10. 获取浏览器高度：
```javascript
import { useState, useEffect } from 'react'

export default function useViewport() {
  const [width, setWidth] = useState<number>(window.innerWidth)
  const [height, setHeight] = useState<number>(window.innerHeight)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return { width, height }
}

```

11. WebSocket：
```javascript
import { useState, useRef, useEffect } from 'react'

const useWebsocket = ({ url, verify }) => {
  const ws = useRef(null)
  const [wsData, setMessage] = useState('')
  const [readyState, setReadyState] = useState({ key: 0, value: '正在链接中' })

  const creatWebSocket = () => {
    const stateArr = [
      { key: 0, value: '正在链接中' },
      { key: 1, value: '已经链接并且可以通讯' },
      { key: 2, value: '连接正在关闭' },
      { key: 3, value: '连接已关闭或者没有链接成功' },
    ]
    try {
      ws.current = new WebSocket(url)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ws.current.onopen = () => setReadyState(stateArr[ws.current?.readyState ?? 0])
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ws.current.onclose = () => {
        setReadyState(stateArr[ws.current?.readyState ?? 0])
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ws.current.onerror = () => {
        setReadyState(stateArr[ws.current?.readyState ?? 0])
      }

      ws.current.onmessage = (e) => {
        setMessage(e.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const webSocketInit = () => {
    if (!ws.current || ws.current.readyState === 3) {
      creatWebSocket()
    }
  }

  //  关闭 WebSocket
  const closeWebSocket = () => {
    ws.current?.close()
  }

  const reconnect = () => {
    try {
      closeWebSocket()
      ws.current = null
      creatWebSocket()
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (verify) webSocketInit()
    return () => {
      ws.current?.close()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ws, verify])

  return {
    wsData,
    readyState,
    closeWebSocket,
    reconnect,
  }
}
export default useWebsocket

```

## 疑问❓
