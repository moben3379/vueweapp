<template>

<div>
  orderList
  <button @click="getOrderList">点击</button>
  <input type="text" id="search" placeholder="查询订单" v-model="searchList">
  <button @click="searchOrderList()">查询订单</button>
</div>


<table>
  <caption>订单列表</caption>
  <tr>
    <th><input type="checkbox"></th>
    <th style="width: 120px">买家ID</th>
    <th style="width: 80px">买家昵称</th>
    <th style="width: 120px">电话</th>
    <th style="width: 200px">地址</th>
    <th style="width: 300px">订单时间</th>
    <th style="width: 80px">单价</th>
    <th style="width: 50px">数量</th>
    <th style="width: 80px">总价</th>
    <th style="width: 80px">订单状态</th>
    <th style="width: 150px;border:1px;">操作</th>
  </tr>
  <tr v-for="(order,index) in OrderList" :key="order.id">
    <td><input type="checkbox"></td>
    <td>{{order.buyer_openid}}</td>
    <td>{{order.buyer_name}}</td>
    <td>{{order.buyer_phone}}</td>
    <td>{{order.buyer_address}}</td>
    <td>{{order.create_time}}</td>
    <td>{{order.menu_price}}</td>
    <td>{{order.menu_quantity}}</td>
    <td>{{getTotalPrice(index)}}</td>
    <td v-if="order.order_status==0">未处理</td>
    <td v-if="order.order_status==1">已处理</td>
    <td style="border:1px;">
      <a href="#" @click.prevent="cheangeOrderStatus(index)" v-if="order.order_status==0">已完成订单</a>
      <a href="#" v-if="order.order_status==1" @click.prevent="deleteOrder(order.order_id)">删除</a>
      &nbsp;
      <a href="#" @click.prevent="cheangeOrderStatus(index)" v-if="order.order_status==1">撤回</a>
    </td>
  </tr>
</table>

</template>

<script>

export default {
  name: "OrderList",
  data(){
    return {

      searchList:"",
      searchBack:"",

      OrderList:[]

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
    },
    getTotalPrice(index){
      let totalPrice=this.OrderList[index].menu_price*this.OrderList[index].menu_quantity;
      return totalPrice;
    },
    cheangeOrderStatus(index){
      if (this.OrderList[index].order_status===0){
        this.OrderList[index].order_status=1;
      }else {
        this.OrderList[index].order_status=0;
      }


    },
    deleteOrder(id){
      console.log(id)
      this.$api.orderList.deleteOrderByOrderId("/deleteOrderByOrderId",id)
      .then(res=>{
        if (res==0){
          alert("删除失败")
        }else {
          alert("删除成功");
          location.reload();
        }
      })

    }
  },
  mounted() {
    this.getOrderList();
  }
}
</script>

<style scoped>
table,th,td{
  margin: auto;
  align-content: center;
  text-align: center;
}
a{
  text-decoration: none;
  color: black;
}
table{
  table-layout: fixed;
  border-collapse: collapse;
  border:1px solid;
}
tr{
  border:1px solid;
}
td{
  border:0px;
}
</style>
