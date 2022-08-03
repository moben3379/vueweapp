<template>
  <div>
    <br/>
    <button  @click="getMenuInformation">查询菜单</button>&nbsp;&nbsp;&nbsp;
    <button  >新增菜单</button>
    <br/>

    <table>
      <tr>
        <th>菜单编号</th>
        <th>菜品名称</th>
        <th>菜品价格</th>
        <th>菜品类别</th>
        <th>菜品数量</th>
        <th>菜品图片</th>
        <th>菜品描述</th>
        <th>操    作</th>
      </tr>
      <tr v-for="(food,index) in FoodMenu " :key="food.id">
        <td><input type="checkbox"> {{ food.menu_Id }}</td>
        <td> {{ food.menu_Name }}</td>
        <td> {{ food.menu_Price }}</td>
        <td> {{ food.menu_Form }}</td>
        <td> {{food.menu_Count }}</td>
        <td> {{ food.menu_Icon }}</td>
        <td> {{ food.menu_detail }}</td>
        <td > <button  class="delect">删除</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button  @click="AlterInterfaceShow(index)"  class="alter">修改</button></td>
      </tr>
    </table>

<!--      这里是新增与修改共享界面      -->
<!--    class="showAlterAdd"-->
    <div class="bg" v-if="showBg.bg">
      <button class="close" @click="hidebg">X</button>
      <input :class="{showInput:true}" type="text" v-model="this.id" name="id" placeholder="菜品编号"/>
      <input :class="{showInput:true}" type="text" v-model="this.name" name="name" placeholder="菜品名称"/>
      <input :class="{showInput:true}" type="text" v-model="this.price"  placeholder="菜品价格"/>
      <select :class="{showInput:true} " v-model="this.form">
        <option selected>好吃家常</option>
        <option>营养套餐</option>
        <option>请客大宴</option>
        <option>美味小吃</option>
      </select>
      <input :class="{showInput:true}" type="text" v-model="this.count" placeholder="数量"/>
      <input :class="{showInput:true}" type="text" v-model="this.icon"  placeholder="上传图片"/>
      <input :class="{showInput:true}" type="text" v-model="this.detail" placeholder="详细描述"/>
      <button class="sure" @click="SureAlter">确定</button>

    </div>

  </div>
</template>

<script>

export default {

  name: "FoodMenuPage",
  //___________________________________________________________________________________________
  data(){
    return{

      //背景显示
      showBg: {
        bg:false,
        hidebg:false
      },
    }
  },
  mounted() {
      //  向后台发送请求，获取食物菜单信息，建立menu.js在modiles里
      this.$api.foodmenu.findMenuInformation("getmenu/findMenuInformation")
          .then(res=>{
            console.log("获取菜单信息有：",res)
            sessionStorage.setItem("res",JSON.stringify(res))
          })
  },
  //___________________________________________________________________________________________
  methods:{
    //点击获取信息
    getMenuInformation(){
      //  向后台发送请求，获取食物菜单信息，建立menu.js在modiles里
      this.$api.foodmenu.findMenuInformation("getmenu/findMenuInformation")
      .then(res=>{
        console.log("获取菜单信息有：",res)
        sessionStorage.setItem("res",JSON.stringify(res))
      })
    },
  //  修改菜单界面
    AlterInterfaceShow(index){
      for(let i=0;i<this.FoodMenu.length;i++){
        if(index==i){
          this.id =this.FoodMenu[i].menu_Id
          this.name =this.FoodMenu[i].menu_Name
          this.price =this.FoodMenu[i].menu_Price
          this.form =this.FoodMenu[i].menu_Form
          this.count =this.FoodMenu[i].menu_Count
          this.icon =this.FoodMenu[i].menu_Icon
          this.detail =this.FoodMenu[i].menu_detail
          console.log("显示行的信息为：", this.id,this.name,this.price,this.form,this.count,this.icon,this.detail)
          this.showBg.bg=!this.showBg.bg

        }
      }
    },
    hidebg(){
      this.showBg.bg=!this.showBg.bg
      this.showBg.showbg=!this.showBg.showbg
    },
  //  确定修改
    SureAlter(){
          let Id=this.id
          let Name=this.name
          let Price=this.price
          let Form=this.form
          let Count=this.count
          let Icon=this.icon
          let Detail=this.detail
      console.log(Id,Name,Price,Form,Count,Icon,Detail)
      this.$api.foodmenu.alterMenuInformation("getmenu/alterMenuInformation",{'Id':Id,'Name':Name,'Price':Price,'Form':Form,'Count':Count,'Icon':Icon,'Detail':Detail})
      // this.$api.foodmenu.alterMenuInformation("getmenu/alterMenuInformation",JSON.stringify(this.FoodMenu))
      this.getMenuInformation(),
      this.hidebg()

    },


  },
  //___________________________________________________________________________________________
  //存储信息
  computed: {
    FoodMenu() {
      let st= JSON.parse(sessionStorage.getItem("res"))
      return st
    }

  },
  //___________________________________________________________________________________________
}

</script>

<style scoped>
    div>button{
      position:relative;
      left: 40%;
      background-color: #3260f6;
      padding: 5px;
      color: #ffffff;
      font-size: 15px;
    }

    /****************新增与修改界面****************/
    .bg{
      position: absolute;
      top: 25%;
      left: 40%;
      width: 30%;
      height: 62%;
      background: rgba(0, 0, 0,0.5);
      border-radius: 10px;
      display: block;
    }
    .showbg{
      position: absolute;
      top: 25%;
      left: 40%;
      width: 30%;
      height: 62%;
      background: rgba(0, 0, 0,0.5);
      border-radius: 10px;
      display: block;
    }
    .showInput{
      position: relative;
      top: 30px;
      left: 15%;
      width: 300px;
      height: 30px;
      margin: 8px;
      float: left;
      border: 1px solid #249be5;
      border-radius: 10px;
    }
    .sure{
      position: relative;
      top: 358px;
      left: -30%;
      width: 100px;
      border: 1px solid #249be5;
      border-radius: 10px;
    }
    .close{
      position: relative;
      top: 8px;
      left: 20%;
      width: 40px;
      border: 1px solid #54ade8;
      background-color: #110707;
      border-radius: 10px;
    }
    /**************************/

    table{
      margin: 2%;
      width: 96%;
    }
    th{
      border: 2px solid black;
      background-color: #569dfa;
    }
    td{
      border: 2px solid black;
    }
    .alter,.delect{
      position:relative;
      left: 30%;
    }
</style>