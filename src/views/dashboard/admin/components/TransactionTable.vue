<template>
  <el-table
    :data="list"
    class="transaction-table"
    style="width: 100%; padding-top: 15px;"
  >

    <!-- Order No -->
    <el-table-column
      :label="t('orderNo')"
      min-width="200"
    >
      <template slot-scope="scope">
        {{ scope.row.order_no | orderNoFilter }}
      </template>
    </el-table-column>

    <!-- Price -->
    <el-table-column
      :label="t('price')"
      width="195"
      align="center"
    >
      <template slot-scope="scope">
        ¥{{ scope.row.price | toThousandFilter }}
      </template>
    </el-table-column>

    <!-- Status -->
    <el-table-column
      :label="t('status')"
      width="120"
      align="center"
    >
      <template slot-scope="{ row }">
        <el-tag :type="statusType(row.status)">
          {{ statusText(row.status) }}
        </el-tag>
      </template>
    </el-table-column>

  </el-table>
</template>

<script>
import { transactionList } from '@/api/remote-search'
import { t } from '@/utils/admin-language'

export default {
  name: 'TransactionTable',

  filters: {
    orderNoFilter(str) {
      return str.substring(0, 30)
    }
  },

  data() {
    return {
      list: []
    }
  },

  created() {
    this.fetchData()
  },

  methods: {
    t,

    fetchData() {
      transactionList().then(response => {
        this.list = response.data.items.slice(0, 8)
      })
    },

    statusType(status) {
      const statusMap = {
        success: 'success',
        pending: 'danger'
      }

      return statusMap[status] || 'info'
    },

    statusText(status) {
      const statusTextMap = {
        success: this.t('successStatus'),
        pending: this.t('pendingStatus')
      }

      return statusTextMap[status] || status
    }
  }
}
</script>

<style lang="scss" scoped>
.transaction-table {
  width: 100%;
}
</style>