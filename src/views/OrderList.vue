<template>
<div>
  orderList
  <button @click="getOrderList">点击</button>
  <input type="text" id="search" placeholder="查询订单" v-model="searchList">
  <button @click="searchOrderList()">查询订单</button>
</div>

</template>

<script>

export default {
  name: "OrderList",
  data(){
    return {
      OrderList:"",
      searchList:"",
      searchBack:"",
    }
  },
  methods:{
    /*获取所有订单*/
    getOrderList(){
      this.$api.orderList.orderList("/getOrderList")
          .then(res=>{
            console.log(res);
            this.OrderList=res;
            console.log(this.OrderList);
          })
    },

    /*订单查询*/
    searchOrderList(){
      this.$api.orderList.searchOrderList("/searchOrderList",this.searchList)
      .then(res=>{
        this.searchBack = res;
        console.log(this.searchBack);
      })
    }
  }
}
</script>

<style scoped>

</style>