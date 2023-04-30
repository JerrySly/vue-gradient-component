<template>
  <div>
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    />
    <div style="display: flex; justify-content: center">
      <ColorPicker @input="(value) => (log = value)" outputValueType="string/svg"/>
    </div>
    <div style=" height: 500px;">{{ log }}</div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      log: null,
    };
  },
};
</script>

<style></style>
