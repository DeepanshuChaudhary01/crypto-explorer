import React, { createContext, useState, useContext,useEffect} from 'react'
//use of context api

const Crypto =createContext();

const CryptoContext = ({children}) => {

  const [currency, setCurrency] = useState("INR");//defining states
  const [symbol, setSymbol] = useState("₹");
  const [selected, setSelected] =useState(true);
  
  useEffect(() => {
    if(currency==='INR') setSymbol("₹");
    else if(currency==='USD') setSymbol('$');
  }, [currency])//[] this contains lists of dependencies, and if these changes useEffect will run
  

  return (
    <Crypto.Provider value={{currency,setCurrency,symbol,selected,setSelected}}>
        {children}
    </Crypto.Provider>
  )
}

export default CryptoContext;

export const CryptoState = () => {
  const user= useContext(Crypto);
  return user;
};