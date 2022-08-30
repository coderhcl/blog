<template>
  <div class="piechart" ref="ChartContainer"></div>
</template>

<script lang="ts" setup>
import * as echarts from 'echarts'
import { onMounted, ref } from 'vue'

const props = defineProps({
  pieData: Object,
})
let chart: any = null
const ChartContainer = ref<HTMLElement>()

onMounted(() => {
  const options = getChartSetOption()
  chart = echarts.init(ChartContainer.value!)
  if (options) chart.setOption(options)
  window.addEventListener('resize', resizeHandler)
})

const resizeHandler = () => {
  if (chart) {
    chart.resize()
  }
}

const getChartSetOption = () => {
  let option = {
    tooltip: {
      trigger: 'item',
      formatter: function (params: any) {
        return (
          '🎉 ' +
          params.seriesName +
          '<br/>' +
          '✨ ' +
          params.name +
          '：' +
          params.value +
          '篇'
        )
      },
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: '标签和文章数',
        type: 'pie',
        radius: '50%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }
  return option
}
</script>

<style scoped>
.piechart {
  width: 100%;
  height: 100%;
}
</style>
