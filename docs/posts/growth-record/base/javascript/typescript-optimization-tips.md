---
title: TypeScript 优化技巧
date: 2024-12-07 20:00:00
tags:
 - JavaScript
 - TypeScript
categories:
 - 前端进击
---
# TypeScript 优化技巧
## 基础语法
1. 使用**块级注释**，编辑器在其他地方引用之后也可自动展示注释内容：
<CustomImage src='/growth-record/base/javascript/commonsummary.webp' />

### 枚举

1. 将枚举对象的 value 作为类型对象的 key，再设置单独的类型对象信息，这样做有一个好处是，对象信息类型和枚举对象都能够其他地方复用

<CustomImage src='/growth-record/base/javascript/tsopttrips01.webp' />

第一步优化：
<CustomImage src='/growth-record/base/javascript/tsopttrips02.webp' />

第二步优化：
<CustomImage src='/growth-record/base/javascript/tsopttrips03.webp' />

2. 获取枚举值对应 key 的 value 联合类型：
<CustomImage src='/growth-record/base/javascript/tsopttrips04.webp' />

## 学习资料
- [ts 枚举(enum) 中的类型操作技巧 - 掘金](https://juejin.cn/post/7073738558124589063)
- [GitHub - labs42io/clean-code-typescript: Clean Code concepts adapted for TypeScript](https://github.com/labs42io/clean-code-typescript)
- [GitHub - pipiliang/clean-code-typescript: TypeScript 代码整洁之道](https://github.com/pipiliang/clean-code-typescript)
- [几个一看就会的 TypeScript 小技巧 - 掘金](https://juejin.cn/post/7077536309804859428)
- [TypeScript 中提升幸福感的 10 个高级技巧 - 掘金](https://juejin.cn/post/6919478002925453320#heading-4)
- [TypeScript 内置工具类型](https://www.yuque.com/wangxiaocuo/coding-blog/mklpidm1gf6ef80a?view=doc_embed)
