export const websocketExample = `const socket = new WebSocket('wss://example.com/ws')

socket.addEventListener('open', () => {
  socket.send(JSON.stringify({ type: 'ping' }))
})

socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data)
  console.log(data)
})

socket.addEventListener('close', () => {
  console.log('连接已关闭，可以在这里做重连')
})`

export const eventSourceExample = `const source = new EventSource('/api/events')

source.addEventListener('message', (event) => {
  console.log(JSON.parse(event.data))
})

source.addEventListener('notice', (event) => {
  console.log('自定义事件:', event.data)
})

source.addEventListener('error', () => {
  console.log('SSE 连接异常，浏览器会自动尝试重连')
})`

export const pollingExample = `async function pollTask(taskId) {
  const response = await fetch(\`/api/tasks/\${taskId}\`)
  const result = await response.json()

  if (result.status === 'finished') {
    return result
  }

  await new Promise((resolve) => setTimeout(resolve, 1500))
  return pollTask(taskId)
}`
