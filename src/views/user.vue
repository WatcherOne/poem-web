<template>
  <div class="container">
    <a-form layout="inline" :model="formData" class="top-search-form">
      <a-form-item label="用户名">
        <a-input v-model:value="formData.username" placeholder="请输入用户名模糊查询"></a-input>
      </a-form-item>
      <a-form-item label="性别">
        <a-select v-model:value="formData.sex">
          <a-select-option value="">全部</a-select-option>
          <a-select-option value="1">男</a-select-option>
          <a-select-option value="2">女</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="状态">
        <a-select>
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
    <a-table :loading="loading" :data-source="data" :columns="columns" rowKey="userId" :pagination="total > pageSize">
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
        v-model:visible="showModal"
        :title="title"
        :centered="true"
        okText="确认"
        cancelText="取消"
        :getContainer="() => this.$refs.modalBox"
        @ok="submitData">
        <a-form :model="submitForm">
          <a-form-item label="用户名">
            <a-input v-model:value="submitForm.username" placeholder="请输入用户名"></a-input>
          </a-form-item>
          <a-form-item label="别称">
            <a-input v-model:value="submitForm.nickname" placeholder="请输入别称"></a-input>
          </a-form-item>
          <a-form-item label="性别">
            <a-select v-model:value="submitForm.sex">
              <a-select-option value="">全部</a-select-option>
              <a-select-option value="1">男</a-select-option>
              <a-select-option value="2">女</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="状态">
            <a-select>
              <a-select-option value="">全部</a-select-option>
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
    const { ctx } = getCurrentInstance()
    const formData = reactive({
      username: '',
      nickname: '',
      sex: ''
    })
    const submitForm = ref({})
    const modalData = reactive({
      showModal: false,
      title: '新增'
    })
    const loading = ref(true)
    const data = ref([])
    const pageSize = ref(15)
    const total = ref(0)

    const getData = () => {
      loading.value = true
      const params = toRaw(formData)
      ctx.$http.get('/getUserList', params).then(res => {
        loading.value = false
        data.value = res
      })
    }

    const openModal = (data) => {
      if (data) {
        submitForm.value = JSON.parse(JSON.stringify(toRaw(data)))
        modalData.title = '编辑'
      } else {
        submitForm.value = {}
        modalData.title = '新增'
      }
      modalData.showModal = true
    }

    const submitData = () => {
      const params = toRaw(submitForm.value)
      console.log(params)
      ctx.$http.post('/changeUser', params, res => {
        console.log(res)
      })
    }

    return {
      formData,
      columns,
      loading,
      data,
      pageSize,
      total,
      getData,
      openModal,
      ...toRefs(modalData),
      submitForm,
      submitData
    }
  },
  created: function () {
    this.getData()
  }
}
</script>
