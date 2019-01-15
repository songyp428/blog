module.exports = {
  title: 'evil\'s blog',
  description: 'follow your heart',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    ['link', { rel: 'icon', href: 'https://avatars0.githubusercontent.com/u/26698816?s=460&amp;v=4' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/', // 这是部署到github相关的配置
  markdown: {
    lineNumbers: false // 代码块显示行号
  },
  themeConfig: {
    nav:[ // 导航栏配置
      {text: '算法', link: '/algorithm/'},
      {text: '前端', link: '/fe/'},
      {text: '生活随笔', link: '/eassy/'}
    ],
    sidebar: {  // 侧边栏配置
      '/algorithm/': [
        '/algorithm/',
        {
          title: '排序算法',
          children: [
            // 以docs为根目录来查找文件 
            // 上面地址查找的是：docs>accumulate>JS>test.md 文件
            // 自动加.md 每个子选项的标题 是该md文件中的第一个h1/h2/h3标题
            '/algorithm/sort/bubble.md',
            '/algorithm/sort/cocktail.md'
          ]
        }
      ],
      '/fe/': [
        '/fe/',
        {
          title: 'JS',
          children: [
            '/fe/js/arrayDeduplication.md'
          ]
        }
      ],
      '/eassy/': [
        '/eassy/',
        {
          title: '工作',
          children: [
            '/eassy/work/resignation.md'
          ]
        }
      ]
    },
    sidebarDepth: 2, // 侧边栏显示2级
  }
};

