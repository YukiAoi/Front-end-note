## 打包策略

搜索时间-缩小文件搜索范围，减少不必要的编译工作
解析时间
压缩时间
二次打包时间

开启thread-loader
防止 webpack启动慢  预热
合理使用缓存 cache-loader（保存和读取缓存文件是存在时间开销的，因此只针对相对来说大的loader） HardSourceWebpackPlugin
优化压缩时间

优化loader配置通过test,include,exclude来命中需要应用规则的文件
优化 resolve.module 配置webpack寻找第三方模块地址
优化 resolve.alias 配置别名把原本路径映射成一个新的路径，减少耗时的递归解析