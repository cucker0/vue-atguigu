<template>
	<div>
    <p>点击次数：{{count}}</p>
    <p>点击数为：{{EventOrOdd}}</p>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
    <button @click="oddIncrement">如果为奇数则点击+1</button>
    <button @click="asyncIncrement">点击后延迟1秒后+1</button>

  </div>
</template>

<script>
	export default {
		name: "Jishuqi",
    data () {
		  return {
        count: 0
      }
    },
    computed: {
      EventOrOdd () {
        const count = this.count
        return count % 2 === 0 ? '偶数' : '奇数'
      }
    },
    methods: {
      increment () {
        const count = this.count
        this.count = count + 1
      },
      decrement () {
        const count = this.count
        this.count = count - 1
      },
      oddIncrement () {
        const count = this.count
        if (count % 2 === 1) {
          this.count = count + 1
        }
      },
      asyncIncrement () {
        const count = this.count
        setTimeout(()=>{
          this.count = count + 1
        }, 1000)
      },
    }
	}
</script>

<style scoped>

</style>
