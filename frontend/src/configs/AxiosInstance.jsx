import axios from 'axios'

const AxiosIntance = axios.create({
    baseURL: "localhost"
})

AxiosIntance.defaults.timeout = 2000
AxiosIntance.defaults.headers.common['Authorization'] = AUTH_TOKEN;

export default AxiosIntance