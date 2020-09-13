<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="(item, index) in topSwiper" :key="index">
      <img :src="item" alt />
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "DetailSwiper",
  props: {
    topSwiper: {
      type: Array,
      default: [],
    },
  },
  components: {
    Swiper,
    SwiperItem,
  },
  // methods: {
  //   swiperImageLoad() {
  //     this.$emit("swiperImageLoad");
  //   },
  // },
};
</script>

<style>
.detail-swiper {
  height: 300px;
  overflow: hidden;
  text-align: center;
}
</style>