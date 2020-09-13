<template>
  <div class="cart-bottom-bar">
    <div class="check-content" @click="selectAllClick">
      <select-button class="check-button" :isSelected="isSelectedAll"></select-button>
      <span>全选</span>
    </div>

    <div class="total-price">合计: ￥{{totalPrice}}</div>

    <div class="calculate" @click="calcClick">去结算({{length}})</div>
  </div>
</template>

<script>
import SelectButton from "components/content/selectButton/SelectButton";

import { mapGetters } from "vuex";

export default {
  name: "CartBottomBar",
  components: {
    SelectButton,
  },
  computed: {
    ...mapGetters(["cartList"]),
    totalPrice() {
      return this.cartList
        .filter((item) => {
          return item.isChecked;
        })
        .reduce((pre, item) => {
          return pre + item.price * item.count;
        }, 0)
        .toFixed(2);
    },
    length() {
      return this.cartList.filter((item) => item.isChecked).length;
    },
    isSelectedAll() {
      if (this.cartList.length === 0) return false;

      // 1. 使用 filter
      // return !this.cartList.filter((item) => !item.isChecked).length;

      // 2. 使用 find
      // return !this.cartList.find((item) => !item.isChecked);

      // 3. 普通遍历
      for (let item of this.cartList) {
        if (!item.isChecked) {
          return false;
        }
      }
      return true;
    },
  },
  methods: {
    selectAllClick() {
      this.$store.dispatch("selectAllClick", this.isSelectedAll);
    },
    calcClick() {
      if (this.length === 0) {
        this.$toast.show("请选择结算的商品", 700);
      }
    },
  },
};
</script>

<style scopde>
.cart-bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  line-height: 40px;
  display: flex;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  /* line-height: 40px; */
  width: 60px;
}

.check-button {
  width: 16px;
  height: 16px;
  line-height: 20px;
  margin-right: 5px;
}

.total-price {
  /* display: flex; */
  margin-left: 30px;
  flex: 1;
}

.calculate {
  width: 100px;
  background-color: var(--color-tint);
  text-align: center;
}
</style>