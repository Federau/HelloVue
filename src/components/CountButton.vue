<template>
  <div>
      <p>Title:{{title}} </p>
    <button @click="countPlus">{{ count }}<slot> DefultSlotValue</slot></button>
  </div>
</template>
<script>
export default {
  name: 'count-button',
  data () {
    return {
      count: 0
    }
  },
  props: ['title'],
  methods: {
    countPlus: function () {
      this.count++
    }
  }
}
</script>
