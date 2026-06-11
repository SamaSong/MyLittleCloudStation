export const arrayToTreeExample = `function arrayToTree(list) {
  const nodeMap = new Map()
  const tree = []

  list.forEach((item) => {
    nodeMap.set(item.id, { ...item, children: [] })
  })

  list.forEach((item) => {
    const node = nodeMap.get(item.id)
    const parent = nodeMap.get(item.parentId)

    if (parent) {
      parent.children.push(node)
    } else {
      tree.push(node)
    }
  })

  return tree
}`

export const treeFindExample = `function findTreeNode(tree, predicate) {
  const stack = [...tree]

  while (stack.length) {
    const node = stack.shift()

    if (predicate(node)) return node

    if (node.children?.length) {
      stack.unshift(...node.children)
    }
  }

  return null
}`

export const groupByExample = `function groupBy(list, key) {
  return list.reduce((result, item) => {
    const groupKey = typeof key === 'function' ? key(item) : item[key]
    result[groupKey] ||= []
    result[groupKey].push(item)
    return result
  }, {})
}`
