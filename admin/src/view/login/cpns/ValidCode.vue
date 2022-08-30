<template>
  <div class="ValidCode" @click="refreshCode">
    <span
      v-for="(item, index) in codeList"
      :key="index"
      :style="getStyle(item)"
    >
      {{ item.code }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'ValidCode',
  props: {
    width: {
      type: String,
      default: '100px',
    },
    height: {
      type: String,
      default: '40px',
    },
    length: {
      type: Number,
      default: 4,
    },
    refresh: {
      type: Number,
    },
  },
  emits: ['input'],
  setup(props, context) {
    onMounted(() => {
      createdCode()
    })
    const codeList = ref<any>([])
    const createdCode = () => {
      const len = 4
      // const codeList = []
      const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789'
      const charsLen = chars.length
      // 生成
      for (let i = 0; i < len; i++) {
        const rgb = [
          Math.round(Math.random() * 220),
          Math.round(Math.random() * 240),
          Math.round(Math.random() * 200),
        ]
        codeList.value.push({
          code: chars.charAt(Math.floor(Math.random() * charsLen)),
          color: `rgb(${rgb})`,
          fontSize: `${10 + (+[Math.floor(Math.random() * 10)] + 6)}px`,
          padding: `${[Math.floor(Math.random() * 10)]}px`,
          transform: `rotate(${
            Math.floor(Math.random() * 90) - Math.floor(Math.random() * 90)
          }deg)`,
        })
      }

      // 将当前数据派发出去
      context.emit(
        'input',
        codeList.value.map((item: any) => item.code).join(''),
      )
      // console.log(codeList.map((item) => item.code).join(""))
    }
    const getStyle = (data: any) => {
      return `color: ${data.color}; font-size: ${data.fontSize}; padding: ${data.padding}; transform: ${data.transform}`
    }
    const refreshCode = () => {
      codeList.value = []
      createdCode()
    }
    return { codeList, createdCode, getStyle, refreshCode }
  },
})
</script>

<style scoped>
.ValidCode {
  width: 100px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.ValidCode span {
  display: inline-block;
}
</style>
