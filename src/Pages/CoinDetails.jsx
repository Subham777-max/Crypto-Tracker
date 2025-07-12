import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import fetchCoinDetails from "../Services/fetchCoinDetails";
import coinStore from "../Store/coinStore";
import CoinInfo from "../Components/CoinInfo/CoinInfo";

function CoinDetails(){
    const { coinId }=useParams();
    const { currency,setCurrency }=coinStore();
    const { data:coin,isError,isLoading,error }=useQuery({
        queryKey:['coin-details',coinId],
        queryFn: ()=> fetchCoinDetails(coinId),
        cacheTime: 1000*2*60,
        staleTime: 1000*2*60,
    })
    function handleChange(e){
       setCurrency(e.target.options[e.target.selectedIndex].value);
    }
    if(isLoading){
        return <div>Loading..</div>
    }
    if(isError){
        console.log(error.message);
    }
    return(
        <>
            <div className="flex flex-col items-center h-[100vh] w-[100vw] md:block md:p-4 md:ml-20">
                <div className="mt-[12vh] grid grid-cols-1 md:grid-cols-[1fr_2fr] w-[90%] mb-4 md:gap-10 ">
                    <div className="flex flex-col items-center p-4 mb-4 bg-white border rounded-lg shadow-2xl h-[98.8%]">
                        <div>
                            <img src={coin?.image?.large} alt="" className="mb-5 shadow-2xl h-52 w-52 rounded-[50%] border" />
                        </div>
                        <div>
                            <p className="leading-relaxed text-justify text-gray-700">
                                {coin?.description?.en}
                            </p>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <h1 className="text-2xl font-bold text-green-500">
                                <span className="text-2xl font-bold text-gray-900">Current Price :</span> {currency === 'usd' ? '$' : '₹'}  {coin?.market_data?.current_price?.[currency]}
                            </h1>
                            <div>
                                <select name="currency" id="currency" value={currency}  onChange={handleChange}>
                                    <option value="usd" >USD</option>
                                    <option value="inr">INR</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-5 bg-white border rounded-lg shadow-2xl h-[98.8%]">
                        <h1 className="mx-2 my-5 text-3xl font-semibold text-gray-900 md:tracking-wider md:text-4xl">
                            See The Change In The Chart : 
                        </h1>
                        <div>
                            <CoinInfo coinId={coinId} />
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
export default CoinDetails;