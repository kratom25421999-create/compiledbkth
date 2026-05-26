<template>
  <el-row :gutter="40" class="panel-group">

    <!-- New Visits -->
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div
        class="card-panel"
        @click="handleSetLineChartData('newVisitis')"
      >
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>

        <div class="card-panel-description">
          <div class="card-panel-text">
            {{ t('newVisits') }}
          </div>

          <count-to
            :start-val="0"
            :end-val="102400"
            :duration="2600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>

    <!-- Messages -->
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div
        class="card-panel"
        @click="handleSetLineChartData('messages')"
      >
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>

        <div class="card-panel-description">
          <div class="card-panel-text">
            {{ t('messages') }}
          </div>

          <count-to
            :start-val="0"
            :end-val="81212"
            :duration="3000"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>

    <!-- Purchases -->
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div
        class="card-panel"
        @click="handleSetLineChartData('purchases')"
      >
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="money" class-name="card-panel-icon" />
        </div>

        <div class="card-panel-description">
          <div class="card-panel-text">
            {{ t('purchases') }}
          </div>

          <count-to
            :start-val="0"
            :end-val="9280"
            :duration="3200"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>

    <!-- Shoppings -->
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div
        class="card-panel"
        @click="handleSetLineChartData('shoppings')"
      >
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="shopping" class-name="card-panel-icon" />
        </div>

        <div class="card-panel-description">
          <div class="card-panel-text">
            {{ t('shoppings') }}
          </div>

          <count-to
            :start-val="0"
            :end-val="13600"
            :duration="3600"
            class="card-panel-num"
          />
        </div>
      </div>
    </el-col>

  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { t } from '@/utils/admin-language'

export default {
  name: 'PanelGroup',

  components: {
    CountTo
  },

  methods: {
    t,

    handleSetLineChartData(type) {
      this.$emit('handleSetLineChartData', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    position: relative;
    height: 108px;
    overflow: hidden;
    cursor: pointer;
    font-size: 12px;
    color: #666666;
    background: #ffffff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
    border-color: rgba(0, 0, 0, 0.05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #ffffff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3;
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3;
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      border-radius: 6px;
      transition: all 0.38s ease-out;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      margin: 26px;
      margin-left: 0;
      font-weight: bold;

      .card-panel-text {
        margin-bottom: 12px;
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      float: none !important;
      margin: 14px auto !important;
    }
  }
}
</style>