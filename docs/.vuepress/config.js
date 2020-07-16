module.exports = {
    title: '大熊当道',
    description: 'Just playing around',
    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'External', link: 'https://google.com' },
        ],
        sidebar: [
            {
              title: '前端基础',
              children: [
                '../guide/htmlBase',
                '../guide/cssBase',
                '../guide/jsBase',
                '../guide/browserBase',
                '../guide/es6',
              ]
            },
            {
              title: '网络协议',
              children: [
                '../guide/httpBase',
                '../guide/httpCache',
              ]
            },
            {
              title: '前端原理',
              children: [
                '../guide/prepare',
                '../guide/eventLoop',
                '../guide/clone',
              ]
            },
            {
              title: '数据结构与算法',
              children: [
                '../guide/algorithm',
              ]
            },
            {
              title: '设计模式',
              children: [
                '../guide/desPatterns',
              ]
            },
            {
              title: '前端框架',
              children: [
                '../guide/vue',
                '../guide/react',
                '../guide/san',
                '../guide/swan',
                '../guide/virtualDom',
              ]
            },
            {
              title: '工程化',
              children: [
                '../guide/webpack',
                '../guide/module',
                '../guide/babel',
                '../guide/buildProject',
                '../guide/comDesign',
                '../guide/frontEndEng',
                '../guide/node',
              ]
            },
            {
              title: '性能优化',
              children: [
                '../guide/load',
                '../guide/execute',
              ]
            },
            {
              title: '安全',
              children: [
                '../guide/safe',
              ]
            },
            {
                title: '技术项目',
                children: [
                  '../guide/invoke',
                  '../guide/chrome'
                ]
            },
            {
              title: '面试',
              children: [
                '../guide/intQue',
                '../guide/demo',
                '../guide/hand'
              ]
            }
        ]
    }
  }