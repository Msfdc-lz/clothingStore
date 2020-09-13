import { COUNT_INCREMENT, GOOD_INCREMENT, ISCHECKED_TOTRUE, ISCHECKED_FALSE } from "./mutation-types"

export default {
  addToCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if (oldProduct) { // 商品数量 +1
        context.commit(COUNT_INCREMENT, oldProduct)
        resolve("当前商品数量 +1")
      } else { // 添加新的商品
        payload.count = 1
        context.commit(GOOD_INCREMENT, payload)
        resolve("商品添加成功")
      }
    })
  },
  selectAllClick(context, payload) {
    if (payload) {
      context.commit(ISCHECKED_FALSE)
    } else {
      context.commit(ISCHECKED_TOTRUE)
    }
  }
}