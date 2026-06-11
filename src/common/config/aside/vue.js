export default {
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
          name: '响应式原理',
        },
      ],
    },
    {
      name: 'VUE3琐碎知识🧀',
      path: '/Vue3Trivial',
      component: 'components/Vue3/Vue3Trivial.vue',
      children: [
        {
          name: '如何二次封装组件（终极版）',
        },
      ],
    },
  ],
}
