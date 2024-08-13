<template>
  <div :class="prefixCls">
    <div class="card-list flex between">
      <a-card title="访问量" :bordered="false">
        <template #extra>
          <a-tag color="pink">日</a-tag>
        </template>
        <div class="statistic">26,868</div>
        <div class="space-content">
          <div class="space-item">
            <span>日同比 12.5%</span>
            <CaretUpOutlined style="color:#50b142" />
          </div>
          <div class="space-item">
            <span>周同比 12.5%</span>
            <CaretUpOutlined style="color: #8acd81;" />
          </div>
        </div>
        <a-divider />
        <div class="flex between">
          <div class="analysis-tip__name">总访问量</div>
          <div class="analysis-tip__num">280万</div>
        </div>
      </a-card>
      <a-card title="销售额" :bordered="false">
        <template #extra>
          <a-tag color="cyan">月</a-tag>
        </template>
        <div class="statistic">26,868</div>
        <a-progress :percent="70" :size="5" />
        <a-divider />
        <div class="flex between">
          <div class="analysis-tip__name">总访问量</div>
          <div class="analysis-tip__num">280万</div>
        </div>
      </a-card>
      <a-card title="订单量" :bordered="false">
        <template #extra>
          <a-tag color="orange">季</a-tag>
        </template>
        <div class="space-content flex between flex-align-center">
          <div class="space-item">
            <div class="space-item__num">1,680</div>
            <div class="space-item__tip">
              <span>季同比 6.5%</span>
              <CaretUpOutlined style="color:#50b142" />
            </div>
          </div>
          <div class="space-item">
            <a-progress type="circle" :percent="75" :size="50" />
          </div>
        </div>
        <a-divider />
        <div class="flex between">
          <div class="analysis-tip__name">转化率</div>
          <div class="analysis-tip__num">60%</div>
        </div>
      </a-card>
      <a-card title="新增用户" :bordered="false">
        <template #extra>
          <a-tag color="green">周</a-tag>
        </template>
        <div class="statistic">128<span style="font-size: 16px;">位</span></div>
        <a-avatar-group :max-count="2" size="small" :max-style="{ color: '#f56a00', backgroundColor: '#fde3cf' }">
          <a-avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
          <a-avatar style="background-color: #1890ff">K</a-avatar>
          <a-tooltip title="Ant User" placement="top">
            <a-avatar style="background-color: #87d068">
              <template #icon>
                <UserOutlined />
              </template>
            </a-avatar>
          </a-tooltip>
          <a-avatar style="background-color: #1890ff">
            <template #icon>
              <AntDesignOutlined />
            </template>
          </a-avatar>
        </a-avatar-group>
        <a-divider style="margin-top: 18px;" />
        <div class="flex between">
          <div class="analysis-tip__name">总用户</div>
          <div class="analysis-tip__num">10800人</div>
        </div>
      </a-card>
    </div>
    <!-- 图表区域 -->
    <BarChart />
    <section>
      <MapChart />
    </section>
</div>
</template>

<script setup lang="ts">
import { useDesign } from '@/hooks/web/useDesign';
import { AntDesignOutlined, CaretUpOutlined, UserOutlined } from '@ant-design/icons-vue';
import BarChart from './components/barChart.vue'
import MapChart from './components/mapChart.vue'

const { prefixCls } = useDesign('analysis')

</script>
<style scoped lang="scss">
$prefix-cls: '#{$namespace}-analysis';

.#{$prefix-cls} {
  padding: 0 20px;
  box-sizing: border-box;
  .card-list {
    margin-bottom: 50px;
    .ant-card {
      flex: 0 0 24%;
      ::v-deep(.ant-progress) {
        margin-bottom: 0;
      }
    }
  }
}

.statistic {
  font-size: 24px;
}

.space-content {
  display: flex;

  .space-item {
    color: var(--text-color-secondary);
    margin-right: 10px;

    .anticon-caret-up {
      margin-left: 5px;
    }
    &__num {
      font-size: 24px;
      color: var(--text-color-primary);
    }
  }
}

.analysis-tip__name,
.analysis-tip__num {
  color: var(--text-color-secondary);
}
</style>