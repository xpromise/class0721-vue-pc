<template>
  <button @click="handleClick"><slot /></button>
</template>

<script>
export default {
  name: "Button",
  data() {
    return {
      isClick: false,
    };
  },
  methods: {
    handleClick(event) {
      if (this.isClick) return;
      this.isClick = true;
      // this.$emit("click", event);
      this.$listeners.click(event).finally(() => {
        this.isClick = false;
      });
    },
  },
};
</script>

<style>
</style>