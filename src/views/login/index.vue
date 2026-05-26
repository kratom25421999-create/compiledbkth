<template>
  <div class="admin-login-page">
    <div class="admin-login-wrapper">
      <div class="admin-login-box">

        <!-- Language Button -->
        <div class="language-box">
          <button
            type="button"
            class="language-btn"
            @click="toggleLanguageMenu"
          >
            <img :src="languageIcon" alt="language">
          </button>

          <div
            class="language-menu"
            :class="{ show: showLang }"
          >
            <button type="button" @click="changeLang('th')">ไทย</button>
            <button type="button" @click="changeLang('en')">English</button>
            <button type="button" @click="changeLang('zh')">中文</button>
          </div>
        </div>

        <!-- Title -->
        <h2>{{ text.title }}</h2>

        <!-- Admin Login Form -->
        <form
          @submit.prevent="handleLogin"
          @keydown.enter.prevent="handleLogin"
        >

          <!-- Username -->
          <div class="admin-input-box">
            <span class="admin-icon">👤</span>

            <input
              v-model="loginForm.username"
              type="text"
              :placeholder="text.username"
              autocomplete="username"
            >
          </div>

          <!-- Password -->
          <div class="admin-input-box">
            <span class="admin-icon">🔒</span>

            <input
              v-model="loginForm.password"
              :type="passwordType"
              :placeholder="text.password"
              autocomplete="current-password"
            >

            <button
              type="button"
              class="admin-pass-toggle"
              @click="togglePassword"
            >
              <svg class="eye-icon" viewBox="0 0 24 24">
                <path d="M2 4.3 3.3 3 21 20.7 19.7 22l-3.1-3.1c-1.4.7-3 .1-4.6.1-5 0-9.3-3.1-11-7 .8-1.9 2.3-3.6 4.1-4.8L2 4.3zm8.1 5.8a2.5 2.5 0 0 0 3.8 3.8l-3.8-3.8zM12 5c5 0 9.3 3.1 11 7-.5 1.2-1.3 2.3-2.3 3.3L17.8 12.4A5.8 5.8 0 0 0 11.6 6.2L9.5 4.1C10.3 5.1 11.1 5 12 5z" />
              </svg>
            </button>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="admin-login-btn"
            :class="{ loading: loading }"
            :disabled="loading"
          >
            {{ loading ? text.loading : text.login }}
          </button>

        </form>

        <!-- Result Message -->
        <p id="result">{{ result }}</p>

      </div>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import languageIcon from '@/assets/language-icon.png'

export default {
  name: 'Login',

  data() {
    return {
      languageIcon,

      loginForm: {
        username: 'admin',
        password: '111111'
      },

      loading: false,
      passwordType: 'password',
      showLang: false,
      lang: localStorage.getItem('admin_lang') || 'th',
      result: '',
      redirect: undefined,

      languageText: {
        th: {
          title: 'เข้าสู่ระบบ',
          username: 'ชื่อผู้ดูแลระบบ',
          password: 'รหัสผ่านแอดมิน',
          login: 'เข้าสู่ระบบ',
          loading: 'กำลังเข้าสู่ระบบ...',
          emptyUsername: 'กรุณากรอกชื่อผู้ดูแลระบบ',
          invalidPassword: 'กรุณากรอกรหัสผ่านอย่างน้อย 6 ตัว',
          loginFailed: 'เข้าสู่ระบบไม่สำเร็จ'
        },
        en: {
          title: 'Admin Login',
          username: 'Admin username',
          password: 'Admin password',
          login: 'Login',
          loading: 'Logging in...',
          emptyUsername: 'Please enter admin username',
          invalidPassword: 'Please enter at least 6 characters',
          loginFailed: 'Login failed'
        },
        zh: {
          title: '管理员登录',
          username: '管理员账号',
          password: '管理员密码',
          login: '登录',
          loading: '登录中...',
          emptyUsername: '请输入管理员账号',
          invalidPassword: '请输入至少 6 个字符',
          loginFailed: '登录失败'
        }
      }
    }
  },

  computed: {
    text() {
      return this.languageText[this.lang] || this.languageText.th
    }
  },

  watch: {
    $route: {
      handler(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },

  created() {
    this.applyGlobalLanguage(this.lang)
  },

  methods: {
    applyGlobalLanguage(lang) {
      localStorage.setItem('admin_lang', lang)
      Cookies.set('language', lang)

      if (this.$i18n) {
        this.$i18n.locale = lang
      }
    },

    toggleLanguageMenu() {
      this.showLang = !this.showLang
    },

    togglePassword() {
      this.passwordType = this.passwordType === 'password' ? 'text' : 'password'
    },

    changeLang(lang) {
      this.lang = lang
      this.showLang = false
      this.result = ''
      this.applyGlobalLanguage(lang)
    },

    handleLogin() {
      if (this.loading) return

      if (!this.loginForm.username) {
        this.result = this.text.emptyUsername
        return
      }

      if (!this.loginForm.password || this.loginForm.password.length < 6) {
        this.result = this.text.invalidPassword
        return
      }

      this.applyGlobalLanguage(this.lang)

      this.loading = true
      this.result = ''

      this.$store.dispatch('user/login', this.loginForm)
        .then(() => {
          this.loading = false

          this.$router.push({
            path: this.redirect || '/'
          })
        })
        .catch(() => {
          this.loading = false
          this.result = this.text.loginFailed
        })
    }
  }
}
</script>

<style lang="scss" scoped>
/* =========================
   Admin Login Page
   ========================= */

.admin-login-page {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background: #4f9fe8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.admin-login-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.admin-login-box {
  width: 420px;
  background: #2e5f90;
  border-radius: 20px;
  padding: 28px 28px 36px;
  position: relative;
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.12);
}

.admin-login-box h2 {
  text-align: center;
  color: #ffffff;
  font-size: 24px;
  margin: 0 0 28px;
  font-weight: bold;
}

/* =========================
   Language Button
   ========================= */

.language-box {
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 20;
}

.language-btn {
  position: static;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.language-btn:hover {
  background: transparent;
}

.language-btn img {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.language-menu {
  display: none;
  position: absolute;
  top: 36px;
  right: 0;
  width: 120px;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.25);
  z-index: 999;
}

.language-menu.show {
  display: block;
}

.language-menu button {
  width: 100%;
  height: auto;
  border: none;
  border-radius: 0;
  background: #ffffff;
  color: #1f2937;
  padding: 10px 12px;
  text-align: left;
  cursor: pointer;
  font-size: 14px;
  font-weight: normal;
}

.language-menu button:hover {
  background: #eaf4ff;
}

/* =========================
   Form Inputs
   ========================= */

.admin-input-box {
  width: 100%;
  height: 48px;
  background: #255180;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  display: flex;
  align-items: center;
  overflow: hidden;
  margin-bottom: 18px;
}

.admin-icon {
  width: 48px;
  min-width: 48px;
  height: 48px;
  text-align: center;
  color: #9fb6c9;
  font-size: 16px;
  background: #255180;
  display: flex;
  align-items: center;
  justify-content: center;
}

.admin-input-box input {
  flex: 1;
  height: 100%;
  border: none;
  outline: none;
  background: #273b52;
  color: #ffffff;
  padding: 0 14px;
  font-size: 16px;
  font-weight: 500;
}

.admin-input-box input::placeholder {
  color: #dbe6ef;
  font-size: 15px;
}

/* =========================
   Password Toggle Button
   ========================= */

.admin-pass-toggle {
  width: 44px;
  min-width: 44px;
  height: 100%;
  border: none;
  outline: none;
  background: #255180;
  color: #b8c8d8;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.admin-pass-toggle:hover {
  color: #ffffff;
  background: #255180;
}

.admin-pass-toggle .eye-icon {
  width: 22px;
  height: 22px;
  fill: currentColor;
}

/* =========================
   Login Button
   ========================= */

.admin-login-btn {
  width: 100%;
  height: 46px;
  border: none;
  border-radius: 4px;
  background: #278df1;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 6px;
  transition: opacity 0.2s ease, filter 0.2s ease;
}

.admin-login-btn:hover {
  background: #147fe6;
}

.admin-login-btn.loading,
.admin-login-btn:disabled {
  background: #278df1;
  opacity: 0.55;
  cursor: not-allowed;
}

.admin-login-btn .btn-spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-right: 8px;
  border: 2px solid rgba(255, 255, 255, 0.45);
  border-top-color: #ffffff;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  vertical-align: middle;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* =========================
   Result Message
   ========================= */

.admin-login-box #result {
  text-align: center;
  margin-top: 14px;
  min-height: 20px;
  font-weight: bold;
  color: white;
  background: transparent;
  border: none;
  box-shadow: none;
  padding: 0;
}
</style>