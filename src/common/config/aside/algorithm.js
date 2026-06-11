export default {
  name: '算法基础',
  children: [
    {
      name: '常用数据结构处理',
      path: '/dataStructure',
      component: 'components/agorithmBasic/dataStructure.vue',
      children: [
        {
          name: '1、扁平数组转换为树结构',
        },
        {
          name: '2、树结构查找节点',
        },
        {
          name: '3、数组分组',
        },
      ],
    },
  ],
}
