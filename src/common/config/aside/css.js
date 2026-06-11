export default {
  name: 'CSS基础',
  children: [
    {
      name: '网格布局',
      path: '/gridLayout',
      component: 'components/cssBasic/gridLayout.vue',
      children: [
        {
          name: '1、容器与区域',
        },
        {
          name: '2、自适应卡片网格',
        },
        {
          name: '3、minmax(0, 1fr)',
        },
      ],
    },
    {
      name: 'CSS琐碎知识🧀',
      path: '/cssTrivial',
      component: 'components/cssBasic/cssTrivial.vue',
      children: [
        {
          name: '1、Element相关',
        },
      ],
    },
  ],
}
