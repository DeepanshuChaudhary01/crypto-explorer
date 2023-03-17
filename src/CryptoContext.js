import React, { createContext, useState, useContext,useEffect} from 'react'
//use of context api
import { CoinList } from './Config/api';
import axios from 'axios'

const Crypto =createContext();

const CryptoContext = ({children}) => {

  const [currency, setCurrency] = useState("INR");//defining states
  const [symbol, setSymbol] = useState("₹");
  const [selected, setSelected] =useState(true);
  

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCoins=async()=>{
    setLoading(true);
    const {data}=await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };
  
  useEffect(() => {
    if(currency==='INR') setSymbol("₹");
    else if(currency==='USD') setSymbol('$');
  }, [currency])//[] this contains lists of dependencies, and if these changes useEffect will run
  

  return (
    <Crypto.Provider value={{currency,setCurrency,symbol,selected,setSelected,coins,setCoins,loading,setLoading,fetchCoins}}>
        {children}
    </Crypto.Provider>
  )
}

export default CryptoContext;

export const CryptoState = () => {
  const user= useContext(Crypto);
  return user;
};