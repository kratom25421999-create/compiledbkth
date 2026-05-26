<template>
  <div class="navbar">

    <!-- Hamburger -->
    <hamburger
      id="hamburger-container"
      :is-active="sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />

    <!-- Breadcrumb -->
    <breadcrumb
      id="breadcrumb-container"
      class="breadcrumb-container"
    />

    <!-- Right Menu -->
    <div class="right-menu">
      <template v-if="device !== 'mobile'">

        <!-- Search -->
        <search
          id="header-search"
          class="right-menu-item"
        />

        <!-- Error Log -->
        <error-log
          class="errLog-container right-menu-item hover-effect"
        />

        <!-- Screen Full -->
        <screenfull
          id="screenfull"
          class="right-menu-item hover-effect"
        />

        <!-- Size Select -->
        <el-tooltip
          :content="t('globalSize')"
          effect="dark"
          placement="bottom"
        >
          <size-select
            id="size-select"
            class="right-menu-item hover-effect"
          />
        </el-tooltip>

        <!-- Language Select -->
        <lang-select
          class="right-menu-item hover-effect"
        />

      </template>

      <!-- Avatar Dropdown -->
      <el-dropdown
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <img
            :src="avatar + '?imageView2/1/w/80/h/80'"
            class="user-avatar"
          >
          <i class="el-icon-caret-bottom" />
        </div>

        <el-dropdown-menu slot="dropdown">

          <router-link to="/profile/index">
            <el-dropdown-item>
              {{ t('profileMenu') }}
            </el-dropdown-item>
          </router-link>

          <router-link to="/">
            <el-dropdown-item>
              {{ t('dashboardMenu') }}
            </el-dropdown-item>
          </router-link>

          <a
            target="_blank"
            href="https://github.com/PanJiaChen/vue-element-admin/"
          >
            <el-dropdown-item>
              {{ t('github') }}
            </el-dropdown-item>
          </a>

          <a
            target="_blank"
            href="https://panjiachen.github.io/vue-element-admin-site/"
          >
            <el-dropdown-item>
              {{ t('docs') }}
            </el-dropdown-item>
          </a>

          <el-dropdown-item
            divided
            @click.native="logout"
          >
            <span style="display: block;">
              {{ t('logOut') }}
            </span>
          </el-dropdown-item>

        </el-dropdown-menu>
      </el-dropdown>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import ErrorLog from '@/components/ErrorLog'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import LangSelect from '@/components/LangSelect'
import Search from '@/components/HeaderSearch'

import { t } from '@/utils/admin-language'

export default {
  name: 'Navbar',

  components: {
    Breadcrumb,
    Hamburger,
    ErrorLog,
    Screenfull,
    SizeSelect,
    LangSelect,
    Search
  },

  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device'
    ])
  },

  methods: {
    t,

    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },

    async logout() {
      await this.$store.dispatch('user/logout')

      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  position: relative;
  height: 50px;
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    float: left;
    height: 100%;
    line-height: 46px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      height: 100%;
      padding: 0 8px;
      color: #5a5e66;
      font-size: 18px;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;
        margin-top: 5px;

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          cursor: pointer;
        }

        .el-icon-caret-bottom {
          position: absolute;
          top: 25px;
          right: -20px;
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>