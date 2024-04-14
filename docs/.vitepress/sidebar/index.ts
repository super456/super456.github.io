import qianduanjinji from './qianduanjinji'
import zhaohuaxishi from './zhaohuaxishi'
import yehangxifei from './yehangxifei'

export default {
  '/posts/growth-record/': { base: '/posts/growth-record/base/html/', items: qianduanjinji() },
  '/posts/read-book/': { base: '/posts/read-book/', items: zhaohuaxishi() },
  '/posts/random-thought/': { base: '/posts/random-thought/', items: yehangxifei() },
}
