<template>
  <div class="container">
    <a-form layout="inline" :model="formData" class="top-search-form">
      <a-form-item label="用户名">
        <a-input v-model:value="formData.usename" placeholder="请输入用户名"></a-input>
      </a-form-item>
      <a-form-item label="标题">
        <a-input v-model:value="formData.title" placeholder="请输入标题"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button @click="searchData" type="primary">搜索</a-button>
      </a-form-item>
    </a-form>
    <a-table :data-source="data" :columns="columns" rowKey="id" :pagination="total > pageSize"></a-table>
  </div>
</template>

<script>
import { reactive, ref, toRaw } from 'vue'

export default {
  setup () {
    const columns = [
      { title: '名称', dataIndex: 'name', key: 'name' },
      { title: '年龄', dataIndex: 'age', key: 'age' },
      { title: '地址', dataIndex: 'address', key: 'address' }
    ]
    const formData = reactive({
      usename: '',
      title: ''
    })
    const data = reactive([])
    const pageSize = ref(15)
    const total = ref(0)

    // const getData = () => {
    //   // $http.get('/poemList')
    //   total = 20
    // }

    const searchData = () => {
      total.value = 3
      formData.usename = 23
      console.log('submit', toRaw(formData))
    }

    return {
      formData,
      columns,
      data,
      pageSize,
      total,
      // getData,
      searchData
    }
  },
  created: function () {
    this.total = 10
    this.data = [
      { id: 1, name: '测试数据1', age: 1, address: '地址1' },
      { id: 2, name: '测试数据10', age: 20, address: '地址12' },
      { id: 3, name: '测试数据12', age: 15, address: '地址13' },
      { id: 4, name: '测试数据13', age: 13, address: '地址14' }
    ]
  }
}
</script>
