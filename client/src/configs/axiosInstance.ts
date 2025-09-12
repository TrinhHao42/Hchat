import axios from 'axios'
import server from './server.config'

const axiosInstance = axios.create({
  baseURL: server.apiGateway,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
})

export default axiosInstance 