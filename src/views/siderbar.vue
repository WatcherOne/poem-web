<template>
  <div class="sidebar">
    <a-menu
      mode="inline"
      :forceSubMenuRender="true"
      :open-Keys="openKeys"
      :selected-Keys="activeKeys"
      @openChange="onOpenChange"
      @select="selectItem"
    >
      <template v-for="(item, i) in siderData" :key="i">
        <template v-if="item.hasChild">
          <sub-menu :menu-info="item" :key="item.key"></sub-menu>
        </template>
        <template v-else>
          <a-menu-item :key="item.key" @click="gotoPage(item.link)">
            <PieChartOutlined />
            <span>{{item.title}}</span>
          </a-menu-item>
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script>
import { siderData } from '../assets/json/static'
import { SubMenu } from '../components/siderbarChild'
import { PieChartOutlined } from '@ant-design/icons-vue'
import { mapState } from 'vuex'

export default {
  name: 'SiderBar',
  components: { PieChartOutlined, SubMenu },
  data () {
    return {
      siderData
    }
  },
  computed: {
    ...mapState(['collapsed', 'openKeys', 'activeKeys'])
  },
  methods: {
    gotoPage: function (path) {
      this.$router.push(path)
    },
    onOpenChange: function (openKeys) {
      this.$store.dispatch('changeOpenAside', openKeys.slice(-1))
    },
    selectItem: function (item) {
      item.item.level === 1 && this.$store.dispatch('changeOpenAside', [])
      this.$store.dispatch('changeActiveAside', item.selectedKeys)
    }
  }
}
</script>

<style lang="less">
.sidebar {
  .ant-menu {
    border-right: 0;
    color: @sidebarColor;
    background: @bgColor;
  }
  .ant-menu .ant-menu-item {
    width: 100%;
    margin: 0;
    padding: 0 16px 8px 24px;
    & > a {
      display: initial;
      color: @sidebarColor;
      &:hover {
        color: @sidebarHoverColor;
      }
    }
    &::after {
      display: none;
    }
    &.ant-menu-item-selected {
      background: @sidebarSeletedBg;
      color: @sidebarSeletedColor;
      & > a {
        color: @sidebarHoverColor;
      }
    }
    &:hover, .ant-menu-submenu-title:hover {
      color: @sidebarHoverColor;
    }
  }
  .ant-menu .ant-menu-submenu {
    &.ant-menu-submenu-selected {
      color: @sidebarActiveColor;
      .ant-menu-submenu-title .ant-menu-submenu-arrow {
        &::before {
          background: @sidebarHoverColor;
        }
        &::after {
          background: @sidebarHoverColor;
        }
      }
    }
    .ant-menu-submenu-title {
      &:hover {
        color: @sidebarHoverColor;
        .ant-menu-submenu-arrow {
          &::before {
            background: @sidebarHoverColor;
          }
          &::after {
            background: @sidebarHoverColor;
          }
        }
      }
      .ant-menu-submenu-arrow {
        &::before {
          background: @sidebarColor;
        }
        &::after {
          background: @sidebarColor;
        }
      }
    }
  }
}
.ant-layout-sider-collapsed .sidebar {
  .ant-menu {
    .ant-menu-submenu-open, .ant-menu-submenu-active {
      color: @sidebarActiveColor;
    }
  }
}
// 收缩后的样式
.ant-menu-item:hover, .ant-menu-item-active {
  color: @sidebarActiveColor;
}
.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
  color: @sidebarActiveColor;
  background: @sidebarSeletedBg;
}
.ant-menu-item:active {
  background: @sidebarBg;
}
</style>
