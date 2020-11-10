import request from '@/utils/request'

export default{
  list() {
    return request({
      url: `admin/edu/teacher/test`,
      method: 'get'
    })
  },
  PageList(page, limit, seachObj) {
    return request({
      url: `/admin/edu/teacher/list/${page}/${limit}`,
      method: 'get',
      // 表单、字符窜的传参方式
      params: seachObj
    })
  },
  removeById(id) {
    return request({
      url: `/admin/edu/teacher/remove/${id}`,
      method: 'delete'
    })
  },
  save(teacher) {
    return request({
      url: `/admin/edu/teacher/save`,
      method: 'post',
      // json的传参方式
      data: teacher
    })
  },
  getById(id) {
    return request({
      url: `/admin/edu/teacher/get/${id}`,
      method: 'get'
    })
  },
  updateById(teacher) {
    return request({
      url: '/admin/edu/teacher/update',
      method: 'put',
      data: teacher
    })
  },
  removeBatch(idList) {
    return request({
      url: `/admin/edu/teacher/batch-remove/`,
      method: 'delete',
      data: idList
    })
  },
  selectListBykey(key) {
    return request({
      url: `/admin/edu/teacher/list/name/${key}`,
      method: 'get'
    })
  }
}
