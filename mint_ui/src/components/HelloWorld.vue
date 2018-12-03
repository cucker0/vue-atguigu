<template>
  <div class="hello">
    <mt-button type="primary"  @click="handler" class="testbutton">测试按钮</mt-button>
    <div>
      <p>哈哈</p><mt-spinner type="snake"  color="#26a2ff" class="spinner"></mt-spinner>
    </div>
    <div>
      <p>哈哈</p><mt-spinner type="double-bounce"  color="#26a2ff" class="spinner"></mt-spinner>
    </div>
    <div>
      <p>哈哈</p><mt-spinner type="triple-bounce"  color="#26a2ff" class="spinner"></mt-spinner>
    </div>
    <div>
      <p>哈哈</p><mt-spinner type="fading-circle"  color="#26a2ff" class="spinner"></mt-spinner>
    </div>
    <div>

      <mt-checklist
        title="复选框列表"
        v-model="value"
        :options="['选项A', '选项B', '选项C']">
      </mt-checklist>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui'
export default {
  name: 'HelloWorld',
  data () {
    return {
      value: [],

    }
  },
  methods: {
    handler () {
      Toast('提示信息');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .testbutton {
    width: 100%;
  }

  .hello div{
    border-bottom: #aaa 1px solid;
    height: 40px;
  }

  .hello p{
    height: 40px;
    line-height: 40px;
    float: left;
  }

  .spinner{
    float: right;
  }
</style>
