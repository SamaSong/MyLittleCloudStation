export const inputWrapperExample = [
  '<template>',
  '  <div>',
  '    <component :is="h(ElInput, { ...$attrs, ref: changeRef }, $slots)"></component>',
  '  </div>',
  '</template>',
  '',
  '<script setup>',
  "import { getCurrentInstance, h } from 'vue'",
  "import { ElInput } from 'element-plus'",
  '',
  'defineProps({})',
  '',
  'const vm = getCurrentInstance()',
  '',
  'const changeRef = (exposed) => {',
  '  vm.exposed = exposed',
  '}',
  '</' + 'script>',
].join('\n')

export const composableExample = `import { onMounted, onUnmounted, ref } from 'vue'

export function useWindowSize() {
  const width = ref(window.innerWidth)
  const height = ref(window.innerHeight)

  const updateSize = () => {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  onMounted(() => {
    window.addEventListener('resize', updateSize)
  })

  onUnmounted(() => {
    window.removeEventListener('resize', updateSize)
  })

  return {
    width,
    height,
  }
}`

export const teleportModalExample = [
  '<script setup>',
  "import { ref } from 'vue'",
  '',
  'const open = ref(false)',
  '</' + 'script>',
  '',
  '<template>',
  '  <button @click="open = true">打开弹窗</button>',
  '',
  '  <Teleport to="body">',
  '    <div v-if="open" class="modal">',
  '      <p>弹窗 DOM 位于 body 下，状态仍由当前组件管理。</p>',
  '      <button @click="open = false">关闭弹窗</button>',
  '    </div>',
  '  </Teleport>',
  '</template>',
  '',
  '<style scoped>',
  '.modal {',
  '  position: fixed;',
  '  inset: 0;',
  '  z-index: 1000;',
  '  display: grid;',
  '  place-content: center;',
  '  background: rgba(0, 0, 0, 0.4);',
  '}',
  '</style>',
].join('\n')

export const teleportDisabledExample = [
  '<Teleport to="body" :disabled="isMobile">',
  '  <div>桌面端传送到 body，移动端在原位置渲染。</div>',
  '</Teleport>',
].join('\n')

export const teleportDeferExample = [
  '<Teleport defer to="#late-target">',
  '  <p>传送到后面声明的容器。</p>',
  '</Teleport>',
  '',
  '<div id="late-target"></div>',
].join('\n')
