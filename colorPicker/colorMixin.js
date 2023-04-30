export default {
  methods: {
    rgba2hex(orig) {
      let a,
        isPercent,
        rgb = orig
          .replace(/\s/g, '')
          .match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
        alpha = ((rgb && rgb[4]) || '').trim(),
        hex = rgb
          ? (rgb[1] | (1 << 8)).toString(16).slice(1) +
            (rgb[2] | (1 << 8)).toString(16).slice(1) +
            (rgb[3] | (1 << 8)).toString(16).slice(1)
          : orig;

      if (alpha !== '') {
        a = alpha;
      } else {
        a = '01';
      }
      // multiply before convert to HEX
      a = ((a * 255) | (1 << 8)).toString(16).slice(1);
      hex = hex + a;

      return hex;
    },
    pointsToGradient(points, gradientType, angle) {
      points = points.sort((a,b) => a.position - b.position);
      if(gradientType === 'linear') {
        let innerText = '';
        for (const point of points) {
          innerText += `${point.color} ${point.position}%,`
        }
        innerText = innerText.substring(0, innerText.length - 1);
        return `linear-gradient(${angle}deg, ${innerText})`
      }
      if(gradientType === 'radial') {
        let innerText = '';
        for (const point of points) {
          innerText += `${point.color} ${point.position}%,`
        }
        innerText = innerText.substring(0, innerText.length - 1);
        return `radial-gradient(${innerText})`
      }
    },
    getRotationCoordinate(angle) {
      const anglePI = angle * -(Math.PI / 180);
      return {
        x1: `${Math.round(50 + Math.sin(anglePI) * 50)}%`,
        y1: `${Math.round(50 + Math.cos(anglePI) * 50)}%`,
        x2: `${Math.round(50 + Math.sin(anglePI + Math.PI) * 50)}%`,
        y2: `${Math.round(50 + Math.cos(anglePI + Math.PI) * 50)}%`,
      };
    },
    pointsToSvgDefs(points, gradientType, angle = 0) {
      const coordinates = this.getRotationCoordinate(angle);
      let stopsString = '';
      for (let point of points) {
        stopsString += `<stop offset="${point.position}%" stop-color="${point.color}"/>`
      }
      return `<${gradientType}Gradient x1="${coordinates.x1}" x2="${coordinates.x2}" y1="${coordinates.y1}" y2="${coordinates.y2}">
        ${stopsString}</${gradientType}Gradient>`
    }
  },
};
