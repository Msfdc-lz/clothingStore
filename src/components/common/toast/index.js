import Toast from "components/common/toast/Toast"

const obj = {}

obj.install = function (Vue) {

  // 1. 创建组件构造器
  const toastConstructor = Vue.extend(Toast)

  // 2. 通过组件构造器 new 一个组件对象
  const toast = new toastConstructor()

  // 3. 将组件对象手动挂载都某一个元素上
  toast.$mount(document.createElement('div'))

  // 4. 将元素添加到 body 中
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast

}

export default obj