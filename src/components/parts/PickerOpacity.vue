<template>
  <div
    class="opacity-background"
    :style="{ width: width + 'px', height: height + 'px' }"
    @mousedown="mouseDown"
    @mouseup="mouseUp"
  >
    <div
      class="opacity-block"
      :style="computedStyle"
      @mousedown="mouseDown"
      @mouseup="mouseUp"
    >
      <div
        class="opacity-pointer"
        :style="pointStyle"
      />
    </div>
  </div>
</template>

<script>

export default {
  props: {
    color: {
      type: String,
      default: 'red',
    },
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
    this.body = document.getElementById('picker-body');
    document.body.addEventListener('mouseup', () => {
      this.clicked = false;
    });
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
        background: `linear-gradient(to right, rgba(0,0,0, 0) 1%, ${this.color} 100%)`,
        width: this.width + 'px',
        height: this.height + 'px',
      };
    },
    value() {
      return this.pointerPosition.left / (this.width - 15);
    },
  },
  methods: {
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
      }
    },
    mouseUp() {
      this.clicked = false;
      document.onmousemove = null;
    },
    setPointerOnMouse(x) {
      const { left, width } = this.body.getBoundingClientRect();
      if (x > left + width - 10) {
        x = left + width - 15;
      }
      if (x < left) {
        x = left;
      }
      const currentLeft = x - left;
      this.pointerPosition = {
        left: currentLeft,
      };
      this.$emit('input', this.value);
    },
  },
};
</script>

<style scoped>
.opacity-block {
  position: relative;
  border-radius: 12px;
}
.opacity-background {
  border-radius: 12px;
  position: relative;
  background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iOHB4IiBoZWlnaHQ9IjhweCIgdmlld0JveD0iMCAwIDggOCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICAgIDxnIGlkPSLil7zvuI4tLy1taXNjLS8tdGV4dHVyZXMtLy1jaGVzcy0oMjR4MzIpLWNvcHkiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9IjAuMiI+CiAgICAgICAgPGcgaWQ9Ikdyb3VwLUNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQuMDAwMDAwLCA0LjAwMDAwMCkgcm90YXRlKC0yNzAuMDAwMDAwKSB0cmFuc2xhdGUoLTQuMDAwMDAwLCAtNC4wMDAwMDApIHRyYW5zbGF0ZSgtMC4wMDAwMDAsIDAuMDAwMDAwKSIgZmlsbD0iIzAwMDAwMCI+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtOCIgeD0iMCIgeT0iNCIgd2lkdGg9IjQiIGhlaWdodD0iNCI+PC9yZWN0PgogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTgtQ29weS0yIiB4PSI0IiB5PSIwIiB3aWR0aD0iNCIgaGVpZ2h0PSI0Ij48L3JlY3Q+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K);
}
.opacity-pointer {
  position: absolute;
  border-radius: 50%;
  z-index: 2;
  top: 2px;
}
</style>
