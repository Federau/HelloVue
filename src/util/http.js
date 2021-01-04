import request from './request'
const http = {
  get (url, params) {
    const config = {
      method: 'get',
      url: url,
      params: ''
    }
    if (params)config.params = params
    return request(config)
  },
  post (url, params) {
    const config = {
      method: 'post',
      url: url,
      data: ''
    }
    if (params) config.data = params
    return request(config)
  },
  put (url, params) {
    const config = {
      method: 'put',
      url: url,
      params: ''
    }
    if (params) config.params = params
    return request(config)
  },
  delete (url, params) {
    const config = {
      method: 'delete',
      url: url,
      params: ''
    }
    if (params) config.params = params
    return request(config)
  }
}
export default http
