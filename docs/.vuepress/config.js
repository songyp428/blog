module.exports = {
  title: '爱吃草莓的土豆怪',
  description: 'follow your heart',
  head: [ // 注入到当前页面的 HTML <head> 中的标签
    //https://avatars0.githubusercontent.com/u/26698816?s=460&amp;v=4
    ['link', { rel: 'icon', href: '/lee.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  base: '/', // 这是部署到github相关的配置
  markdown: {
    lineNumbers: true // 代码块显示行号
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
            // 下面地址查找的是：docs>algorithm>sort>bubble.md 文件
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
            '/fe/js/arrayDeduplication.md',
            '/fe/js/prototype.md',
            '/fe/js/inheritance.md',
            '/fe/js/发现alert的好用之处.md',
            '/fe/js/数组扁平化处理.md'
            // '/fe/js/newOperator.md',
          ]
        },
        {
          title: 'CSS',
          children: [
            '/fe/css/省略号样式.md',
            '/fe/css/图片移入移除效果实现.md'
          ]
        },
        {
          title: '工具',
          children: [
            '/fe/工具/使用n管理node版本.md'
          ]
        }
      ],
      '/eassy/': [
        '/eassy/',
        {
          title: '美食',
          children: [
            // '/eassy/work/makechickenfeet.md',
          ]
        },
        {
          title: '胡思乱想',
          children: [
          ]
        }
      ]
    },
    sidebarDepth: 2, // 侧边栏显示2级
  }
};

