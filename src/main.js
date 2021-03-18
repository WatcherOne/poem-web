import { createApp } from 'vue'
import App from './App.vue'
import { Button, Layout, Row, Col, Menu, Carousel } from 'ant-design-vue'
import router from './router'
import store from './store'

const app = createApp(App)
app.use(Button)
app.use(Layout)
app.use(Row)
app.use(Col)
app.use(Menu)
app.use(Carousel)
app.use(router)
app.use(store)

app.mount('#app')
