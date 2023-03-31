<template>
  <div
    class="gradient-background"
    :style="{ width: width + 'px', height: height + 'px' }"
    @mousedown="mouseDown"
    @mouseup="mouseUp"
    @click="createPoint"
    @keydown.delete.stop="deletePoint"
  >
    <canvas
      ref="canvasGradient"
      :width="width"
      :height="height"
      class="color-canvas"
    />
    <div
      v-for="(point, index) in points"
      :key="index"
      class="gradient-pointer"
      :style="pointStyle(point, selectPoint === point)"
      @mousedown="selectionPoint(point)"
      @click.stop
      @dblclick.stop="deletePoint(point)"
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
      default: 11,
    },
    pointActiveColor: {
      type: String,
      default: 'orange',
    },
    pointInactiveColor: {
      type: String,
      default: 'white',
    },
  },
  data() {
    return {
      clicked: false,
      pointerPosition: {
        left: 0,
      },
      selectPoint: null,
      body: null,
      points: [
        {
          id: 1,
          color: 'red',
          position: 0,
        },
        {
          id: 2,
          color: 'blue',
          position: 97,
        },
      ],
    };
  },
  mounted() {
    this.body = document.getElementById('picker-body');
    document.body.addEventListener('mouseup', () => {
      this.clicked = false;
    });
    this.setCanvasGradient();
  },
  computed: {},
  methods: {
    getLastId() {
      return this.points.map(x=> x.id).sort((a,b) => b - a)[0];
    },
    deletePoint(point){
      this.points = this.points.filter(x => x.id !== point.id);
      this.selectPoint = null;
      this.setCanvasGradient();
    },
    createPoint(event) {
      const { x } = event;
      const { left, width } = this.$refs.canvasGradient.getBoundingClientRect();
      const onePercent = this.width / 100;
      const currentPosition = (x - left) / onePercent;
      this.points.push({
        id: this.getLastId() + 1,
        color: 'black',
        position: currentPosition,
      })
      this.selectionPoint(this.points[this.points.length-1]);
      this.setCanvasGradient();
    },
    selectionPoint(point) {
      this.selectPoint = point;
    },
    setCanvasGradient() {
      const ctx = this.$refs.canvasGradient.getContext('2d');
      const gradient = ctx.createLinearGradient(
        0,
        this.height / 2,
        this.$refs.canvasGradient.width,
        this.height / 2
      );
      for (const point of this.points) {
        gradient.addColorStop(point.position / 100, point.color);
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(
        0,
        0,
        this.$refs.canvasGradient.width,
        this.$refs.canvasGradient.height
      );
    },
    pointStyle(point, isSelected) {
      return {
        left: point.position + '%',
        width: this.pointSize + 'px',
        height: this.pointSize + 'px',
        backgroundColor: isSelected ? this.pointActiveColor : this.pointInactiveColor
      };
    },
    mouseDown(event) {
      const { x } = event;
      this.clicked = true;
      document.body.onmousemove = this.mouseMove;
      // this.setPointerOnMouse(x);
    },
    mouseMove(event) {
      if (this.clicked) {
        const { x } = event;
        this.setPointerOnMouse(x);
      }
    },
    mouseUp() {
      this.clicked = false;
      document.onmousemove = null;
    },
    setPointerOnMouse(x) {
      const { left, width } = this.$refs.canvasGradient.getBoundingClientRect();
      let currentPosition = 0;
      if (x < left) {
        currentPosition = 0;
      } else {
        if (x > left + width) {
          currentPosition = 97;
        } else {
          const onePercent = this.width / 100;
          currentPosition = (x - left) / onePercent;
        }
      }
      if (this.selectPoint) {
        this.points.filter(
          (x) => x.color === this.selectPoint.color
        )[0].position = currentPosition;
        this.setCanvasGradient();
      }
    },
  },
};
</script>

<style scoped>
.gradient-background {
  border-radius: 12px;
  position: relative;
}
.gradient-pointer {
  position: absolute;
  border-radius: 50%;
  z-index: 3;
  top: 2px;
  cursor: pointer;
}
.color-canvas {
  width: 100%;
  height: 100%;
  border-radius: 12px;
}
</style>
