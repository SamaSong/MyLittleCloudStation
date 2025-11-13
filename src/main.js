import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 导入 vue-highlight-js 和 highlight.js 的样式
import VueHighlightJS from 'vue-highlightjs'
import 'highlight.js/styles/atom-one-dark.css'
import hljs from 'highlight.js/lib/core';
import hljsVuePlugin from "@highlightjs/vue-plugin";
import 'highlight.js/lib/common';

const app = createApp(App)

app.directive('highlight', function (el) {
  let highlight = el.querySelectorAll('pre code');
  highlight.forEach((block) => {
    // Deprecated as of 10.7.0. highlightBlock will be removed entirely in v12.0
    // Deprecated as of 10.7.0. Please use highlightElement now.
    hljs.highlightElement(block);
  })
});

app.use(createPinia())
app.use(ElementPlus)
app.use(VueHighlightJS)
app.use(hljsVuePlugin)
app.use(router)

app.mount('#app')
