<template>
  <li @mouseenter="showSwitch(true)" @mouseleave="showSwitch(false)"  :style="{background: bgColor}">
    <label>
      <input type="checkbox" v-model="todo.isdo"/>
      <span>{{ todo.name }}</span>
    </label>
    <button class="btn btn-danger" v-show="isShow" @click="delItem()">删除</button>
  </li>
</template>

<script>
  import PubSub from 'pubsub-js'

	export default {
		name: "TodoListItem",
    data () {
      return {
        isShow: false,
        bgColor: 'white'
      }
    },
    props: {
      todo: {
        type: Object
      },
      index: {
        type: Number
      },
      delToto: {
        type: Function
      }
    },
    methods: {
		  showSwitch(s){
		    if(s){
          this.isShow = true
          this.bgColor = '#ccc'
        }else{
          this.isShow = false
          this.bgColor = 'white'
        }
      },
      delItem () {

		    if(window.confirm(`确定删除 ${this.todo.name} 吗`)){
		      // 使用父组件prop传过来的方法
          // this.delToto(this.index)

          //使用消息订阅/发布
          PubSub.publish('deleteTodo', this.index)

        }

      }
    }
	}
</script>

<style scoped>
  /*item*/
  li {
    list-style: none;
    height: 36px;
    line-height: 36px;
    padding: 0 5px;
    border-bottom: 1px solid #ddd;
  }

  li label {
    float: left;
    cursor: pointer;
  }

  li label li input {
    vertical-align: middle;
    margin-right: 6px;
    position: relative;
    top: -1px;
  }

  li button {
    float: right;
    /*display: none;*/
    margin-top: 3px;
  }

  li:before {
    content: initial;
  }

  li:last-child {
    border-bottom: none;
  }
</style>
