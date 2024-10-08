# Websocket

## 是什么

WebSocket，是一种网络传输协议，位于 OSI 模型的应用层。可在单个 TCP 连接上进行全双工通信，能更好的节省服务器资源和带宽并达到实时通迅

客户端和服务器只需要完成一次握手，两者之间就可以创建持久性的连接，并进行双向数据传输

websocket 出现之前，开发实时 web 应用的方式为轮询

轮询的缺点也很明显，反复发送无效查询请求耗费了大量的带宽和 CPU 资源

## 特点

### 全双工

通信允许数据在两个方向上同时传输，它在能力上相当于两个单工通信方式的结合

### 二进制帧

采用了二进制帧结构，语法、语义与 HTTP 完全不兼容，相比 http2.0，WebSocket 更侧重于“实时通信”，而 http2.0 更侧重于提高传输效率

### 协议名

引入 ws 和 wss 分别代表明文和密文的 websocket 协议，且默认端口使用 80 或 443，几乎与 http 一致

### 握手

WebSocket 也有一个握手过程，然后才能正式收发数据

## 优点

- 较少的控制开销：数据包头部协议较小，不同于 http 每次请求需要携带完整的头部
- 更强的实时性：相对于 HTTP 请求需要等待客户端发起请求服务端才能响应，延迟明显更少
- 保持创连接状态：创建通信后，可省略状态信息，不同于 HTTP 每次请求需要携带身份验证
- 更好的二进制支持：定义了二进制帧，更好处理二进制内容
- 支持扩展：用户可以扩展 websocket 协议、实现部分自定义的子协议
  更好的压缩效果：Websocket 在适当的扩展支持下，可以沿用之前内容的上下文，在传递类似的数据时，可以显著地提高压缩率

## 应用场景

- 弹幕
- 媒体聊天
- 协同编辑
- 基于位置的应用
- 体育实况更新
- 股票基金报价实时更新
