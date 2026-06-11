export default {
  name: 'TypeScript系列',
  children: [
    {
      name: 'TypeScript概念（基本内容）',
      path: '/TypeScriptSeriesConcept',
      component: 'components/TypeScriptSeries/Concept.vue',
      children: [
        {
          name: '概念',
        },
        {
          name: '类型声明',
        },
        {
          name: '类型判断',
        },
        {
          name: '类型收窄',
        },
      ],
    },
    {
      name: 'TypeScript-常用类型',
      path: '/basicTypes',
      component: 'components/TypeScriptSeries/basicTypes.vue',
      children: [
        {
          name: 'unknown',
        },
        {
          name: 'never',
        },
        {
          name: 'void',
        },
        {
          name: 'object',
        },
        {
          name: 'tuple',
        },
        {
          name: 'enum',
        },
        {
          name: '⼀个特殊情况',
        },
      ],
    },
    {
      name: 'TypeScript-高级类型',
      path: '/advancedTypes',
      component: 'components/TypeScriptSeries/advancedTypes.vue',
      children: [
        {
          name: '泛型',
        },
        {
          name: 'type',
        },
        {
          name: '抽象类',
        },
        {
          name: 'interface(接⼝)',
        },
        {
          name: '⼀些相似概念的区别',
        },
      ],
    },
  ],
}
