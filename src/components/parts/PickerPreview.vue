<template>
  <div
    class="preview"
    :style="{
      width: width + 'px',
      height: height + 'px',
      background: background,
    }"
  />
</template>

<script>
export default {
  props: {
    background: {
      type: String,
      default: 'red',
    },
    width: {
      type: [String, Number],
      default: 150,
    },
    height: {
      type: [String, Number],
      default: 150,
    },
  },
};
</script>

<style>
.preview {
  border-radius: 12px;
}
</style>
