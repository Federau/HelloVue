import http from './http'
let resquest = 'localhost:5001/'
const api = {
// get请求
  getListAPI (url, params) {
    return http.get(`${resquest}` + url, params)
  },
  // post请求
  postFormAPI (url, params) {
    return http.post(`${resquest}` + url, params)
  },
  // put 请求
  putSomeAPI (url, params) {
    return http.put(`${resquest}` + url, params)
  },
  // delete 请求
  deleteListAPI (url, params) {
    return http.delete(`${resquest}` + url, params)
  }
}
export default api
