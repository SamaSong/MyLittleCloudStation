export const getAnchorId = (name) => {
  return `_${String(name ?? '').trim()}`
}

export const getAnchorHref = (name) => {
  return `#${getAnchorId(name)}`
}
