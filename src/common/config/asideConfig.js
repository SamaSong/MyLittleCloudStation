let asideConfig = [
  {
    name: 'VUE3',
    children: [
      {
        name: 'Vue3源码',
        path: '/Vue3SourceCode',
        component: 'components/Vue3/Vue3SourceCode.vue',
        children: [
          {
            name: '思维导图',
          },
          {
            name: '响应式原理'
          }
        ]
      },
      {
        name: 'VUE3琐碎知识🧀',
        path: '/Vue3Trivial',
        component: 'components/Vue3/Vue3Trivial.vue',
        children: [
          {
            name: '如何二次封装组件（终极版）',
          }
        ]
      }
    ]
  },
  {
    name: 'JS基础',
    children: [
      {
        name: 'BOM、DOM',
        path: '/bom-dom',
        component: 'components/jsBasic/bom-dom.vue',
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
        component: 'components/jsBasic/event.vue',
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
        component: 'components/jsBasic/object.vue',
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
        component: 'components/jsBasic/jsTrivial.vue',
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
          },
          {
            name: '6、其他'
          }
        ]
      }
    ]
  },
  {
    name: 'CSS基础',
    children: [
      {
        name: '网格布局',
        path: '/gridLayout',
        component: 'components/cssBasic/gridLayout.vue',
        children: []
      },
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
  {
    name: 'TypeScript系列',
    children: [
      {
        name: 'TypeScript概念（基本内容）',
        path: '/TypeScriptSeriesConcept',
        component: 'components/TypeScriptSeries/Concept.vue',
        children: [
          {
            name: '概念'
          },
          {
            name: '类型声明'
          },
          {
            name: '类型判断'
          }
        ]
      },
      {
        name: 'TypeScript-常用类型',
        path: '/basicTypes',
        component: 'components/TypeScriptSeries/basicTypes.vue',
        children: [
          {
            name: 'unknown'
          },
          {
            name: 'never'
          },
          {
            name: 'void'
          },
          {
            name: 'object'
          },
          {
            name: 'tuple'
          },
          {
            name: 'enum'
          },
          {
            name: '⼀个特殊情况'
          },
        ]
      },
      {
        name: 'TypeScript-高级类型',
        path: '/advancedTypes',
        component: 'components/TypeScriptSeries/advancedTypes.vue',
        children: [
          {
            name: '泛型'
          },
          {
            name: 'type'
          },
          {
            name: '抽象类'
          },
          {
            name: 'interface(接⼝)'
          },
          {
            name: '⼀些相似概念的区别'
          }
        ]
      }
    ]
  },
  {
    name: 'WebAPI',
    children: [
      {
        name: '基本API',
        path: '/basicApi',
        component: 'components/webAPI/basicApi.vue',
        children: [
          {
            name: 'ArrayBuffer，二进制数组'
          },
          {
            name: 'TextDecoder和TextEncoder'
          },
          {
            name: 'Blob'
          },
          {
            name: 'File和FileReader'
          }
        ]
      },
      {
        name: '网络请求API',
        path: '/requestsApi',
        component: 'components/webAPI/requestsApi.vue',
        children: [
          {
            name: 'Fetch'
          },
          {
            name: 'FormData'
          },
          {
            name: 'Fetch：下载进度'
          },
          {
            name: 'Fetch：中止（Abort）'
          },
          {
            name: 'Fetch API'
          },
          {
            name: 'URL 对象'
          }
        ]
      },
      {
        name: '服务器通信API',
        path: '/serverCommunicationApi',
        component: 'components/webAPI/serverCommunicationApi.vue',
        children: [
          {
            name: ''
          }
        ]
      }
    ]
  },
  {
    name: 'CesiumJS',
    children: [
      {
        name: '常用API',
        path: '/cesiumJsApi',
        component: 'components/cesium/cesium.vue',
      }
    ]
  }
]

export default asideConfig
