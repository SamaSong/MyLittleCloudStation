export default {
  name: 'CesiumJS',
  children: [
    {
      name: '常用API',
      path: '/cesiumJsApi',
      component: 'components/cesium/cesium.vue',
      children: [
        {
          name: '1. Viewer 初始化与生命周期',
        },
        {
          name: '2. 坐标转换',
        },
        {
          name: '3. 相机控制',
        },
        {
          name: '4. Entity 图形对象',
        },
        {
          name: '5. 图层、地形和 3D Tiles',
        },
        {
          name: '6. 鼠标事件与拾取',
        },
        {
          name: '7. 性能优化',
        },
        {
          name: '开发注意点',
        },
      ],
    },
  ],
}
