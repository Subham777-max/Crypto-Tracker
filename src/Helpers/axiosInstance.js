import axios from 'axios';
import {COINGECKO_URL} from '../Helpers/constants'

const axiosInstance=axios.create({
    baseURL:COINGECKO_URL,
});

export default axiosInstance;