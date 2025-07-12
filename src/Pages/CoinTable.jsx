import { useQuery } from "@tanstack/react-query";
import fetchCoinData from "../Services/fetchCoinData";
import { useState } from "react";
import coinStore from "../Store/coinStore";
import { useNavigate } from "react-router-dom";

function CoinTable(){
    const { currency,setCurrency }=coinStore();
    const navigate=useNavigate();
    const [page,setPage]=useState(1);
    const perPage=10;
    const { data:coins,isError,isLoading,error}=useQuery({
        queryKey:['coins',page,currency,perPage],
        queryFn: () => fetchCoinData(page, currency, perPage),
        cacheTime: 1000*2*60,
        staleTime: 1000*2*60,
    })
    function onclickHandler(id){
        navigate(`/coinDetails/${id}`);
    }
    function handleChange(e){
       setCurrency(e.target.options[e.target.selectedIndex].value);
    }

    if(isError){
        console.log(error.message);
    }

    return (
        <>
            <div className="mt-[12vh] flex flex-col items-center">
                <h1 className="text-4xl font-bold text-center text-gray-900 md:text-6xl">
                    Cryptocurrency Prices
                </h1>
                <p className="mt-3 text-lg text-center text-gray-600 md:tracking-wide">
                    View real-time data for top cryptocurrencies including price, market cap, and daily changes.
                </p>

                
                <div className="w-[80%]">
                    <div className="flex">
                        <h1 className="mt-8 mb-2 text-3xl font-semibold text-gray-900"> Cryptocurrencies:</h1>
                        <div className="mt-8 mb-2 ml-auto">
                            <select name="currency" id="currency" value={currency}  onChange={handleChange}>
                                <option value="usd" >USD</option>
                                <option value="inr">INR</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex md:block">
                        <div className="relative flex flex-col w-full gap-4">
                            
                            <div className="hidden   md:grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-4 text-2xl font-bold bg-[#F7F8FA] rounded-md p-2 text-gray-800">
                                <div>Name</div>
                                <div>Price</div>
                                <div>24h %</div>
                                <div>Market Cap</div>
                            </div>
                            
                            {isLoading && <div>Loading...</div>}
                            {coins && coins.map((coin, idx) => (
                                <div
                                key={idx}
                                className="grid grid-cols-1 cursor-pointer md:grid-cols-[2fr_1fr_1fr_1fr] gap-4 bg-white p-4 rounded-md shadow md:shadow-transparent "
                                onClick={()=>onclickHandler(coin.id)}
                                >
                                {/* Name and symbol */}
                                    <div className="flex items-center gap-4">
                                        <img src={coin.image} alt={coin.name} className="w-10 h-10" loading="lazy" />
                                        <div>
                                            <div className="text-lg font-semibold">{coin.name}</div>
                                            <div className="text-sm text-gray-500 uppercase">{coin.symbol}</div>
                                        </div>
                                    </div>

                                {/* Price */}
                                    <div className="text-base text-gray-800 md:text-lg">
                                        <span className="font-semibold md:hidden">Price: </span>
                                        {currency === 'usd' ? '$' : '₹'} {coin.current_price}
                                    </div>

                                {/* 24h Change */}
                                    <div
                                        className={`text-base md:text-lg ${
                                        coin.price_change_24h >= 0 ? "text-green-600" : "text-red-600"
                                        }`}
                                    >
                                        <span className="font-semibold md:hidden">24h %: </span>
                                        {coin.price_change_24h.toFixed(2)}%
                                    </div>

                                {/* Market Cap */}
                                    <div className="text-base text-gray-800 md:text-lg">
                                        <span className="font-semibold md:hidden">Market Cap: </span>
                                        {coin.market_cap}
                                    </div>
                                </div>
                            ))}
                        </div>


                        
                    </div>

                </div>
                <div className="flex gap-5 mt-2">
                    <button disabled={page==1} className="px-6 py-2 mb-4 font-semibold tracking-wider text-gray-900 transition-all bg-transparent border border-gray-900 rounded-sm ease hover:opacity-80 " onClick={() => setPage(page - 1)}>Prev</button>
                    <button className="px-6 py-2 mb-4 font-semibold tracking-wider text-white transition-all bg-gray-900 rounded-sm ease hover:opacity-80 " onClick={() => setPage(page + 1)}>Next</button>
                </div>
          </div>  
        </>
    );
}
export default CoinTable;