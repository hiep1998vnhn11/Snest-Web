import axios from 'axios'
import Cookies from 'js-cookie'

const access_token = Cookies.get('access_token')
const headers = {}
if (access_token) {
  headers['Authorization'] = `Bearer ${access_token}`
}
const request = axios.create({
  baseURL: process.env.NUXT_ENV_API_URL,
  headers
})
request.interceptors.response.use(
  response => {
    if (response && response.data) {
      return response.data
    }
    return false
  },
  _err => {
    return false
  }
)

export default request
