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
    width: 850px;
    height: 90%;

    background-color: aliceblue;
    float: left;
  }
</style>