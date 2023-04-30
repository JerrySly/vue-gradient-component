<template
  ><div class="color-picker">
    <div v-if="mode === 'gradient'">
      <picker-angle
        @change="changeAngle"
        :point-color="anglePointColor"
        :circle-color="angleCircleColor"
      />
    </div>
    <picker-body
      class="color-picker__body"
      :color="shade.rgb"
      @input="colorInput"
      :width="width"
      :height="pickerBodyHeight"
      :point-size="pickerBodyPointSize"
      :point-color="pickerBodyPointColor"
    />
    <picker-gradient
      v-if="mode === 'gradient'"
      :width="width"
      :height="optionBlockHeight"
      :point-size="pickerGradientPointSize"
      class="color-picker__gradient"
      :color="normalColor"
      @update="setGradientPoints"
    />
    <picker-color-panel
      @input="(data) => (shade = data)"
      class="color-picker__color-panel"
      :width="width"
      :height="optionBlockHeight"
      :point-size="pickerOptionPointSize"
      :point-color="pickerOptionPointColor"
    />
    <picker-opacity
      class="color-picker__opacity"
      @input="(data) => (opacity = data)"
      :width="width"
      :height="optionBlockHeight"
      :point-size="pickerOptionPointSize"
      :point-color="pickerOptionPointColor"
      :color="normalColor"
    />
    <div class="preview-block">
      <picker-preview
        :background="previewBackground"
        :width="previewWidth"
        :height="previewHeight"
      />
      <picker-output
        v-if="mode === 'normal'"
        :color="previewBackground"
        :outputType="outputTextType"
      />
    </div>
  </div>
</template>

<script>
import colorMixin from './colorMixin';
import PickerBody from './parts/PickerBody.vue';
import PickerColorPanel from './parts/PickerColorPanel.vue';
import PickerGradient from './parts/PickerGradient.vue';
import PickerOpacity from './parts/PickerOpacity.vue';
import PickerOutput from './parts/PickerOutput.vue';
import PickerPreview from './parts/PickerPreview.vue';
import PickerAngle from './parts/PickerAngle.vue';
export default {
  name: 'ColorPicker',
  components: {
    PickerBody,
    PickerOpacity,
    PickerPreview,
    PickerColorPanel,
    PickerOutput,
    PickerGradient,
    PickerAngle,
  },
  mixins: [colorMixin],
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
    pickerGradientPointSize: {
      type: [String, Number],
      default: 12,
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
    anglePointColor: {
      type: String,
      default: 'orange'
    },
    angleCircleColor: {
      type: String,
      default: 'orange'
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
    mode: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['normal', 'gradient'].includes(value);
      },
    },
    gradientType: {
      type: String,
      default: 'linear',
      validator(value) {
        return ['linear','radial'].includes(value)
      }
    }
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
      angle: 0,
      points: null
    };
  },
  computed: {
    previewBackground() {
      if (this.mode === 'normal') return `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
      if (this.mode === 'gradient' && this.points) {
        return this.pointsToGradient(this.points, this.gradientType, this.angle);
      }
    },
    normalColor() {
      return `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${this.opacity})`;
    }
  },
  methods: {
    setGradientPoints(points) {
      this.points = points;
      this.emitValue();
    },
    changeAngle(value) {
      this.angle = value;
      this.emitValue();
    },
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
        if(this.mode === 'normal') { 
          this.color.a = this.opacity;
          this.$emit('input', this.color);
        }
        if(this.mode === 'gradient') {
          this.$emit('input', {points: this.points, angle: this.angle});
        }
      }
      if (this.outputValueType === 'string/svg') {
        if (this.mode === 'gradient') this.$emit('input', this.pointsToSvgDefs(this.points, this.gradientType, this.angle))
      }
      return this.previewBackground;
    },
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
.color-picker__body,
.color-picker__color-panel,
.color-picker__gradient {
  margin-bottom: 15px;
}
.preview-block {
  margin-top: 10px;
  display: flex;
  align-items: center;
}
</style>
