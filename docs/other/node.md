## Node

### Node版本过高，无法启动项目

Node.js在17版本中发布了OpenSSL3.0, 而OpenSSL3.0对允许算法和密钥大小增加了严格的限制，可能会对生态系统造成一些影响。导致node17版本以前的项目可能跑不起来。

解决方法有两种：

1. 使用`nvm`来管理`npm版本`
1. 修改项目中的`package.json`

#### NVM

1. 卸载已安装的`Node.js`，否则会发生冲突
1. 下载[nvm-windows](https://github.com/coreybutler/nvm-windows/releases)最新安装包，直接安装
1. 安装多版本`node`

如果要安装`4.2.2`版本：
```
nvm install 4.2.2
```

如果要安装`4.2`系列中最新的版本：
```
nvm install 4.2
```

通过以下命令来列出远程服务器上所有的可用版本：
```
nvm ls available
```
4. 在不同版本间切换

切换到`4.2.2`版本：
```
nvm use 4.2.2
```

切换到`4.2.x`版本：
```
nvm use 4.2
```

切换到最新版本：
```
nvm use node
```

给不同的版本号设置别名：
```
nvm alias awesome-version 4.2.2
```

运行：
```
nvm use awesome-version
```

取消别名：
```
nvm unalias awesome-version
```

设为默认运行的版本:
```
nvm alias default node
```

5. 列出已安装版本
```
nvm ls
```

#### package.json

在环境变量中加入变量，将`OpenSSL`降回老策略：
`set NODE_OPTIONS=--openssl-legacy-provider`

```js
// before
"scripts": {
  "serve": "vue-cli-service serve --mode serve.dev",
  "build": "vue-cli-service build"
}

// after
"scripts": {
  "serve": "set NODE_OPTIONS=--openssl-legacy-provider && vue-cli-service serve --mode serve.dev",
  "build": "vue-cli-service build"
}
```