<template>
  <div class="app-container">

    <!-- Switch Roles -->
    <switch-roles @change="handleRolesChange" />

    <!-- Permission Directive Example -->
    <div
      :key="key"
      style="margin-top: 30px;"
    >

      <!-- Admin Only -->
      <div>
        <span
          v-permission="['admin']"
          class="permission-alert"
        >
          {{ t('only') }}
          <el-tag
            class="permission-tag"
            size="small"
          >
            admin
          </el-tag>
          {{ t('canSeeThis') }}
        </span>

        <el-tag
          v-permission="['admin']"
          class="permission-sourceCode"
          type="info"
        >
          v-permission="['admin']"
        </el-tag>
      </div>

      <!-- Editor Only -->
      <div>
        <span
          v-permission="['editor']"
          class="permission-alert"
        >
          {{ t('only') }}
          <el-tag
            class="permission-tag"
            size="small"
          >
            editor
          </el-tag>
          {{ t('canSeeThis') }}
        </span>

        <el-tag
          v-permission="['editor']"
          class="permission-sourceCode"
          type="info"
        >
          v-permission="['editor']"
        </el-tag>
      </div>

      <!-- Admin And Editor -->
      <div>
        <span
          v-permission="['admin', 'editor']"
          class="permission-alert"
        >
          {{ t('both') }}
          <el-tag
            class="permission-tag"
            size="small"
          >
            admin
          </el-tag>
          {{ t('and') }}
          <el-tag
            class="permission-tag"
            size="small"
          >
            editor
          </el-tag>
          {{ t('canSeeThis') }}
        </span>

        <el-tag
          v-permission="['admin', 'editor']"
          class="permission-sourceCode"
          type="info"
        >
          v-permission="['admin','editor']"
        </el-tag>
      </div>
    </div>

    <!-- Check Permission Example -->
    <div
      :key="'checkPermission' + key"
      style="margin-top: 60px;"
    >
      <aside>
        {{ t('permissionNotice') }}
        <br>
        {{ t('exampleShort') }}
      </aside>

      <el-tabs
        type="border-card"
        style="width: 550px;"
      >
        <el-tab-pane
          v-if="checkPermission(['admin'])"
          label="Admin"
        >
          {{ t('adminCanSeeThis') }}

          <el-tag
            class="permission-sourceCode"
            type="info"
          >
            v-if="checkPermission(['admin'])"
          </el-tag>
        </el-tab-pane>

        <el-tab-pane
          v-if="checkPermission(['editor'])"
          label="Editor"
        >
          {{ t('editorCanSeeThis') }}

          <el-tag
            class="permission-sourceCode"
            type="info"
          >
            v-if="checkPermission(['editor'])"
          </el-tag>
        </el-tab-pane>

        <el-tab-pane
          v-if="checkPermission(['admin', 'editor'])"
          label="Admin-OR-Editor"
        >
          {{ t('bothAdminOrEditorCanSeeThis') }}

          <el-tag
            class="permission-sourceCode"
            type="info"
          >
            v-if="checkPermission(['admin','editor'])"
          </el-tag>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
import permission from '@/directive/permission/index.js'
import checkPermission from '@/utils/permission'
import SwitchRoles from './components/SwitchRoles'
import { t } from '@/utils/admin-language'

export default {
  name: 'DirectivePermission',

  components: {
    SwitchRoles
  },

  directives: {
    permission
  },

  data() {
    return {
      key: 1
    }
  },

  methods: {
    t,
    checkPermission,

    handleRolesChange() {
      this.key++
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  ::v-deep .permission-alert {
    display: inline-block;
    width: 320px;
    margin-top: 15px;
    padding: 8px 16px;
    border-radius: 4px;
    background-color: #f0f9eb;
    color: #67c23a;
  }

  ::v-deep .permission-sourceCode {
    margin-left: 15px;
  }

  ::v-deep .permission-tag {
    background-color: #ecf5ff;
  }
}
</style>