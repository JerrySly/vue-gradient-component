
import ColorPicker from './ColorPicker.vue'

const install = Vue => {
    if (install.installed) return;
    install.installed = true;
    Vue.component(ColorPicker.name, ColorPicker);
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}

export default {
    install, ColorPicker
}