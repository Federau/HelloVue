<template>
  <div class="container">
    <div class="header">WorkTime Record System</div>
    <div class="middle">
      <div class="span">UserName:</div>
      <input class="input" v-model="UserName" placeholder="用户名" />
    </div>
    <div class="middle">
      <div class="span">Password:</div>
      <input @keyup.enter="login" class="input" placeholder="密码" type="password" v-model="Password" />
    </div>
    <div class="foot">
      <button
        class="button"
        v-bind:class="{ active: IsActive }"
        @mouseleave="mouseLeave"
        @mouseover="mouseOver"
        @click.left="login"
      >
        Login
      </button>
    </div>
  </div>
</template>
<script>
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
      this.$router.push({
        name: 'Dashboard',
        params: { userName: this.UserName }})
    },
    mouseOver: function () {
      this.IsActive = true
    },
    mouseLeave: function () {
      this.IsActive = false
    }
  }
}
</script>
<style scoped>
.container {
  display: grid;
  grid-template-rows: 35% 50px 50px 50%;
  background: rgb(172, 173, 238);
  color: white;
  width: 500px;
  height: 240px;
  position: absolute;
  left: 30%;
  top: 20%;
  border: 6px solid #bed7e7;
  border-radius: 20px;
}
.header {
  font-size: 30px;
  align-self: center;
  justify-self: center;
  font-family: "Times New Roman", Times, serif;
}
.middle {
  display: grid;
  grid-template-columns: 40% 60%;
  align-items: center;
  justify-self: center;
  align-self: center;
  width: 250px;
  /* margin-right: 35px;
      margin-bottom: 20px; */
  border-radius: 5px 0px 0px 5px;
  background: blue;
}
.input {
  width: 150px;
}
.foot {
  justify-self: end;
  margin-right: 115px;
  margin-top: 10px;
}
.button.active {
  opacity: 0.8;
  border: 5px;
}
.button {
  background: bule;
  border: 0px;
  border-radius: 10px;
  height: 28px;
  width: 100px;
  background: blue;
  color: white;
}
</style>
