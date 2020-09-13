import axios from 'axios'

// export function request(config, success, failure) {
//   // 创建 axios 实例
//   const instance = axios.create({
//     baseURL: '',
//     timeout: 500
//   })
//   // 发送网络请求
//   instance(config)
//     .then(res => {
//       success(res)
//     })
//     .catch(err => {
//       failure(err)
//     })
// }

// export function request(config) {
//   const instance = axios.create({
//     baseURL: '',
//     timeout: 500
//   })
//   instance(config.baseConfig)
//     .then(res => {
//       config.success(res)
//     })
//     .catch(err => {
//       config.failure(err)
//     })
// }

// export function request(config) {
//   return new Promise((resolve, reject) => {
//     const instance = axios.create({
//       baseURL: '',
//       timeout: 500
//     })
//     instance(config)
//       .then(res => {
//         resolve(res)
//       })
//       .catch(err => {
//         reject(err)
//       })
//   })
// }

export function request(config) {
  const instance = axios.create({
    baseURL: '',
    timeout: 1000
  })

  // 请求拦截
  // instance.interceptors.request.use(
  //   config => {
  //     console.log(config)
  //     return config
  //   }, err => {
  //     console.log(err)
  //   })

  // 相应拦截
  instance.interceptors.response.use(
    res => {
      // console.log(res)
      return res.data
    },
    err => {
      console.log(err)
    }
  )

  return instance(config)
}