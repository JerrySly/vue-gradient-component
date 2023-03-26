<template>
  <div class="output-block">
    <input class="output-block__input" type="text" :value="outputText" readonly>
  </div>
</template>

<script>
import colorMixin from '@/mixins/colorMixin';

export default {
    mixins: [colorMixin],
    props: {
        color: {
            type: String,
            default: '#FF000000'
        },
        outputType: {
            type: String,
            default: 'rgba'
        }
    },
    computed: {
        outputText() {
            if(this.outputType === 'hex-alpha') {
                return '#'+this.rgba2hex(this.color).toUpperCase()
            }
            return this.color;
        }
    }
}
</script>

<style>
.output-block {
    margin-left: 15px;
}
.output-block__input {
    padding-left: 15px;
    height: 30px;
    font-size: 16px;
    border-radius: 12px;
    font-weight: 700;
    outline: none;
    text-align: center;
}
</style>