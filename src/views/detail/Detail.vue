<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @itemClick="itemClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @getPosition="contentScroll" :probeType="3">
      <detail-swiper :topSwiper="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        ref="goodsInfo"
        :detail-info="detailInfo"
        @detailImageLoad="detailImageLoad"
      ></detail-goods-info>
      <detail-param-info ref="params" :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      <goods-list ref="goodsList" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <!-- <toast :message="message" :condition="condition"></toast> -->
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
// import Toast from "components/common/toast/Toast";

import DetailNavBar from "./detailComps/DetailNavBar";
import DetailSwiper from "./detailComps/DetailSwiper";
import DetailBaseInfo from "./detailComps/DetailBaseInfo";
import DetailShopInfo from "./detailComps/DetailShopInfo";
import DetailGoodsInfo from "./detailComps/DetailGoodsInfo";
import DetailParamInfo from "./detailComps/DetailParamInfo";
import DetailCommentInfo from "./detailComps/DetailCommentInfo";
import DetailBottomBar from "./detailComps/DetailBottomBar";

import { debounce } from "common/utils";
import { imageListener, backTopListener } from "common/mixin";

import { mapActions } from "vuex";

import {
  getDetailData,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeYs: [],
      getThemeY: null,
      currentIndex: 0,
      // message: "",
      // condition: false,
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    // Toast,
    GoodsList,
  },
  created() {
    this.iid = this.$route.params.iid;

    // 根据 iid 请求详情页数据
    getDetailData(this.iid).then((res) => {
      const data = res.result;
      // console.log(res);
      // 获取详情页轮播图数据
      this.topImages = data.itemInfo.topImages;

      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 获取店铺信息对象
      this.shop = new Shop(data.shopInfo);

      // 保存商品详情数据
      this.detailInfo = data.detailInfo;

      // 获取商品参数
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 获取评论数据
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });

    // 请求推荐数据
    getRecommend().then((res) => {
      // console.log(res);
      this.recommends = res.data.list;
    });

    /**
     * 关于 getThemeY() 函数的位置问题：
     *  放在 created 中，获取不到元素
     *  放在 mounted 中，获取不到数据
     *  放在回调函数 getDetailData() 中，DOM 没有渲染完成、
     *  $nextTick() 中也不行，图片的高度没有被计算在内
     *  只有在图片加载完成后，得到的 Y 才是正确的
     */
    this.getThemeY = debounce(() => {
      this.themeYs = [];

      this.themeYs.push(-44);
      this.themeYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeYs.push(this.$refs.goodsList.$el.offsetTop - 44);
      this.themeYs.push(Number.MAX_VALUE);

      // console.log(this.themeYs);
    }, 100);
  },
  methods: {
    ...mapActions({
      add: "addToCart",
    }),
    detailImageLoad() {
      // this.$refs.scroll.refresh();
      this.newRefresh();

      this.getThemeY();
    },
    itemClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeYs[index], 1000);
    },
    contentScroll(position) {
      this.shoeJudge(position);
      // console.log(position);
      // 获取 y 值
      const y = -position.y;
      let length = this.themeYs.length;
      // 方式一
      // for (let i = 0; i < length; i++) {
      //   if (
      //     this.currentIndex !== i &&
      //     ((i < length - 1 &&
      //       y >= this.themeYs[i] &&
      //       y < this.themeYs[i + 1]) ||
      //       (i === length - 1 && y >= this.themeYs[i]))
      //   ) {
      //     this.currentIndex = i;
      //     this.$refs.nav.currentIndex = this.currentIndex;
      //   }
      // }

      // 方式二
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          y >= this.themeYs[i] &&
          y < this.themeYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    addToCart() {
      // console.log("???")
      // 获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // this.$store.dispatch("addToCart", product).then((res) => {
      //   console.log(res);
      // });

      this.add(product).then((res) => {
        // this.message = res;
        // this.condition = true;
        // setTimeout(() => {
        //   this.message = "";
        //   this.condition = false;
        // }, 1500);
        // console.log(res);

        this.$toast.show(res, 700);
      });
    },
  },
  mixins: [imageListener, backTopListener],
  mounted() {},

  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px - 49px);
}
</style>