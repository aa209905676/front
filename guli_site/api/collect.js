import request from '@/utils/request'
import cookie from 'js-cookie'

export default {

  isCollect(courseId) {
    return request({
      url: `/api/edu/course-collect/auth/is-collect/${courseId}`,
      method: 'get',
      headers: { 'token': cookie.get('guli_jwt_token') }
    })
  },

  addCollect(courseId) {
    return request({
      url: `/api/edu/course-collect/auth/save/${courseId}`,
      method: 'post',
      headers: { 'token': cookie.get('guli_jwt_token') }
    })
  },

  getCollectList() {
    return request({
      url: '/api/edu/course-collect/auth/list',
      method: 'get',
      headers: { 'token': cookie.get('guli_jwt_token') }
    })
  },

  removeById(courseId) {
    return request({
      url: `/api/edu/course-collect/auth/remove/${courseId}`,
      method: 'delete',
      headers: { 'token': cookie.get('guli_jwt_token') }
    })
  }
}
