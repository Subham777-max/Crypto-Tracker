import { useQuery } from '@tanstack/react-query'
import { IoSearch } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import fetchCoinData from '../../Services/fetchCoinData';
import { useNavigate } from 'react-router-dom';
function Navbar(){
    const navigate=useNavigate();
    const [menue,setMenue]=useState('hidden');
    const [filterSuggestion,setFilterSuggestion]=useState([]);
    const [show,setShow]=useState(false);
    const [inputValue,setInputValue]=useState('');
    
    const {data,isError,isLoading}=useQuery({
        queryKey:['coins'],
        queryFn: ()=>fetchCoinData(1,'usd',250),
        cacheTime:1000*60*2,
        staleTime:1000*60*2,
    })
    
    if (isLoading) {
        return <div>Loading...</div>;
    }
    if(isError){
        return <div>Something went wrong.</div>
    }
    const availableKeyword= data.map((coin)=>{
        return coin.id;
    })
    function onChangeHandler(e){
        setInputValue(e.target.value);
        console.log(e.target.value);
          if (e.target.value.trim() === "") {
            setFilterSuggestion([]);
            setShow(false);
            return;
        }    
        let keyWord=availableKeyword.filter((ele)=>{
            return ele.includes(e.target.value.toLowerCase());
        })
        setFilterSuggestion(keyWord);
        setShow(keyWord.length !== 0);
    }
    function onsubmitHandler(e){
        e.preventDefault();
       if(availableKeyword.includes(inputValue))  navigate(`/coinDetails/${inputValue}`);
    }
    return (
        <>
            <div className="bg-[#FFFFFF] flex justify-between items-center p-4 h-[10vh] fixed top-0 left-0 w-full z-10 shadow-sm ">
                <h1 className="px-4 text-xl font-bold cursor-pointer md:text-4xl hover:bg-gray-200 rounded-3xl">CRYPTO TRACKER</h1>
                <div className="relative">
                    
                    
                    <form action="" onSubmit={onsubmitHandler} className=' border border-gray-400 w-[6rem]  flex items-center md:w-[15rem]'>
                        <input type="text" value={inputValue} onChange={onChangeHandler} className="py-2 w-[4rem] px-2 md:w-[13rem] border border-transparent focus:outline-none " placeholder="Search"/>

                        <button type='submit' className="text-2xl font-bold"><IoSearch /></button>
                    </form>
                    
                    {show &&<div id="expectedBox" className="absolute z-10 bg-white w-[100vh] top-[2.7rem] md:w-[15rem] border border-black border-t-transparent">
                        <ul className="flex flex-col gap-2 px-2">
                            {filterSuggestion.map((ele,idx)=>{
                                return(
                                    <li className="px-4 py-2 cursor-pointer hover:bg-gray-200 hover:bg-opacity-80" key={idx} onClick={()=>{
                                        setInputValue(ele);
                                        setShow(false);
                                    }}>{ele}</li>
                                );
                            })}
                        </ul>
                    </div>}
                </div>


                <ul className="hidden gap-8 mr-5 text-xl font-semibold text-gray-800 md:flex">
                    <li className="cursor-pointer hover:text-gray-500" onClick={()=> navigate('/')}>Home</li>
                    <li className="cursor-pointer hover:text-gray-500" onClick={()=> navigate('/coinTable')}>Coins</li>
                </ul>
                <div className="relative md:hidden">
                    <h1 className="text-3xl" onClick={()=>menue==='hidden'?setMenue('block'):setMenue('hidden')}>{menue==='hidden'?<GiHamburgerMenu />:<FaTimes />}</h1>
                    <div  className={`w-[100px] h-[150px] absolute left-[-5rem] py-2 px-4 rounded-md bg-white/20 backdrop-blur-md shadow-md border border-white/30 ${menue}`}>
                        <ul className="flex flex-col gap-5 text-xl font-semibold text-gray-800 ">
                            <li className="p-2 rounded-lg cursor-pointer hover:bg-white/30" onClick={()=> navigate('/')} >Home</li>
                            <li className="p-2 rounded-lg cursor-pointer hover:bg-white/30" onClick={()=> navigate('/coinTable')} >Coin</li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}   
export default Navbar;