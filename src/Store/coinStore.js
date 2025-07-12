import { create } from 'zustand'

const coinStore=create((set)=>({
    currency: 'usd',
    setCurrency: (newCurrency)=>set((state)=>{
        return {
            ...state,
            currency:newCurrency,
        }
    })
}));

export default coinStore;