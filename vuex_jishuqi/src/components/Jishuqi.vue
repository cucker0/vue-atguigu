<template>
	<div>
    <p>点击次数：{{$store.state.count}}</p>
    <p>点击数为：{{$store.getters.EventOrOdd}}</p>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
    <button @click="oddIncrement">如果为奇数则点击+1</button>
    <button @click="asyncIncrement">点击后延迟1秒后+1</button>

  </div>
</template>

<script>
	export default {
		name: "Jishuqi",
    methods: {
      increment () {
        this.$store.dispatch('increment')
      },
      decrement () {
        this.$store.dispatch('decrement')
      },
      oddIncrement () {
        this.$store.dispatch('oddIncrement')
      },
      asyncIncrement () {
        this.$store.dispatch('asyncIncrement')
      },
    }
	}
</script>

<style scoped>

</style>
