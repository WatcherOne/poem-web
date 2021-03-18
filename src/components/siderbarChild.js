import { PieChartOutlined, MailOutlined } from '@ant-design/icons-vue'

export const SubMenu = {
  name: 'SubMenu',
  components: { PieChartOutlined, MailOutlined },
  props: {
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  },
  template: `
    <a-sub-menu :key="menuInfo.key" v-bind="$attrs">
      <template #title>
        <span>
          <MailOutlined /><span>{{ menuInfo.title }}</span>
        </span>
      </template>
      <template v-for="item in menuInfo.children" :key="item.key">
        <template v-if="item.hasChild">
          <sub-menu :menu-info="item" :key="item.key" />
        </template>
        <template v-else>
          <a-menu-item :key="item.key" @click="gotoPage(item.link)">
            <PieChartOutlined />
            <span>{{item.title}}</span>
          </a-menu-item>
        </template>
      </template>
    </a-sub-menu>
  `,
  methods: {
    gotoPage: function (path) {
      this.$router.push(path)
    }
  }
}
