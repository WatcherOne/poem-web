<template>
  <div class="header">
    <div class="left">
      <a-button type="primary" @click="toggleCollapsed">
        <MenuUnfoldOutlined v-if="collapsed" />
        <MenuFoldOutlined v-else />
      </a-button>
    </div>
    <div class="right">
      <a-button @click="changeColor" type="danger">切换颜色</a-button>
    </div>
  </div>
</template>

<script>
import { themeArr } from '../assets/json/static'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue'
import { mapState } from 'vuex'

export default {
  name: 'Header',
  components: { MenuUnfoldOutlined, MenuFoldOutlined },
  data () {
    return {
      selectedTheme: true
    }
  },
  computed: {
    ...mapState(['collapsed'])
  },
  methods: {
    changeColor: function () {
      const index = Math.round((Math.random() * 2))
      document.getElementById('app').className = themeArr[index]
    },
    toggleCollapsed: function () {
      this.$store.dispatch('toggleCollapsed')
    }
  }
}
</script>
