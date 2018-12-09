<template>
  <div class="todo-footer">
    <label>
      <input type="checkbox" v-model="isCheckAll"/>
    </label>
    <span>
      <span>已完成{{completeCount}}</span> / 全部{{totalCount}}
    </span>
    <button class="btn btn-danger" @click="delAllIsdoItem">清除已完成任务</button>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'

	export default {
		name: "TodoFooter",
    computed: {
      ...mapGetters(['totalCount', 'completeCount']),

      isCheckAll: {
        get(){  //获取值
          return this.$store.getters.isCheckAll
        },
        set(newVal){  //监视, newVal为当前checkbox的最新值,
          this.$store.dispatch('selectAllItem', newVal)
        }
      }
    },
    methods: {
      ...mapActions(['delAllIsdoItem'])
    }
	}
</script>

<style scoped>
  /*footer*/
  .todo-footer {
    height: 40px;
    line-height: 40px;
    padding-left: 6px;
    margin-top: 5px;
  }

  .todo-footer label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;
  }

  .todo-footer label input {
    position: relative;
    top: -1px;
    vertical-align: middle;
    margin-right: 5px;
  }

  .todo-footer button {
    float: right;
    margin-top: 5px;
  }

</style>
