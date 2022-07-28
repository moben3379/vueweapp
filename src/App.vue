<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
  .app{
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0%);
  }
  *{
    margin: 0;
    padding: 0;
  }
</style>
