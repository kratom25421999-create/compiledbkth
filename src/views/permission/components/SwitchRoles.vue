<template>
  <div>
    <div class="roles-text">
      {{ t('yourRoles') }}: {{ roles }}
    </div>

    <div class="switch-roles-box">
      <span>{{ t('switchRoles') }}:</span>

      <el-radio-group
        v-model="switchRoles"
        class="switch-roles-radio"
        @change="handleRolesChange"
      >
        <el-radio-button label="editor">
          editor
        </el-radio-button>

        <el-radio-button label="admin">
          admin
        </el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { t } from '@/utils/admin-language'

export default {
  name: 'SwitchRoles',

  data() {
    return {
      switchRoles: ''
    }
  },

  computed: {
    ...mapGetters([
      'roles'
    ])
  },

  created() {
    this.switchRoles = this.roles[0]
  },

  methods: {
    t,

    async handleRolesChange() {
      await this.$store.dispatch('user/changeRoles', this.switchRoles)
      this.$emit('change')
    }
  }
}
</script>

<style lang="scss" scoped>
.roles-text {
  margin-bottom: 15px;
}

.switch-roles-box {
  display: flex;
  align-items: center;
}

.switch-roles-radio {
  margin-left: 10px;
}
</style>