// import { defineConfig } from '@umijs/max';

// export default defineConfig({
//   antd: {},
//   access: {},
//   model: {},
//   initialState: {},
//   request: {},
//   layout: {
//     title: '@umijs/max',
//   },
//   routes: [
//     {
//       path: '/',
//       redirect: '/home',
//     },
//     {
//       name: '首页',
//       path: '/home',
//       component: './Home',
//     },
//     {
//       name: '数组',
//       path: '/array',
//       component: './Array',
//     },
//     {
//       name: '权限演示',
//       path: '/access',
//       component: './Access',
//     },
//     {
//       name: ' CRUD 示例',
//       path: '/table',
//       component: './Table',
//     },
//   ],
//   npmClient: 'pnpm',
// });

import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'JS 数据结构学习',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      icon: 'HomeOutlined',
      component: './Home',
    },
    // { 
    //       path: '/array', 
    //       name: '数组', 
          
          
    //       icon: 'StarTwoTone',
    //       component: './Array' 
    //     },
        { 
          path: '/linkedlist', 
          name: '链表', 
          icon: 'AlertTwoTone',
          component: './LinkedList' 
        },
        { 
          path: '/stack', 
          name: '栈', 
         
          icon: 'TagsTwoTone',
          component: './Stack' 
        },
        { 
          path: '/queue', 
          name: '队列', 
          icon: 'TagsTwoTone',
          component: './Queue' 
        },
        { 
          path: '/tree', 
          name: '树', 
         
          icon: 'TagsTwoTone',
          component: './Tree' 
        },
        { 
          path: '/graph', 
          name: '图', 
          icon: 'TagsTwoTone',
          component: './Graph' 
        },
 
  
    // 非线性结构 - 嵌套路由
    // {
    //   name: '非线性结构',
    //   path: '/non-linear',
    //   icon: 'ClusterOutlined',
    //   routes: [
    //     { 
    //       path: 'tree', 
    //       name: '树', 
    //       component: './non-linear/tree' 
    //     },
    //     { 
    //       path: 'graph', 
    //       name: '图', 
    //       component: './non-linear/graph' 
    //     },
    //   ],
    // },
    // // 哈希结构 - 嵌套路由
    // {
    //   name: '哈希结构',
    //   path: '/hash',
    //   icon: 'DatabaseOutlined',
    //   routes: [
    //     { 
    //       path: 'hashtable', 
    //       name: '哈希表', 
    //       component: './hash/hashTable' 
    //     },
    //   ],
    // },
    // // 常用算法 - 嵌套路由
    // {
    //   name: '常用算法',
    //   path: '/algorithm',
    //   icon: 'SortAscendingOutlined',
    //   routes: [
    //     { 
    //       path: 'sort', 
    //       name: '排序算法', 
    //       component: './algorithm/sort' 
    //     },
    //   ],
    // },
    // // 404 页面（放在最后）
    // { 
    //   path: '*', 
    //   component: './404' 
    // },
  ],
  npmClient: 'pnpm',
  // 仅保留绝对必要的开发配置（避免无效键）
  fastRefresh: true, // 热更新（必开）
  devtool: 'eval-cheap-module-source-map', // SourceMap 优化（必开）

 });