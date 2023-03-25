<template>
  <div>
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    />
    <color-picker />
  </div>
</template>

<script>
import ColorPicker from './components/ColorPicker.vue';

export default {
  components: { ColorPicker },
  name: 'App',
};
</script>

<style></style>
