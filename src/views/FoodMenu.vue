<template>

  <div>
    <div  class="search">
      <input type="text" id="search"  v-model="searchList" >
      <button  @click="searchMenu()" style="background-color: #FFD664"><i class="fa fa-search"></i>查询</button>&nbsp;&nbsp;&nbsp;
      <button  @click="addMenuInformation" style="background-color: rgb(41,154,57)"><i class="fa fa-plus " ></i> 新增</button>
    </div>


    <div class="table">
      <table v-if="!isShowSearchTable">
        <tr>
          <th class="checkbox"><input type="checkbox"></th>
          <th>菜单编号</th>
          <th>菜品类别</th>
          <th>菜品名称</th>
          <th>菜品价格</th>
          <th>菜品数量</th>
          <th>菜品图片</th>
          <!--        <th>菜品描述</th>-->
          <th>操  作</th>
        </tr>
        <tr v-for="(food,index) in newdata " :key="food.id">
          <td class="checkbox"><input type="checkbox" v-model="food.checked"></td>
          <td> {{ food.menu_Id }}</td>
          <td> {{ food.menu_Form }}</td>
          <td> {{ food.menu_Name }}</td>
          <td> {{ food.menu_Price }}</td>
          <td> {{food.menu_Count }}</td>
          <td> {{ food.menu_Icon }}</td>
          <td>
            <button @click="deleteMenu(food.menu_Id)"  style="background-color: rgb(244,108,108)"><i class="fa fa-trash-o"></i>删除</button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button @click="AlterInterfaceShow(index)" class="alter" style="background-color: rgb(0,136,255)"><i class=" fa fa-pencil"></i> 修改</button>
          </td>
        </tr>
      </table>
    </div>


    <div id="pageTop"></div>
    <div id="page" v-if="isShowPage">
      <ul class="pagination">
        <li>第{{pageNum}}页</li>
        <li><button @click="getpagedata(pageNum-1)" style="background-color: rgb(0,136,255)">上一页</button></li>
        <li v-for="m in addpage()" :key="m"><a href="#" @click="getpagedata(m)">[{{m}}]</a></li>
        <li><button @click="getpagedata(pageNum+1)" style="background-color: rgb(0,136,255)">下一页</button></li>
      </ul>
    </div>
  </div>

<!--      这里是修改界面      -->
<!--    class="showAlterAdd"-->

    <div class="editdialog" v-if="showBg.bg">
      <div class="editBox">
        <div class="edit">
<!--          <button class="close" @click="hidebg">X</button>-->
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
          <button class="editBut" @click="SureAlter" style="background-color: rgb(0,136,255)">确定</button>
          <button class="editBut" @click="hidebg" style="background-color: rgb(244,108,108)">取消</button>
        </div>
      </div>
    </div>

<!--  这里是查询结果列表-->
    <div >
    <table v-if="isShowSearchTable">
      <tr>
        <th class="checkbox"><input type="checkbox"></th>
        <th>菜单编号</th>
        <th>菜品类别</th>
        <th>菜品名称</th>
        <th>菜品价格</th>
        <th>菜品数量</th>
        <th>菜品图片</th>
<!--        <th>菜品描述</th>-->
        <th>操    作</th>
      </tr>
      <tr v-for="(food,index) in searchBack " :key="food.id">
        <td class="checkbox"><input type="checkbox" v-model="food.checked"></td>
        <td><input type="checkbox"> {{ food.menu_Id }}</td>
        <td> {{ food.menu_Form }}</td>
        <td> {{ food.menu_Name }}</td>
        <td> {{ food.menu_Price }}</td>
        <td> {{food.menu_Count }}</td>
        <td> {{ food.menu_Icon }}</td>
<!--        <td> {{ food.menu_detail }}</td>-->
        <td > <button  class="delete" @click="deleteMenu(food.menu_Id)" style="background-color: rgb(244,108,108)"><i class="fa fa-trash-o"></i>删除</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <button  @click="AlterInterfaceShow(index)"  class="alter" style="background-color: rgb(0,136,255)"><i class=" fa fa-pencil"></i> 修改</button></td>
      </tr>
    </table>
  </div>


  <!--      这里是新增界面      -->
  <!--    class="showAlterAdd"-->
  <div class="adddialog" v-if="addshowBg.bg">
    <div class="editBox">
      <div class="edit">
<!--        <button class="close" @click="addhidebg" >X</button>-->
        <label>菜品编号：</label><input :class="{showInput:true}" type="text" v-model="this.Id" name="id" placeholder="菜品编号"/>
        <label>菜品名称：</label><input :class="{showInput:true}" type="text" v-model="this.Name" name="name" placeholder="菜品名称"/>
        <label>菜品价格：</label><input :class="{showInput:true}" type="text" v-model="this.Price"  placeholder="菜品价格"/>
        <label>菜品类别：</label>
        <select :class="{showInput:true} " v-model="this.Form">
          <option selected>好吃家常</option>
          <option>营养套餐</option>
          <option>请客大宴</option>
          <option>美味小吃</option>
        </select><br>
        <label>菜品数量：</label><input :class="{showInput:true}" type="text" v-model="this.Count" placeholder="数量"/><br>
        <label>菜品图片：</label><input :class="{showInput:true}" type="text" v-model="this.Icon"  placeholder="上传图片"/><br>
<!--        <input :class="{showInput:true}" type="text" v-model="this.Detail" placeholder="详细描述"/><br>-->
        <button class="editBut" @click="SureAdd" style="background-color: rgb(0,136,255)">确定</button>
        <button class="editBut" @click="addhidebg" style="background-color: rgb(244,108,108)">取消</button>
      </div>
    </div>
  </div>
</template>

<script>



import {findMenuInformation} from "@/http/modules/foodmenu";

export default {

  name: "FoodMenuPage",

  //___________________________________________________________________________________________
  data(){
    return {
      FoodMenu: [],
      searchList: '',
      searchBack: [],
      isShowSearchTable: false,
      isShowPage:true,/*上下页不显示*/
      //背景显示
      showBg: {
        bg: false,
        hidebg: false
      },
      addshowBg: {
        bg: false,
        hidebg: false
      },

      totallpage: 0, //总页数
      pagenumber: 10, //每页多少条
      page:0,
      array: [], //存放共有多少页
      newdata:[],
      pageNum:1,
    }
  },
  mounted() {
      //  向后台发送请求，获取食物菜单信息，建立menu.js在modiles里
    this.getMenu();
  },
  //___________________________________________________________________________________________
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
      this.newdata = this.FoodMenu.slice((this.page-1)*this.pagenumber,
          (this.page)*this.pagenumber);
      this.pageNum=index;
    },

    getMenu(){
      this.$api.foodmenu.findMenuInformation("/findMenuInformation")
          .then(res=>{
            console.log("获取菜单信息有：",res)
            this.FoodMenu=res;
            console.log("菜单数据有多少行：",this.FoodMenu.length);

            this.totallpage = this.FoodMenu.length/this.pagenumber;//计算出共需要多少页
            console.log("一共要分为多少页：",this.totallpage);
            console.log("数组里面是：",this.array);
            console.log("分页后页面的数据是：",this.newdata);
          }).then(res=>{
        console.log(res);
        this.getpagedata(1);
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
      // if(Form==this.FoodMenu[0].menu_Name){
      //   Form=1
      // }else if(Form==this.FoodMenu[1].menu_Name){
      //   Form=2
      // }else if(Form==this.FoodMenu[2].menu_Name){
      //   Form=3
      // }else if(Form==this.FoodMenu[3].menu_Name){
      //   Form=4
      // } else if(Form==this.FoodMenu[4].menu_Name){
      //   Form=5
      // } else if(Form==this.FoodMenu[5].menu_Name){
      //   Form=6
      // }
      // console.log(Id,Name,Price,Form,Count,Icon,Detail)

      //复制得到的地址校正
      for ( let i= 0; i < Icon.length; i++)
      {Icon=Icon.replace("\\","/")
        Icon=Icon.replace("\"","")
      }
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
              alert("删除成功")

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
              this.isShowPage=false   //查询道结果之后，上下页隐藏
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
#search{
  margin-left: 10px;
  border-radius: 0.5em; /*圆角边框弧度*/
  text-align: center;
  border-width: 1px ;
  height: 25px;
  width: 200px;
}
.table{
  margin-top:10px;
}
/*复选框样式*/
.checkbox {
  width: 50px;
}
button {
  width: 50px;
  height: 30px;
  border-radius: 6px;
  border-width: 0px;
  color: white;
}

/*表格单元格样式*/
table, th{
  border: 1px solid #cccccc; /*表格边框*/
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
tr{  /*第一行，标题行高*/
  height: 45px;
}

td{
  border: 1px solid #cccccc;
  font-size: 14px;
  width: 145px;
}

/*遮罩层样式*/
.adddialog,.editdialog {
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
  width: 500px;
  height: 450px;
  border-radius: 10px;
  background-color:rgb(255,255,255);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin-top: 50px;
}

label {  /*编辑框label样式*/
  display: inline-block;
  width: 80px;
  text-align: right;
  margin-right: 15px;
  margin-top: 25px;
  font-size: 16px;
  font-family:"Arial Narrow";
}

.edit { /*编辑框内容居中*/
  margin-left: 60px;

}

.edit>input {  /*输入框样式*/
  border-radius: 0.5em; /*圆角边框弧度*/
  text-align: center;
  border-width: 1px ;
  height: 25px;
  width: 250px;
}

select { /*下拉选择框*/
  border-radius: 0.5em; /*圆角边框弧度*/
  height: 25px;
  width: 250px;
  text-align: center;
}
.editBut{/*确认和取消按钮样式*/
  margin-top: 40px;
  margin-left: 100px;
  font-size: 16px;
}

/**************************/
#page{ /*上下页框的位置*/
  position: absolute;
  left: 50%;
  margin-top: 50px;
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


