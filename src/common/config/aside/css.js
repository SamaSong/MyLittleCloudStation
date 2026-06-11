export default {
  name: 'CSS基础',
  children: [
    {
      name: '网格布局',
      path: '/gridLayout',
      component: 'components/cssBasic/gridLayout.vue',
      children: [],
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
