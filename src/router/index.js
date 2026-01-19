import { createRouter, createWebHistory } from 'vue-router'
import asideConfig from '@/common/config/asideConfig.js'

const moduleMap = {
  ...import.meta.glob('../views/**/*.vue'),
  ...import.meta.glob('../components/**/*.vue'),
}

const toGlobPath = (relativePath) => {
  return `../${relativePath.replace(/^\/+/, '')}`
}

const lazyLoad = (relativePath) => {
  const loader = moduleMap[toGlobPath(relativePath)]
  if (!loader) {
    throw new Error(`[router] 未找到对应的组件文件：${relativePath}`)
  }
  return loader
}

const toRouteName = (path) => {
  const cleanPath = path.replace(/^\//, '')
  if (!cleanPath) return 'root'
  return cleanPath
    .split('/')
    .map((segment) =>
      segment.replace(/(^|-)(\w)/g, (_, __, letter) => letter.toUpperCase())
    )
    .join('')
}

const buildContentRoutes = () => {
  return asideConfig.flatMap((section) => {
    return (
      section.children?.flatMap((group) => {
        if (!group.path || !group.component) {
          return []
        }
        return [
          {
            path: group.path,
            name: group.routeName || toRouteName(group.path),
            component: lazyLoad(group.component),
            meta: {
              section: section.name,
              title: group.name,
            },
          },
        ]
      }) ?? []
    )
  })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/home',
      name: 'Home',
      component: lazyLoad('views/HomeView.vue'),
      meta: {
        title: '首页',
      },
    },
    {
      path: '/WebGL',
      name: 'WebGL',
      component: lazyLoad('views/WebGL.vue'),
      meta: {
        title: 'WebGL',
      },
    },
    ...buildContentRoutes(),
  ],
})

export default router
