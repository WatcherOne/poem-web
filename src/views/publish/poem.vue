<template>
    <div class="container">
        <a-form layout="inline" :model="searchOptions" class="top-search-form">
            <a-form-item label="关键词">
                <a-input v-model:value="searchOptions.keywords" placeholder="请输入关键词模糊查询"></a-input>
            </a-form-item>
            <a-form-item label="作者">
                <a-input v-model:value="searchOptions.author" placeholder="请输入作者模糊查询"></a-input>
            </a-form-item>
            <a-form-item label="状态">
                <a-select v-model:value="searchOptions.status">
                    <a-select-option value="">全部</a-select-option>
                    <a-select-option value="1">审核中</a-select-option>
                    <a-select-option value="2">未通过</a-select-option>
                    <a-select-option value="3">已发布</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item>
                <a-button @click="getData" type="primary">搜索</a-button>
            </a-form-item>
        </a-form>
        <div class="poem-lists">
            <div v-for="(item, i) in lists" :key="i" class="each-poem">
                <a-card hoverable>
                    <template #cover>
                        <img :src="item.img" alt="example" />
                    </template>
                    <template class="ant-card-actions" #actions>
                        <SettingOutlined key="setting" />
                        <EditOutlined key="edit" />
                        <span>{{item.time}}</span>
                    </template>
                    <a-card-meta :title="item.title" :description="item.describe"></a-card-meta>
                </a-card>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, toRaw, getCurrentInstance, toRefs } from 'vue'
import { SettingOutlined, EditOutlined } from '@ant-design/icons-vue'

export default {
    components: { SettingOutlined, EditOutlined },
    setup () {
        /* **************  检索条件  ***************/
        const searchOptions = reactive({
            keywords: '',
            author: '',
            status: ''
        })
        const lists = ref([])
        const getData = () => {
            lists.value = [
                { id: 1, img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png', time: '2021-03-21', title: 'Card title', describe: 'This is the description' },
                { id: 2, img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png', time: '2021-03-21', title: 'Card title', describe: 'This is the description' },
                { id: 3, img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png', time: '2021-03-21', title: 'Card title', describe: 'This is the description' },
                { id: 4, img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png', time: '2021-03-21', title: 'Card title', describe: 'This is the description' },
                { id: 5, img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png', time: '2021-03-21', title: 'Card title', describe: 'This is the description' },
                { id: 6, img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png', time: '2021-03-21', title: 'Card title', describe: 'This is the description' },
                { id: 7, img: 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png', time: '2021-03-21', title: 'Card title', describe: 'This is the description' }
            ]
        }

        return {
            searchOptions,
            getData,
            lists
        }
    }
}
</script>

<style lang="less" scoped>
.poem-lists {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .each-poem {
        width: 300px;
        margin-bottom: 15px;
    }
}
</style>
