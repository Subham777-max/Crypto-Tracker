import { useQuery } from '@tanstack/react-query';
import {  CategoryScale } from 'chart.js';
import  Chart  from 'chart.js/auto';
Chart.register(CategoryScale);
import { Line } from 'react-chartjs-2';
import { useState } from 'react';
import coinStore from '../../Store/coinStore';
import fetchCoinHistoricData from '../../Services/fetchCoinHistoricData';
function CoinInfo({ coinId }){
    const [days,setDays]=useState(7);
    const [interval,setCoinInterval]=useState('daily');
    const { currency,setCurrency } = coinStore();
    const { data:historicData,isError,error,isLoading} = useQuery({
        queryKey:['coin-historicData',coinId,days,currency,interval],
        queryFn: ()=> fetchCoinHistoricData(coinId,days,currency,interval),
        cacheTime: 1000*2*60,
        staleTime: 1000*2*60,
    })
    function handleDayChange(e){
        e.preventDefault();
        console.log(e.target.options[e.target.selectedIndex].value);
        const daySelected=e.target.options[e.target.selectedIndex].value;
        if(daySelected==1) setCoinInterval('');
        else setCoinInterval('daily');
        setDays(e.target.options[e.target.selectedIndex].value);
    }
    function handleChange(e){
       setCurrency(e.target.options[e.target.selectedIndex].value);
    }
    if(isLoading){
        return <div>Loading..</div>
    }
    if(isError){
        console.log(error.message);
    }
    if (!historicData || !historicData.prices) {
        return <div>No historic data available</div>;
    }

    return (
        <>
            <div className="h-[50Vh] w-[80vw] md:w-[50vw] md:p-2">
                <Line 
                    
                    data={{
                        labels:historicData.prices.map(coinPrice =>{
                            let date = new Date(coinPrice[0]);
                            let time = date.getHours() > 12 ?`${date.getHours()-12}:${date.getMinutes()} PM` :`${date.getHours()}:${date.getMinutes()} AM`
                            return days==1 ?time : date.toLocaleDateString();
                        }),
                        datasets:[
                            {
                                label: `Price (Past ${days} ${days==1 ? 'Day':'Days'}) in ${currency.toUpperCase()}`,
                                data: historicData.prices.map(coinPrice => coinPrice[1]),
                            }
                        ],
                        
                    }}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        elements:{
                            point:{
                                radius: 0
                            }
                        }
                    }}
                   
                />
                <div className="flex justify-center gap-5 mt-4">
                    <div>
                        <span className="font-semibold text-gray-900 md:text-2xl">Select Days : </span>
                        <select value={days}  className="px-4 py-2 font-semibold text-gray-900 bg-transparent border border-gray-900 rounded-sm " onChange={handleDayChange}>
                            <option value="7">7 days</option>
                            <option value="30">30 days</option>
                            <option value="90">90 days</option>
                            <option value="1">24 hours</option>
                            <option value="365">365 days</option>
                        </select>
                    </div>
                    <div>
                        <span className="font-semibold text-gray-900 md:text-2xl">Select Currency : </span>
                        <select name="currency" id="currency" value={currency}  onChange={handleChange} className="px-4 py-2 font-semibold text-white bg-gray-900 border border-gray-900 rounded-sm">
                                <option value="usd" >USD</option>
                                <option value="inr">INR</option>
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
}   
export default CoinInfo;