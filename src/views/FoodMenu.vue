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
    <div class="editdialog" v-if="showBg.bg">
      <div class="editBox">
        <div class="edit">
          <!--      <button class="close" @click="hidebg">X</button>-->
          <label>菜单编号：</label><input :class="{showInput:true}" type="text" v-model="this.id" name="id" placeholder="菜品编号"/><br>
          <label>菜品名称：</label><input :class="{showInput:true}" type="text" v-model="this.name" name="name" placeholder="菜品名称"/><br>
          <label>菜品价格：</label><input :class="{showInput:true}" type="text" v-model="this.price"  placeholder="菜品价格"/><br>
          <label>菜品类别：</label>
          <select :class="{showInput:true} " v-model="this.form">
            <option selected>好吃家常</option>
            <option>营养套餐</option>
            <option>请客大宴</option>
            <option>美味小吃</option>
          </select><br>
          <label>菜品数量：</label><input :class="{showInput:true}" type="text" v-model="this.count" placeholder="数量"/><br>
          <label>菜品图片：</label><input :class="{showInput:true}" type="text" v-model="this.icon"  placeholder="上传图片"/><br>
          <label>菜品描述：</label><input :class="{showInput:true}" type="text" v-model="this.detail" placeholder="详细描述"/><br>
          <button class="sure" @click="SureAlter">确定</button>
          <button class="close" @click="hidebg">取消</button>
        </div>
      </div>
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

      this.getMenuInformation()
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
button {
  width: 50px;
  height: 30px;
  border-radius: 6px;
  border-width: 1px;
}

table, th{
  border: 1px solid #cccccc;
  border-collapse: collapse;
  text-align: center;
  font-size: 16px;
  margin-top: 15px;
  margin-left: 10px;
  /*height: 40px;*/

}
/*表格间隔条纹样式*/
tr:nth-child(even) {
  background-color: #f2f2f2;
}

tr{  /*表格行宽*/
  height: 45px;
}
td {
  border: 1px solid #cccccc;
  font-size: 14px;
  width: 145px;
  height: 30px;
}

/*遮罩层样式*/
.editdialog {
  display: block;
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 22;
}

/*让编辑框居中*/
.editBox {
  display: block;
  width: 600px;
  height: 400px;
  background-color: aqua;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 50px;
}
label {  /*编辑框label样式*/
  display: inline-block;
  width: 80px;
  text-align: left;
  margin-right: 15px;
  margin-top: 15px;
}

.edit { /*编辑框内文字居中*/
  text-align: center;
}

input {  /*输入框样式*/
  border-radius: 0.5em; /*圆角边框弧度*/
  text-align: center;
}

select { /*下拉选择框*/
  border-radius: 0.5em; /*圆角边框弧度*/
}
</style>