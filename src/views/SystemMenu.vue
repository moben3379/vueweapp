<template>
  <div id="main_tb">
<!--    <input type="text" ref="getValue"><button @click="find">查询</button>-->
    <table>
<!--      <caption id="caption">系统菜单</caption>-->
      <tr>
        <th><input type="checkbox" class="checkbox"></th>
        <th>编号</th>
        <th>父菜单编号</th>
        <th>菜单名称</th>
        <th>菜单地址</th>
        <th>菜单授权</th>
        <th>菜单类型</th>
        <th>菜单图标</th>
        <th>菜单排序</th>
        <th>操作</th>
      </tr>
      <tr v-for="(menu) in newdata" :key="menu.id">
        <td><input class="checkbox" type="checkbox" :value="menu.id" v-model="checkedMenu"></td>
        <td>{{menu.id}}</td>
        <td>{{menu.parentId}}</td>
        <td>{{menu.name}}</td>
        <td>{{menu.url}}</td>
        <td>{{menu.perms}}</td>
        <td>{{menu.type}}</td>
        <td>{{menu.icon}}</td>
        <td>{{menu.orderNum}}</td>
        <td>
          <button id="b_update" @click="update" style="background-color: rgb(0,136,255)"><i class=" fa fa-pencil"></i> 修改</button>&nbsp;&nbsp;
          <button id="b_delete" @click="Delete" style="background-color: rgb(244,108,108)"><i class="fa fa-trash-o"></i> 删除</button>
        </td>
      </tr>
    </table>
    <div id="buttons">
      <button id="b_add" @click="add" style="background-color: rgb(41,154,57)"><i class="fa fa-plus " ></i> 新增</button>
    </div>
    <div id="page">
      <ul class="pagination">
        <li>第{{pageNum}}页</li>
        <li><button @click="getpagedata(pageNum-1)" style="background-color: rgb(0,136,255)">上一页</button></li>
        <li v-for="m in addpage()" :key="m"><a href="#" @click="getpagedata(m)">[{{m}}]</a></li>
        <li><button @click="getpagedata(pageNum+1)" style="background-color: rgb(0,136,255)">下一页</button></li>
      </ul>
    </div>

  </div>
<!--  添加数据输入窗口-->
  <div id="bg_add">
    <div class="newMenu">
      父菜单ID：<input type="text" name="parentId" id="parentId" v-model="addForm.parentId"><br>
      菜单名称：<input type="text" name="Name" id="name" v-model="addForm.name"><br>
      菜单地址：<input type="text" name="Url" id="url" v-model="addForm.url"><br>
      菜单授权：<input type="text" name="Perms" id="perms" v-model="addForm.perms"><br>
      菜单类型：<input type="text" name="Type" id="type" v-model="addForm.type"><br>
      菜单图标：<input type="text" name="Icon" id="icon" v-model="addForm.icon"><br>
      菜单排序：<input type="text" name="OrderNum" id="orderNum" v-model="addForm.orderNum"><br>
      <button id="add" class="editBut" @click="saveAdd" style="background-color: rgb(0,136,255)">保存</button>
      <button class="editBut" id="cancelA" @click="cancelA" style="background-color: rgb(244,108,108)">取消</button>
    </div>
  </div>

<!--  修改数据输入窗口-->
  <div id="bg_update">
    <div class="newMenu">
      父菜单ID：<input type="text" name="parentId" id="XparentId" v-model="updateForm.parentId"><br>
      菜单名称：<input type="text" name="Name" id="Xname" v-model="updateForm.name"><br>
      菜单地址：<input type="text" name="Url" id="Xurl" v-model="updateForm.url"><br>
      菜单授权：<input type="text" name="Perms" id="Xperms" v-model="updateForm.perms"><br>
      菜单类型：<input type="text" name="Type" id="Xtype" v-model="updateForm.type"><br>
      菜单图标：<input type="text" name="Icon" id="Xicon" v-model="updateForm.icon"><br>
      菜单排序：<input type="text" name="OrderNum" id="XorderNum" v-model="updateForm.orderNum"><br>
      <button id="update" class="editBut" @click="saveUpdate" style="background-color: rgb(0,136,255)">保存</button>
      <button id="cancelU" class="editBut" @click="cancelU" style="background-color: rgb(244,108,108)">取消</button>
    </div>
  </div>

<!--  确认删除窗口-->
  <div id="bg_delete">
    <div class="deleteMenu">
      <p id="p"><b>是否删除这一条数据?</b></p>
      <div id="yn">
        <input id="yes" type="button" value="确认" style="background-color: rgb(0,136,255)" @click="yes();"/>
        <input id="no" type="button" value="取消" style="background-color: rgb(244,108,108)" @click="no();"/>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "SystemMenu",
  data() {
    return {
      SystemMenuList:[],
      addForm:{
        parentId:"",
        name:"",
        url:"",
        perms:"",
        type:"",
        icon:"",
        orderNum:""
      },
      checkedMenu:[],
      updateForm:{
        id:"",
        parentId: "",
        name: "",
        url: "",
        perms: "",
        type: "",
        icon: "",
        orderNum: ""
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
    this.sysMenu()
  },
  computed: {
  },
  methods: {
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
      this.newdata = this.SystemMenuList.slice((this.page-1)*this.pagenumber,
          (this.page)*this.pagenumber);
      this.pageNum=index;
    },
    /*获得sys_menu里的菜单数据*/
    sysMenu() {
      this.$api.systemMenu.systemMenuList("/getSystemMenuList")
          .then(res=>{
            console.log(res);
            this.SystemMenuList=res;
            console.log("拿到的具体系统菜单是：",res);

            this.totallpage = this.SystemMenuList.length/this.pagenumber;//计算出共需要多少页
            console.log("一共要分为多少页：",this.totallpage);
            console.log("数组里面是：",this.array);
            console.log("分页后页面的数据是：",this.newdata);
          }).then(res=>{
        console.log(res);
        this.getpagedata(1);
      })
    },

    /*新增菜单数据*/
    add() {
      console.log("添加数据到菜单页面！！！");
      document.getElementById("bg_add").style.display = "block";
    },
    saveAdd(){
      this.$api.systemMenu.addMenu("/menuAdd",this.addForm)
      .then(res=>{
            console.log("输出结果：",res);
            document.getElementById("bg_add").style.display = 'none';//遮罩层消失
            location.reload();//刷新整个页面
      })
    },
    cancelA(){//取消按钮
      document.getElementById("bg_add").style.display = 'none';
    },

    /*修改菜单数据*/
    update(){
      console.log("选中的数据是那一条",this.checkedMenu);
      if (this.checkedMenu.length==0){
        alert("请至少选择一条数据！");
      }else {
        for (const i in this.SystemMenuList){
          if (this.checkedMenu.valueOf(0)==this.SystemMenuList[i]["id"]){  //判断选择的一条数据的id筛选出所选行的其他数据信息
            this.updateForm.id=this.SystemMenuList[i]["id"];//将选中的那行数据的id放到updateForm
            this.updateForm.parentId=this.SystemMenuList[i]["parentId"];//将数据显示在修改框中，并将数据放到updateForm中
            this.updateForm.name=this.SystemMenuList[i]["name"];
            this.updateForm.url=this.SystemMenuList[i]["url"];
            this.updateForm.perms=this.SystemMenuList[i]["perms"];
            this.updateForm.type=this.SystemMenuList[i]["type"];
            this.updateForm.icon=this.SystemMenuList[i]["icon"];
            this.updateForm.orderNum=this.SystemMenuList[i]["orderNum"];
            document.getElementById("bg_update").style.display = "block";
          }
        }
      }
    },
    saveUpdate(){
      console.log("修改后的数据是：",this.updateForm);
      this.$api.systemMenu.updateMenu("/menuUpdate",this.updateForm)//将修改后的updateForm里的数据传到后台
          .then(res=>{
            res=this.updateForm;
            console.log("输出的修改结果是：",res);
            document.getElementById("bg_update").style.display = 'none';//遮罩层消失
            location.reload();//刷新整个页面
          })
    },
    cancelU(){//取消按钮
      document.getElementById("bg_update").style.display = 'none';
    },

    //删除数据
    Delete(){
      if (this.checkedMenu.length==0){ /*判断是否勾选了数据*/
        alert("请至少选择一条数据！");
      }else {
        document.getElementById("bg_delete").style.display = "block";
        console.log("删除数据");
      }
    },
    no(){
       document.getElementById("bg_delete").style.display = 'none';
    },
    yes(){
      for (const i in this.SystemMenuList){
        if (this.checkedMenu.valueOf(0)==this.SystemMenuList[i]["id"]){  //判断选择的一条数据的id筛选出所选行的其他数据信息
          this.updateForm.id=this.SystemMenuList[i]["id"];
          this.$api.systemMenu.deleteMenu("/menuDelete",{'id':this.updateForm.id})//将所选数据的id传到后台
              .then(res=>{
                res=this.updateForm.id;
                console.log("输出的删除结果是：",res);
                document.getElementById("bg_delete").style.display = 'none';
                location.reload();//刷新整个页面
              })
        }
      }
    },
  }
}
</script>

<style scoped>
table,th,td{ /*表格的样式*/
  border: 1px solid #cccccc; /*表格边框*/
  border-collapse: collapse;
  text-align: center;
  font-size: 16px;
  margin-top: 15px;
  margin-left: 10px;
}

tr:nth-child(even) {  /*表格间隔条纹样式*/
  background-color: #f2f2f2;
}
tr{  /*表格行宽*/
  height: 45px;
}
td {
  border: 1px solid #cccccc;
  font-size: 14px;
  width: 125px;
  height: 30px;
}
.checkbox { /*复选框样式*/
  width: 50px;
}
#buttons { /*新增框的样式*/
  margin: 10px 0 0 10px;
}
button{  /*新增键的样式*/
  width: 50px;
  height: 30px;
  border-radius: 6px;
  border-width: 0px;
  color: white;
}
#bg_add,#bg_update,#bg_delete{  /*遮罩层的样式*/
  display: none;
  position: absolute;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 22;
}
.newMenu {  /*新增弹出框的样式*/
  width: 400px;
  height: 350px;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 20px 20px 20px;
  text-align: center;
  border-radius: 10px;
}
.newMenu>input{  /*新增输入框（input）的样式*/
  width: 180px;
  height: 20px;
  margin: 10px 10px 10px 10px;
  border-radius: 0.5em; /*圆角边框弧度*/
  border-width: 1px ;
}
.editBut{/*确认和取消按钮样式*/
  margin-top: 30px;
  margin-left: 60px;
  font-size: 16px;
  color: white;
}
.deleteMenu { /*删除窗口的样式*/
  width: 200px;
  height: 100px;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#p{ /*删除窗口内文字的样式*/
  text-align: center;
  margin-top: 20px;
}
#yn{ /*删除窗口”是否“按钮的样式*/
  text-align: center;
  margin-top: 20px;
}
#no{  /*删除窗口“否”按钮的样式*/
  margin-left: 45px;
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
</style>