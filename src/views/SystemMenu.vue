<template>
  <div id="manin_tb">
<!--    <input type="text" ref="getValue"><button @click="find">查询</button>-->
    <button id="b_add" @click="add">新增</button>
    <table>
      <caption id="caption">系统菜单</caption>
      <tr>
        <th><input type="checkbox" id="checkbox">全选</th>
        <th>ID</th>
        <th>父菜单ID</th>
        <th>菜单名称</th>
        <th>菜单地址</th>
        <th>菜单授权</th>
        <th>菜单类型</th>
        <th>菜单图标</th>
        <th>菜单排序</th>
        <th>操作</th>
      </tr>
      <tr v-for="(menu) in SystemMenuList" :key="menu.id">
        <td><input type="checkbox" :value="menu.id" v-model="checkedMenu"></td>
        <td>{{menu.id}}</td>
        <td>{{menu.parentId}}</td>
        <td>{{menu.name}}</td>
        <td>{{menu.url}}</td>
        <td>{{menu.perms}}</td>
        <td>{{menu.type}}</td>
        <td>{{menu.icon}}</td>
        <td>{{menu.orderNum}}</td>
        <td>
          <button id="b_update" @click="update">修改</button>
          <button id="b_delete" @click="Delete">删除</button>
        </td>
      </tr>
    </table>
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
      <input type="button" id="add" value="保存" @click="saveAdd"><input type="button" id="cancelA" value="取消" @click="cancelA">
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
      <input type="button" id="update" value="保存" @click="saveUpdate"><input type="button" id="cancelU" value="取消" @click="cancelU">
    </div>
  </div>

<!--  确认删除窗口-->
  <div id="bg_delete">
    <div class="deleteMenu">
      <p id="p"><b>是否删除这一条数据?</b></p>
      <div id="yn">
        <input id="yes" type="button" value="是" @click="yes();"/>
        <input id="no" type="button" value="否" @click="no();"/>
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
      }
    }
  },
  mounted() {
    this.sysMenu();
  },
  computed: {
  },
  methods: {
    /*获得sys_menu里的菜单数据*/
    sysMenu() {
      this.$api.systemMenu.systemMenuList("/getSystemMenuList")
          .then(res=>{
            console.log(res);
            this.SystemMenuList=res;
            console.log("拿到的具体系统菜单是：",res);
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
#manin_tb{ /*右侧显示总的div的样式*/
  padding: 12px 12px 12px 12px;
}
#caption{ /*标题的样式*/
  font-size:larger;
  font-weight: bold;
}
table,th,td{ /*表格的样式*/
  border: 1px solid black;
  border-collapse: collapse;
}
#b_add{  /*新增键的样式*/
  width: 70px;
  height: 25px;
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
}
.newMenu>input{  /*新增输入框（input）的样式*/
  width: 180px;
  height: 20px;
  margin: 10px 10px 10px 10px;
}
#b_update{ /*修改键的样式*/
  font-size: medium;
}
#b_delete{  /*删除键的样式*/
  font-size: medium;
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
</style>