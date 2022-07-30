<template>
  <div class="index">
    <Header></Header>
    <side-bar></side-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/views/Header";
import SideBar from "@/views/SideBar";

export default {
  name: "IndexPage",
  components:{
    Header,
    SideBar,
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.index{
  width: 100%;
  height: 800px;
}
</style>