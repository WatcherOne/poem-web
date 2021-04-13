<template>
  <div class="tree-container">
    <ul class="tree-box">
      <li v-for="(item, i) in data" :key="i" class="tree-item">
        <div class="level-item">
          <div @click="toggleOpened(item.id)" class="tree-switcher tree-switch_open">
            <MinusSquareOutlined v-if="openedKeys.includes(item.id)" />
            <PlusSquareOutlined v-else />
          </div>
          <div :title="item.title" class="tree-title">{{item.title}}</div>
        </div>
        <ul v-if="openedKeys.includes(item.id)" class="tree-child-tree">
          <li v-for="(child, j) in item.children" :key="j" class="tree-item">
            <span @click="toggleChecked(child.id)" :class="['ant-tree-checkbox', { 'ant-tree-checkbox-checked': checkedKeys.includes(child.id) }]">
              <span class="ant-tree-checkbox-inner"></span>
            </span>
            <span @click="toggleChecked(child.id)" :title="child.title" class="tree-title">
              <slot :item="child"></slot>
            </span>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { PlusSquareOutlined, MinusSquareOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  components: { PlusSquareOutlined, MinusSquareOutlined },
  props: {
    treeData: {
      type: Array,
      default: () => {
        return []
      }
    },
    initOpenedKeys: {
      type: Array,
      default: () => {
        return []
      }
    },
    initCheckedKeys: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  emits: ['update:initOpenedKeys', 'update:initCheckedKeys'],
  setup (props, { emit }) {
    const data = ref(props.treeData)
    const openedKeys = ref(props.initOpenedKeys)
    const checkedKeys = ref(props.initCheckedKeys)
    const toggleOpened = (id) => {
      const index = openedKeys.value.indexOf(id)
      index > -1 ? openedKeys.value.splice(index, 1) : openedKeys.value.push(id)
      emit('update:initOpenedKeys', openedKeys.value)
    }
    const toggleChecked = (id) => {
      const index = checkedKeys.value.indexOf(id)
      index > -1 ? checkedKeys.value.splice(index, 1) : checkedKeys.value.push(id)
      emit('update:initCheckedKeys', openedKeys.value)
    }

    return {
      data,
      openedKeys,
      checkedKeys,
      toggleOpened,
      toggleChecked
    }
  }
})
</script>

<style lang="less" scoped>
.tree-container {
  .tree-box {
    .tree-item {
      padding: 7px 0;
      .level-item {
        display: flex;
        justify-items: center;
        .tree-switcher {
          font-size: 18px;
          color: @btnPrimary;
          margin: 0 10px;
          cursor: pointer;
        }
        .tree-title {
          line-height: 27px;
        }
      }
      .tree-child-tree {
        padding-left: 38px;
        .ant-tree-checkbox {
          top: initial;
          height: 24px;
          margin: 0 4px 0 2px;
          padding: 4px 0;
        }
        .tree-title {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
