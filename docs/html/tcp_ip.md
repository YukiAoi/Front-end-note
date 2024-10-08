# TCP/IP 协议

## 是什么

TCP/IP，传输控制协议/网际协议，是指能够在多个不同网络间实现信息传输的协议簇

- TCP（传输控制协议）
  一种面向连接的、可靠的、基于字节流的传输层通信协议
- IP（网际协议）
  用于封包交换数据网络的协议

TCP/IP 协议不仅仅指的是 TCP 和 IP 两个协议，而是指一个由 FTP、SMTP、TCP、UDP、IP 等协议构成的协议簇

## 划分

TCP/IP 协议族按层次分别了五层体系或者四层体系

五层体系结构只是为介绍网络原理而设计的：

- 应用层
- 传输层
- 网络层
- 链路层
- 物理层

实际应用还是四层体系结构：

- 应用层
- 传输层
- 网络层（网际互联层）
- 网络接口层

![TCP_IP-模型](../assets/image/TCP_IP-%E6%A8%A1%E5%9E%8B.png)

### 应用层

TCP/IP 模型将 OSI 的会话层、表示层和应用层的功能合并到一个应用层实现，通过不同的应用层协议为不同的应用提供服务

### 传输层

该层对应于 OSI 的传输层，为上层实体提供源端到对端主机的通信功能

### 网络层

负责为分组网络中的不同主机提供通信服务，并通过选择合适的路由将数据传递到目标主机

### 链路层

链路层在两个相邻节点传输数据时，将网络层交下来的 IP 数据报组装成帧，在两个相邻节点之间的链路上传送帧

### 物理层

保证数据可以在各种物理媒介上进行传输，为数据的传输提供可靠的环境

### 网络接口层

负责实际数据的传输，对应 OS 的下两层（链路层和网络层）
