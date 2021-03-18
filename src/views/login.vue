<template>
  <div class="container">
    <div>你需要登录哦</div>
    <a-button @click="login(1)" type="primary">Primary</a-button>
    <button @click="login(1)" style="width:200px;line-height:18px;height:18px">admin点击登录</button>
    <button @click="login(2)" style="width:200px;line-height:18px;height:18px">一般用户点击登录</button>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  methods: {
    login: function (type) {
      localStorage.setItem('role', type)
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  margin: auto;
  text-align: center;
  margin-top: 50px;
}
</style>
