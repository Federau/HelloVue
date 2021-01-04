<template>
  <el-card class="boxCard">
    <div >
    <h3 >工时统计系统</h3>
   <el-input
    placeholder="用户名"
    prefix-icon="el-icon-mobile-phone"
    v-model="UserName">
  </el-input>
  <br/>
   <el-input
    placeholder="密码"
    prefix-icon="el-icon-mobile-phone"
    @keydown.enter.native="login"
    v-model="Password" type="password">
  </el-input>
  <br/>
  <el-button @click="login" type="primary" size="medium">登录</el-button>
  </div>
  </el-card>
</template>
<script>
// import api from '@/util/api'
// import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      UserName: '',
      Password: '',
      CompanyName: '',
      IsActive: false
    }
  },
  methods: {
    login: function () {
      // const request = axios.create({
      //   baseURL: '/api',
      //   withCredentials: false, // 表示跨域请求时是否需要使用凭证
      //   headers: {
      //     timeout: 10000
      //     // 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      //     // 'Content-Type': 'application/json'
      //   },
      //   timeout: 3 * 1000
      // })
      // request.get('/login').then(response => {
      //   alert(JSON.stringify(response.data))
      // }).catch(error => {
      //   alert(JSON.stringify(error))
      // })
      // var user = {
      //   Name: this.UserName, Password: this.Password
      // }
      // request.post('/login', user)
      //   .then(response => {
      //     alert(JSON.stringify(response.data))
      //   }).catch(error => {
      //     alert(JSON.stringify(error))
      //   })
      this.$router.push({
        name: 'Dashboard',
        params: {
          userName: this.UserName
        }
      })
    },
    mouseOver: function () {
      this.IsActive = true
    },
    mouseLeave: function () {
      this.IsActive = false
    }
  },
  mounted () {
    document.title = '登录'
  }

}
</script>
<style scoped>
.boxCard{
  max-width: 400px;
  min-height: 280px;
  margin-top:80px;
  margin-left:30%
}
.el-button{
  min-width:100px;
  float:right;
  margin-top:10px;
  margin-right:60px
}
.el-input{
  min-width:250px;
  max-width: 250px;
  margin-top:10px
}
</style>
