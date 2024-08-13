<template>
  <div :class="prefixCls" ref="chartContainer" style="height: 800px;"></div>
</template>

<script setup lang="ts">
import { useDesign } from '@/hooks/web/useDesign';
import { computed, onMounted, ref, watch } from 'vue';
import initialChinaGeoJSON from '../data/chinaArea.json'
import saleData from '../data/life-expectancy-table.json'
import * as echarts from 'echarts'
import axios from 'axios';

const { prefixCls } = useDesign('analysis-map')
const chartContainer = ref<HTMLCanvasElement | null>(null)

// 初始化chart
let mapData = initialChinaGeoJSON
const myChart = ref<echarts.EChartsType | null>(null)
// 获取最大的销售额
const initChart = () => {
  // 初始化
  myChart.value = echarts.init(chartContainer.value as HTMLCanvasElement)
  echarts.registerMap('China', mapData as any);
  // 定义一个销售数组，方面地图下钻和回退的数据
  const saleArr: { data: { name: string, value: number }[], min: number, max: number, adcode?: number, level?: string, name?: string, parent?: number }[] = []
  getSaleData()
  // 设置option
  const option = {
    title: {
      text: '2024年中国区域销售额',
    },
    tooltip: {
      trigger: 'item',
      formatter: (params: any) => {
        const { data, name } = params
        return `${name}销售额：${data?.value || 0}`
      }
    },
    toolbox: {
      show: true,
      orient: 'vertical',
      left: 'right',
      top: 'center',
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {}
      }
    },
    visualMap: {
      min: saleArr.at(-1)?.min,
      max: saleArr.at(-1)?.max,
      text: ['High', 'Low'],
      realtime: false,
      calculable: true,
      hoverLink: true,
      inRange: {
        color: ['lightskyblue', 'yellow', 'orangered']
      }
    },
    series: [
      {
        type: 'map',
        map: 'China',
        label: {
          show: true,
        },
        data: saleArr.at(-1)!.data,
      }
    ]
  }
  myChart.value.setOption(option)

  // 获取中国区2024年的销售数据
  function getSaleData() {
    const regions = saleData.filter(item => item.year === 2024 && item.country === 'China')[0].regions
    if (!saleArr.length) {
      const arr = regions?.map(item => {
        return {
          name: item.region.name,
          value: item.sales
        }
      }) as { name: string, value: number }[]
      arr?.sort((a, b) => a.value - b.value)
      const min = arr![0].value
      const max = arr!.at(-1)!.value
      saleArr.push({
        data: arr,
        min,
        max
      })
      return
    }
    const lastData = saleArr.at(-1)
    if (lastData?.level === 'province') {
      // 获取城市数据
      const provinceData = regions?.find(item => item.region.name === lastData.name)
      if (!provinceData) {
        saleArr.push({
          data: [],
          min: 0,
          max: 0
        })
        return
      }
      const cities = provinceData?.cities
      const arr = cities?.map(item => {
        return {
          name: item.city,
          value: item.sales
        }
      }) as { name: string, value: number }[]

      arr?.sort((a, b) => a.value - b.value)
      const min = arr![0].value
      const max = arr!.at(-1)!.value
      saleArr.push({
        data: arr,
        min,
        max
      })
    } else if (lastData?.level === 'city') {
      const preProvince = saleArr.at(-2) // 获取上一级省份
      if (!preProvince) {
        saleArr.push({
          data: [],
          min: 0,
          max: 0
        })
        return
      }
      const cities = regions?.find(item => item.region.name === preProvince!.name)?.cities
      if (!cities) {
        saleArr.push({
          data: [],
          min: 0,
          max: 0
        })
        return
      }

      const counties = cities?.find(item => item.city === lastData.name)?.counties
      if (counties?.length === 0) {
        saleArr.push({
          data: [],
          min: 0,
          max: 0
        })
        return
      }
      const arr = counties?.map(item => {
        return {
          name: item.county,
          value: item.sales
        }
      }) as { name: string, value: number }[]

      arr?.sort((a, b) => a.value - b.value)
      const min = arr![0].value
      const max = arr!.at(-1)!.value
      saleArr.push({
        data: arr,
        min,
        max
      })
    } else if (lastData?.level === 'district') {

    }
  }

  // 点击visualMap更新地图数据
  myChart.value.on('dataRangeSelected', () => {
    myChart.value!.setOption(option)
  })

  // 下钻地图
  myChart.value.on('click', (params: any) => {
    // 获取当前点击的区域名称
    const { name } = params
    const features = mapData.features
    const targetArea = features.find(item => item.properties.name === name)
    const { properties } = targetArea!
    if (properties.level === 'district') return

    saleArr.at(-1)!.adcode = properties.adcode as number
    saleArr.at(-1)!.level = properties.level as string
    saleArr.at(-1)!.name = properties.name as string
    saleArr.at(-1)!.parent = properties.parent?.adcode as number
    getSaleData()
    reqGeoData(properties.adcode)

  })
  // 右键鼠标往上一级
  myChart.value.on('contextmenu', (params: any) => {
    params.event?.stop()
    if (saleArr.length === 1) return
    saleArr.pop()
    const adcode = saleArr.at(-1)!.parent as number
    reqGeoData(adcode)
  })

  // 获取geo数据
  const reqGeoData = async (adcode: number | string) => {
    const res = await axios.get(`https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=${adcode}_full`)
    const data = res.data
    mapData = data
    updateMap()
  }
  // 更新地图 
  const updateMap = () => {
    myChart.value!.clear()
    echarts.registerMap('China', mapData as any);
    option.visualMap = {
      ...option.visualMap,
      min: saleArr.at(-1)?.min,
      max: saleArr.at(-1)?.max
    }
    option.series[0].data = saleArr.at(-1)!.data
    myChart.value!.setOption(option)
  }
}

onMounted(() => {
  if (chartContainer.value) {
    initChart()
  }
})


</script>
<style scoped lang="scss"></style>