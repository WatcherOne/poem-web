<template>
  <div class="container">
    <a-form layout="inline" :model="searchForm">
      <a-form-item label="用户名">
        <a-input v-model="searchForm.usename"></a-input>
      </a-form-item>
      <a-form-item label="标题">
        <a-input v-model="searchForm.title"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button @click="searchData" type="primary">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-table :data-source="data" :columns="columns"></a-table>
  </div>
</template>

<script>
// 表头
const columns = [
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '年龄', dataIndex: 'age', key: 'age' },
  { title: '地址', dataIndex: 'address', key: 'address' }
]

export default {
  data () {
    return {
      searchForm: {},
      columns,
      data: []
    }
  },
  created: function () {
    this.data = [
      { id: 1, name: '测试数据1', age: 1, address: '地址1' },
      { id: 2, name: '测试数据10', age: 20, address: '地址12' },
      { id: 3, name: '测试数据12', age: 15, address: '地址13' },
      { id: 4, name: '测试数据13', age: 13, address: '地址14' }
    ]
  },
  methods: {
    searchData: function () {
      console.log(this.searchForm)
    }
  }
}
</script>
