<template>
  <div class="toast" v-show="condition">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default: "",
    // },
    // condition: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  data() {
    return {
      message: "",
      condition: false,
    };
  },
  methods: {
    show(message = "小朋友你是否有很多问号", duration = 2000) {
      this.message = message;
      this.condition = duration;

      setTimeout(() => {
        this.message = "";
        this.condition = false;
      }, duration);
    },
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  background: rgba(0, 0, 0, 0.75);
  color: #fff;
  transform: translate(-50%, -50%);
  padding: 8px 15px;
  border-radius: initial;
  z-index: 9;
}
</style>