<template>
  <div>
    <nav-bar>
      <div slot="left" @click="back">
        <img src="~assets/img/common/back.svg" alt class="back" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :key="index"
          class="title-item"
          @click="itemClick(index)"
          :class="{active: currentIndex === index}"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  components: {
    NavBar,
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("itemClick", index);
    },
    back() {
      this.$router.back();
    },
  },
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 14px;
  margin-top: 5px;
}

.title-item {
  flex: 1;
}

.active {
  color: var(--color-high-text);
}

.back {
  vertical-align: -webkit-baseline-middle;
}
</style>