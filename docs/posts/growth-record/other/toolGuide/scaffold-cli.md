---
title: 脚手架及 CLI 工具使用
date: 2022-05-02 20:00:00
tag:
 - 工具指南
categories:
 - 前端进击
---
# 脚手架及 CLI 工具使用
## 一、概念简介
> 脚手架是为了保证各施工过程顺利进行而搭设的工作平台。——百度百科

Vue CLI 官方解释：
> Vue CLI 是一个基于 Vue.js 进行快速开发的完整系统。Vue CLI 致力于将 Vue 生态中的工具基础标准化。它确保了各种构建工具能够基于智能的默认配置即可平稳衔接，这样你可以专注在撰写应用上，而不必花好几天去纠结配置的问题。与此同时，它也为每个工具提供了调整配置的灵活性，无需 eject。

简单来说，脚手架就是为了减少重复性工作而做的工具。
## 二、CLI 基本组成
基本会用到的一些插件：

| **序号** | **插件名** | **作用** |
| --- | --- | --- |
| 1 | commander | 解析参数 |
| 2 | inquirer | 交互式命令作用 |
| 3 | download-git-report | 在官网上下载模板 |
| 4 | chalk | 在命令行增加色彩 |
| 5 | metalsmith | 读取文件，实现模板渲染 |
| 6 | consoledate | 统一的模板引擎（比如：对 ejs 的解析） |

## 三、CLI 工具使用
命令行界面，Command-Line Interface 的缩写。

#### 3.1 第三方搭建工具
原生自行搭建脚手架必备工具：
[tj/commander.js](https://github.com/tj/commander.js#readme)

集成搭建脚手架工具，开箱即用：
[The web’s scaffolding tool for modern webapps | Yeoman](https://yeoman.io/)

#### 3.2 Yeoman 搭建 CLI
搭建一个简单的脚手架工具。

1. 安装包工具：`npm install -g generator-generator yo` （安装 generator-generator 包文件及 yo 命令行工具）；

2. 初始化项目：`yo generator` 根据需要配置相关信息或者默认就行，注意创建的 generator name 前缀必须要 `generator-` 使用这个模板的时候不需要输入这个前缀，如 generator-template；

3. 生成重要的文件目录：

<CustomImage src='/growth-record/other/toolGuide/jiaoshoujia01.webp' />

4. 将需要 CLI 生成的默认文件放入 `_generators/app/templates_` 文件夹下：

<CustomImage src='/growth-record/other/toolGuide/jiaoshoujia02.webp' />

5. 本地全局使用这个模板操作：`npm link` ，相当于将全局的 node_modules 做了个映射到了这项目模板这里，注意需要在这个模板文件夹根目录执行：

<CustomImage src='/growth-record/other/toolGuide/jiaoshoujia03.webp' />

6. 测试使用自己生成的模板，离开这个模板目录文件，随便进入另一个目录，输入：`yo template` （之前我创建的 generator name 填写的是：generator-template）：

<CustomImage src='/growth-record/other/toolGuide/jiaoshoujia04.webp' />

7. 发布到远程 npm 上：

#### 3.3 使用原生搭建 CLI

1. 新建一个文件夹目录，并创建一个项目，初始化项目：`npm init -y` ；

2. 在根目录新建一个bin目录，然后在该目录下新建一个 `www.js` 文件，在 `package.json` 中，新建个对象 `bin` ，对象值写个脚手架名字并指向 `bin` 目录下的 `www.js` 文件：

<CustomImage src='/growth-record/other/toolGuide/jiaoshoujia05.webp' />

3. 在根目录执行：`npm link` ：

<CustomImage src='/growth-record/other/toolGuide/jiaoshoujia06.webp' />

4. 在 `www.js` 文件输入以下内容，再使用第二步定义的脚手架名字控制台输入：

<CustomImage src='/growth-record/other/toolGuide/jiaoshoujia07.webp' />

这行代码 `#!/usr/bin/env node` 指定这个脚本的解释程序是 node 环境，不懂可以查看这篇文章 [#!/usr/bin/env node 到底是什么](https://blog.csdn.net/liangtaox8/article/details/100039274)

1. 利用 commander 来解析用户的参数：

（1）安装 commander 插件：`npm i commander` ;

（2）查看用户选择传递过来的参数：

- 对 `bin/www.js` 文件添加以下代码：`require('../src/main')` ;

- 根目录新建一个 src 文件夹，该文件夹下新建 `main.js`  和 `constants.js` 文件，并添加指定代码：
```javascript
// constants.js
const { version } = require('../package.json');

module.exports = {
    version
}

// main.js
const program = require('commander')
console.log(process.argv)
const { version } = require('./constants.js')
program.version(version).parse(process.argv)
```
上述代码做了以下事情：从 `package.json` 里拿到当前版本号，解析用户传递的参数。

- 运行脚手架名字会看到执行结果：

<CustomImage src='/growth-record/other/toolGuide/jiaoshoujia08.png' />

1. 创建一个 create 的命令，在 main.js 文件下修改为以下代码：
```javascript
// main.js
const program = require('commander')

const { version } = require('./constants.js')

program.command('create').alias('c').description('create a project').action(() => {
  console.log('done')
})

// 解析用户传递的参数
program.version(version).parse(process.argv)
```
上述代码执行的是：通过命令 command 创建了一个 create 的命令，别名 c ，操作的内容时打印 done，当我们运行脚手架名字加 create 时会输出以下内容：
<CustomImage src='/growth-record/other/toolGuide/jiaoshoujia09.webp' />

通常情况下，需要的命令一定不止 create 一个，这样的话，就需要对命令进行封装了，在 `main.js` 文件添加一下代码：
```javascript
// 定义映射对象
const mapActions = {
  create: {
    alias: 'c',
    description: 'create a project',
    examples: [
      'super456-cli create <project-name>'
    ]
  },
  config: {
    alias: 'c',
    description: 'config project variable',
    examples: [
      'super456-cli config set <k> <v>',
      'super456-cli config get <k>',
    ]
  },
  '*': {
    alias: 'c',
    description: 'command not found',
    examples: []
  }
}

// 循环映射对象
Reflect.ownKeys(mapActions).forEach(action => {
  program
    .command(action)
    .alias(mapActions[action].alias)
    .description(mapActions[action].description)
    .action(() => {
      // console.log('done')
      if (action === '*') {
        console.log(mapActions[action].description)
      } else {
        console.log(action)
      }
    })
})
```

1. 为了代码的层次化结构更加清晰，action 里面的所有操作， 需要拆分到独立的 JS 文件中，使每个函数文件独立完成自己需要完成的事情。

新建 `src/create.js` 文件，文件内容如下：
```javascript
module.exports = (projectName) => {
    console.log('create', projectName)
}
```
修改 `src/main.js` 为以下内容：
```javascript
// main.js
const program = require('commander')
const path = require('path')
const { version } = require('./constants.js')

// 定义映射对象
const mapActions = {
  create: {
    alias: 'c',
    description: 'create a project',
    examples: [
      'super456-cli create <project-name>'
    ]
  },
  config: {
    alias: 'c',
    description: 'config project variable',
    examples: [
      'super456-cli config set <k> <v>',
      'super456-cli config get <k>',
    ]
  },
  '*': {
    alias: 'c',
    description: 'command not found',
    examples: []
  }
}

// 循环映射对象
Reflect.ownKeys(mapActions).forEach(action => {
  program.command(action).alias(mapActions[action].alias).description(mapActions[action].description).action(() => {
    if (action === '*') {
      console.log(mapActions[action].description)
    } else {
      console.log('process.argv', process.argv)
      require(path.resolve(__dirname, action))(...process.argv.slice(3))
    }
  })
})

// 解析用户传递的参数
program.version(version).parse(process.argv)
```
此时执行 `super456-cli create projectName` 控制台打印的结果：
<CustomImage src='/growth-record/other/toolGuide/jiaoshoujia10.webp' />

8. 监听 help 事件，在 main.js 文件中的循环映射对象之后，解析用户传递的参数之前，添加以下内容：
```javascript
// 监听用户的help事件
program.on('--help', () => {
  Reflect.ownKeys(mapActions).forEach(action => {
    mapActions[action].examples.forEach(example => {
      console.log('  ' + example)
    })
  })
})
```
输入脚手架名字加帮助指令：`super456-cli --help`，控制台输出如下：
<CustomImage src='/growth-record/other/toolGuide/jiaoshoujia11.webp' />

1. 从 GitHub 上拉取自己的仓库代码，完善 `src/create.js` 文件代码如下：
```javascript
const axios = require('axios')

// 获取项目列表
const fetchRepoList = async () => {
  const {
    data
  } = await axios.get('https://api.github.com/users/super456/repos')
  return data
}

module.exports = async (projectName) => {
  // console.log('create', projectName)
  let repos = await fetchRepoList()
  repos = repos.map((item) => item.name)
  console.log(repos)
}
```
控制台输入创建项目命令如下：
<CustomImage src='/growth-record/other/toolGuide/jiaoshoujia12.webp' />

10. 需要用到 ora 和 Inquirer 插件，ora 的作用是 Loading 效果（安装：`npm i ora`），Inquirer 的作用是和用户进行交互式命令（安装：`npm i inquirer`），在 `src/create.js` 文件添加以下代码：
```javascript
const axios = require('axios')
const ora = require('ora')
const Inquirer = require('inquirer')

// 获取项目列表
const fetchRepoList = async () => {
  const {
    data
  } = await axios.get('https://api.github.com/users/super456/repos')
  return data
}

module.exports = async (projectName) => {
  // console.log('create', projectName)
  let repos = await fetchRepoList()
  repos = repos.map((item) => item.name)
  console.log(repos)
}

// 封装loading效果
const waitFnloading = (fn, message) => async (...args) => {
  const spinner = ora(message)
  spinner.start()
  const result = await fn(...args)
  spinner.succeed()
  return result
}

//根据github接口，获取项目的tag信息
const fetchTagList = async () => {
  const {
    data
  } = await axios.get('https://api.github.com/repos/super456/vue-cli2.x-demo/tags')
  return data;
}

// 使用Inquirer实现交互式命令
module.exports = async (projectName) => {
  let repos = await waitFnloading(fetchRepoList, 'fetching template')()

  repos = repos.map((item) => item.name)

  const {
    repo
  } = await Inquirer.prompt({
    name: 'repo',
    type: 'list',
    message: 'please choise a template to create project',
    choices: repos
  })

  let tags = await waitFnloading(fetchTagList, 'fetching tags')(repo)
  const {
    tag
  } = await Inquirer.prompt({
    name: 'tag',
    type: 'list',
    message: 'please choise a tag',
    choices: tags
  })
  tags = tags.map(item => item.name)
  console.log('tags', tags)
}
```
在控制台输入命令创建项目效果（GIF）：
<CustomImage src='/growth-record/other/toolGuide/jiaoshoujia.gif' />

1.  使用 download-git-repo 下载，作用是使用这个插件，下载仓库文件，并保存到本地的临时文件夹内：

（1）修改 `src/constants.js` 文件内容：
```javascript
// 选择下载模板的目录
const downloadDirectory = `${process.env[process.platform === 'darwin' ? 'HOME' : 'USERPROFILE']}/.template`

module.exports = {
    downloadDirectory
}
```
（2）修改 `src/create.js` 文件内容：
```javascript
const axios = require('axios')
const ora = require('ora')
const Inquirer = require('inquirer')
const { promisify } = require('util')
let downloadGitRepo = require('download-git-repo')

// 使用download-git-repo插件下载仓库的文件，并保存到本地的临时文件夹内。
downloadGitRepo = promisify(downloadGitRepo)
const { downloadDirectory } = require('./constants')

// 把下载好的文件复制到当前文件夹
const path = require('path')
let ncp = require('ncp')
ncp = promisify(ncp)

// 获取GitHub自己的公开项目列表
const fetchRepoList = async () => {
  const {
    data
  } = await axios.get('https://api.github.com/users/super456/repos')
  return data
}

// 封装loading效果
const waitFnloading = (fn, message) => async (...args) => {
  const spinner = ora(message)
  spinner.start()
  const result = await fn(...args)
  spinner.succeed()
  return result
}

//根据github接口，获取项目的tag信息
const fetchTagList = async () => {
  const {
    data
  } = await axios.get('https://api.github.com/repos/super456/vue-cli2.x-demo/tags')
  return data
}

// 封装拉取项目的代码
const download = async (repo, tag) => {
  let api = `super456/${repo}`
  if (tag) {
    api += `#${tag}`
  }
  const dest = `${downloadDirectory}/${repo}` // 当前文件到本地电脑的目录：/Users/edz/.template/vue-cli2.x-demo（最后一个字段是仓库名，也可以自行定义）
  await downloadGitRepo(api, dest)
  return dest
}

// 使用Inquirer实现交互式命令
module.exports = async (projectName) => {
  let repos = await waitFnloading(fetchRepoList, 'fetching template...')()
  repos = repos.map((item) => item.name)

  const {
    repo
  } = await Inquirer.prompt({
    name: 'repo',
    type: 'list',
    message: 'please choise a template to create project',
    choices: repos
  })

  let tags = await waitFnloading(fetchTagList, 'fetching tags...')(repo)
  const {
    tag
  } = await Inquirer.prompt({
    name: 'tag',
    type: 'list',
    message: 'please choise a tag',
    choices: tags
  })

  const resultFile = await waitFnloading(download, 'downloading...')(repo, tag)
  ncp(resultFile, path.resolve(projectName))
  console.log('created project successfully~')
}
```
在控制台输入创建项目后效果（因为网络问题，这里只展示结果）：

这个是下载在仓库文件保存到本地的临时文件夹内的路径及内容情况：
<CustomImage src='/growth-record/other/toolGuide/jiaoshoujia13.webp' />

这个只是简单的实现了模板的下载，复杂的 CLI 工具还需要处理文件是否存在，ejs 等的模板引擎解析等，等下的就是发布到 npm 上给用户使用了。

#### 3.4 starship
[https://starship.rs/](https://starship.rs/)

#### 3.5 prompts
[https://github.com/terkelg/prompts](https://github.com/terkelg/prompts)
