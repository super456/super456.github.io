---
title: 开发常用命令行
date: 2022-07-07 20:00:00
tag:
 - 工具指南
categories:
 - 前端进击
---
# 开发常用命令行
## 一、Nginx 的常用操作
- 停止 Nginx： `nginx -s stop`
- 重载配置文件：`nginx -s reload`
- 查看文件显示行数：`cat -n xxx.txt`
- 查看文件的前 N 行：`head -n xxx.txt`
- 查看文件的后 N 行：`tail -n xxx.txt`
- 查看指定日志路径下的错误（动态查看日志变化：显示前 500 行）: `tail -500f /root/.pm2/logs/xxx.log`

## 二、后台打印日志

- 连接服务器（Jenkins 该工程下控制台查看部署 IP 地址）

`ssh root@ip`

- 进入日志目录

`cd /目录地址`

- 实时打印操作日志如上面动态查看日志变化

`tail -f 项目文件.log`

## 三、PM2

- 查看 PM2 下的启动应用：`pm2 list`
- 获取更多这个应用信息：`pm2 show <id|name>`
- 运行启动指定文件：`pm2 start app.js`
- 停止某个 ID 应用：`pm2 stop id`
- 重启某个 ID 应用：`pm2 restart id`
- 进行监控：`pm2 monit`

## 四、NPM

- 查看 npm 版本：`npm -v`
- 根据 package 安装所有依赖：`npm install / npm i`
- 查看所有安装包的版本列表：`npm ls`
- 查看某个包的安装版本：`npm ls <page name>`
- 全局安装：`npm i gulp -g`
- 查看全局安装的包：`npm list -g --depth 0`（`--depth 0`：限制输出模块层级）
- 查看全局下安装所有的可用npm工具：`npm list --depth=0 -g`
- 查看全局的包的按照路径：`npm root -g`
- 快速初始化一个 package.json 的文件：`npm init -y`
- 安装/卸载到 devDependencies 下：`npm install/uninstall gulp -D/--save-dev`
- 安装/卸载到 dependencies 下：`npm install/uninstall gulp -S/--save`
- 删除 node_modules：`npm install rimraf -g` `rimraf node_modules`
- 查看包版本：`npm ls nuxt`
- 清除缓存数据： `npm cache clean --force`

## 五、Git 操作

- 在本地创建一个空的数据仓库(就会出现一个 .git 的文件)：`git init`
- 克隆代码,一般都在第一次操作时，将别人的代码克隆下来：`git clone xxx`
- 查看当前 git 的状态：`git status`
- 显示文件的详细信息：`ll`
- 显示文件：`ls`
- 显示文件包括隐藏的文件：`ls -a`
- 递归的强制删除：`rm -rf xxx`
- 查看a.txt文件中内容：`cat a.txt`
- 全局的配置账户信息：`git config --global user.name "xxx"` `git config --global user.email "xxx@qq.com"`
- 当前项目中配置账户信息：`git config  user.name "xxx"` `git config  user.email "xxx@qq.com"`
- 将当前文件下的都添加：`git add .`
- 切换到上一个分支：`git checkout -`
- 清空⼯作区修改的内容： `git checkout .` 清空暂存区和⼯作区内容： `git reset --hard`
- 创建提交版本并填写备注：`git commit -m "此次修改的一些说明"`
- 修改最近一次提交的 commit message：`git commit --amend -m "Updated commit message" 或 git commit --amend // 后面是vim命令 w: 写入 q: 退出`
- 使⽤某个分⽀的 commit 到另外⼀个分⽀： `git cherry-pick [commit hash]` ，多个
commit 包括前⼀个和后⼀个，不包括前⼀个 commit 去掉 `^` ： `git cherry-pick [commit hash]^..[commit hash]`
- git 的忽略文件，也就是上传的时候不用管：
```git
*.txt    //忽略所有的 .txt 文件
/util      //忽略这个 util 目录
/util/*.js      //忽略 util 文件夹下的 .js 文件
/util/**/*.js    //递归的忽略这个文件夹下所有的 .js 文件
```

- 查看日志：`git log` `git log --oneline`
- 分支管理：
```git
git branch      //查看所有的分支
git branch dev  //创建 dev 分支
git checkout dev  //切换到 dev 分支上(在这个分支上修改后再合并)
(以上两步简写：git checkout -b dev)
在这个分支上就可以操作 add  commit 等操作

操作完成后我们就可以与主分支合并
合并分支
首先切换到主分支上
git checkout master
git merge  分支名
git merge --abort // 撤销merge合并

删除分支
git branch -d dev  //删除dev分支
```

- git 切换仓库操作：`git remote set-url origin http://xxx.git`
- 查看仓库远程地址：`git remote -v`
- 暂存区操作：
```git
git add . // 先将更改的内容提交到暂存区
git stash // 将此时更改的内容暂存起来(此时就可以切换到其他分支就行操作了,
等处理完在切回本分支(git checkout 分支名), 还原以前的,继续操作)
git stash apply // 恢复却不删除 stash 的内容
git stash pop  // 恢复并且删除 stash 信息
git stash list // 查看此时的暂存列表
git stash drop  // 删除这个分支上的所有的 stash
```

- 版本回退操作：
```git
git checkout .    //将工作区的代码恢复到上一次 commit 之前
git reset .  //将暂存区的内容恢复到工作区
git reset --hard 提交信息编号之间的区别  //回到指定的版本
git add . //将工作区的内容添加到暂存区
git add . 和 git reset . 是相反的两对
```

- `git fetch` 和 `git push` 的区别：
```git
git fetch 相当于是从远程获取最新到本地，不会自动 merge
git pull：相当于是从远程获取最新版本并 merge 到本地
在实际使用中，git fetch 更安全一些
```

- `git mv` 迁移文件或重命名文件（夹）（[Git Mv | How To Use Git-Mv To Rename And Move Files](https://initialcommit.com/blog/git-mv)）
```git
 // 迁移aaaaManage文件夹下的所有文件到「packages/aaaa-manage/views/」路径下（不包括「aaaaManage」文件夹）
 git mv views/aaaaManage/* packages/aaaa-manage/views/

 // 迁移aaaaManage文件夹下的「index.ts」到「packages/aaaa-manage/views/」路径下
 git mv views/aaaaManage/index.ts packages/aaaa-manage/views/

 // 重命名文件「index.ts」为「config.ts」
 git mv views/aaaaManage/index.ts views/aaaaManage/config.ts

 // 注意该命令没有撤回操作，如果迁移错了，在工作区文件或暂存区文件重置改动即可恢复之前状态
```

- git rm 删除文件或文件夹
```git
// 删除之前修改过并且已经放到暂存区域的话，则必须要用强制删除选项 -f
git rm -f xxx

// 递归删除，即如果后面跟的是一个目录做为参数，则会递归删除整个目录中的所有子目录和文件
git rm -r xxx
```

- git revrt 回滚 commit 记录，⼀般⽤于回滚分⽀ commit ID 记录层级⽐较深的且不影响其他
提交的 commit ID 记录：
```git
 // ⾮ merge 的 commit
 git revert [commit hash]

 // merge 类型的 commit，第⼀个 hash 为编号1，第⼆个 hash 为编号 2，以哪个⽗ hash 为主线则保留哪个，删除另⼀个
 git revert -m [1|2] [commit hash]
 // 如下图，则回滚 bd86846 的提交，且以 ba25a9d master 分⽀为主线保留，回滚掉 1c7036f 所在分⽀提交
 git revert -m 1 bd86846
```
<CustomImage src='/growth-record/other/toolGuide/command-line-01.png' />

- `git rebase -i` ⼀般⽤于合并分⽀ commit 记录⽇志⽐较混乱情况合并为⼀个 commit 记录或
修改 commit 记录操作，⽐如丢弃某个 commit 记录：
```git
// 调整最近提交的 3 次⽇志修改
git rebase -i HEAD~3
```

- 删除项目 Git 所有记录信息：`rm -rf .git`

## 六、SSH 查看 PM2 日志
前提要有权限：
```git
ssh root@ip

启动本地静态文件服务
python -m SimpleHTTPServer

退出服务器连接
exit + 回车键
```

## 七、连接数据库
通过软件 Sequel Pro:
```git
ip:端口号
账号：root
密码
```

## 八、VS Code 快捷键
| **命令** | **说明** |
| --- | --- |
| `cmd+左右方向键` | 行代码左右切换（Win 的快捷键是「Fn + 左右方向键」） |
| `option+左右方向键` | 单词之间左右切换（Win 快捷键是「Ctrl + 左右方向键」） |
| `cmd+shift+\\` | 代码块之间上下移动 |
| `cmd+delete` | 删除光标之前的内容 |
| `cmd+shift+k` | 删除整行内容（win：Ctrl + Shift + K） |
| `option+上下方向键` | 上下移动当前行代码位置（win：Alt + 上下方向键） |
| `option+shif+ 上下方向键` | 将代码向上下复制（win：Alt + Shift +上下方向键） |
| `cmd+/` | 单行注释 |
| `ctrl+左右方向键` | 当前屏幕的视图窗口左右切换 |
| `ctrl+上下方向键` | 缩小屏幕窗口进入视图窗口切换 |
| `cmd+p` | 当前项目工程搜索文件（win：Ctrl + P） |
| `ctrl+g` | 跳转到指定行 |
| `cmd+shift+o` | 在当前文件的各种div元素之间跳转 |
| `cmd+f` | 在当前的文件中搜索，光标在搜索框 |
| `cmd+g` | 在当前的文件中切换匹配搜索项，光标停留在编辑器里（win：f3） |
| 多光标使用： | （1）按住 「Option」键（windows 用户是按住「Alt」键） ，然后在页面中希望中现光标的位置点击鼠标。（2）选中某个文本，然后反复按住快捷键「 Cmd + D 」键（windows 用户是按住「Ctrl + D」键）， 即可将全文中与光标当前所在位置的词相同的词逐一加入选择。 |

[动图演示23个鲜为人知的VSCode快捷键](https://juejin.im/post/5e2024485188254df874102b)

## 九、Mac 终端

- 新建文件夹：`mkdir xxx`
- 新建构建：`touch xxx`
- 切换目录：`cd xxx`
- 查看文件内容：`cat xxx`
- 复制文件或目录：`cp xxx yyy`
- 编辑文件：`vi xxx`
- 访达打开文件：`open xxx`
- 所列当前目录所有文件：`ls`
- 删除文件：`rm xxx`
- 清屏：`clear`
- 查看当前目录：`pwd`
- 退出终端：`exit`

## 十、命令行在线查询网站
[G](https://explainshell.com)[o Into](https://explainshell.com)

<CustomImage src="/growth-record/other/toolGuide/minglingxing.webp" alt="command-line" />
