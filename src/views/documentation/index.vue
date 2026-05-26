<template>
  <div class="app-container documentation-container">

    <a
      class="document-btn"
      target="_blank"
      href="https://store.akveo.com/products/vue-java-admin-dashboard-spring?utm_campaign=akveo_store-Vue-Vue_demo%2Fgithub&utm_source=vue_admin&utm_medium=referral&utm_content=demo_English_button"
    >
      {{ t('javaBackendIntegration') }}
    </a>

    <a
      class="document-btn"
      target="_blank"
      href="https://panjiachen.github.io/vue-element-admin-site/"
    >
      {{ t('documentation') }}
    </a>

    <a
      class="document-btn"
      target="_blank"
      href="https://github.com/PanJiaChen/vue-element-admin/"
    >
      {{ t('githubRepository') }}
    </a>

    <a
      class="document-btn"
      target="_blank"
      href="https://panjiachen.gitee.io/vue-element-admin-site/zh/"
    >
      {{ t('chineseDocumentation') }}
    </a>

    <dropdown-menu
      class="document-btn"
      :items="articleList"
      :title="t('seriesArticles')"
    />

    <a
      class="document-btn"
      target="_blank"
      href="https://panjiachen.github.io/vue-element-admin-site/zh/job/"
    >
      {{ t('jobReferral') }}
    </a>

  </div>
</template>

<script>
import DropdownMenu from '@/components/Share/DropdownMenu'
import { t } from '@/utils/admin-language'

export default {
  name: 'Documentation',

  components: {
    DropdownMenu
  },

  computed: {
    articleList() {
      return [
        {
          title: this.t('articleBasic'),
          href: 'https://juejin.im/post/59097cd7a22b9d0065fb61d2'
        },
        {
          title: this.t('articleLoginPermission'),
          href: 'https://juejin.im/post/591aa14f570c35006961acac'
        },
        {
          title: this.t('articlePractice'),
          href: 'https://juejin.im/post/593121aa0ce4630057f70d35'
        },
        {
          title: this.t('articleTemplate'),
          href: 'https://juejin.im/post/595b4d776fb9a06bbe7dba56'
        },
        {
          title: this.t('articleV4'),
          href: 'https://juejin.im/post/5c92ff94f265da6128275a85'
        },
        {
          title: this.t('articleCustomComponent'),
          href: 'https://segmentfault.com/a/1190000009090836'
        },
        {
          title: this.t('articleUseIcon'),
          href: 'https://juejin.im/post/59bb864b5188257e7a427c09'
        },
        {
          title: this.t('articleWebpackTop'),
          href: 'https://juejin.im/post/59bb864b5188257e7a427c09'
        },
        {
          title: this.t('articleWebpackBottom'),
          href: 'https://juejin.im/post/5b5d6d6f6fb9a04fea58aabc'
        }
      ]
    }
  },

  methods: {
    t
  }
}
</script>

<style lang="scss" scoped>
.documentation-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 50px;

  .document-btn {
    display: block;
    flex-shrink: 0;
    height: 60px;
    margin: 16px;
    padding: 0 16px;
    line-height: 60px;
    background: #000000;
    color: #ffffff;
    font-size: 20px;
    text-align: center;
    cursor: pointer;
  }
}
</style>