export const addClassExample = `// 元素注册表（ElementRegistry）实例，用于管理当前 BPMN 流程图中的所有图形元素
const registry = viewer.get('elementRegistry');
registry.getAll().forEach((el) => {
  // 删除类名
  canvas.removeMarker(el.id, 'className');
  // 添加类名
  canvas.addMarker(el.id, 'className');
})`
