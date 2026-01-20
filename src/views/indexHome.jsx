import { defineComponent, ref, h, computed } from "vue";
import { HOME_PROPS } from "@/views/static.js";

// 写法一
export default defineComponent({
  name: "IndexHome",
  props: {
    ...HOME_PROPS
  },
  setup(props, { emit, slots }) {
    const renderContent = () => {
      return (
        <h1>{ props.title }</h1>
      )
    }

    return () => (
      <div>
        { renderContent() }
      </div>
    )
  }
})

// 写法二
// export default defineComponent(
//   (props, ctx) => {
//     const renderContent = () => {
//       return (
//         <h1>{ props.title }</h1>
//       )
//     }
//
//     return () => (
//       <div>
//         { renderContent() }
//       </div>
//     )
//   },
//   {
//     inheritAttrs: false,
//     props: {
//       ...HOME_PROPS
//     }
//   }
// )
