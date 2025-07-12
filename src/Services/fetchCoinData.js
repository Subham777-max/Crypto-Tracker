
import axiosInstance from "../Helpers/axiosInstance";

async function fetchCoinData(page=1,currency='usd',perPage=10){
    try{
        const response=await axiosInstance.get(`/coins/markets?vs_currency=${currency}&page=${page}&per_page=${perPage}&order=market_cap_desc`);
        return response.data;
    }
    catch(err){
        console.error(err);
        return null;
    }
}
export default fetchCoinData;