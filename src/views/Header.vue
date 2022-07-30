<template>
  <div class="header">
    <span class="user">
      <a href="/index">
        {{user}}
          <li><a href="#">退出登录</a></li>
      </a>
    </span>
  </div>
</template>

<script>


export default {
  name: "HeaderPage",
  data(){
    return{

    }

  },

  computed:{
    //获取当前登录的用户，显示在header
    user(){
      let user=sessionStorage.getItem("user");
      console.log("用户",user);
      return user;
    }

  }
}
</script>

<style scoped>

  .header{
    width: 100%;
    height: 10%;
    background-color: #3260f6;
  }
  .user{
    position: absolute;
    margin-left: 1400px;
    margin-top: 50px;
  }
  .user a{
    text-decoration: none;
    color: black;
  }
  .user a>li{
    display: none;
    list-style: none;

  }
  .user a:hover li{
    display: block;
    width: 70px;
    height: 50px;
    background-color: blueviolet;
  }



</style>