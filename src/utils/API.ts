import axios from 'axios'

// const token: string | null = localStorage.getItem('token')
// https://railsapi.yamapay.com:443/api/v1/sign_in
// user[email] = ronakmethan@gmail.com
// user[password] = RonMet123#

const headers = {
  'Content-Type': 'application/json',
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiRGFGM0ZxYm1UU3NoM3M5cDg3RncyOU0xIiwic3ViIjoiMTQ5Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjIxMjU2NzQwLCJleHAiOjE2MjEyNjAzNDAsImp0aSI6ImEzMTczZmMwLWZiOTYtNDJiYi04Zjc5LWJhZWY5YzQwYTczYiJ9.nqU41o-IuND-zJL6l_A6BaD6bn2CdRCZnKS9uqjBGR8',
}

const axiosApi = axios.create({
  withCredentials: false,
  // baseURL: `http://gateway.yamapay.com/reporting/mobile`,
  baseURL: `http://127.0.0.1:8000/api`,
  headers,
})

axiosApi.interceptors.response.use(
  (response: any) => response,
  (err: any) => {
    if (err.response && err.response.status === 401) {
      // localStorage.removeItem('token');
    }
    return Promise.reject(err)
  },
)

export default axiosApi
