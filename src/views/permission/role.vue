<template>
  <div class="app-container">

    <!-- Add Role Button -->
    <el-button
      type="primary"
      @click="handleAddRole"
    >
      {{ t('newRole') }}
    </el-button>

    <!-- Roles Table -->
    <el-table
      :data="rolesList"
      class="roles-table"
      style="width: 100%; margin-top: 30px;"
      border
    >
      <el-table-column
        align="center"
        :label="t('roleKey')"
        width="220"
      >
        <template slot-scope="scope">
          {{ scope.row.key }}
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        :label="t('roleName')"
        width="220"
      >
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>

      <el-table-column
        align="header-center"
        :label="t('description')"
      >
        <template slot-scope="scope">
          {{ scope.row.description }}
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        :label="t('operations')"
      >
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="handleEdit(scope)"
          >
            {{ t('edit') }}
          </el-button>

          <el-button
            type="danger"
            size="small"
            @click="handleDelete(scope)"
          >
            {{ t('delete') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- Role Dialog -->
    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogTitle"
    >
      <el-form
        :model="role"
        label-width="100px"
        label-position="left"
      >
        <el-form-item :label="t('name')">
          <el-input
            v-model="role.name"
            :placeholder="t('roleName')"
          />
        </el-form-item>

        <el-form-item :label="t('desc')">
          <el-input
            v-model="role.description"
            :autosize="{ minRows: 2, maxRows: 4 }"
            type="textarea"
            :placeholder="t('roleDescription')"
          />
        </el-form-item>

        <el-form-item :label="t('menus')">
          <el-tree
            ref="tree"
            :check-strictly="checkStrictly"
            :data="routesData"
            :props="defaultProps"
            show-checkbox
            node-key="path"
            class="permission-tree"
          />
        </el-form-item>
      </el-form>

      <div class="dialog-footer">
        <el-button
          type="danger"
          @click="dialogVisible = false"
        >
          {{ t('cancel') }}
        </el-button>

        <el-button
          type="primary"
          @click="confirmRole"
        >
          {{ t('confirm') }}
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import path from 'path'
import { deepClone } from '@/utils'
import { getRoutes, getRoles, addRole, deleteRole, updateRole } from '@/api/role'
import { t } from '@/utils/admin-language'

const defaultRole = {
  key: '',
  name: '',
  description: '',
  routes: []
}

export default {
  name: 'RolePermission',

  data() {
    return {
      role: Object.assign({}, defaultRole),
      routes: [],
      rolesList: [],
      dialogVisible: false,
      dialogType: 'new',
      checkStrictly: false,
      defaultProps: {
        children: 'children',
        label: 'title'
      }
    }
  },

  computed: {
    routesData() {
      return this.routes
    },

    dialogTitle() {
      return this.dialogType === 'edit'
        ? this.t('editRole')
        : this.t('newRole')
    }
  },

  created() {
    this.getRoutes()
    this.getRoles()
  },

  methods: {
    t,

    async getRoutes() {
      const res = await getRoutes()
      this.serviceRoutes = res.data
      this.routes = this.generateRoutes(res.data)
    },

    async getRoles() {
      const res = await getRoles()
      this.rolesList = res.data
    },

    generateRoutes(routes, basePath = '/') {
      const res = []

      for (let route of routes) {
        if (route.hidden) {
          continue
        }

        const onlyOneShowingChild = this.onlyOneShowingChild(route.children, route)

        if (route.children && onlyOneShowingChild && !route.alwaysShow) {
          route = onlyOneShowingChild
        }

        const data = {
          path: path.resolve(basePath, route.path),
          title: route.meta && route.meta.title ? this.t(route.meta.title) : ''
        }

        if (route.children) {
          data.children = this.generateRoutes(route.children, data.path)
        }

        res.push(data)
      }

      return res
    },

    generateArr(routes) {
      let data = []

      routes.forEach(route => {
        data.push(route)

        if (route.children) {
          const temp = this.generateArr(route.children)

          if (temp.length > 0) {
            data = [...data, ...temp]
          }
        }
      })

      return data
    },

    handleAddRole() {
      this.role = Object.assign({}, defaultRole)

      if (this.$refs.tree) {
        this.$refs.tree.setCheckedNodes([])
      }

      this.dialogType = 'new'
      this.dialogVisible = true
    },

    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.checkStrictly = true
      this.role = deepClone(scope.row)

      this.$nextTick(() => {
        const routes = this.generateRoutes(this.role.routes)
        this.$refs.tree.setCheckedNodes(this.generateArr(routes))
        this.checkStrictly = false
      })
    },

    handleDelete({ $index, row }) {
      this.$confirm(this.t('confirmRemoveRole'), this.t('warning'), {
        confirmButtonText: this.t('confirm'),
        cancelButtonText: this.t('cancel'),
        type: 'warning'
      })
        .then(async() => {
          await deleteRole(row.key)
          this.rolesList.splice($index, 1)

          this.$message({
            type: 'success',
            message: this.t('deleteSuccess')
          })
        })
        .catch(err => {
          console.error(err)
        })
    },

    generateTree(routes, basePath = '/', checkedKeys) {
      const res = []

      for (const route of routes) {
        const routePath = path.resolve(basePath, route.path)

        if (route.children) {
          route.children = this.generateTree(route.children, routePath, checkedKeys)
        }

        if (checkedKeys.includes(routePath) || (route.children && route.children.length >= 1)) {
          res.push(route)
        }
      }

      return res
    },

    async confirmRole() {
      const isEdit = this.dialogType === 'edit'

      const checkedKeys = this.$refs.tree.getCheckedKeys()
      this.role.routes = this.generateTree(deepClone(this.serviceRoutes), '/', checkedKeys)

      if (isEdit) {
        await updateRole(this.role.key, this.role)

        for (let index = 0; index < this.rolesList.length; index++) {
          if (this.rolesList[index].key === this.role.key) {
            this.rolesList.splice(index, 1, Object.assign({}, this.role))
            break
          }
        }
      } else {
        const { data } = await addRole(this.role)
        this.role.key = data.key
        this.rolesList.push(this.role)
      }

      const { description, key, name } = this.role

      this.dialogVisible = false

      this.$notify({
        title: this.t('success'),
        dangerouslyUseHTMLString: true,
        message: `
          <div>${this.t('roleKey')}: ${key}</div>
          <div>${this.t('roleName')}: ${name}</div>
          <div>${this.t('description')}: ${description}</div>
        `,
        type: 'success'
      })
    },

    onlyOneShowingChild(children = [], parent) {
      let onlyOneChild = null
      const showingChildren = children.filter(item => !item.hidden)

      if (showingChildren.length === 1) {
        onlyOneChild = showingChildren[0]
        onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
        return onlyOneChild
      }

      if (showingChildren.length === 0) {
        onlyOneChild = { ...parent, path: '', noShowingChildren: true }
        return onlyOneChild
      }

      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container {
  .roles-table {
    margin-top: 30px;
  }

  .permission-tree {
    margin-bottom: 30px;
  }

  .dialog-footer {
    text-align: right;
  }
}
</style>