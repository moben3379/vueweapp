<template>

  <div>
    <br/>
    <input type="text" class="input"  v-model="searchList" >
    <button  @click="searchMenu()">查询</button>&nbsp;&nbsp;&nbsp;
    <button  @click="addMenuInformation">新增</button>

    <br/><br/>

    <table v-if="!isShowSearchTable">
      <tr>
        <th>菜单编号</th>
        <th>菜品类别</th>
        <th>菜品名称</th>
        <th>菜品价格</th>
        <th>菜品数量</th>
        <th>菜品图片</th>
        <th>菜品描述</th>
        <th>操    作</th>
      </tr>
      <tr v-for="(food,index) in FoodMenu " :key="food.id">
        <td><input type="checkbox"> {{ food.menu_Id }}</td>
        <td> {{ food.menu_Form }}</td>
        <td> {{ food.menu_Name }}</td>
        <td> {{ food.menu_Price }}</td>
        <td> {{food.menu_Count }}</td>
        <td> {{ food.menu_Icon }}</td>
        <td> {{ food.menu_detail }}</td>
        <td>
          <button @click="deleteMenu(food.menu_Id)"  class="delete">删除</button>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button @click="AlterInterfaceShow(index)" class="alter">修改</button>
        </td>
      </tr>
    </table>
  </div>

<!--      这里是修改界面      -->
<!--    class="showAlterAdd"-->

    <div class="editdialog" v-if="showBg.bg">
      <div class="editBox">
        <div class="edit">
          <button class="close" @click="hidebg">X</button>
          <label>菜单编号：</label><input :class="{showInput:true}" type="text" v-model="this.id" name="id"/><br>
          <label>菜品名称：</label><input :class="{showInput:true}" type="text" v-model="this.name" name="name" /><br>
          <label>菜品价格：</label><input :class="{showInput:true}" type="text" v-model="this.price"  /><br>
          <label>菜品类别：</label>
          <select :class="{showInput:true} " v-model="this.form">
            <option>美味小吃</option>
            <option selected>好吃家常</option>
            <option>营养套餐</option>
            <option>请客大宴</option>
            <option>本店特色</option>
            <option>其他美食</option>
          </select><br>
          <label>菜品数量：</label><input :class="{showInput:true}" type="text" v-model="this.count" /><br>
          <label>菜品图片：</label><input :class="{showInput:true}" type="text" v-model="this.icon"  /><br>
          <label>菜品描述：</label><input :class="{showInput:true}" type="text" v-model="this.detail" /><br>
          <button class="sure" @click="SureAlter">确定</button>
<!--          <button class="close" @click="hidebg">取消</button>-->
        </div>
      </div>
    </div>
    
    <div>
    <table v-if="isShowSearchTable">
      <tr>
        <th>菜单编号</th>
        <th>菜品类别</th>
        <th>菜品名称</th>
        <th>菜品价格</th>
        <th>菜品数量</th>
        <th>菜品图片</th>
        <th>菜品描述</th>
        <th>操    作</th>
      </tr>
      <tr v-for="(food,index) in searchBack " :key="food.id">
        <td><input type="checkbox"> {{ food.menu_Id }}</td>
        <td> {{ food.menu_Form }}</td>
        <td> {{ food.menu_Name }}</td>
        <td> {{ food.menu_Price }}</td>
        <td> {{food.menu_Count }}</td>
        <td> {{ food.menu_Icon }}</td>
        <td> {{ food.menu_detail }}</td>
        <td > <button  class="delete" @click="deleteMenu(food.menu_Id)">删除</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button  @click="AlterInterfaceShow(index)"  class="alter">修改</button></td>
      </tr>
    </table>
  </div>


  <!--      这里是新增界面      -->
  <!--    class="showAlterAdd"-->
  <div class="bg" v-if="addshowBg.bg">
    <button class="close" @click="addhidebg">X</button>
    <input :class="{showInput:true}" type="text" v-model="this.Id" name="id" placeholder="菜品编号"/>
    <input :class="{showInput:true}" type="text" v-model="this.Name" name="name" placeholder="菜品名称"/>
    <input :class="{showInput:true}" type="text" v-model="this.Price"  placeholder="菜品价格"/>
    <select :class="{showInput:true} " v-model="this.Form">
      <option selected>好吃家常</option>
      <option>营养套餐</option>
      <option>请客大宴</option>
      <option>美味小吃</option>
    </select>
    <input :class="{showInput:true}" type="text" v-model="this.Count" placeholder="数量"/>
    <input :class="{showInput:true}" type="text" v-model="this.Icon"  placeholder="上传图片"/>
    <input :class="{showInput:true}" type="text" v-model="this.Detail" placeholder="详细描述"/>
    <button class="sure" @click="SureAdd">确定</button>

  </div>
</template>

<script>



export default {

  name: "FoodMenuPage",

  //___________________________________________________________________________________________
  data(){
    return {
      FoodMenu: [],
      searchList: '',
      searchBack: [],
      isShowSearchTable: false,
      //背景显示
      showBg: {
        bg: false,
        hidebg: false
      },
      addshowBg: {
        bg: false,
        hidebg: false
      },
    }
  },
  mounted() {
      //  向后台发送请求，获取食物菜单信息，建立menu.js在modiles里
    this.getMenu();
  },
  //___________________________________________________________________________________________
  methods:{
    getMenu(){
      this.$api.foodmenu.findMenuInformation("/findMenuInformation")
          .then(res=>{
            console.log("获取菜单信息有：",res)
            this.FoodMenu=res;
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
      this.showBg.hidebg=!this.showBg.hidebg
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
      //进行别名转换
      if(Form==this.FoodMenu[0].menu_Name){
        Form=1
      }else if(Form==this.FoodMenu[1].menu_Name){
        Form=2
      }else if(Form==this.FoodMenu[2].menu_Name){
        Form=3
      }else if(Form==this.FoodMenu[3].menu_Name){
        Form=4
      } else if(Form==this.FoodMenu[4].menu_Name){
        Form=5
      } else if(Form==this.FoodMenu[5].menu_Name){
        Form=6
      }
      console.log(Id,Name,Price,Form,Count,Icon,Detail)
      this.$api.foodmenu.alterMenuInformation("/alterMenuInformation",{'Id':Id,'Form':Form,'Name':Name,'Price':Price,'Count':Count,'Icon':Icon,'Detail':Detail})

      this.hidebg()
      location.reload();

    },
    // 删除菜品
    deleteMenu(deleteid){
      this.$api.foodmenu.deleteMenu("/deleteMenu",deleteid)
          .then(res=>{
            if (res==0){
              alert("删除失败")
            }else {
              alert("确定要删除吗");
              location.reload();
            //  重新加载
            }
          })

    },
    addhidebg(){
      this.addshowBg.bg=!this.addshowBg.bg
      this.addshowBg.hidebg=!this.addshowBg.hidebg
    },
    //新增菜品
    addMenuInformation(){
      console.log("准备新增菜品！！！！！！！！！！");
      this.addshowBg.bg=!this.addshowBg.bg;
    },
    SureAdd(){
      console.log("确认新增！！！！！！！！！！！！");
      let Id=this.Id
      let Name=this.Name
      let Price=this.Price
      let Form=this.Form
      let Count=this.Count
      let Icon=this.Icon
      let Detail=this.Detail
      //进行别名转换
      if(Form==this.FoodMenu[0].menu_Name){
        Form=1
      }else if(Form==this.FoodMenu[1].menu_Name){
        Form=2
      }else if(Form==this.FoodMenu[2].menu_Name){
        Form=3
      }else if(Form==this.FoodMenu[3].menu_Name){
        Form=4
      } else if(Form==this.FoodMenu[4].menu_Name){
        Form=5
      } else if(Form==this.FoodMenu[5].menu_Name){
        Form=6
      }
      console.log(Id,Name,Price,Form,Count,Icon,Detail)
      this.$api.foodmenu.addMenuInformation("/addMenuInformation",{'Id':Id,'Name':Name,'Price':Price,'Form':Form,'Count':Count,'Icon':Icon,'Detail':Detail})
          .then(res=>{
            console.log("输出结果：",res);
            this.addhidebg();
            location.reload();//刷新整个页面
          })
    },

    // 准确查询
    searchMenu(){
      this.$api.foodmenu.searchMenu("/searchMenu", this.searchList)
          .then(res => {
            if(res==null){
              location.reload();
            }else {
              this.searchBack = res;
              console.log(res)
              this.isShowSearchTable = true;
              // console.log(this.searchBack);
            }})
    },
    returnInitPage(){
      this.isShowSearchTable=false;
    },
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
table{
  width: 95%;
  margin-left: 2%;
}
 th{
  border-top: 2px solid #cccccc;
  border-bottom: 1px solid #cccccc;
  border-collapse: collapse;
  text-align: center;
  font-size: 16px;
  margin-top: 15px;
  margin-left: 10px;

}
/*表格间隔条纹样式*/
tr:nth-child(even) {
  background-color: #f2f2f2;
}

  tr{  /*表格行宽*/
    height: 35px;
  }
  td {
    border: 1px solid #cccccc;
    font-size: 14px;
    width: 145px;
    height: 10px;
  }

    div>button{
      position:relative;
      left: 40%;

      background-color: #3260f6;
      padding: 5px;
      color: #ffffff;
      font-size: 15px;
    }
    input{
      position: relative;
      left: 38%;

    }
    /****************新增与修改界面****************/
    .bg,.editBox{
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
      left: 10%;
      width: 250px;
      height: 30px;
      margin: 8px;
      float: left;
      border: 1px solid #249be5;
      border-radius: 10px;
    }
  .edit>label{
    position: relative;
    top: 30px;
    left: 5%;
    color: white;
    margin: 8px;
    float: left;
  }
    .sure{
      position: relative;
      top: 60px;
      left: 40%;
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
    .alter,.delete{
      position:relative;
      left: 30%;
    }

</style>


