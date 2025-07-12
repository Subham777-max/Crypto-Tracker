import { useQuery } from "@tanstack/react-query";
import coinStore from "../Store/coinStore";
import fetchCoinData from "../Services/fetchCoinData";
import { useNavigate } from "react-router-dom";

function Home(){
    const { currency,setCurrency }= coinStore();
    const page=1;
    const perPage=5;
    const { data:coins,isError,isLoading,error}=useQuery({
        queryKey:['coins',page,currency,perPage],
        queryFn: () => fetchCoinData(page, currency, perPage),
        cacheTime: 1000*2*60,
        staleTime: 1000*2*60,
    })

    const navigate=useNavigate();

    function handleChange(e){
       setCurrency(e.target.options[e.target.selectedIndex].value);
    }

    function onclickHandler(id){
        navigate(`/coinDetails/${id}`);
    }

    if(isError){
        console.log(error.message);
    }

    
    return (
        <>
            <div className="h-[80vh] w-[100vw] mt-[12vh] flex flex-col items-center gap-4">
                <h1 className="mb-4 text-4xl font-semibold text-center text-gray-900 md:text-7xl">
                    Track Your Favorite <br className="hidden sm:inline" /> Cryptocurrencies in Real Time
                </h1>
                <p className="text-xl text-gray-500 md:text-2xl">Simple. Fast. No account needed.</p>
                <button onClick={()=> navigate('/coinTable')} className="px-6 py-3 bg-[#1A2D55] text-white text-lg font-semibold rounded-lg hover:bg-[#16264A]  transition">
                    Explore Now
                </button>
                <div className="w-[80%]">
                    <div className="flex">
                        <h1 className="mt-8 mb-2 text-3xl font-semibold text-gray-900">Top 5 Cryptocurrencies:</h1>
                        <div className="mt-8 mb-2 ml-auto">
                            <select name="currency" id="currency" value={currency}  onChange={handleChange}>
                                <option value="usd" >USD</option>
                                <option value="inr">INR</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex md:block">
                        <div className="flex flex-col w-full gap-4">
                            
                            <div className="hidden md:grid md:grid-cols-[2fr_1fr_1fr_1fr] gap-4 text-2xl font-bold bg-[#F7F8FA] rounded-md p-2 text-gray-800">
                                <div>Name</div>
                                <div>Price</div>
                                <div>24h %</div>
                                <div>Market Cap</div>
                            </div>
                            
                            {isLoading && <div>Loading...</div>}
                            {coins && coins.map((coin, idx) => (
                                <div
                                key={idx}
                                className=" cursor-pointer grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-4 bg-white p-4 rounded-md shadow md:shadow-transparent "
                                onClick={()=>onclickHandler(coin.id)}
                                >
                                {/* Name and symbol */}
                                    <div className="flex items-center gap-4">
                                        <img src={coin.image} alt={coin.name} className="w-10 h-10" loading="lazy"/>
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
            </div>
        </>
    );
}
export default Home;