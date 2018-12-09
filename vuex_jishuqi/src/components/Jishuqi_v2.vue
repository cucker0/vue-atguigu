<template>
  <!--优化版-->
	<div>
    <!--<p>点击次数：{{$store.state.count}}</p>-->
    <p>点击次数：{{count}}</p>
    <!--<p>点击数为：{{$store.getters.EventOrOdd}}</p>-->
    <p>点击数为：{{EventOrOdd}}</p>
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
    <button @click="oddIncrement">如果为奇数则点击+1</button>
    <button @click="asyncIncrement">点击后延迟1秒后+1</button>

  </div>
</template>

<script>
  import {mapGetters, mapState, mapActions} from 'vuex'
	export default {
		name: "Jishuqi_v2",
    computed: {
      ...mapState(['count']), //mapState通过 扩展运算符 将store.state.count 映射this.count  这个this 很重要，这个映射直接映射到当前Vue的this对象上。mapActions, mapMutations同理
      ...mapGetters(['EventOrOdd'])   // 此处的方法与getter的function名一样才能这么写，如果不一样，如getters中的函数名为EventOrOdd2，可以这么表达
      // ...mapGetters([{EventOrOdd: 'EventOrOdd2'}])
    },
    methods: {
/*      increment () {
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
      },*/
      ...mapActions(
        ['increment', 'decrement', 'oddIncrement', 'asyncIncrement']
      )
    }
	}
</script>

<style scoped>

</style>
