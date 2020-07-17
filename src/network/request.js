import axios from 'axios'   // 引入axios

export function request(config) {


  // 创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/n3',
    timeout: 5000
  })

  // 请求拦截器
  instance.interceptors.request.use(config => {
    return config
  }, err => {

  })

  // 响应拦截器
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {

  })


  // 发送真正的网络请求
  return instance(config)


}
