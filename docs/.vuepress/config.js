module.exports = {
  // 站点配置
  lang: 'zh-CN',
  title: "YukiAoi's front end notes",
  description: '前端学习笔记',
  head:[['link', { rel: 'icon', href: '/images/logo.jpg' }]],
  // 主题和它的配置
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: '/images/logo.jpg',
    // 导航栏
    navbar:[
      {
        text: '前端',
        link: '/weber/htmlAndCss.md',
      },
      {
        text: '其他',
        link: '/other/computerNet.md',
      }
    ],
    // 侧边栏
    sidebar:[
      {
        text:'前端',
        children:[
          {
            text: 'HTML',
            link: '/weber/html5.md'
          },
          {
            text: 'CSS',
            collapsible:true,
            children:[
              {
                text:'选择器',
                link:'/weber/css/selector.md'
              },
              {
                text:'渐进增强与优雅降级',
                link:'/weber/css/increaseAndDowngrade.md'
              },
              {
                text:'兼容性',
                link:'/weber/css/compatibility.md'
              },
              {
                text:'CSS3新特性',
                link:'/weber/css/newProperty.md'
              },
              {
                text:'position属性',
                link:'/weber/css/propertyPosition.md'
              },
              {
                text:'盒模型',
                link:'/weber/css/boxModel.md'
              },
              {
                text:'块级格式化上下文(BFC)',
                link:'/weber/css/bfc.md'
              },
              {
                text:'页面布局',
                link:'/weber/css/layout.md'
              },
              {
                text:'预处理器（Sass，Less，Stylus）',
                link:'/weber/css/preprocessor.md'
              },
              {
                text:'常见问题',
                link:'/weber/css/commonProblem.md'
              }
            ]
          },
          {
            text: 'JavaScript',
            collapsible:true,
            children:[
              {
                text:'数据类型',
                link:'/weber/js/dataType.md'
              },
              {
                text:'变量声明',
                link:'/weber/js/declare.md'
              },
              {
                text:'作用域',
                link:'/weber/js/scope.md'
              },
              {
                text:'闭包',
                link:'/weber/js/closure.md'
              },
              {
                text:'this',
                link:'/weber/js/this.md'
              },
              {
                text:'原型和原型链',        
                link:'/weber/js/prototype.md'
              },
              {
                text:'事件循环（eventLoop）',        
                link:'/weber/js/eventLoop.md'
              },
              {
                text:'防抖节流',        
                link:'/weber/js/antiShakeAndThrottling.md'
              },
              {
                text:'深浅拷贝',        
                link:'/weber/js/copy.md'
              },
              {
                text:'数组方法',        
                link:'/weber/js/arrayFunction.md'
              },
              {
                text:'promise',        
                link:'/weber/js/promise.md'
              },
              {
                text:'es6+',        
                link:'/weber/js/es6plus.md'
              },
              {
                text:'函数柯里化',        
                link:'/weber/js/currying.md'
              }
            ]
          },
          {
            text: 'TypeScript',
            link: '/weber/typeScript.md'
          },
          {
            text: 'Vue',
            link: '/weber/vue.md'
          },
          {
            text: 'React',
            link: '/weber/react.md'
          },
          {
            text: 'Electron',
            link: '/weber/electron.md'
          }
        ]
      },
      {
        text:'其他',
        children:[
          {
            text: '计算机网络',
            link: '/other/computerNet.md'
          },
          {
            text: '浏览器',
            link: '/other/browser.md'
          },
          {
            text: 'Git',
            link: '/other/git.md'
          },
          {
            text: 'Webpack',
            link: '/other/webpack.md'
          },
          {
            text: 'Babel',
            link: '/other/babel.md'
          },
          {
            text: '面试题',
            link: '/other/面试题.md'
          }
        ]
      }
    ],
    // 是否启用最近更新时间戳
    lastUpdated: true,
    // 最近更新时间戳标签的文字
    lastUpdatedText: '上次更新'
  },
  // 插件
  plugins:[
    // 搜索框
    [
      '@vuepress/plugin-search',
      {
        locales:{
          '/':{
            placeholder:'搜索'
          }
        }
      }
    ],
    // 看板娘
    [
      'vuepress-plugin-live2d-plus',
      {
        enable:true,
        // 模型地址：https://github.com/iCharlesZ/vscode-live2d-models
        model:{
          url:'https://raw.githubusercontent.com/iCharlesZ/vscode-live2d-models/master/model-library/girls-frontline/M4A1-1/normal/model.json'
        },
        display:{
          position:'right',
          width: '405px',
          height: '400px',
          xOffset: '35px',
          yOffset: '5px'
        },
        mobile:{
          show:true
        },
        react: {
          opacity: 1
        }
      }
    ]
  ]
}