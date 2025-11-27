let asideConfig = [
  {
    name: 'JS基础',
    children: [
      {
        name: 'BOM、DOM',
        path: '/bom-dom',
        component: 'components/basic/bom-dom.vue',
        children: [
          {
            name: '1、window'
          },
          {
            name: '2、定时器'
          },
          {
            name: '3、location 对象'
          },
          {
            name: '4、DOM节点操作方法'
          },
        ]
      },
      {
        name: '事件',
        path: '/event',
        component: 'components/basic/event.vue',
        children: [
          {
            name: '1、事件流'
          },
          {
            name: '2、事件处理程序'
          },
          {
            name: '3、事件对象'
          },
          {
            name: '4、事件类型'
          },
          {
            name: '5、内存与性能'
          }
        ]
      },
      {
        name: '对象、类与面向对象编程',
        path: '/object',
        component: 'components/basic/object.vue',
        children: [
          {
            name: '1、对象'
          },
          {
            name: '2、创建对象'
          },
          {
            name: '3、继承'
          },
          {
            name: '4、类'
          }
        ]
      },
      {
        name: 'JS琐碎知识🧀',
        path: '/jsTrivial',
        component: 'components/basic/jsTrivial.vue',
        children: [
          {
            name: '1、JS相关'
          },
          {
            name: '2、对象相关'
          },
          {
            name: '3、数组相关'
          },
          {
            name: '4、字符串相关'
          },
          {
            name: '5、路由相关'
          }
        ]
      }
    ]
  },
  {
    name: 'CSS基础',
    children: [
      // {
      //   name: 'CSS继承和优先级',
      //   path: '/priority',
      //   children: [
      //     {
      //       name: '1、优先级'
      //     }
      //   ]
      // },
      {
        name: 'CSS琐碎知识🧀',
        path: '/cssTrivial',
        component: 'components/cssBasic/cssTrivial.vue',
        children: [
          {
            name: '1、Element相关'
          },
        ]
      }
    ]
  },
  {
    name: '算法基础',
    children: [
      {
        name: '常用数据结构处理',
        path: '/dataStructure',
        component: 'components/agorithmBasic/dataStructure.vue',
        children: [
          {
            name: '1、扁平数组转换为树结构'
          }
        ]
      }
    ]
  },
]

export default asideConfig
