import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function uploadAvatar() {
  return request({
    url: '/user/uploadAvatar',
    method: "put",
    params: { data }
  })
}

export function getRecord() {
  return request({
    url: '/record/admin',
    method: "get",
    params: {}
  })
}

export function register(data) {
  return request({
    url: '/user/register',
    method: "post",
    data
  })

}

export function changeInfo(data) {
  console.log(data)
  return request({
    url: '/user/changeInfo',
    method: "put",
    data
  })
}

export function deleteUser(data) {
  console.log(data)
  return request({
    url: '/user/delete',
    method: "delete",
    data
  })
}