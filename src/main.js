import { createApp } from 'vue'
import App from './App.vue'
import { Button, Layout, Row, Col, Menu, Carousel, Card, Form, Input, Select, Table, Modal, Tree } from 'ant-design-vue'
import router from './router'
import store from './store'
import axios from './axios/index'
import message from './utils/message.config'

const app = createApp(App)

app.config.globalProperties.$http = axios
app.config.globalProperties.$message = message
app.config.globalProperties.$modal = Modal

app.use(Button)
app.use(Layout)
app.use(Row)
app.use(Col)
app.use(Menu)
app.use(Carousel)
app.use(Card)
app.use(Form)
app.use(Input)
app.use(Select)
app.use(Table)
app.use(Modal)
app.use(Tree)
app.use(router)
app.use(store)

app.mount('#app')
