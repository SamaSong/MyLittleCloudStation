export default {
  name: 'WebAPI',
  children: [
    {
      name: '基本API',
      path: '/basicApi',
      component: 'components/webAPI/basicApi.vue',
      children: [
        {
          name: 'ArrayBuffer，二进制数组',
        },
        {
          name: 'TextDecoder和TextEncoder',
        },
        {
          name: 'Blob',
        },
        {
          name: 'File和FileReader',
        },
      ],
    },
    {
      name: '网络请求API',
      path: '/requestsApi',
      component: 'components/webAPI/requestsApi.vue',
      children: [
        {
          name: 'Fetch',
        },
        {
          name: 'FormData',
        },
        {
          name: 'Fetch：下载进度',
        },
        {
          name: 'Fetch：中止（Abort）',
        },
        {
          name: 'Fetch API',
        },
        {
          name: 'URL 对象',
        },
      ],
    },
    {
      name: '服务器通信API',
      path: '/serverCommunicationApi',
      component: 'components/webAPI/serverCommunicationApi.vue',
      children: [
        {
          name: '',
        },
      ],
    },
  ],
}
