import request from '~/utils/request'
import cookie from 'js-cookie'

export default {
  createOrder(courseId) {
    return request({
      // baseURL: 'http://localhost:8170',
      url: `/api/trade/order/auth/save/${courseId}`,
      method: 'post',
      // 通过请求头发送token
      headers: { 'token': cookie.get('guli_jwt_token') }
    })
  },
  getById(orderId) {
    return request({
      // baseURL: 'http://localhost:8170',
      url: `/api/trade/order/auth/get/${orderId}`,
      method: 'get',
      // 通过请求头发送token
      headers: { 'token': cookie.get('guli_jwt_token') }
    })
  },
  isBuy(courseId) {
    return request({
      // baseURL: 'http://localhost:8170',
      url: `/api/trade/order/auth/is-buy/${courseId}`,
      method: 'get',
      // 通过请求头发送token
      headers: { 'token': cookie.get('guli_jwt_token') }
    })
  },
  getList() {
    return request({
      // baseURL: 'http://localhost:8170',
      url: '/api/trade/order/auth/list',
      method: 'get',
      headers: { 'token': cookie.get('guli_jwt_token') }
    })
  },

  removeById(orderId) {
    return request({
      // baseURL: 'http://localhost:8170',
      url: `/api/trade/order/auth/remove/${orderId}`,
      method: 'delete',
      headers: { 'token': cookie.get('guli_jwt_token') }
    })
  }
}
