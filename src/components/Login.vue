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
import http from '@/util/http'
import { Message } from 'element-ui'
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
      var user = {
        Name: this.UserName, UserPassword: this.Password
      }
      http.post('/login/login', user).then(response => {
        if (response && response.data && response.data.Success) {
          Message.success('登录成功')
          console.log(JSON.stringify(response.data))
          localStorage.setItem('etoken', 'bearer ' + response.data.Extra.TokenStr)
          localStorage.setItem('currentUser', JSON.stringify(response.data.Data))
          this.$router.push({
            name: 'Dashboard',
            params: {
              userName: this.UserName
            }
          })
        } else {
          Message.error('登录失败')
        }
      }).catch(error => {
        Message.error(JSON.stringify(error))
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
  margin-top:10%;
  margin-left:35%
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
