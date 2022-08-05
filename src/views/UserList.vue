<template>
  <div>
    <!--    <div id="search">
          <input class="search-box" placeholder="请输入要查询的内容"><button>搜索</button>&nbsp;&nbsp;<button>重置</button>
        </div>-->
    <div id="table">
      <table :data="UserList">
        <tr>
          <th class="checkbox"><input type="checkbox"></th>
          <th>编号</th>
          <th>名称</th>
          <th>昵称</th>
          <th>邮箱</th>
          <th>手机号码</th>
          <th>部门</th>
          <th>角色</th>
          <th>操作</th>
        </tr>
        <tr v-for="(list,index) in UserList" :key="list.id">
          <td class="checkbox"><input type="checkbox" v-model="list.checked"></td>
          <td>{{ list.id }}</td>
          <td>{{ list.name }}</td>
          <td>{{ list.nickName }}</td>
          <td>{{ list.email }}</td>
          <td>{{ list.mobile }}</td>
          <td>{{ list.deptName }}</td>
          <td>{{ list.roleNames }}</td>
          <td>
            <button @click="isShowEdit(index)" class="update_but" style="background-color: rgb(0,136,255)"><i class=" fa fa-pencil"></i> 修改</button>&nbsp;&nbsp;
            <button @click="isShowDelete(index)" class="del_but" style="background-color: rgb(244,108,108)"><i class="fa fa-trash-o"></i> 删除</button>
          </td>
        </tr>
      </table>
    </div>
    <div id="buttons">
      <button @click="addVisible=true" class="add_but" style="background-color: rgb(41,154,57)"><i class="fa fa-plus " ></i> 新增</button>  <!--点击新增按钮时弹出框显示-->
    </div>

    <!--    新增操作页面-->
    <div class="adddialog" v-if="addVisible">
      <div class="editBox">
        <div class="edit">
          <label>名称:</label><input v-model="addUserList.name"><br>
          <label>昵称:</label><input v-model="addUserList.nickName"><br>
          <label>邮箱:</label><input v-model="addUserList.email"><br>
          <label>手机号码:</label><input v-model="addUserList.mobile"><br>
          <label>登录密码:</label><input v-model="addUserList.password"><br>
          <label>部门:</label>
          <select name="select" id="deptId" v-model="addUserList.deptId">
            <option :value="1">桂林骏泰</option>
            <option :value="38">蓝桥</option>
          </select><br>
          <label>角色:</label>
          <select name="select" id="roleId" v-model="addUserList.roleId">
            <option :value="1">超级管理员</option>
            <option :value="2">项目经理</option>
            <option :value="3">开发人员</option>
            <option :value="4">测试人员</option>
          </select><br>

          <button class="editBut" @click="insertUser" style="background-color: rgb(0,136,255)">保存</button>&nbsp;&nbsp;
          <button class="editBut" @click="addVisible=false" style="background-color: rgb(244,108,108)">取消</button>
        </div>
      </div>
    </div>

    <!--    修改用户操作页面-->
    <div class="eidtdialog" v-if="editVisible">
      <div class="editBox">
        <div class="edit" :data="editUserList">
          <label>名称:</label><input v-model="editUserList.name"><br>
          <label>昵称:</label><input v-model="editUserList.nickName"><br>
          <label>邮箱:</label><input v-model="editUserList.email"><br>
          <label>手机号码:</label><input v-model="editUserList.mobile"><br>
          <label>登录密码:</label><input v-model="editUserList.password"><br>
          <label>部门:</label>
          <select name="select" v-model="editUserList.deptId">
            <option :value="1">桂林骏泰</option>
            <option :value="38">蓝桥</option>
          </select><br>
          <label>角色:</label>
          <select name="select" v-model="editUserList.roleId">
            <option :value="1">超级管理员</option>
            <option :value="2">项目经理</option>
            <option :value="3">开发人员</option>
            <option :value="4">测试人员</option>
          </select>
          <br>
          <button class="editBut" style="background-color: rgb(0,136,255)" @click="editUser()">保存</button>&nbsp;&nbsp;
          <button class="editBut" style="background-color: rgb(244,108,108)" @click="editVisible=false">取消</button>
        </div>
      </div>
    </div>


    <!--    删除弹框-->
    <div id="bg_delete" v-if="deleteVisible">
      <div class="deleteMenu">
        <p id="p"><b>是否删除该用户？</b></p>
        <div id="yn">
          <input id="yes" type="button" style="background-color: rgb(0,136,255)" value="确认" @click="deleteUser"/>
          <input id="no" type="button" style="background-color: rgb(244,108,108)" value="取消" @click="deleteVisible=false;"/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "UserList",
  data() {
    return {
      // id: -1,

      addVisible: false,  //默认新增用户的弹出框不显示
      editVisible: false,  //默认修改用户信息的弹出框不显示
      deleteVisible: false, //默认删除弹框不显示

      UserList: {},//获取用户列表的参数对象

      addUserList: {}, //获取新增用户列表的参数

      editUserList: {},  //获取用户修改表单


    }

  },

  methods: {
    isShowEdit(index) {
      this.editVisible = true
      // this.id=index  //不能删，将index赋给id
      let id = this.UserList[index].id
      console.log(id);
      sessionStorage.setItem("id", this.UserList[index].id);//获取user_id到sessionStorage
      this.editUserList = {
        id: sessionStorage.getItem("id"),
        name: this.UserList[index].name,
        nickName: this.UserList[index].nickName,
        email: this.UserList[index].email,
        mobile: this.UserList[index].mobile,
        password: this.UserList[index].password,
        deptId: this.UserList[index].deptId,
        roleId: this.UserList[index].roleId
      }
      console.log("修改的数据：", this.editUserList)
      console.log("deptId：", this.editUserList.deptId)
    },

    isShowDelete(index) {
      this.deleteVisible = true
      // let id=this.UserList[index].id
      // console.log("kkk:",id);
      sessionStorage.setItem("id", this.UserList[index].id)
    },


    //获取用户列表
   /* getUserList() {
      this.$api.user.findUserList("user/findUserList")
          .then(res => {
            this.UserList = res
            console.log("用户列表", res);
            /!*this.$store.commit('setList',this.UserList);*!/
          })
    },
*/
    //新增用户
    insertUser() {
      console.log("新增的用户：", this.UserList)
      // this.$api.user.insertUser("user/insertUser", {'name':this.addUserList.name,'nickName':this.addUserList.nickName,
      //     'email':this.addUserList.email,'mobile':this.addUserList.mobile,'password':this.addUserList.password,'deptId':this.addUserList.deptId,'roleId':this.addUserList.roleId})
      this.$api.user.insertUser("user/insertUser", this.addUserList)
          .then(res => {
            if (res == 1) {
              console.log("新增成功");
              this.addVisible = false;//新增成功后弹框消失S
              //保存成功后刷新当前页面
              // this.getUserList()
              location.reload()
            }
            /*this.$store.commit('insertUserList',this.addUserList);*/
          })
    },

    //修改用户信息
    editUser() {
      console.log("修改", this.editUserList)
      // let id=sessionStorage.getItem("id",Id)
      this.$api.user.editUser("user/editUser", this.editUserList)
          .then(res => {
            if (res == 1) {
              console.log("修改成功")
              this.editVisible = false;

              // this.getUserList()
              location.reload()
            }
          })
    },

    //删除用户
    deleteUser() {
      let id = sessionStorage.getItem("id")
      console.log("删除的id", id);
      this.$api.user.deleteUser("user/deleteUser", id)
          .then(res => {
            if(res==2){
              console.log("删除成功");

            }

          })
    },


  },

  mounted() {
    // this.getUserList()
    this.$api.user.findUserList("user/findUserList")
        .then(res => {
          this.UserList = res
          console.log("用户列表", res);
         /* this.$store.commit('setList',this.UserList);*/
        })
  },


}

</script>

<style scoped>
#buttons {
  margin: 10px 0 0 10px;
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

tr{  /*表格行宽*/
  height: 45px;
}
td {
  border: 1px solid #cccccc;
  font-size: 14px;
  width: 145px;
  height: 30px;
}



.checkbox {
  width: 50px;
}

/*遮罩层样式*/
.adddialog, .eidtdialog, #bg_delete {
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

.deleteMenu { /*删除窗口的样式*/
  width: 200px;
  height: 100px;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#p { /*删除窗口内文字的样式*/
  text-align: center;
  margin-top: 20px;
}

#yn { /*删除窗口”是否“按钮的样式*/
  text-align: center;
  margin-top: 20px;
}

#no { /*删除窗口“否”按钮的样式*/
  margin-left: 45px;
}



</style>