/* import { createApp } from "vue";
import App from "./App.vue";
import router from './router'

createApp(App).use(router).mount("#app"); */


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(router)

// Replace -> app.mount('#app')
router.isReady().then(() => {
    app.mount('#app')
})

