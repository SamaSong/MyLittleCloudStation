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
