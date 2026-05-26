<template>
  <el-dropdown
    trigger="click"
    @command="handleSetSize"
  >
    <div class="size-icon-box">
      <svg-icon
        class-name="size-icon"
        icon-class="size"
      />
    </div>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="item in sizeOptions"
        :key="item.value"
        :disabled="size === item.value"
        :command="item.value"
      >
        {{ item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  name: 'SizeSelect',

  data() {
    return {
      size: Cookies.get('size') || 'medium',
      sizeOptions: [
        { label: 'Default', value: 'default' },
        { label: 'Medium', value: 'medium' },
        { label: 'Small', value: 'small' },
        { label: 'Mini', value: 'mini' }
      ]
    }
  },

  created() {
    document.documentElement.setAttribute('data-admin-size', this.size)
  },

  methods: {
    handleSetSize(size) {
      this.size = size

      Cookies.set('size', size)
      document.documentElement.setAttribute('data-admin-size', size)

      if (this.$ELEMENT) {
        this.$ELEMENT.size = size
      }

      if (this.$store && this.$store.dispatch) {
        this.$store.dispatch('app/setSize', size)
      }

      this.$message({
        message: 'Switch size success',
        type: 'success',
        duration: 1000
      })

      setTimeout(() => {
        window.location.reload()
      }, 300)
    }
  }
}
</script>

<style lang="scss" scoped>
.size-icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  cursor: pointer;
}

.size-icon {
  font-size: 20px;
}
</style>