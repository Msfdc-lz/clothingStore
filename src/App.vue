<template>
  <div id="app">
    <!-- 
      keep-alive 是 Vue 内置的一个组件
      可以让被包裹的组件保留状态，避免重新渲染
        include: 匹配的组件被缓存
        exclude: 匹配的组件不被缓存
    -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>

<script>
import MainTabBar from "components/content/mainTabBar/MainTabBar";

export default {
  name: "App",
  components: {
    MainTabBar,
  },
};
</script>

<style scoped>
@import "./assets/css/base.css";
</style>
