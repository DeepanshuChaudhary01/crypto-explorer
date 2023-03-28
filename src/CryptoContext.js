import React, { createContext, useState, useContext,useEffect} from 'react'
//use of context api
import { CoinList } from './Config/api';
import axios from 'axios'
import { auth,db } from './Firebase';
import {onAuthStateChanged} from 'firebase/auth';
import {onSnapshot,doc} from 'firebase/firestore'

const Crypto =createContext();

const CryptoContext = ({children}) => {

  const [currency, setCurrency] = useState("INR");//defining states
  const [symbol, setSymbol] = useState("₹");
  const [selected, setSelected] =useState(true);
  
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  //during firebase
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message:'',
    type:'success',
  })
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if(user)
    {
      const coinRef=doc(db,'watchlist',user.uid);

      var unsubscribe=onSnapshot(coinRef,(coin)=>{
        if(coin.exists()){
          setWatchlist(coin.data().coins);
          
        }else{
          console.log('No Items in Watchlist');
        }
        return ()=>{
          unsubscribe();
        }
      })
      
    }
  }, [user])
  

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
  
  useEffect(() => {
    onAuthStateChanged(auth,(user)=>{
      if(user) setUser(user);
      else setUser(null);
    })
  }, [])
  

  return (
    <Crypto.Provider value={{currency,setCurrency,symbol,selected,setSelected,coins,setCoins,loading,setLoading,fetchCoins,alert, setAlert,user,setUser,watchlist}}>
        {children}
    </Crypto.Provider>
  )
}

export default CryptoContext;

export const CryptoState = () => {
  const user= useContext(Crypto);
  return user;
};