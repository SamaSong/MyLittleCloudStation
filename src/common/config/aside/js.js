export default {
  name: 'JS基础',
  children: [
    {
      name: 'BOM、DOM',
      path: '/bom-dom',
      component: 'components/jsBasic/bom-dom.vue',
      children: [
        {
          name: '1、window',
        },
        {
          name: '2、定时器',
        },
        {
          name: '3、location 对象',
        },
        {
          name: '4、DOM节点操作方法',
        },
      ],
    },
    {
      name: '事件',
      path: '/event',
      component: 'components/jsBasic/event.vue',
      children: [
        {
          name: '1、事件流',
        },
        {
          name: '2、事件处理程序',
        },
        {
          name: '3、事件对象',
        },
        {
          name: '4、事件类型',
        },
        {
          name: '5、内存与性能',
        },
        {
          name: '6、事件循环',
        },
      ],
    },
    {
      name: '对象、类与面向对象编程',
      path: '/object',
      component: 'components/jsBasic/object.vue',
      children: [
        {
          name: '1、对象',
        },
        {
          name: '2、创建对象',
        },
        {
          name: '3、继承',
        },
        {
          name: '4、类',
        },
      ],
    },
    {
      name: 'JS琐碎知识🧀',
      path: '/jsTrivial',
      component: 'components/jsBasic/jsTrivial.vue',
      children: [
        {
          name: '1、JS相关',
        },
        {
          name: '2、对象相关',
        },
        {
          name: '3、数组相关',
        },
        {
          name: '4、字符串相关',
        },
        {
          name: '5、路由相关',
        },
        {
          name: '6、其他',
        },
      ],
    },
  ],
}
