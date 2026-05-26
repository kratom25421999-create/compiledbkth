<template>
  <div class="app-container users-page">

    <!-- Admin Card -->
    <div class="admin-card">

      <!-- Title -->
      <h2>{{ t('adminSystem') }}</h2>

      <!-- Logout Button -->
      <el-button
        type="danger"
        class="logout-btn"
        @click="logout"
      >
        {{ t('adminLogout') }}
      </el-button>

      <!-- Users Table -->
      <el-table
        :data="users"
        border
        style="width: 100%;"
      >
        <el-table-column
          prop="id"
          label="ID"
          width="80"
          align="center"
        />

        <el-table-column
          prop="username"
          :label="t('username')"
          align="center"
        />

        <el-table-column
          prop="inviteCode"
          :label="t('inviteCode')"
          align="center"
        />

        <el-table-column
          prop="marketCode"
          :label="t('marketCode')"
          align="center"
        />

        <el-table-column
          prop="createdAt"
          :label="t('createdAt')"
          align="center"
          width="190"
        />

        <el-table-column
          :label="t('action')"
          align="center"
          width="320"
        >
          <template slot-scope="{ row }">

            <el-button
              size="mini"
              type="success"
              @click="editWithdrawPassword(row)"
            >
              {{ t('editWithdrawPassword') }}
            </el-button>

            <el-button
              size="mini"
              type="warning"
              @click="editInviteCode(row)"
            >
              {{ t('editInviteCode') }}
            </el-button>

            <el-button
              size="mini"
              type="danger"
              @click="deleteUser(row)"
            >
              {{ t('delete') }}
            </el-button>

          </template>
        </el-table-column>
      </el-table>

    </div>

  </div>
</template>

<script>
import { t } from '@/utils/admin-language'

export default {
  name: 'Users',

  data() {
    return {
      users: [
        {
          id: 11,
          username: 'Test000',
          inviteCode: '123456',
          marketCode: '123456',
          createdAt: '2026-05-16 19:09:14'
        }
      ]
    }
  },

  methods: {
    t,

    editWithdrawPassword(user) {
      this.$prompt(this.t('enterNewWithdrawPassword'), this.t('editWithdrawPassword'), {
        confirmButtonText: this.t('save'),
        cancelButtonText: this.t('cancel')
      })
        .then(({ value }) => {
          console.log('New withdraw password:', value)

          this.$message.success(
            `${this.t('editWithdrawSuccess')} ${user.username}`
          )
        })
        .catch(() => {})
    },

    editInviteCode(user) {
      this.$prompt(this.t('enterNewInviteCode'), this.t('editInviteCode'), {
        confirmButtonText: this.t('save'),
        cancelButtonText: this.t('cancel')
      })
        .then(({ value }) => {
          user.inviteCode = value

          this.$message.success(this.t('editInviteSuccess'))
        })
        .catch(() => {})
    },

    deleteUser(user) {
      this.$confirm(
        `${this.t('confirmDelete')} ${user.username}?`,
        this.t('confirmDeleteTitle'),
        {
          confirmButtonText: this.t('delete'),
          cancelButtonText: this.t('cancel'),
          type: 'warning'
        }
      )
        .then(() => {
          this.users = this.users.filter(item => item.id !== user.id)

          this.$message.success(this.t('deleteUserSuccess'))
        })
        .catch(() => {})
    },

    logout() {
      this.$store.dispatch('user/logout').then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.users-page {
  min-height: calc(100vh - 50px);
  padding: 50px 30px;
  background: #12191d;
}

.admin-card {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 34px 32px;
  overflow-x: auto;
  box-sizing: border-box;
  border-radius: 22px;
  background: #5f6465;
}

.admin-card h2 {
  margin: 0 0 26px;
  color: #ffffff;
  font-size: 1.625rem;
  font-weight: bold;
  text-align: center;
}

.logout-btn {
  margin-bottom: 22px;
}

::v-deep .el-table th {
  background: #1e88e5;
  color: #ffffff;
  font-weight: bold;
  text-align: center;
}

::v-deep .el-table td {
  color: #111111;
  font-weight: 500;
}

::v-deep .el-button--success {
  background: #18c557;
  border-color: #18c557;
}

::v-deep .el-button--warning {
  background: #f0a800;
  border-color: #f0a800;
  color: #ffffff;
}

::v-deep .el-button--danger {
  background: #f00000;
  border-color: #f00000;
}
</style>