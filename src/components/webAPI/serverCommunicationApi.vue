<script setup>
import ArticleLayout from '@/common/components/ArticleLayout.vue'
import CodeBlock from '@/common/components/codeBlock.vue'
import {
  eventSourceExample,
  pollingExample,
  websocketExample,
} from './serverCommunicationApi.examples.js'
</script>

<template>
  <ArticleLayout
    title="服务器通信API"
    description="整理浏览器与服务器保持连接、双向通信和实时推送相关的 API。"
  >
    <div data-custom="WebSocket">
      <h2 id="_WebSocket">WebSocket</h2>
      <span class="content">
        WebSocket 适合双向实时通信，例如聊天、协同编辑、实时大屏和在线状态同步。连接建立后，客户端和服务端都可以主动发送消息。
      </span>
      <CodeBlock :code="websocketExample" />
      <ul>
        <li>生产环境需要处理断线重连、心跳检测和消息重放。</li>
        <li>页面卸载或组件卸载时主动 close，避免连接泄漏。</li>
        <li>消息体建议统一 JSON 结构，包含 type、payload、requestId 等字段。</li>
      </ul>
    </div>
    <div data-custom="Server-Sent Events">
      <h2 id="_Server-Sent Events">Server-Sent Events</h2>
      <span class="content">
        SSE 适合服务端单向推送，例如通知、日志流、任务进度。它基于 HTTP，浏览器原生支持自动重连，但只能由服务端向客户端推送。
      </span>
      <CodeBlock :code="eventSourceExample" />
    </div>
    <div data-custom="轮询与长轮询">
      <h2 id="_轮询与长轮询">轮询与长轮询</h2>
      <span class="content">
        轮询实现最简单，适合任务状态查询、导出进度等低频场景。高频实时数据不建议使用普通轮询，容易造成无效请求和服务器压力。
      </span>
      <CodeBlock :code="pollingExample" />
    </div>
  </ArticleLayout>
</template>
