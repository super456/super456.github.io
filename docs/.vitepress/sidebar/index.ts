import qianduanjinji from './qianduanjinji'
import zhaohuaxishi from './zhaohuaxishi'
import yehangxifei from './yehangxifei'

export default {
  '/posts/growth-record/': { text: '前端进击', items: qianduanjinji() },
  '/posts/read-book/': { text: '朝花夕拾', items: zhaohuaxishi() },
  '/posts/random-thought/': { text: '夜航西飞', items: yehangxifei() },
}
