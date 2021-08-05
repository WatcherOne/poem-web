<template>
    <div class="app-container">
        <vex-table
            border
            show-overflow
            ref="xTable"
            :data="tableData"
            :edit-config="{trigger: 'click', mode: 'row', showStatus: true}">
            <vxe-table-column type="checkbox" width="60"></vxe-table-column>
            <vxe-table-column field="name" title="名称" min-width="140" :edit-render="{}">
                <template #edit="scope">
                    <a-input v-model="scope.row.name" @input="$refs.xTable.updateStatus(scope)"></a-input>
                </template>
            </vxe-table-column>
        </vex-table>
    </div>
</template>

<script>
export default {
    data () {
        return {
            tableData: []
        }
    },
    created() {
        this.tableData = [
            { id: 1, name: 'test1', nickname: 'T1', role: 'develop', sex: 0 },
            { id: 2, name: 'test2', nickname: 'T2', role: 'test', sex: 0 },
            { id: 3, name: 'test3', nickname: 'T3', role: 'pm', sex: 1 },
            { id: 4, name: 'test4', nickname: 'T4', role: 'develop', sex: 0 },
            { id: 5, name: 'test5', nickname: 'T5', role: 'designer', sex: 1 }
        ]
    }
}
</script>
