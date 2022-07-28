<template>
  <div class="login">
    <div class="content">
      <lable for="username">用户名:</lable><input type="text" id="username" v-model="loginForm.username">
      <br><br><br><br>
      <lable for="password">用户名:</lable><input type="text" id="password" v-model="loginForm.password">
      <br><br><br><br>
      <button @click="login">登录</button>
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
      }
    }
  },
  methods: {
    login() {
      // 1、拿到username和password
      // 2、使用axios发送登录请求给后端（SpringBoot）

      this.$api.login.login("/login", this.loginForm)
          .then(res => {

            // vuex（状态管理）
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

<style scoped>
.login{
  text-align: center;
  width: 450px;
  height: 400px;
  border-radius: 20px;
  margin: auto;
  position: relative;
  top: 200px;
  background-color: aqua;
}
.content{
  position: relative;
  top: 100px;
  background-color: cadetblue;
}

</style>