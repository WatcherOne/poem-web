<template>
  <div class="container user-container">
    <a-form layout="inline" :model="searchOptions" class="top-search-form">
      <a-form-item label="用户名">
        <a-input v-model:value="searchOptions.username" placeholder="请输入用户名模糊查询"></a-input>
      </a-form-item>
      <a-form-item label="性别">
        <a-select v-model:value="searchOptions.sex">
          <a-select-option value="">全部</a-select-option>
          <a-select-option value="1">男</a-select-option>
          <a-select-option value="2">女</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="状态">
        <a-select v-model:value="searchOptions.status">
          <a-select-option value="">全部</a-select-option>
          <a-select-option value="1">已禁言</a-select-option>
          <a-select-option value="2">已停布</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item>
        <a-button @click="getData" type="primary">搜索</a-button>
      </a-form-item>
      <a-form-item>
        <a-button @click="openModal()" type="primary">新增</a-button>
      </a-form-item>
    </a-form>
    <a-table :loading="loading" :data-source="tableData" :columns="columns" rowKey="userId" :pagination="total > pageSize">
      <template #sex="{ record }">
        {{ record.sex == 1 ? '男' : '女' }}
      </template>
      <template #operation="{ record }">
        <a-button @click="openModal(record)" type="primary" size="small">编辑</a-button>
      </template>
    </a-table>
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
        @ok="submitUser">
        <a-form ref="userForm" :model="userInfo" :rules="rules">
          <a-form-item label="用户名" name="username">
            <a-input v-model:value="userInfo.username" placeholder="请输入用户名"></a-input>
          </a-form-item>
          <a-form-item label="密码" name="password">
            <a-input v-model:value="userInfo.password" placeholder="请输入密码"></a-input>
          </a-form-item>
          <a-form-item label="别称" name="nickname">
            <a-input v-model:value="userInfo.nickname" placeholder="请输入别称"></a-input>
          </a-form-item>
          <a-form-item label="角色" name="roleId">
            <a-input v-model:value="userInfo.roleId" placeholder="请选择角色"></a-input>
          </a-form-item>
          <a-form-item label="性别" name="sex">
            <a-select v-model:value="userInfo.sex">
              <a-select-option :value="1">男</a-select-option>
              <a-select-option :value="2">女</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="状态" name="status">
            <a-select v-model:value="userInfo.status">
              <a-select-option value="1">已禁言</a-select-option>
              <a-select-option value="2">已停布</a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRaw, getCurrentInstance, toRefs } from 'vue'
const columns = [
  { title: '序号', customRender: text => `${text.index + 1}` },
  { title: '用户名', dataIndex: 'username', key: 'username' },
  { title: '别称', dataIndex: 'nickname', key: 'nickname' },
  { title: '性别', dataIndex: 'sex', key: 'sex', align: 'center', slots: { customRender: 'sex' } },
  { title: '角色', dataIndex: 'roleId', key: 'roleId' },
  { title: 'Action', key: 'operation', align: 'center', slots: { customRender: 'operation' } }
]

export default {
  setup () {
    const { proxy } = getCurrentInstance()

    const loading = ref(true)
    const tableData = ref([])
    const pageSize = ref(15)
    const total = ref(0)
    /* **************  检索条件  ***************/
    const searchOptions = reactive({
      username: '',
      sex: '',
      status: ''
    })
    const getData = () => {
      loading.value = true
      const params = toRaw(searchOptions)
      proxy.$http.get('/getUserList', params).then(res => {
        loading.value = false
        tableData.value = res
      })
    }

    /* **************  用户操作-新增 & 编辑  ***************/
    const modalBox = ref()
    const userInfo = ref({})
    const modalData = reactive({
      showModal: false,
      title: '新增'
    })
    const userForm = ref()
    const rules = {
      username: [{ required: true, message: '', trigger: 'blur' }],
      password: [{ required: true, message: '', trigger: 'blur' }],
      roleId: [{ required: true, message: '', trigger: 'change' }],
      sex: [{ required: true, message: '', trigger: 'change' }],
      status: [{ required: true, message: '', trigger: 'change' }]
    }
    const getContainer = () => {
      return proxy.$refs.modalBox
    }
    const openModal = (data) => {
      if (data) {
        userInfo.value = JSON.parse(JSON.stringify(toRaw(data)))
        modalData.title = '编辑'
      } else {
        userInfo.value = { sex: 1, status: '1', roleId: '2' }
        modalData.title = '新增'
      }
      modalData.showModal = true
    }
    const closeModal = () => {
      modalData.showModal = false
    }
    const submitUser = () => {
      const params = toRaw(userInfo.value)
      userForm.value.validate().then(() => {
        console.log(params)
      }).catch(error => {
        console.log(error)
      })
      // proxy.$http.post('/changeUser', params).then(_ => {
      //   closeModal()
      //   getData()
      // })
    }

    return {
      loading,
      searchOptions,
      getData,
      columns,
      tableData,
      pageSize,
      total,
      ...toRefs(modalData),
      modalBox,
      getContainer,
      userForm,
      rules,
      openModal,
      closeModal,
      userInfo,
      submitUser
    }
  },
  created: function () {
    this.getData()
  }
}
</script>

<style lang="less" scoped>
.container.user-container {
  height: initial;
}
</style>
