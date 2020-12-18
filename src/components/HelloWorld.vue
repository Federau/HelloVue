<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <p>{{ PMessage }}</p>
      <button v-on:click="reverse">ReverseMsg</button>
      <ol>
        <todo-item
          v-for="item in groceryList"
          v-bind:todo="item"
          v-bind:key="item.id"
        ></todo-item>
      </ol>
      <br />
      <span>{{ FullName }}</span>
      <br />
      <input v-model="FirstName" />
      <p>Using mustaches: "{{ rawHtml }}"</p>
      <p>Using v-html directive: <span v-html="rawHtml"></span></p>
      <p>{{ reverseMessage }}</p>
      <ol>
        <li v-for="item of groceryList" :key="item.id">
          {{ item.id }} {{ item.text }}
        </li>
      </ol>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '工时统计系统',
      seen: false,
      PMessage: 'This is a TestPMessage!',
      groceryList: [
        { id: 0, text: 'Vegetables' },
        { id: 1, text: 'Cheese' },
        { id: 2, text: 'Whatever else humans are supposed to eat' }
      ],
      FirstName: 'Bob',
      LastName: 'Jhon',
      FullName: ' Bob Jhon',
      rawHtml: 'This is From DataBinding'
    }
  },
  computed: {
    reverseMessage: function () {
      return this.FullName.split('').reverse().join('')
    }
  },
  methods: {
    reverse: function () {
      this.PMessage = this.PMessage.split('').reverse().join('')
    }
  },
  watch: {
    FirstName: function (val) {
      this.FullName = this.FirstName + ' ' + this.LastName
    },
    LastName: function (val) {
      this.FullName = this.FirstName + ' ' + this.LastName
    }
  },
  mounted () {
    this.FirstName = this.$route.params.userName
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: bold;
  box-shadow: 10px 10px 10px green;
  text-shadow: 5px 5px 5px violet;
  font-size: 50px;
  font-family: "Courier New", Courier, monospace;
  margin: 10px;
}
h2:hover {
  color: #fff;
  -webkit-animation: Glow 1.5s ease infinite alternate;
  animation: Glow 1.5s ease infinite alternate;
}
ul {
  list-style-type: none;
  padding: 0;
}
ol{
   text-align: center;
   margin-left: 35%;
}
li {
  width: 400px;
  background: turquoise;
}
a {
  color: #42b983;
}
</style>
