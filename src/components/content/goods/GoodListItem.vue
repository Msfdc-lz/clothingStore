<template>
  <div class="goods-item" @click="goodsItemClick">
    <div>
      <img v-lazy="showImage" @load="itemImageLoad" />
    </div>
    <div class="goods-info">
      <p>{{good.title}}</p>
      <div>
        <span class="price">{{good.price}}</span>
        <span class="collect">{{good.cfav}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodListItem",
  props: {
    good: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    itemImageLoad() {
      this.$bus.$emit("itemImageLoad");
      // if (this.$route.path.indexOf("/home")) {
      //   this.$bus.$emit("homeItemImageLoad");
      // } else if (this.$route.path.indexOf("/detail)) {
      //   this.$bus.$emit("detailItemImageLoad");
      // }
    },
    goodsItemClick() {
      // this.$router.push("/detail/" + this.good.iid);
      // console.log(this.good.iid)
      this.$router.push("/detail/" + this.good.iid);
    },
  },
  computed: {
    showImage() {
      return this.good.image || this.good.show.img;
    },
  },
};
</script>

<style scoped>
.goods-item {
  padding-bottom: 40px;
  position: relative;
  width: 48%;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  text-align: center;
  overflow: hidden;
  padding-bottom: 0;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 7px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}

/* .goods-item div img {
  margin-bottom: 40px;
} */
</style>