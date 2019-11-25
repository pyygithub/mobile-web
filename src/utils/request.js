import axios from 'axios'

const ok = 200

// create an axios instance
const  instance = axios.create({
    baseURL: '/api', // api 的 base_url
    timeout: 5000   // request timeout
})

// // request interceptor
// instance.interceptors.request.use(
//     config => {
//         // Do something before request is sent
//         if (store.getters.token) {
//             config.headers['Authorization'] = `Bearer ${getToken()}` // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
//         }
//         return config
//     },
//     error => {
//         // Do something with request error
//         Message.error("对不起，出错了")
//         console.log(error) // for debug
//         Promise.reject(error)
//     }
// )
//
// // respone interceptor
// instance.interceptors.response.use(
//     response => {
//         // debugger
//         const res = response.data
//         const errCode = res.code
//         if (errCode !== undefined) {
//             // debugger
//             // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
//             if (errCode === 50008 || errCode === 50012 || errCode === 50014) {
//                 Message({
//                     message: '你已被登出，请重新登录',
//                     type: 'error',
//                     duration: 5 * 1000
//                 })
//                 store.dispatch('FedLogOut').then(() => {
//                     location.reload() // 为了重新实例化vue-router对象 避免bug
//                 })
//                 return Promise.reject(new Error('token expired'))
//             }else if (errCode != ok) {
//                 Message({
//                     message: res.message,
//                     type: 'error',
//                     duration: 5 * 1000
//                 })
//             }
//             return response;
//         } else {
//             return response
//         }
//     },
//     /**
//      * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
//      * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
//      */
//         //  const res = response.data;
//         //     if (res.code !== 20000) {
//         //       Message({
//         //         message: res.message,
//         //         type: 'error',
//         //         duration: 5 * 1000
//         //       });
//         //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
//         //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//         //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
//         //           confirmButtonText: '重新登录',
//         //           cancelButtonText: '取消',
//         //           type: 'warning'
//         //         }).then(() => {
//         //           store.dispatch('FedLogOut').then(() => {
//         //             location.reload();// 为了重新实例化vue-router对象 避免bug
//         //           });
//         //         })
//         //       }
//         //       return Promise.reject('error');
//         //     } else {
//         //       return response.data;
//         //     }
//     error => {
//         console.log('err' + error) // for debug
//         Message({
//             message: error.message,
//             type: 'error',
//             duration: 5 * 1000
//         })
//         return Promise.reject(error)
//     }
// )


// rest 请求
export const createAPI = (url, method, data) => {
    const config = {}
    if ('get' === method) {
        config.params = data
    } else {
        config.data = data
    }

    return new Promise((resolve, reject) => {
        // 执行axios请求
        instance({
            url,
            method,
            ...config
        }).then(response => {
            // 成功调用resolve()
            resolve(response.data)
        }).catch(error => {
            // 失败调用reject()
            reject(error)
        })
    })
}

// form表单请求
export const createFormAPI = (url, method, data) => {
    const config = {}
    config.data = data
    config.headers = {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    config.responseType = 'json'
    config.transformRequest = [
        function(data) {
            let ret = ''
            for (let it in data) {
                ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }
    ]
    return new Promise((resolve, reject) => {
        // 执行axios请求
        instance({
            url,
            method,
            ...config
        }).then(response => {
            // 成功调用resolve()
            resolve(response.data)
        }).catch(error => {
            // 失败调用reject()
            reject(error)
        })
    })
}



// 下载
export const createDown = (url, method, data) => {
    let config = {}
    if (method === 'get') {
        config.params = data
    } else {
        config.data = data
    }
    config.headers = {
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    config.responseType = 'blob'
    return new Promise((resolve, reject) => {
        // 执行axios请求
        instance({
            url,
            method,
            ...config
        }).then(response => {
            // 成功调用resolve()
            resolve(response.data)
        }).catch(error => {
            // 失败调用reject()
            reject(error)
        })
    })
}
