import axios from 'axios'

// const token: string | null = localStorage.getItem('token')

const headers = {
  'Content-Type': 'application/json',
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1dWlkIjoiWE0ySmFiTGJVRWp4TGh0VFdRVDNnU040Iiwic3ViIjoiMTE0Iiwic2NwIjoidXNlciIsImF1ZCI6bnVsbCwiaWF0IjoxNjE5NTg4NjQwLCJleHAiOjE2MTk1OTIyNDAsImp0aSI6IjllNGM1ZGIwLTU3ODMtNDBhNC05YzRmLTk4ZTU4YTcwYTNlMiJ9.1hN0cYQrPZLPH9tnMraGNrwdNS6Kh3u1opRhszWJM9k',
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
