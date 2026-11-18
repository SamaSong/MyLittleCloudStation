export default {
  name: 'Bpmn-JS',
  children: [
    {
      name: '常用API',
      path: '/bpmnJsApi',
      component: 'components/bpmn/normalApi.vue',
      children: [
        {
          name: '操作BPMN 元素 CSS 类名',
        },
      ],
    },
  ],
}
