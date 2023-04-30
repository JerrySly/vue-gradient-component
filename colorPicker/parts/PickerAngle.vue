<template>
  <div class="angle-block" ref="angleCircle" :style="{
    borderColor: circleColor
  }" @mousedown="mouseDown">
    <div class="angle-point" :style="{
        background: pointColor,
        borderColor: pointColor,
        left: left + 'px',
        top: top + 'px'
    }"></div>
  </div>
</template>

<script>
export default {
    props:{
        pointColor: {
            type: String,
            default: 'orange'
        },
        circleColor: {
            type: String,
            default: 'orange'
        }
    },
    data() {
        return {
            left: (30 - 5.5) / 2,
            top: 0,
            clicked: false
        }
    },
    computed: {
        center() {
            const {x, y, width, height} = this.$refs.angleCircle.getBoundingClientRect();
            return {xCenter: (x + width/2), yCenter: (y + height/2)};
        },
        angle() {
            const up = 10 * (10 - this.top) + ((10 - 10)* (this.left - 10));
            const lengthFirst = Math.sqrt((10 *10) + Math.pow((10 - 10), 2));
            const lengthSecond = Math.sqrt(Math.pow((10 - this.top), 2) + Math.pow((this.left - 10), 2));
            let koef = this.left < 10 ? -1 : 1;
            return koef * Math.acos(up/(lengthFirst * lengthSecond)) * (180/Math.PI);
        }
    },
    mounted() {
        document.onmouseup = this.mouseUp; 
    },
    methods: {
        mouseDown() {
            this.clicked = true;
            document.body.onmousemove = this.mouseMove;
        },
        mouseUp() {
            this.clicked = false;
            document.body.onmousemove = null;
        },
        mouseMove(event) {
            if(!this.clicked) return;
            const {x, y} = event;
            const R = 10;
            const yResults = this.calculateYPointsPosition(x,y,R);
            const points = [];
            points.push([
                yResults[0],
                this.getXPosition(yResults[0],x,y)
            ]);
            points.push([
                yResults[1],
                this.getXPosition(yResults[1],x,y)
            ]);
            const point = this.getClosestPoint(points,x,y);
            const startPoint = this.$refs.angleCircle.getBoundingClientRect();
            if(point) {
                this.top = point[0] - startPoint.y - 6;
                this.left = point[1] - startPoint.x - 6;
            }
            this.$emit('change', this.angle);
        },
        getClosestPoint(points, x, y) {
            let maxLength = 9999999;
            let currentPoint;
            for(let point of points) {
                let len = Math.sqrt(Math.pow(x - point[1], 2) + Math.pow(y - point[0], 2));
                if (len < maxLength) {
                    maxLength = len;
                    currentPoint = point;
                }
            }
            return currentPoint;
        },
        calculateYPointsPosition(xMouse, yMouse, R) {
            const koef = (this.center.xCenter - xMouse) / (this.center.yCenter - yMouse);
            const c = (this.center.yCenter * this.center.yCenter) - (R * R/(koef * koef + 1));
            const disc = (4 * this.center.yCenter * this.center.yCenter) - 4*c;
            const result1 = (2 * this.center.yCenter - Math.sqrt(disc)) / 2
            const result2 = (2 * this.center.yCenter + Math.sqrt(disc)) / 2
            return [result1, result2]
        },
        getXPosition(yPoint, x, y) {
            return (((yPoint - this.center.yCenter) * (x - this.center.xCenter)) / (y - this.center.yCenter)) + this.center.xCenter;
        }
    },
}
</script>

<style scoped>
.angle-block {
    border: 2px solid;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    position: relative;
}
.angle-point {
    width: 5px;
    height: 5px;
    border: 2px solid;
    border-radius: 50%;
    position: absolute;
}
</style>