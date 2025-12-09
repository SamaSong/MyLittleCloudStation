import { defineComponent, ref, computed, h } from 'vue'

export default defineComponent({
  name: 'AnchorComponents',
  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  setup(props) {
    // ul的样式
    const ulStyle = {
      color: '#40AE7C',
      cursor: 'pointer',
      lineHeight: '2em',
    };

    // 点击滑动到相应知识点
    const handleClick = (e) => {
      const anchorPointId = e.target.getAttribute('anchor-point-id')
      const anchorEl = document.getElementById(anchorPointId)
      anchorEl.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }

    return () => (
      <div class={ 'content-container' }>
        <ul style={ ulStyle }>
          {
            props.data.map(item => {
              return (
                <li anchor-point-id={ item[0] } onClick={ handleClick }>{ item[1] }</li>
              )
            })
          }
        </ul>
      </div>
    )
  }
})
