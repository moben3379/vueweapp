<template>
  <div>
    <div class="background" >
<!--      <img src="../images/background.jpg" alt="">-->
    </div>
    <div class="login-box" >
      <div class="content">
        <i class="fa fa-user"></i><input type="text" id="username" placeholder="用户名" v-model="loginForm.username">
        <br>
        <i class="fa fa-key"></i><input type="text" id="password" placeholder="密码" v-model="loginForm.password">
        <button @click="login" id="login-bt">登录</button>
      </div>
      <div class="choose">
        <input type="checkbox" class="box">
        <span>记住密码</span>
        <span><a href="#">注册</a></span>
        <span>忘记密码?<a href="#">立即找回</a></span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "LoginPage",
  data() {
    return {
      loginForm: {
        username: 'liwei',
        password: 'lw1234'
      },
      //设置登录页面背景图片
      /*background:{
        backgroundImage:"url("+require("../images/background.jpg")+")",
        backgroundRepeat:"no-repeat",
        backgroundSize:"100% 100%"
      }*/
    }
  },
  methods: {
    login() {
      // 1、拿到username和password
      // 2、使用axios发送登录请求给后端（SpringBoot）

      this.$api.login.login("/login", this.loginForm)
          .then(res => {
            console.log("当前登录用户：",res);
            // vuex（状态管理）
            sessionStorage.setItem("user",res.name);
            sessionStorage.setItem("token", res.token);
            // 跳转到页面之前要调用后台的菜单接口，获取当前用户的菜单
            // 再次发请求，但是发请求之前，要带上token

            this.$api.menu.findNavTree("menu/findNavTree", {'userName': this.loginForm.username})
                .then(res => {
                  console.log("当前用户的菜单：",res);
                  // 给全局属性赋值
                  // this.$store.commit('setNavTree',res);
                  // this.$store.dispatch('setNavTree', {res});
                  this.$store.dispatch({
                    type:'setNavTree',
                    data:res
                  })
                  return new Promise((resolve,reject)=>{
                    let a = false;
                    resolve(this.loginForm.username);
                    if (a){
                      reject("出错了");
                    }
                  })
                }).then(res=>{
              console.log("准备获取用户的权限",res);
              this.$api.user.findPermissions("user/findPermissions",{'name':res})
              .then(res=>{
                console.log(this.loginForm.username+"的权限："+res);
                this.$store.commit('serPerms',res);
              })
            })
            this.$router.push("/index");
          }).catch(err => {
        console.log(err);
        this.$router.push("/");//跳到登录页面
      })
    }
  }
}
</script>

<style >
* {
  margin: 0;
  padding: 0;
}
#username,#password{
  width: 200px;
  height: 30px;
  margin-top: 45px;
  margin-left: 15px;
  border-radius: 10px;
  outline-style: none ;
  border: 1px solid #ccc;
}

#login-bt{
  width: 200px;
  height: 40px;
  margin-top: 50px;
  background-color:rgb(92,125,166);
  font-size: 16px;
  cursor: pointer;
  border-radius: 18px;
  outline-style: none ;
  border: 1px solid #ccc;
}

#login-bt:hover{
  background-color: rgb(72,114,156);
}

.background{
  background: url("../images/background.jpg");

  position: fixed;
  width: 100%;
  height: 100%;

}

.login-box{
  position: absolute;
  text-align: center;
  width: 350px;
  height: 350px;
  background-color:rgba(255,255,255,0.3);
  margin: 150px 0 0 590px;
  border-radius: 10px;
}

.choose{
  margin-top: 25px;
  float: left;
  font-size: small;
  margin-left: 25px;
  padding-left: 25px;
}
.choose>span{
  margin-right: 15px;
}
.choose a{
  text-decoration: none;
  color: black;
}
.choose :hover a{
  color: blue;
}



</style>