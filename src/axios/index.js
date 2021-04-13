import message from '../utils/config'
import axios from 'axios'
axios.defaults.baseURL = '/api'
// 跨域请求时是否需要凭证
axios.defaults.withCredentials = true
// axios.defaults.timeout = 20000

// 请求拦截器
axios.interceptors.request.use(config => {
  // 存储-取消请求标识
  if (!window.axiosCancel) {
    window.axiosCancel = []
  }
  config.cancelToken = new axios.CancelToken(cancel => {
    window.axiosCancel.push({ cancel })
  })
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(res => {
  const responseData = res.data
  // 403：无操作权限
  if (responseData && responseData.code === 403) {
    return responseData.data
  } else if (responseData && responseData.code !== 0) {
    message.error(responseData.msg)
    return Promise.reject(error)
  } else {
    return responseData.data
  }
}, error => {
  return Promise.reject(error)
})

export default axios
