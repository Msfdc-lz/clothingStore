<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav">
      <div slot="center">购物车（{{cartListLength}}）</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list></cart-list>

    <!-- 汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";

import { mapGetters } from "vuex";

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  computed: {
    ...mapGetters(["cartListLength"]),
  },
};
</script>

<style scopde>
.nav {
  color: #fff;
  background-color: var(--color-tint);
}

.cart {
  height: 100vh;
}
</style>