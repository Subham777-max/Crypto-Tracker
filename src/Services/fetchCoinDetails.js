import axiosInstance from "../Helpers/axiosInstance";

async function fetchCoinDetails(id){
    try{
        const response=await axiosInstance.get(`/coins/${id}`);
        return response.data;
    }
    catch(err){
        console.error(err);
        return null;
    }
}
export default fetchCoinDetails;