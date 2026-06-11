<template>
  <div class="cesium-page">
    <section class="viewer-section">
      <div ref="cesiumContainer" class="cesium-container"></div>
    </section>

    <section class="api-guide">
      <div class="guide-header">
        <p class="guide-kicker">CesiumJS 常用 API</p>
        <h1>从 Viewer 到实体、相机、坐标和事件的高频用法</h1>
        <p>
          Cesium 的核心入口通常是 <code>Viewer</code>。它内部组合了
          <code>Scene</code>、<code>Camera</code>、<code>EntityCollection</code>、
          <code>DataSourceCollection</code>、<code>ImageryLayerCollection</code>
          等对象，实际开发大多数操作都围绕这些对象展开。
        </p>
      </div>

      <div class="summary-grid">
        <article
          v-for="item in coreConcepts"
          :key="item.name"
          class="summary-card"
        >
          <h2>{{ item.name }}</h2>
          <p>{{ item.description }}</p>
        </article>
      </div>

      <article
        v-for="section in apiSections"
        :key="section.title"
        class="api-section"
      >
        <div class="section-heading">
          <h2>{{ section.title }}</h2>
          <p>{{ section.description }}</p>
        </div>

        <div class="api-list">
          <div
            v-for="api in section.items"
            :key="api.name"
            class="api-item"
          >
            <div class="api-copy">
              <h3>{{ api.name }}</h3>
              <p>{{ api.explain }}</p>
            </div>
            <CodeBlock :code="api.code" />
          </div>
        </div>
      </article>

      <section class="tips-section">
        <h2>开发注意点</h2>
        <ul>
          <li>
            Vue 组件卸载时调用 <code>viewer.destroy()</code>，否则 WebGL 上下文、
            事件监听和瓦片请求可能残留。
          </li>
          <li>
            经纬度通常用 <code>Cartesian3.fromDegrees(lon, lat, height)</code>
            转成 Cesium 使用的笛卡尔坐标，参数顺序是经度、纬度、高度。
          </li>
          <li>
            大量点、线、面优先考虑 <code>Primitive</code> 或批量数据源；
            少量业务对象用 <code>Entity</code> 更易维护。
          </li>
          <li>
            需要真实地形高度时使用 <code>sampleTerrainMostDetailed</code>，
            不要假设模型或点位高度天然贴地。
          </li>
        </ul>
      </section>
    </section>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, useTemplateRef } from 'vue'
import * as Cesium from 'cesium'
import 'cesium/Build/Cesium/Widgets/widgets.css'
import CodeBlock from '@/common/components/codeBlock.vue'

// Cesium Ion 令牌
Cesium.Ion.defaultAccessToken = import.meta.env.VITE_APP_CESIUM_TOKEN

const cesiumContainer = useTemplateRef('cesiumContainer')
let viewer = null

const coreConcepts = [
  {
    name: 'Viewer',
    description: '最高频入口，负责创建 Cesium 容器、默认控件、场景、相机、图层和实体集合。',
  },
  {
    name: 'Scene',
    description: '三维场景对象，管理渲染模式、天空盒、地球、地形、光照、Primitive 和后处理。',
  },
  {
    name: 'Camera',
    description: '控制视角定位、飞行、缩放、旋转和拾取，常用于定位目标或实现业务视角切换。',
  },
  {
    name: 'Entity',
    description: '业务对象抽象，适合点、线、面、标签、广告牌、模型等少量或中等规模可编辑数据。',
  },
]

const apiSections = [
  {
    title: '1. Viewer 初始化与生命周期',
    description: '创建地图实例、配置控件、挂载地形和释放资源，是 Vue 中使用 Cesium 的基础。',
    items: [
      {
        name: 'new Cesium.Viewer(container, options)',
        explain: '初始化 Cesium 地球。container 可以是 DOM 节点或元素 id，options 用来控制地形、控件、图层选择器、时间轴等。',
        code: `const viewer = new Cesium.Viewer(container, {
  terrain: Cesium.Terrain.fromWorldTerrain(),
  animation: false,
  timeline: false,
  baseLayerPicker: false,
})`,
      },
      {
        name: 'viewer.destroy()',
        explain: '销毁 Viewer 并释放 WebGL、DOM、事件和内部资源。Vue 组件卸载时必须处理。',
        code: `onUnmounted(() => {
  if (viewer && !viewer.isDestroyed()) {
    viewer.destroy()
  }
})`,
      },
      {
        name: 'viewer.scene',
        explain: '访问底层场景，常用于添加 Primitive、调整渲染参数、开启深度检测、控制地球和天空效果。',
        code: `viewer.scene.globe.depthTestAgainstTerrain = true
viewer.scene.debugShowFramesPerSecond = true`,
      },
    ],
  },
  {
    title: '2. 坐标转换',
    description: 'Cesium 内部使用笛卡尔坐标，业务系统常用经纬度，所以坐标转换非常常见。',
    items: [
      {
        name: 'Cartesian3.fromDegrees(lon, lat, height)',
        explain: '把 WGS84 经纬度转换成 Cesium 世界坐标。注意第一个参数是经度，不是纬度。',
        code: `const position = Cesium.Cartesian3.fromDegrees(116.39, 39.9, 100)`,
      },
      {
        name: 'Cartographic.fromCartesian(cartesian)',
        explain: '把 Cesium 世界坐标转回经纬度弧度值，通常再用 Cesium.Math.toDegrees 转成角度。',
        code: `const cartographic = Cesium.Cartographic.fromCartesian(position)
const lon = Cesium.Math.toDegrees(cartographic.longitude)
const lat = Cesium.Math.toDegrees(cartographic.latitude)
const height = cartographic.height`,
      },
      {
        name: 'SceneTransforms.worldToWindowCoordinates(scene, position)',
        explain: '把三维世界坐标转换成屏幕像素坐标，常用于 HTML 浮层跟随地图目标。',
        code: `const windowPosition = Cesium.SceneTransforms.worldToWindowCoordinates(
  viewer.scene,
  position,
)`,
      },
    ],
  },
  {
    title: '3. 相机控制',
    description: '定位、漫游、视角切换和目标追踪都依赖 Camera API。',
    items: [
      {
        name: 'viewer.camera.flyTo(options)',
        explain: '带动画飞到目标位置，适合点击列表定位、进入项目范围或切换城市视角。',
        code: `viewer.camera.flyTo({
  destination: Cesium.Cartesian3.fromDegrees(116.39, 39.9, 20000),
  orientation: {
    heading: Cesium.Math.toRadians(0),
    pitch: Cesium.Math.toRadians(-45),
    roll: 0,
  },
})`,
      },
      {
        name: 'viewer.camera.setView(options)',
        explain: '立即切换视角，不带飞行动画，适合初始化默认视角或快速复位。',
        code: `viewer.camera.setView({
  destination: Cesium.Cartesian3.fromDegrees(121.47, 31.23, 15000),
})`,
      },
      {
        name: 'viewer.zoomTo(target)',
        explain: '自动缩放到 Entity、DataSource、Tileset 等目标范围，比手动计算包围盒更省事。',
        code: `const entity = viewer.entities.add({
  position,
  point: { pixelSize: 10 },
})
viewer.zoomTo(entity)`,
      },
    ],
  },
  {
    title: '4. Entity 图形对象',
    description: 'Entity 是最常用的数据表达方式，适合把业务对象直接映射成地图元素。',
    items: [
      {
        name: 'viewer.entities.add(entityOptions)',
        explain: '添加点、线、面、标签、图片、模型等实体。返回值是 Entity 实例，可用于后续更新或删除。',
        code: `const pointEntity = viewer.entities.add({
  name: '北京点位',
  position: Cesium.Cartesian3.fromDegrees(116.39, 39.9, 100),
  point: {
    pixelSize: 12,
    color: Cesium.Color.RED,
  },
  label: {
    text: '北京',
    pixelOffset: new Cesium.Cartesian2(0, -20),
  },
})`,
      },
      {
        name: 'polyline / polygon',
        explain: 'polyline 用于路线、轨迹、边界线；polygon 用于行政区、项目范围、禁飞区等面数据。',
        code: `viewer.entities.add({
  polyline: {
    positions: Cesium.Cartesian3.fromDegreesArray([
      116.3, 39.9,
      116.45, 39.95,
    ]),
    width: 4,
    material: Cesium.Color.CYAN,
  },
})`,
      },
      {
        name: 'entity.position / entity.show',
        explain: 'Entity 属性可动态修改。常用于更新位置、隐藏显示、修改样式。',
        code: `pointEntity.position = Cesium.Cartesian3.fromDegrees(116.42, 39.91, 300)
pointEntity.show = false`,
      },
    ],
  },
  {
    title: '5. 图层、地形和 3D Tiles',
    description: '影像负责底图，地形负责高程，3D Tiles 负责大规模倾斜摄影、建筑和 BIM 模型。',
    items: [
      {
        name: 'viewer.imageryLayers',
        explain: '管理影像图层集合，可添加、移除、调整透明度和层级。',
        code: `const layer = viewer.imageryLayers.addImageryProvider(
  await Cesium.IonImageryProvider.fromAssetId(3954),
)
layer.alpha = 0.8`,
      },
      {
        name: 'Cesium.Terrain.fromWorldTerrain()',
        explain: '加载 Cesium World Terrain 全球地形。需要 Ion Token，适合需要地表起伏的场景。',
        code: `viewer.terrainProvider = await Cesium.Terrain.fromWorldTerrain()`,
      },
      {
        name: 'Cesium.Cesium3DTileset.fromUrl(url)',
        explain: '加载 3D Tiles 数据集。适合城市级倾斜摄影、建筑白模、BIM、点云等大规模三维数据。',
        code: `const tileset = await Cesium.Cesium3DTileset.fromUrl('/tiles/tileset.json')
viewer.scene.primitives.add(tileset)
viewer.zoomTo(tileset)`,
      },
    ],
  },
  {
    title: '6. 鼠标事件与拾取',
    description: '点击选中、悬浮高亮、右键菜单、框选等交互通常从 ScreenSpaceEventHandler 开始。',
    items: [
      {
        name: 'new Cesium.ScreenSpaceEventHandler(canvas)',
        explain: '绑定 Cesium 画布上的鼠标或触摸事件。事件处理器不用时需要 destroy。',
        code: `const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas)
handler.setInputAction((movement) => {
  const picked = viewer.scene.pick(movement.position)
  if (Cesium.defined(picked)) {
    console.log('选中的对象:', picked.id || picked.primitive)
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK)`,
      },
      {
        name: 'viewer.camera.pickEllipsoid(position)',
        explain: '把屏幕点击位置投射到地球椭球面上，常用于获取用户点击的经纬度。',
        code: `const cartesian = viewer.camera.pickEllipsoid(
  movement.position,
  viewer.scene.globe.ellipsoid,
)
const cartographic = Cesium.Cartographic.fromCartesian(cartesian)`,
      },
      {
        name: 'viewer.scene.pickPosition(position)',
        explain: '拾取带深度的场景坐标，可命中地形、3D Tiles 或模型表面；需要场景深度信息支持。',
        code: `const pickedPosition = viewer.scene.pickPosition(movement.position)
if (Cesium.defined(pickedPosition)) {
  console.log(Cesium.Cartographic.fromCartesian(pickedPosition))
}`,
      },
    ],
  },
]

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
  if (viewer && !viewer.isDestroyed()) {
    viewer.destroy()
    viewer = null
  }
})
</script>

<style scoped lang="scss">
.cesium-page {
  width: 100%;
  min-height: 100%;
  background: #f6f8fb;
  color: #1f2937;
}

.viewer-section {
  padding: 16px;
  background: #101827;
}

.cesium-container {
  width: 100%;
  height: 58vh;
  min-height: 420px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  border-radius: 8px;
}

.api-guide {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
  padding: 32px 0 56px;
}

.guide-header {
  margin-bottom: 24px;

  h1 {
    margin: 4px 0 12px;
    font-size: 32px;
    line-height: 1.25;
    font-weight: 700;
    color: #111827;
  }

  p {
    max-width: 920px;
    margin: 0;
    line-height: 1.8;
    color: #4b5563;
  }
}

.guide-kicker {
  font-size: 14px;
  font-weight: 700;
  color: #0f766e;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 28px;
}

.summary-card,
.api-section,
.tips-section {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #ffffff;
}

.summary-card {
  padding: 16px;

  h2 {
    margin: 0 0 8px;
    border: 0;
    font-size: 17px;
    font-weight: 700;
    color: #111827;
  }

  p {
    margin: 0;
    line-height: 1.7;
    color: #4b5563;
  }
}

.api-section {
  margin-top: 18px;
  padding: 22px;
}

.section-heading {
  margin-bottom: 16px;

  h2 {
    margin: 0 0 8px;
    border-bottom: 0;
    font-size: 22px;
    font-weight: 700;
    color: #111827;
  }

  p {
    margin: 0;
    color: #4b5563;
    line-height: 1.8;
  }
}

.api-list {
  display: grid;
  gap: 14px;
}

.api-item {
  display: grid;
  grid-template-columns: minmax(220px, 0.9fr) minmax(320px, 1.4fr);
  gap: 16px;
  padding: 16px;
  border: 1px solid #edf0f3;
  border-radius: 8px;
  background: #fbfcfe;
}

.api-copy {
  h3 {
    margin: 0 0 8px;
    font-size: 17px;
    font-weight: 700;
    color: #0f172a;
    word-break: break-word;
  }

  p {
    margin: 0;
    line-height: 1.8;
    color: #4b5563;
  }
}

.guide-header code,
.tips-section code {
  font-family: Menlo, Monaco, Consolas, 'Liberation Mono', monospace;
  font-size: 13px;
}

.guide-header code,
.tips-section code {
  padding: 2px 5px;
  border-radius: 5px;
  background: #e8f1ff;
  color: #1d4ed8;
}

.tips-section {
  margin-top: 18px;
  padding: 22px;

  h2 {
    margin: 0 0 12px;
    border-bottom: 0;
    font-size: 22px;
    font-weight: 700;
  }

  ul {
    margin: 0;
    padding-left: 20px;
  }

  li {
    margin: 8px 0;
    line-height: 1.8;
    color: #4b5563;
  }
}

@media (max-width: 960px) {
  .summary-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .api-item {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .viewer-section {
    padding: 10px;
  }

  .cesium-container {
    height: 48vh;
    min-height: 320px;
  }

  .api-guide {
    width: min(100% - 20px, 1120px);
    padding-top: 24px;
  }

  .guide-header h1 {
    font-size: 24px;
  }

  .summary-grid {
    grid-template-columns: 1fr;
  }

  .api-section,
  .tips-section {
    padding: 16px;
  }

  .api-item {
    padding: 14px;
  }
}
</style>
