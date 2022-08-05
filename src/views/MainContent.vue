<template>
  <div class="main">
    <router-view></router-view>

  </div>
</template>

<script>
export default {
  name: "MainContent"
}
</script>

<style scoped>
.main{
  width: 85%;
  height: 90%;
  float: left;
  background-color: rgba(237,239,242,0.5);
}
</style>