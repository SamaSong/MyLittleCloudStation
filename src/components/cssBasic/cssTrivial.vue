<script setup>
  import AnchorComponents from "@/components/anchorComponents.jsx";
  import { CSS_ANCHOR_POINT } from './static.js'
</script>

<template>
  <div class="content-container">
    <h1 class="title">CSS琐碎知识🧀</h1>
    <div data-custom="1、Element相关">
      <h2 id="_1、Element相关">1、Element相关</h2>
      <AnchorComponents :data="CSS_ANCHOR_POINT" />
      <h3 id="css_1">锚点定位 Element：scrollIntoView() 方法</h3>
        <span class="content">
          Element 接口的 scrollIntoView() 方法会滚动元素的祖先容器，使得被调用该方法的元素对用户可见。<br>
        </span>
        <ul>
          可选两个参数：alignToTop || options
          <li>
            <span class="bgc">alignToTop</span>：true ==> 元素的顶端将和其所在滚动区的可视区域的顶端对齐。 || false ==> 元素的底端将和其所在滚动区的可视区域的底端对齐。
          </li>
          <li>
            <span class="bgc">options</span>是一个对象 { behavior 可选，block 可选，container 可选，inline 可选 }
            <ul>
              behavior: 定义滚动是立即的还是平滑的动画。可以为以下值之一：
              <li><span class="bgc">smooth</span>：滚动应该是平滑的动画。</li>
              <li><span class="bgc">instant</span>：滚动应该通过一次跳跃立刻发生。</li>
              <li><span class="bgc">auto</span>：滚动行为由 scroll-behavior(css属性：值为以上两个值) 的计算值决定。</li>
            </ul>
            <ul>
              block：定义元素在可滚动祖先容器内的垂直对齐方式。
              <li><span class="bgc">start</span>：将元素顶部边缘与可滚动容器顶部对齐，使元素垂直方向出现在可见区域起始处。</li>
              <li><span class="bgc">center</span>：将元素垂直居中于可滚动容器，使其位于可见区域中央。</li>
              <li><span class="bgc">end</span>：将元素底部边缘与可滚动容器底部对齐，使元素垂直位于可见区域末端。</li>
              <li><span class="bgc">nearest</span>：沿垂直方向将元素滚动至最近边缘。若元素更靠近滚动容器顶部，则对齐顶部；若更靠近底部，则对齐底部。此方式可最小化滚动距离。</li>
            </ul>
            <ul>
              container：定义可滚动祖先容器。
              <li><span class="bgc">all</span>：所有可滚动容器均受影响（包括视口）。</li>
              <li><span class="bgc">nearest</span>：仅最近的可滚动容器受滚动影响。</li>
            </ul>
            <ul>
              inline：定义元素在可滚动祖先容器内的水平对齐方式。
              <li><span class="bgc">start</span>：将元素左边缘与可滚动容器左侧对齐，使元素在可见区域水平方向上显示于起始位置。</li>
              <li><span class="bgc">center</span>：将元素水平居中对齐于可滚动容器中央，使其位于可见区域正中。</li>
              <li><span class="bgc">end</span>：将元素右边缘与可滚动容器右侧对齐，使元素水平方向位于可见区域末端。</li>
              <li><span class="bgc">nearest</span>：将元素水平方向滚动至最近边缘。若元素更靠近滚动容器左侧，则向左对齐；若更靠近右侧，则向右对齐。此方式可最小化滚动距离。</li>
            </ul>
          </li>
        </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
  ul li {
    line-height: 2.5em;
  }
</style>
