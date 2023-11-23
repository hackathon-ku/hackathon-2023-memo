import axios from 'axios';

const axiosBaseurl = axios.create({
    baseURL: 'https://localhost:8080/',
    withCredentials: true,
});

export default axiosBaseurl;
