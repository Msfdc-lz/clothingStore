<template>
  <div class="select-button" :class="{selected: isSelected}">
    <img src="~assets/img/cart/tick.svg" alt />
  </div>
</template>

<script>
export default {
  name: "SelectButton",
  props: {
    isSelected: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
};
</script>

<style scoped>
.select-button {
  border-radius: 50%;
  border: 1px solid #aaa;
}

.selected {
  background-color: var(--color-tint);
  border-color: var(--color-tint);
}
</style>