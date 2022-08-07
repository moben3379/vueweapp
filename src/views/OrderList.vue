<template>

<div>
  <input type="text" id="search" placeholder="查询订单" v-model="searchList">
  <button @click="searchOrderList()">查询订单</button>
  <button v-if="isShowSearchTable" @click="returnInitPage()">返回</button>
</div>


<table v-if="!isShowSearchTable">
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
  <tr v-for="(order,index) in newdata" :key="order.id">
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

  <table v-if="isShowSearchTable">
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
    <tr v-for="(searchOrder,index) in searchBack" :key="searchOrder.id">
      <td><input type="checkbox"></td>
      <td>{{searchOrder.buyer_openid}}</td>
      <td>{{searchOrder.buyer_name}}</td>
      <td>{{searchOrder.buyer_phone}}</td>
      <td>{{searchOrder.buyer_address}}</td>
      <td>{{searchOrder.create_time}}</td>
      <td>{{searchOrder.menu_price}}</td>
      <td>{{searchOrder.menu_quantity}}</td>
      <td>{{getTotalPrice(index)}}</td>
      <td v-if="searchOrder.order_status==0">未处理</td>
      <td v-if="searchOrder.order_status==1">已处理</td>
      <td style="border:1px;">
        <a href="#" @click.prevent="cheangeOrderStatus(index)" v-if="searchOrder.order_status==0">已完成订单</a>
        <a href="#" v-if="searchOrder.order_status==1" @click.prevent="deleteOrder(searchOrder.order_id)">删除</a>
        &nbsp;
        <a href="#" @click.prevent="cheangeOrderStatus(index)" v-if="searchOrder.order_status==1">撤回</a>
      </td>
    </tr>
  </table>
  <div id="pageTop"></div>
  <div id="page">
    <ul class="pagination">
      <li>第{{pageNum}}页</li>
      <li><button @click="getpagedata(pageNum-1)">上一页</button></li>
      <li v-for="m in addpage()" :key="m"><a href="#" @click="getpagedata(m)">[{{m}}]</a></li>
      <li><button @click="getpagedata(pageNum+1)">下一页</button></li>
    </ul>
  </div>

</template>

<script>

export default {
  name: "OrderList",
  data(){
    return {

      searchList:"",
      searchBack:[],

      isShowSearchTable:false,
      OrderList:[],

      totallpage: 0, //总页数
      pagenumber: 10, //每页多少条
      page:0,
      array: [], //存放共有多少页
      newdata:[],
      pageNum:1,

    }
  },
  methods:{
    //将页数变成一个array数组，显示在页面上
    addpage() {
      for (let i = 0; i < this.totallpage; i++) {
        this.array[i] = i + 1;
      }
      return this.array;
    },
    //根据页数来分割数组
    getpagedata(index){
      this.page =index;
      this.newdata = this.OrderList.slice((this.page-1)*this.pagenumber,
          (this.page)*this.pagenumber);
      this.pageNum=index;
    },

    /*获取所有订单*/
    getOrderList(){
      this.$api.orderList("/getOrderList")
          .then(res=>{
            this.OrderList=res;
            console.log(this.OrderList);

            this.totallpage = this.OrderList.length/this.pagenumber;//计算出共需要多少页
            console.log("一共要分为多少页：",this.totallpage);
            console.log("数组里面是：",this.array);
            console.log("分页后页面的数据是：",this.newdata);
          }).then(res=>{
            console.log(res);
            this.getpagedata(1);
          })
    },


    /*订单查询*/

    searchOrderList() {
      this.$api.searchOrderList("/searchOrderList", this.searchList)
          .then(res => {
            this.searchBack = res;
            this.isShowSearchTable=true;
            console.log(this.searchBack);
          })
    },

    returnInitPage(){
      this.isShowSearchTable=false;
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
#page{ /*上下页框的位置*/
  position: absolute;
  left: 50%;
}
.pagination{ /*上下页的格式*/
  list-style: none;
  position: absolute;
  width: 500px;
}
.pagination>li{ /*上下页的格式*/
  float: left;
  margin-left: 5px;
}
.pagination>li>a { /*上下页的格式*/
  text-decoration: none;
}
#pageTop{ /*让上下页与订单框有距离*/
  height: 15px;
}
</style>
