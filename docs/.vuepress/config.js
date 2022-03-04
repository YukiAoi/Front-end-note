module.exports = {
  // 站点配置
  lang: 'zh-CN',
  title: "YukiAoi's front end notes",
  description: '前端学习笔记',
  head:[['link', { rel: 'icon', href: '/images/logo.png' }]],
  // 主题和它的配置
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: 'https://vuejs.org/images/logo.png',
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
            text: 'HTML&&CSS',
            link: '/weber/htmlAndCss.md'
          },
          {
            text: 'JavaScript',
            link: '/weber/javaScript.md'
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
          },
          {
            text: '代码优化',
            link: '/weber/codeOptimization.md'
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
            link: '/other/questions.md'
          }
        ]
      }
    ],
    // 是否启用最近更新时间戳
    lastUpdated: true,
    // 最近更新时间戳标签的文字
    lastUpdatedText: '上次更新：'
  }
}