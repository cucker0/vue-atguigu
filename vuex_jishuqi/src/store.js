import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 状态对象
const state = {
  count: 0
}

//包含多个事件回调函数的对象
const actions = {
  increment ({commit}){
    commit ('INCREMENT')
  },
  decrement ({commit}) {
    commit ('DECREMENT')
  },
  oddIncrement ({commit, state}) {
    if (state.count %2 === 1) {
      commit ('INCREMENT')
    }
  },
  asyncIncrement ({commit}) {
    setTimeout(()=>{
      commit ('INCREMENT')
    }, 1000)
  }
}

//包含多个更新state函数的对象
const mutations = {
  INCREMENT (state) {
    state.count++     // state不传也可以，state数据在同一个文件中，能自己找到
  },
  DECREMENT (state) {
    state.count--
  }
}

//包含多个getter计算属性函数的对象
const getters = {
  EventOrOdd (state) {
    // console.log(state)
    return state.count % 2 === 0 ? '偶数' : '奇数'
  }
}


export default new Vuex.Store({
  state,    //状态对象，这是简写形式，相当于 'state': state
  actions,    //包含多个事件回调函数的对象
  mutations,  //包含多个更新state函数的对象
  getters   //包含多个getter计算属性函数的对象
})
