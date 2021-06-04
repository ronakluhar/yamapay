import axios from 'axios'

// const token: string | null = localStorage.getItem('token')
// https://railsapi.yamapay.com:443/api/v1/sign_in
// user[email] = ronakmethan@gmail.com
// user[password] = RonMet123#
const headers = {
  'Content-Type': 'application/json',
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiRGFGM0ZxYm1UU3NoM3M5cDg3RncyOU0xIiwic3ViIjoiMTQ5Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjIxNTAwNTYxLCJleHAiOjE2MjE1MDQxNjEsImp0aSI6IjI1NTdmMjg4LTE4OGQtNGMxMS1hNDI4LTU1ZGE3ZTMzNjc2NyJ9.s3KAkgU3OqRd4jvnVWBI7URwZPeRLU8dIOEni3CQ-_E',
}

const axiosApi = axios.create({
  withCredentials: false,
  // baseURL: `http://gateway.yamapay.com/reporting/mobile`,
  baseURL: process.env.REACT_APP_API_URL,
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
