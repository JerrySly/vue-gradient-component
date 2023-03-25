<template>
  <div
    id="picker-body"
    @mousedown="mouseDown"
    @mouseup="mouseUp"
  >
    <div
      class="picker-body__pointer"
      :style="pointPositionStyle"
    ></div>
    <canvas
      width="350"
      height="300"
      ref="canvas"
    >
      <!-- <div
        :style="{
          background: color,
        }"
      >
      </div> -->
    </canvas>
  </div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'green',
    },
    modelValue: {
      type: Object,
      default: {
        top: 20,
        left: 20,
      },
    },
  },
  data() {
    return {
      clicked: false,
      pointerPosition: this.modelValue,
      body: null,
      selectedColor: null,
    };
  },
  computed: {
    pointPositionStyle() {
      return {
        top: this.pointerPosition.top + 'px',
        left: this.pointerPosition.left + 'px',
      };
    },
  },
  watch: {
    color() {
      this.setCanvas();
    },
  },
  mounted() {
    this.body = document.getElementById('picker-body');
    document.body.addEventListener('mouseup', () => {
      this.clicked = false;
    });
    this.setCanvas();
  },
  methods: {
    setCanvas() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');

      const xGradient = ctx.createLinearGradient(
        0,
        canvas.height / 2,
        canvas.width,
        canvas.height
      );
      const yGradient = ctx.createLinearGradient(
        canvas.width / 2,
        0,
        canvas.width / 2,
        canvas.height
      );

      xGradient.addColorStop(0, 'white');
      xGradient.addColorStop(0.6, this.color);
      yGradient.addColorStop(0, 'transparent');
      yGradient.addColorStop(1, 'black');

      ctx.fillStyle = xGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = yGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    },
    mouseDown(event) {
      if (Array.from(event.target.classList).includes('picker-body__pointer')) {
        return;
      }
      this.clicked = true;
      const { x, y } = event;
      this.setPointerOnMouse(x, y);
      this.setSelectedColor(x, y);
      document.body.onmousemove = this.mouseMove;
    },
    mouseMove(event) {
      if (this.clicked) {
        const { x, y } = event;
        this.setPointerOnMouse(x, y);
        this.setSelectedColor(x, y);
      }
    },
    mouseUp(event) {
      this.clicked = false;
      document.body.onmousemove = null;
    },
    setSelectedColor(xMouse, yMouse) {
      const { x, y } = this.$refs.canvas.getBoundingClientRect();
      if (xMouse > this.$refs.canvas.width + x)
       xMouse = this.$refs.canvas.width + x - 10
      if (yMouse > this.$refs.canvas.height + y)
        yMouse = this.$refs.canvas.height + y - 10
      if (xMouse < x) {
        xMouse = x;
      }
      if (yMouse < y) {
        yMouse = y;
      }
      const ctx = this.$refs.canvas.getContext('2d');
      const point = ctx.getImageData(xMouse - x, yMouse - y, 1, 1).data;
      var hex =
        '#' +
        ('000000' + this.rgbToHex(point[0], point[1], point[2])).slice(-6);
      this.selectedColor = {
        hex,
        rgb: `rgb(${point[0]}, ${point[1]}, ${point[2]})`,
        r: point[0],
        g: point[1],
        b: point[2],
      };
      this.$emit('input', this.selectedColor);
    },
    rgbToHex(r, g, b) {
      if (r > 255 || g > 255 || b > 255) throw 'Invalid color component';
      return ((r << 16) | (g << 8) | b).toString(16);
    },
    setPointerOnMouse(x, y) {
      const { left, top, width, height } = this.body.getBoundingClientRect();
      if (x > left + width - 10) {
        x = left + width - 15;
      }
      if (x < left) {
        x = left;
      }
      if (y >= top + height - 10) {
        y = top + height - 15;
      }
      if (y < top) {
        y = top;
      }
      const currentTop = y - top;
      const currentLeft = x - left;
      this.pointerPosition = {
        top: currentTop,
        left: currentLeft,
      };
    },
  },
};
</script>

<style>
#picker-body {
  max-width: 500px;
  max-height: 500px;
  width: 350px;
  height: 300px;
  position: relative;
  user-select: none;
}
.picker-body__pointer {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid orange;
  /* box-shadow: 1px 1px 1px black; */
  z-index: 2;
}
.picker-body__first {
  position: absolute;
  background: linear-gradient(to right, #fff 0%, transparent 100%);
  width: 100%;
  height: 100%;
  user-select: none;
}
.picker-body__second {
  background: linear-gradient(to bottom, transparent 0%, black 100%);
  width: 100%;
  height: 100%;
  position: absolute;
  user-select: none;
}
</style>
