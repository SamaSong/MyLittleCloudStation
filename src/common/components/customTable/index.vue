<template>
  <div class="table-container">
    <el-table v-bind="$attrs" ref="tableRef">
      <template v-for="(_, name) in $slots" #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}"></slot>
      </template>
    </el-table>
  </div>
</template>

<script setup>
import { ref, defineOptions, defineExpose } from "vue";

// 表格实例
const tableRef = ref(null)

defineOptions({
  inheritAttrs: false
})

// 表格自定义方法集合
const tableCustomMethods = {

}

// 代理转发实例
const proxy = new Proxy({}, {
  get(_, prop) {
    return tableRef.value?.[prop]
  }
})

// 使用 Proxy 代理 tableRef，将所有未捕获的属性访问都转发给 tableRef.value
defineExpose(Object.assign({}, proxy, tableCustomMethods))
</script>

<style scoped lang="scss">

</style>
