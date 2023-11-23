import axios from 'axios';

const axiosBaseurl = axios.create({
    baseURL: 'http://localhost:8000/',

});

export default axiosBaseurl;
