import { createApp, Vue } from 'vue'
import App from './App.vue'
import ColorPicker from '../colorPicker/index'

console.log(ColorPicker);


const app = createApp(App);
app.use(ColorPicker);
app.mount('#app');
