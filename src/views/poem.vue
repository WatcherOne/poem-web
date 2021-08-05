<template>
  <div class="container">
    <a-form layout="inline" :model="searchForm" class="top-search-form">
      <a-form-item label="用户名">
        <a-input v-model="searchForm.usename" placeholder="请输入用户名模糊查询"></a-input>
      </a-form-item>
      <a-form-item label="标题">
        <a-input v-model="searchForm.title" placeholder="请输入标题查询"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button @click="searchData" type="primary">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-table :data-source="data" rowKey="id" :columns="columns">
      <template #operation="{ record }">
        <a-button type="primary" size="small">详情{{record}}</a-button>
      </template>
    </a-table>
  </div>
</template>

<script>
// 表头
const columns = [
  { title: '标题', dataIndex: 'name', key: 'name' },
  { title: '作者', dataIndex: 'age', key: 'age' },
  { title: '编写者', dataIndex: 'address', key: 'address' },
  { title: '状态', dataIndex: 'address', key: 'address' },
  { title: 'Action', key: 'operation', align: 'center', slots: { customRender: 'operation' } }
]

export default {
  data () {
    return {
      searchForm: {},
      columns,
      data: []
    }
  },
  created () {
    this.data = [
      { id: 1, name: '测试数据1', age: 1, address: '地址1' },
      { id: 2, name: '测试数据10', age: 20, address: '地址12' },
      { id: 3, name: '测试数据12', age: 15, address: '地址13' },
      { id: 4, name: '测试数据13', age: 13, address: '地址14' }
    ]
  },
  methods: {
    searchData () {
      this.data = []
      console.log(this.searchForm)
    }
  }
}
</script>
