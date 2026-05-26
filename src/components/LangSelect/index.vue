<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div class="language-icon-box">
      <svg-icon
        class-name="international-icon"
        icon-class="language"
      />
    </div>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        :disabled="currentLang === 'th'"
        command="th"
      >
        ไทย
      </el-dropdown-item>

      <el-dropdown-item
        :disabled="currentLang === 'en'"
        command="en"
      >
        English
      </el-dropdown-item>

      <el-dropdown-item
        :disabled="currentLang === 'zh'"
        command="zh"
      >
        中文
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  name: 'LangSelect',

  data() {
    return {
      currentLang: localStorage.getItem('admin_lang') || 'th'
    }
  },

  methods: {
    handleSetLanguage(lang) {
      this.currentLang = lang

      localStorage.setItem('admin_lang', lang)
      Cookies.set('language', lang)

      if (this.$i18n) {
        this.$i18n.locale = lang
      }

      this.$message({
        message: lang === 'th'
          ? 'เปลี่ยนภาษาแล้ว'
          : lang === 'en'
            ? 'Language changed'
            : '语言已切换',
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
.language-icon-box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  cursor: pointer;
}

.international-icon {
  font-size: 20px;
}
</style>