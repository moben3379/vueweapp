<template>
<div>
  orderList
  <button @click="getOrderList">点击</button>
</div>

</template>

<script>
export default {
  name: "OrderList",
  data(){
    return {
      OrderList:""
    }
  },
  methods:{
    getOrderList(){
      this.$api.orderList.orderList("/getOrderList")
          .then(res=>{
            console.log(res);
            this.OrderList=res;
            console.log(this.OrderList);
          })
    }
  }
}
</script>

<style scoped>

</style>