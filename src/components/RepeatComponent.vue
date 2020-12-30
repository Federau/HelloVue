
<template>
  <div>
    <count-button v-bind:title="firstTile">  this is from slot </count-button>
    <br/>
    <count-button v-bind:title="secondTitle" >  heihei</count-button>
    <count-button />
    <br />
    <router-link to="/">返回登陆页</router-link>
    <br />
     <router-link :to="{name:'HelloWorld',params:{userName:'Tom'}}" >返回HelloWorld</router-link>
     <br/>
     <input type="date"/>
      <input type="time"/>
  </div>
</template>
<script>
import CountButton from './CountButton.vue'
export default {
  components: { CountButton },
  data () {
    return {
      firstTile: 'MiaoMiaoMiao',
      secondTitle: 'WangWangWang'
    }
  }
}
</script>
