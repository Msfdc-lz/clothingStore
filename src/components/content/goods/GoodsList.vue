<template>
  <div class="goods">
    <goods-list-item v-for="(item, index) in goods" :key="index" :good="item"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "./GoodListItem";

export default {
  name: "GoodsList",
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    GoodsListItem,
  },
};
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  padding: 3px;
}
</style>