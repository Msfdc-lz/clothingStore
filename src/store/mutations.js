import { COUNT_INCREMENT, GOOD_INCREMENT, ISCHECKED_TOTRUE, ISCHECKED_FALSE } from "./mutation-types"

export default {
  // mutations 的作用就是用来修改 state 中的状态
  // mutations 中每个方法完成的事情尽可能单一
  // addToCart(state, payload) {
  //   // let oldProduct = null
  //   // for (let item of state.cartList) {
  //   //   if (item.iid === payload.iid) {
  //   //     oldProduct = item
  //   //   }
  //   // }

  //   let oldProduct = state.cartList.find(item => item.iid === payload.iid)

  //   if (oldProduct) {
  //     oldProduct.count += 1
  //   } else {
  //     payload.count = 1
  //     state.cartList.push(payload)
  //   }
  // },
  [COUNT_INCREMENT](state, payload) {
    payload.count++
  },
  [GOOD_INCREMENT](state, payload) {
    payload.isChecked = true
    state.cartList.push(payload)
  },
  [ISCHECKED_TOTRUE](state) {
    state.cartList.forEach(element => {
      element.isChecked = true
    });
  },
  [ISCHECKED_FALSE](state) {
    state.cartList.forEach(element => {
      element.isChecked = false
    });
  }
}