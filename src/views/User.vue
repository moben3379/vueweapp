<template>
  <div>
    <div id="search">
      <input class="search-box" placeholder="请输入要查询的内容"><button>搜索</button>&nbsp;&nbsp;<button>重置</button>
    </div>
    <div>
      <button>+新增</button> &nbsp;
      <button>修改</button>&nbsp;
      <button>删除</button>
    </div>

    <div id="table">
      <table :data="UserList">
        <tr>
          <th class="checkbox"><input type="checkbox" ></th>
          <th>编号</th>
          <th>名称</th>
          <th>昵称</th>
          <th>邮箱</th>
          <th>手机号码</th>
          <th>部门</th>
          <th>操作</th>
        </tr>
        <tr v-for="list in UserList" :key="list.id">
          <td class="checkbox"><input type="checkbox" v-model="list.checked" ></td>
          <td>{{list.id}}</td>
          <td>{{list.name}}</td>
          <td>{{list.nickName}}</td>
          <td>{{list.email}}</td>
          <td>{{list.mobile}}</td>
          <td>{{list.deptName}}</td>
          <td>
            <a href="#"> 修改</a>&nbsp;&nbsp;
            <a href="#"> 删除</a>
          </td>
        </tr>
      </table>
    </div>

  </div>
</template>

<script>


export default {
  name: "UserPage",
  data(){
    return{
      //获取用户列表的参数对象
      userListInfo: {
        list:'',
      },
      UserList:[]
    }
  },
  created() {
    this.getUserList()
  },
  methods:{
    getUserList(){
      this.$api.user.findUserList("user/findUserList")
        .then(res=>{
          console.log("用户列表",res);
          this.UserList=res
          /*this.$store.commit('setList',this.UserList);*/
        })
      }
    },

}
</script>

<style scoped>

table,th,td{
  border:  1px solid #cccccc;
  border-collapse: collapse;
  text-align: center;
  font-size: 16px;
  margin-top: 15px;
}
td{
  font-size: 14px;
  width: 150px;
  height: 30px;
}
a{
  padding: 10px;
}
.checkbox{
  width: 50px;
}

</style>