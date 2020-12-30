<template>
  <div class="container">
    <div class="title">工时统计系统</div>
    <div class="user">
      <span style="margin-left: 20px; margin-right: 20px"
        >当前用户:{{ userName }}</span>
      <router-link to="/"> 退出登录</router-link>
    </div>
  </div>
</template>
<style scoped>
.container {
  background:orange;
  height: 60px;
  /* display: flex;
  justify-content: center; */
}
</style>
<script>
export default {
  props: {
    userName: String
  }
}
</script>
<style scoped>
.user {
  float: right;
  font-size: 10px;
  margin-right: 20px;
  margin-top: -10px;
}
.title {
  font-size: 36px;
  text-align: center;
  clear: both;
}
</style>
