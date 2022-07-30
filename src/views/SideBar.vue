<template>
  <div class="sidebar">
    <ul class="menu">
      <li v-for="menu in navTree" :key="menu.id">
        <router-link :to="menu.url" @click="menu.display=!menu.display" v-if="menu.url!=null"><i :class="menu.icon"></i>{{menu.name}}</router-link>
        <a @click="menu.display=!menu.display" v-else><i :class="menu.icon"></i>{{ menu.name }}</a>
        <!--      <router-link to="/index/main" @click="menu.display=!menu.display" v-else><i class="fa fa-home"></i>{{ menu.name }}</router-link>-->

        <ul class="submenu" v-if="menu.children.length>0" v-show="menu.display">
          <li v-for="childMenu in menu.children" :key="childMenu.id">
            <router-link :to="childMenu.url"><i :class="childMenu.icon"></i>{{childMenu.name}}</router-link>
          </li>
        </ul>
      </li>

    </ul>
  </div>
</template>
<script>

// import TreeMenu from "@/views/TreeMenu";

export default {
  name: "SideBar",
  components:{
    // TreeMenu,
  },
  data() {
    return {

    }
  },
  computed: {
    navTree() {
      let tree = this.$store.getters.getNavTree;
      for (var i=0;i<tree.length;i++){
        tree[i].display=false;
      }
      console.log("tree:",tree)
      return tree;
    }

  },
  methods: {

  }
}
</script>

<style scoped>

.sidebar {
  width: 15%;
  height: 90%;
  float: left;
  background-color: #569dfa;
}

* {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
  position: relative;
  border-style: solid;
  border-width: 1px 0 0;
  border-color: #E5E5E5;
}

.submenu > li {
  position: relative;
  padding-left: 40px;
}

a {
  display: block;
  width: 189px;
  height: 36px;
  color: #5d5d5d;
  text-decoration: none;
  line-height: 36px;
}

.fa {
  display: inline-block;
  margin-left: 14px;
  margin-right: 14px;
  font-family: 'FontAwesome';
  font-weight: normal;
  font-style: normal;
}

/*.submenuHide {
  display: none;
  position: relative;
}

.submenuShow {
  display: block;
  position: relative;
}*/
.submenu{
  position: relative;
}

.submenu:before {
  content: "";
  display: block;
  position: absolute;
  z-index: 1;
  left: 18px;
  top: 0;
  bottom: 0;
  border: 1px dotted;
  border-width: 0 0 0 1px; /* 上 右 下 左 */
}

.submenu > li:before {
  content: "";
  display: block;
  width: 10px;
  position: absolute;
  z-index: 1;
  left: 20px;
  top: 17px;
  border: 1px dotted;
  border-width: 1px 0 0; /* 上 右 下*/
}


</style>