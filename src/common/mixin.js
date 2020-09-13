import { debounce } from "./utils"
import BackTop from "components/content/backTop/BackTop";

export const imageListener = {
  data() {
    return {
      newRefresh: null,
      itemImgListener: null,
    }
  },
  mounted() {// 所有组件都有一个 $el 属性：用于获取组件的元素
    // console.log(this.$refs.tabControl.$el.offsetTop);

    this.newRefresh = debounce(() => {
      this.$refs.scroll.refresh();
    }, 100);

    this.itemImgListener = () => {
      this.newRefresh()
    };
    // 图片加载事件的监听
    this.$bus.$on("itemImageLoad", this.itemImgListener);
    // console.log("混入")
  },
}

export const backTopListener = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    BackTop,
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    shoeJudge(position) {
      this.isShowBackTop = position.y < -1000;
    }
  },
}