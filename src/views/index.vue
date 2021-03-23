<template>
  <div class="index">
    <a-layout>
      <a-layout-header>
        <Header />
      </a-layout-header>
      <a-layout>
        <a-layout-sider :collapsed="collapsed" :trigger="null" collapsible>
          <SiderBar />
        </a-layout-sider>
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
import Header from './header'
import SiderBar from './siderbar'
import { mapState } from 'vuex'

export default {
  components: { Header, SiderBar },
  data () {
    return {}
  },
  computed: {
    ...mapState(['collapsed'])
  },
  created: function () {
    this.autoRouter()
  },
  methods: {
    autoRouter: function () {
      const path = this.$route.path
      const pathArr = path.split('/')
      const openKey = pathArr.length > 2 ? [pathArr[1]] : []
      const activeKey = pathArr.length > 2 ? pathArr[2] : pathArr[1]
      this.$store.dispatch('changeOpenAside', openKey)
      this.$store.dispatch('changeActiveAside', [activeKey])
    }
  }
}
</script>

<style lang="less">
.index {
  .ant-layout-header {
    padding: 0 20px;
    background: @primaryColor;
  }
  .ant-layout-sider {
    background: @primaryColor;
  }
}
</style>
