<template
  ><div class="picker">
    <picker-body
      class="picker__body"
      :color="shade.rgb"
      @input="(data) => (color = data)"
    />
    <picker-color-panel @input="(data) => (shade = data)" class="picker__color-panel"/>
    <picker-opacity
      class="picker__opacity"
      @input="(data) => (opacity = data)"
    />
    <picker-preview :background="previewBackground" />
  </div>
</template>

<script>
import PickerBody from './parts/PickerBody.vue';
import PickerColorPanel from './parts/PickerColorPanel.vue';
import PickerOpacity from './parts/PickerOpacity.vue';
import PickerPreview from './parts/PickerPreview.vue';
export default {
  components: { PickerBody, PickerOpacity, PickerPreview, PickerColorPanel },
  data() {
    return {
      color: {
        r: 255,
        b: 0,
        g: 0
      },
      opacity: 1,
      shade: {
        rgb: 'red'
      }
    };
  },
  computed: {
    previewBackground() {
      return  `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity}`;
    },
  },
};
</script>

<style>
.picker {
  margin-left: 120px;
}
.picker__body, .picker__color-panel {
  margin-bottom: 20px;
}
</style>
