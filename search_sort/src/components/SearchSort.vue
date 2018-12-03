<template>
  <div>
    搜索<input v-model="searchKey" />
    <ul>
      <li v-for="(p, index) in filterPersons" :key="index">
        name:{{p.name}} -- age:{{p.age}}
      </li>
    </ul>
    <button v-on:click="set_ordertype(1)">年龄升序</button>
    <button @click="set_ordertype(2)">年龄降序</button>
    <button @click="set_ordertype(0)">原本升序</button>
  </div>
</template>

<script>
	export default {
		name: "SearchSort",
    data(){
		  return{
        persons: [
          {'name': 'Tom', 'age': 18},
          {'name': 'Jack', 'age': 16},
          {'name': 'Bob', 'age': 19},
          {'name': 'Rose', 'age': 17}
        ],
        searchKey: '',
        orderType: 0,       //0:默认，1:升序， 2:降序
      }
    },
    computed:{
		  filterPersons(){
		    const {persons, searchKey, orderType} = this
        let fPersons;
		    fPersons = persons.filter( p => p.name.indexOf(searchKey) !== -1 )
        if (orderType === 1){fPersons.sort(function (p1, p2) {
          return p2.age - p1.age
        })
        }else if(orderType === 2){fPersons.sort(function (p1, p2) {
          return p1.age - p2.age
        })}

        return fPersons
      }
    },
    methods:{
		  set_ordertype(val){
		    this.orderType = val
      }
    }
	}
</script>

<style scoped>
  ul, li{
    margin: 0;
    padding: 0;
  }
  li{
    list-style: none;
  }

</style>
