<template>
  <div
    class="color-block"
    :style="computedStyle"
    @mousedown="mouseDown"
    @mouseup="mouseUp"
  >
    <canvas ref="canvasColor" :width="width" class="color-canvas" /> 
    <div
      class="color-pointer"
      :style="pointStyle"
    />
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: [String, Number],
      default: 350,
    },
    height: {
      type: [String, Number],
      default: 15,
    },
    pointSize: {
      type: [String, Number],
      default: 11
    },
    pointColor: {
      type: String,
      default: 'white'
    }
  },
  data() {
    return {
      clicked: false,
      pointerPosition: {
        left: 0,
      },
      body: null,
    };
  },
  mounted() {
    this.body = document.getElementsByClassName('color-block')[0];
    document.body.addEventListener('mouseup', () => {
      this.clicked = false;
    });
    this.setCanvas();
  },
  computed: {
    pointStyle() {
      return {
        left: this.pointerPosition.left + 'px',
        width: this.pointSize + 'px',
        height: this.pointSize + 'px',
        border: `2px solid ${this.pointColor}`
      };
    },
    computedStyle() {
      return {
        width: this.width + 'px',
        height: this.height + 'px',
      };
    },
    value() {
      const ctx = this.$refs.canvasColor.getContext('2d');
      const point = ctx.getImageData(this.pointerPosition.left, 1, 1, 1).data;
      console.log(point, this.pointerPosition.left);
      return {
        rgb: `rgb(${point[0]}, ${point[1]}, ${point[2]})`,
        r: point[0],
        g: point[1],
        b: point[2],
      };
    },
  },
  methods: {
    setCanvas() {
        const ctx = this.$refs.canvasColor.getContext('2d');
        const gradient = ctx.createLinearGradient(
            0, this.height / 2, this.$refs.canvasColor.width, this.height / 2
        );
        gradient.addColorStop(0, 'red');
        gradient.addColorStop(0.16666, 'orange');
        gradient.addColorStop(0.16666 * 2, 'yellow');
        gradient.addColorStop(0.16666 * 3, 'green');
        gradient.addColorStop(0.16666 * 4, 'blue');
        gradient.addColorStop(0.16666 * 5, 'indigo');
        gradient.addColorStop(1, 'violet');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, this.$refs.canvasColor.width, this.$refs.canvasColor.height);
    },
    mouseDown(event) {
      const { x } = event;
      this.clicked = true;
      document.body.onmousemove = this.mouseMove;
      this.setPointerOnMouse(x);
    },
    mouseMove(event) {
      if (this.clicked) {
        const { x } = event;
        this.setPointerOnMouse(x);
        this.$emit('input', this.value);
      }
    },
    mouseUp() {
      this.clicked = false;
      document.onmousemove = null;
    },
    setPointerOnMouse(x) {
      const { left, width } = this.$refs.canvasColor.getBoundingClientRect();
      if (x > left + width) {
        x = left + width - 5;
      }
      if (x < left) {
        x = left + 5;
      }
      const currentLeft = x - left - 5;
      this.pointerPosition = {
        left: currentLeft,
      };
    },
  },
};
</script>

<style scoped>
.color-block {
  position: relative;
  border-radius: 12px;
}
.color-pointer {
  position: absolute;
  border-radius: 50%;
  z-index: 2;
  top: 2px;
}
.color-canvas {
    width:100%;
    height:100%;
    border-radius: 12px;
}
</style>
