<template>
  <div class="content-container">
    <canvas id="my_canvas"></canvas>
  </div>
</template>

<script setup>

import {onMounted} from "vue";

const initWebGL = () => {
  const canvas = document.getElementById('my_canvas');
  const gl = canvas.getContext('webgl');
  if (!gl) {
    console.error('WebGL is not supported by your browser.')
    return;
  }

  // 顶点着色器代码
  const vertexShaderSource = `
     attribute vec2 a_position;
     void main() {
        gl_Position = vec4(a_position, 0, 1);
     }
  `;

  // 片元着色器代码
  const fragmentShaderSource = `
     precision mediump float;
     void main() {
        gl_FragColor = vec4(1, 0, 0, 1); // 红色
     }
  `;

  // 创建顶点着色器和片元着色器
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(fragmentShader);

  // 创建着色器程序
  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // 检查着色器程序是否成功链接
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return;
  }

  // 使用着色器程序
  gl.useProgram(shaderProgram);

  // 创建缓冲区对象
  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // 定义三角形的顶点位置
  const positions = [
    -0.5, -0.5,
    0.5, -0.5,
    0.0, 0.5,
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  // 获取顶点位置属性的位置
  const positionAttributeLocation = gl.getAttribLocation(shaderProgram, 'a_position');

  // 启用顶点位置属性
  gl.enableVertexAttribArray(positionAttributeLocation);

  // 指定顶点位置属性的数据格式
  gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

  // 清除画布
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 绘制三角形
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}

onMounted(() => {
  initWebGL()
})
</script>

<style scoped lang="scss">

</style>
