<template
  ><div class="picker">
    <picker-body
      class="picker__body"
      :color="shade.rgb"
      @input="colorInput"
      :width="width"
      :height="pickerBodyHeight"
      :point-size="pickerBodyPointSize"
      :point-color="pickerBodyPointColor"
    />
    <picker-color-panel
      @input="(data) => (shade = data)"
      class="picker__color-panel"
      :width="width"
      :height="optionBlockHeight"
      :point-size="pickerOptionPointSize"
      :point-color="pickerOptionPointColor"
    />
    <picker-opacity
      class="picker__opacity"
      @input="(data) => (opacity = data)"
      :width="width"
      :height="optionBlockHeight"
      :point-size="pickerOptionPointSize"
      :point-color="pickerOptionPointColor"
      :color="previewBackground"
    />
    <div class="preview-block">
      <picker-preview
        :background="previewBackground"
        :width="previewWidth"
        :height="previewHeight"
      />
      <picker-output
        :color="previewBackground"
        :outputType="outputTextType"
      />
    </div>
  </div>
</template>

<script>
import PickerBody from './parts/PickerBody.vue';
import PickerColorPanel from './parts/PickerColorPanel.vue';
import PickerOpacity from './parts/PickerOpacity.vue';
import PickerOutput from './parts/PickerOutput.vue';
import PickerPreview from './parts/PickerPreview.vue';
export default {
  components: {
    PickerBody,
    PickerOpacity,
    PickerPreview,
    PickerColorPanel,
    PickerOutput,
  },
  props: {
    width: {
      type: [String, Number],
      default: 300,
    },
    pickerBodyHeight: {
      type: [String, Number],
      default: 300,
    },
    pickerBodyPointSize: {
      type: [String, Number],
      default: 10,
    },
    pickerBodyPointColor: {
      type: String,
      default: 'orange',
    },
    optionBlockHeight: {
      type: [String, Number],
      default: 15,
    },
    pickerOptionPointSize: {
      type: [String, Number],
      default: 7,
    },
    pickerOptionPointColor: {
      type: String,
      default: 'white',
    },
    previewWidth: {
      type: [String, Number],
      default: 50,
    },
    previewHeight: {
      type: [String, Number],
      default: 50,
    },
    outputTextType: {
      type: String,
      default: 'hex-alpha',
      validator(value) {
        // The value must match one of these strings
        return ['hex-alpha', 'rgba'].includes(value);
      },
    },
    outputValueType: {
      type: String,
      default: 'string/rgba',
      validator(value) {
        // The value must match one of these strings
        return ['string/rgba', 'object', 'string/svg'].includes(value);
      },
    },
  },
  data() {
    return {
      color: {
        r: 255,
        b: 0,
        g: 0,
      },
      opacity: 1,
      shade: {
        rgb: 'red',
      },
    };
  },
  computed: {
    previewBackground() {
      return `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
    },
  },
  methods: {
    opacityInput(data) {
      this.opacity = data;
      this.emitValue();
    },
    shadeInput(data) {
      this.shade = data;
      this.emitValue();
    },
    colorInput(data) {
      this.color = data;
      this.emitValue();
    },
    ///to-do with gradient + svg
    emitValue() {
      if (this.outputValueType === 'string/rgba') 
        this.$emit('input', this.previewBackground);
      if (this.outputValueType === 'object') {
        this.color.a = this.opacity;
        this.$emit('input', this.color);
      }
      return this.previewBackground;
    }
  },
};
</script>

<style>
.options-block {
  display: flex;
}
.options-block__preview {
  flex: 2;
}
.options-block__options {
  flex: 10;
}
.picker {
  margin-left: 120px;
}
.picker__body,
.picker__color-panel {
  margin-bottom: 20px;
}
.preview-block {
  margin-top: 10px;
  display: flex;
  align-items: center;
}
</style>
