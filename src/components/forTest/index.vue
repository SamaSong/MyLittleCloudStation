<template>
  <div class="content-container">
<!--    <MyInput ref="InputRef" v-model="modelValue"></MyInput>-->
    <MyInputX v-model="modelValue" ref="myInputXRef">
      <template #append>append</template>
    </MyInputX>
    <el-select
      v-model="dealWithContent"
      placeholder="请选择"
      clearable
      filterable
      allow-create
    >
      <el-option
        v-for="item in list"
        :key="item.dictValue"
        :label="item.dictLabel"
        :value="item.dictValue"
      >
      </el-option>
    </el-select>
<!--    卡片3D翻转的实现 -->
<!--    <div class="card-container">-->
<!--      <div class="card" :class="{flipped: isFlipped}" @click="handleFlipped">-->
<!--        <div class="card-front">点击我</div>-->
<!--        <div class="card-back">你翻到了背面</div>-->
<!--      </div>-->
<!--    </div>-->
  </div>
</template>

<script setup>
import {
  nextTick,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  useTemplateRef
} from "vue";
import Mock from 'mockjs'
// 引入组件
import MyInput from "@/common/components/MyInput.vue";
import MyInputX from "@/common/components/MyInputX.jsx";

const modelValue = ref('')
const myInputXRef = useTemplateRef('myInputXRef')

const dealWithContent = ref(null)

const list = ref()

const template = {
  'list|5-10': [{
    'id|+1': 1,
    'name': '@cname',
    'age|18-60': 1,
    'email': '@email',
    'date': '@date'
  }]
};
const data = Mock.mock(template);

const isFlipped = ref(false);

const handleFlipped = () => {
  isFlipped.value = !isFlipped.value;
}

// const socket = new WebSocket('ws://localhost:3000');

const initWebSocket = () => {
  // 连接成功打开时触发
  socket.addEventListener('open', function (event) {
    console.log('Connected to WebSocket server');
    // 发送消息给服务端
    socket.send('Hello Server!');
  });

// 接收到服务器消息时触发
  socket.addEventListener('message', function (event) {
    console.log('收到服务器消息:', event.data);
  });

// 连接关闭时触发
  socket.addEventListener('close', function (event) {
    console.log('WebSocket 连接已关闭', event.code, event.reason);
  });

// 发生错误时触发
  socket.addEventListener('error', function (event) {
    console.error('WebSocket 错误:', event);
  });
}

onBeforeMount(async () => {
  // initWebSocket()
})

onBeforeUnmount(() => {
  // socket.close();
})

onMounted(async () => {
  await nextTick()
  list.value =[
    {
      dictValue: 0,
      dictLabel: '选项一'
    },
    {
      dictValue: 1,
      dictLabel: '选项二'
    },
    {
      dictValue: 2,
      dictLabel: '选项三'
    },
  ]
  if (list.value.length > 0) {
    dealWithContent.value = list.value[0].dictValue;
  }
  list.value.push({
    dictValue: 'test3',
    dictLabel: 'test3'
  })
  dealWithContent.value = 'test3'
})

var trap = function(height) {

};

const height = [0,1,0,2,1,0,1,3,2,1,2,1]

const aaa = trap(height)

console.log('aaa ==> ', aaa)
</script>

<style scoped lang="scss">
.card-container {
  width: 200px;
  height: 300px;
  perspective: 1000px;
  margin: 50px auto;
  .card {
    cursor: pointer;
    width: 100%;
    height: 100%;
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.6s;
    .card-front,
    .card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      backface-visibility: hidden;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      color: black;
    }
    .card-front {
      background-color: #3498db;
    }
    .card-back {
      background-color: #e74c3c;
      transform: rotateY(180deg);
    }
  }
  /* 翻转状态 */
  .flipped {
    transform: rotateY(180deg);
  }
}

</style>
