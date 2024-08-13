<template>
  <div :class="prefixCls" style="height: 500px;" ref="chartContainer">
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useDesign } from '@/hooks/web/useDesign';
import * as echarts from 'echarts'
import chartData from '../data/life-expectancy-table.json'
import emojiFlags from '../data/emoji-flags.json'
const { prefixCls } = useDesign('analysis-bar')

interface SalesData {
  country: string;
  year: number;
  sales: number;
}

// echarts配置
const chartContainer = ref<HTMLElement | null>(null)
const updateFrequency = 1000;

const countryColors: Record<string, string> = {
  Australia: '#00008b',
  Canada: '#f00',
  China: '#dc143c',
  Cuba: '#002a8f',
  Finland: '#003580',
  France: '#ed2939',
  Germany: '#000',
  Iceland: '#003897',
  India: '#f93',
  Japan: '#bc002d',
  'North Korea': '#024fa2',
  'South Korea': '#000',
  'New Zealand': '#00247d',
  Norway: '#ef2b2d',
  Brazil: '#3f8c53',
  Russia: '#2f51a9',
  Turkey: '#e30a17',
  'United Kingdom': '#00247d',
  'United States': '#b22234'
};
const initData = () => {
  const myChart = echarts.init(chartContainer.value)
  // 绘制图表
  const years: number[] = chartData.reduce((prev, cur) => {
    if (!prev.includes(cur.year)) {
      prev.push(cur.year)
    }
    return prev
  }, [] as number[])
  // 获取对应的旗帜
  let startIndex = 0
  let startYear = years[startIndex]
  function getFlag(countryName: string) {
    if (!countryName) return ''

    return emojiFlags.find(item => item.name === countryName)?.emoji
  }
  const option = {
    grid: {
      top: 50,
      bottom: 30,
      left: 150,
      right: 80
    },
    xAxis: {
      max: 'dataMax',
      axisLabel: {
        formatter: function (n: number) {
          return Math.round(n) + '';
        }
      }
    },
    dataset: {
      source: chartData.filter(item => item.year === startYear).map(item => Object.values(item))
    },
    yAxis: {
      type: 'category',
      inverse: true,
      axisLabel: {
        show: true,
        fontSize: 14,
        formatter: function (value: string) {
          return value + '{flag|' + getFlag(value) + '}';
        },
        rich: {
          flag: {
            fontSize: 25,
            padding: 5
          }
        }
      },
      animationDuration: 300,
      animationDurationUpdate: 300
    },
    series: [
      {
        realtimeSort: true,
        seriesLayoutBy: 'column',
        name: '2020-2024销售数据报表',
        type: 'bar',
        itemStyle: {
          color: function (params: any) {
            return countryColors[params.name]
          }
        },
        encode: {
          x: 2,
          y: 0
        },
        label: {
          show: true,
          position: 'right',
          valueAnimation: true
        },
      }
    ],
    legend: {
      show: true,
      color: '#dc143c'
    },
    // Disable init animation. 
    animationDuration: 0,
    animationDurationUpdate: updateFrequency,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear',
    graphic: {
      elements: [
        {
          type: 'text',
          right: 160,
          bottom: 60,
          style: {
            text: startYear,
            font: 'bolder 80px monospace',
            fill: 'rgba(100, 100, 100, 0.25)'
          },
          z: 100
        }
      ]
    }
  };

  myChart.setOption<echarts.EChartsOption>(option as echarts.EChartsOption);
  for (let i = startIndex; i < years.length - 1; ++i) {
    (function (i) {
      setTimeout(function () {
        updateYear(years[i + 1]);
      }, (i - startIndex) * updateFrequency);
    })(i);
  }

  function updateYear(year: number) {
    let source: SalesData[] = chartData.filter((el: SalesData) => el.year === year) || [] as SalesData[]
    (option as any).dataset.source = source.map(item => Object.values(item));
    (option as any).graphic.elements[0].style.text = year;
    myChart.setOption<echarts.EChartsOption>(option as echarts.EChartsOption);
  }
}

onMounted(() => {
  if (chartContainer.value) {
    initData()
  }
})




</script>
<style scoped lang="scss"></style>