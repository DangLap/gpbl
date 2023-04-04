import { createApp } from 'vue'
import App from './App.vue'
import MCombobox from './components/MCombobox/MCombobox.vue'


const app = createApp(App);
app.component("MCombobox",MCombobox);
app.mount('#app')
