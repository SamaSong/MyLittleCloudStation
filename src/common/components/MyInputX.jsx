import { defineComponent, getCurrentInstance } from "vue";
import { ElInput } from "element-plus";

// 样式表
const styleMap = {
  divStyle: {
    width: `100%`,
    color: 'red',
    fontSize: '16px',
  }
}

export default defineComponent(
  (props, ctx) => {
    const vm = getCurrentInstance()
    // 定义的 expose 被传给 ElInput 的 ref，相当于一个 ref 回调。Element Plus 的 ElInput 在渲染后会把自身实例传给这个回调，函数内部再把该实例写入vm.exposed。
    // 这样父组件如果对 <MyInputX ref="xxx" /> 取引用，就能直接拿到 ElInput 的公开方法/属性（focus、blur 等），因为 vm.exposed 会成为外部能访问到的对外暴露对象。
    const expose = (v) => {
      vm.exposed = {
        ...v,
        handleLog() {
          console.log('aaa ==> ', 'aaa')
        }
      }
    }

    // 样式
    const style = { ...styleMap }

    // ElInput 支持插槽渲染方法
    const slotsRender = () => {
      return (
        { ...ctx.slots }
      )
    }

    return () => (
      <div>
        <ElInput { ...ctx.attrs } ref={ expose }>
          {/*渲染插槽*/}
          { slotsRender() }
        </ElInput>
        {/*自定义插槽渲染*/}
        {
          ctx.slots.footer ? (
            <div>
              { ctx.slots.footer() }
            </div>
          ) : (<div>footer插槽位置</div>)
        }
        <div style={style.divStyle}>
          div
        </div>
      </div>
    )
  },
  {
    inheritAttrs: false,
    props: {

    }
  }
)
