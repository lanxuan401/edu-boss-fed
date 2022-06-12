// 用户相关的请求模块
import request from '@/utils/request'
import qs from 'qs'

interface User {
    phone: string
    password: string
}

export const login = (data: User) => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
    // axios 默认发送的是json格式
    // 如果data是普通对象，则content-type是application/json
    // 如果data是qs.stringify(data)转换后的数据：key=value&key=value
    // 则Content-Type会被设置为application/x-www.form-urlencoded
    // 如果data 是FormData对象，则Content-Type是multipart/form-data
    data: qs.stringify(data)
  })
}
