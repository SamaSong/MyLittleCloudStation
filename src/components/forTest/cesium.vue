<template>
  <div ref="cesiumContainer" class="cesium-container"></div>
</template>

<script setup>
import {ref, onMounted, onUnmounted, useTemplateRef} from 'vue'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'

// Cesium Ion 令牌
Cesium.Ion.defaultAccessToken = import.meta.env.VITE_APP_CESIUM_TOKEN

const cesiumContainer = useTemplateRef('cesiumContainer')
let viewer = null

onMounted(async () => {
  // 初始化 Viewer
  viewer = new Cesium.Viewer(cesiumContainer.value, {
    terrain: Cesium.Terrain.fromWorldTerrain(), // 加载全球地形
    animation: false, // 隐藏动画控件
    baseLayerPicker: false, // 隐藏图层选择器
    fullscreenButton: false,
    vrButton: false,
    geocoder: false,
    homeButton: false,
    infoBox: false,
    sceneModePicker: false,
    timeline: false,
    navigationHelpButton: false,
    navigationInstructionsInitiallyVisible: false
  })

  // 添加全球 3D 建筑（可选）
  try {
    const buildingTileset = await Cesium.createOsmBuildingsAsync()
    viewer.scene.primitives.add(buildingTileset)
  } catch (error) {
    console.error('加载 OSM 建筑失败:', error)
  }

  // 添加一个简单的实体示例：位于北京的点
  viewer.entities.add({
    position: Cesium.Cartesian3.fromDegrees(116.39, 39.9, 100),
    point: {
      pixelSize: 12,
      color: Cesium.Color.RED,
      outlineColor: Cesium.Color.WHITE,
      outlineWidth: 2
    },
    label: {
      text: '北京',
      font: '20px sans-serif',
      fillColor: Cesium.Color.WHITE,
      style: Cesium.LabelStyle.FILL_AND_OUTLINE,
      outlineWidth: 2,
      verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
      pixelOffset: new Cesium.Cartesian2(0, -20)
    }
  })

  // 将相机飞到北京上空
  viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(116.39, 39.9, 20000),
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-45),
      roll: 0.0
    }
  })
})

// 组件卸载时销毁 viewer，释放资源
onUnmounted(() => {
  if (viewer) {
    viewer.destroy()
    viewer = null
  }
})
</script>

<style scoped>
.cesium-container {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
