import { defineComponent, getCurrentInstance } from "vue";
import { ElInput } from "element-plus";

export default defineComponent(
  (props, ctx) => {
    const vm = getCurrentInstance()

    const expose = (v) => {
      vm.exposed = v
    }

    const slotsRender = () => {
      return (
        { ...ctx.slots }
      )
    }

    return () => (
      <div>
        <h1>{ props.aaa }</h1>
        <ElInput { ...ctx.attrs } ref={expose}>
          {
            slotsRender()
          }
        </ElInput>
      </div>
    )
  },
  {
    inheritAttrs: false,
    props: {
      aaa: {
        type: String,
        default: '',
      }
    }
  }
)
