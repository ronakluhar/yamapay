import axios from 'axios'

// const token: string | null = localStorage.getItem('token')
// https://railsapi.yamapay.com:443/api/v1/sign_in
// user[email] = ronakmethan@gmail.com
// user[password] = RonMet123#

const headers = {
  'Content-Type': 'application/json',
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiWE0ySmFiTGJVRWp4TGh0VFdRVDNnU040Iiwic3ViIjoiMTE0Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjIwMjk1NzMwLCJleHAiOjE2MjAyOTkzMzAsImp0aSI6ImIyMGYxY2Q4LWQyYTItNDE3MC04MjZlLTNiOWU5ODQ0MDkyOCJ9.Du5x93KXrPJz3K06EuoDD7uz8KAahmOIKPqyvCSkLrk',
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
