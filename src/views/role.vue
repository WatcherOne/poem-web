<template>
  <div class="container role-container">
    <div :loading="loading" class="box">
      <div class="left-role">
        <div class="header-btns">
          <a-button @click="openModal()" type="primary">增加角色</a-button>
        </div>
        <div v-for="(item, i) in roleList" :key="i" class="role-li">
          <span @click.stop="selectRoleAction(item.id)" :class="['title', { 'active': selectedRole === item.id }]">{{item.name}}</span>
          <span v-if="item.id !== 1" class="icons">
            <FormOutlined @click.stop="openModal(item)" />
            <DeleteOutlined @click.stop="deleteRole(item.id)" />
          </span>
        </div>
      </div>
      <div class="right-menu">
        <div class="header-btns">
          <a-button @click="saveRole" type="primary">保存</a-button>
        </div>
        <div class="role-link-menu">
          <TreeSelect :treeData="treeData" :initOpenedKeys.sync="openedKeys" :initCheckedKeys.sync="checkedKeys" :key="selectedRole">
            <template v-slot="{ item }">{{item.title}} (path: {{item.menu}})</template>
          </TreeSelect>
        </div>
      </div>
      <!-- Add and Edit -->
      <div ref="modalBox">
        <a-modal
          :visible="showModal"
          :title="title"
          :centered="true"
          okText="确认"
          cancelText="取消"
          :getContainer="getContainer"
          :maskClosable="false"
          @cancel="closeModal"
          @ok="submitRole">
          <a-form ref="roleForm" :model="roleInfo">
            <a-form-item label="角色名称" required name="name">
              <a-input v-model:value="roleInfo.name" placeholder="请输入角色名称"></a-input>
            </a-form-item>
          </a-form>
        </a-modal>
      </div>
    </div>
  </div>
</template>

<script>
import {getCurrentInstance, ref, toRaw } from 'vue'
import { FormOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import TreeSelect from '@/components/treeSelect'

export default {
  components: { FormOutlined, DeleteOutlined, TreeSelect },
  setup () {
    const { proxy } = getCurrentInstance()

    const loading = ref(true)
    const roleList = ref([])
    const getData = () => {
      loading.value = true
      // proxy.$http.get('/getUserList').then(res => {
      //   loading.value = false
      //   tableData.value = res
      // })
      roleList.value = [
        { id: 1, name: '超级管理员', menuIds: ['11', '12'] },
        { id: 2, name: '一般管理员', menuIds: ['21', '22'] },
        { id: 4, name: '操作员', menuIds: ['11', '21'] },
        { id: 5, name: '少先队员', menuIds: ['11'] },
        { id: 6, name: '游客', menuIds: ['21'] },
        { id: 7, name: '超级会员', menuIds: ['12', '22'] }
      ]
      treeData.value = [{
        title: '主页',
        id: '1',
        children: [{
          id: '11',
          title: '诗歌管理',
          menu: '/poem/list'
        }, {
          id: '12',
          title: '文章管理',
          menu: '/poem/list'
        }]
      }, {
        title: '操作管理',
        id: '2',
        children: [{
          id: '21',
          title: '测试操作',
          menu: '/poem/list'
        }, {
          id: '22',
          title: '新增操作',
          menu: '/poem/list'
        }]
      }]
      const fristItem = roleList.value[0]
      selectedRole.value = fristItem.id
      openedKeys.value = treeData.value.map(item => item.id)
      checkedKeys.value = fristItem.menuIds
      loading.value = false
    }

    const selectedRole = ref()
    const selectRoleAction = (id) => {
      selectedRole.value = id
      const index = roleList.value.findIndex(item => item.id === id)
      const menuIds = roleList.value[index].menuIds
      openedKeys.value = treeData.value.map(item => item.id)
      checkedKeys.value = menuIds
    }

    const modalBox = ref()
    const showModal = ref(false)
    const title = ref()
    const roleInfo = ref({})
    const getContainer = () => {
      return proxy.$refs.modalBox
    }
    const openModal = (data) => {
      if (data) {
        title.value = '编辑'
        roleInfo.value = JSON.parse(JSON.stringify(data))
      } else {
        title.value = '新增'
        roleInfo.value = { menuIds: [] }
      }
      showModal.value = true
    }
    const closeModal = () => {
      showModal.value = false
    }
    const submitRole = () => {
      const info = toRaw(roleInfo.value)
      if (info.id) {
        const list = toRaw(roleList.value)
        const index = list.findIndex(item => item.id === info.id)
        const oldInfo = list[index]
        list.splice(index, 1, Object.assign(oldInfo, { name: info.name }))
      } else {
        const list = toRaw(roleList.value)
        const len = list.length
        const lastId = list[len - 1].id
        list.push(Object.assign(info, { id: lastId + 1 }))
      }
      showModal.value = false
    }
    const deleteRole = (id) => {
      proxy.$modal.confirm({
        title: '删除操作',
        content: '您确定要删除该角色?',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk() {
          const list = toRaw(roleList.value)
          const index = list.findIndex(item => item.id === id)
          roleList.value.splice(index, 1)
          selectedRole.value === id && selectRoleAction(1)
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    }

    const treeData = ref([])
    const openedKeys = ref([])
    const checkedKeys = ref([])
    const saveRole = () => {
      console.log(openedKeys.value, checkedKeys.value)
    }

    return {
      loading,
      roleList,
      modalBox,
      getContainer,
      showModal,
      title,
      roleInfo,
      openModal,
      closeModal,
      submitRole,
      deleteRole,
      selectedRole,
      selectRoleAction,
      treeData,
      openedKeys,
      checkedKeys,
      saveRole,
      getData
    }
  },
  created: function () {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.container.role-container {
  min-height: 500px;
}
.role-container {
  .box {
    display: flex;
    flex-wrap: nowrap;
    height: 100%;
    .header-btns {
      line-height: 50px;
      text-align: right;
      padding-right: 15px;
      border-bottom: 1px solid @borderColor;
    }
    .left-role {
      width: 350px;
      margin-right: 15px;
      border: 1px solid @borderColor;
      .role-li {
        display: flex;
        flex-wrap: nowrap;
        justify-content: space-between;
        align-items: center;
        line-height: 25px;
        padding: 10px 15px;
        border-bottom: 1px solid @borderColor;
        .title {
          cursor: pointer;
          color: @textColor;
          &.active {
            color: @primaryColor;
          }
          &:hover {
            color: @primaryColor;
          }
        }
        .icons {
          display: flex;
          .anticon {
            margin-left: 10px;
            color: @btnPrimary;
            cursor: pointer;
            font-size: 18px;
            &:hover {
              color: @btnHoverPrimary;
            }
          }
        }
      }
    }
    .right-menu {
      flex: 1;
      border: 1px solid @borderColor;
      .header-btns {
        text-align: left;
        padding-left: 15px;
      }
      .role-link-menu {
        padding: 0 10px 10px;
      }
    }
  }
}
</style>
