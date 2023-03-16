import React from 'react'
import { TrendingCoins } from '../../Config/api'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { CryptoState } from '../../CryptoContext'
import 'react-alice-carousel/lib/alice-carousel.css';
import AliceCarousel from "react-alice-carousel";
import { Link } from 'react-router-dom'

export function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [trending, setTrending] = useState([])//initial state-> empty array
  const {currency,symbol}=CryptoState();
    let cssStyles={
        height:"50%",
        display:"flex",
        alignItems:"center",
      }
      let cSCarouselItem={
        display:"flex",
        alignItems:"center",
        flexDirection:"column",
        cursor:"pointer",
        textTransform:"uppercase",
        color:"white"
      }

    const fetchingTrendingCoins=async()=>{
      //now getting api end points
      //npm i axios
      const {data}=await axios.get(TrendingCoins(currency))//TrendingCoins->name of api

    setTrending(data);//after fetching data updating trending
    }
    console.log(trending);

    useEffect(() => {
      fetchingTrendingCoins();
    }, [currency]);

    // const items=trending.map((coin)=>{//items are boxex of horizontal moving row
    // return(
    //   <>
    //   {/*$ is for current coin id 
    //   coin?.image In this case, coin?.image is checking if coin is not null or undefined before accessing its image property.
    //   */
    // }
    //   <Link style={cSCarouselItem}
    //   to={`./coins/${coin.id}`}>
      
    //   <img
    //   src={coin?.image}
    //   alt={coin.name}
    //   height="80"
    //   style={{marginBottom:10}}
    //   />
    //   //span tag will contain symbol of coin
      
      
    //   </Link>
    //   </>
    // )
    // })

    function mapCoinsToItems(coin) {
      let profit= coin.price_change_percentage_24h>=0;//true or false, price_change_percentage_24h is property of particular currency taken from console
      return (
        <>
          <Link style={cSCarouselItem} to={`./coins/${coin.id}`}>
            <img
              src={coin?.image}
              alt={coin.name}
              height="80"
              style={{ marginBottom: 10 }}
            />
            {/*//span tag will contain symbol of coin*/}
            <span>
              {coin?.symbol}
              &nbsp; {/*//for giving some space*/}
              <span 
              style={{
                color: profit>0?"rgb(14,203,129)":"red",
                fontWeight:500,
              }}
              >
              {profit&&'+'}{coin?.price_change_percentage_24h?.toFixed(2)}%
              </span>
              
            </span>
            <span style={{fontSize:22, fontWeight:500}}>
                {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
              </span>
          </Link>
        </>
      );
    }
    
    const items = trending.map(mapCoinsToItems);//here map() is a fn takes each element of trending array and create respective element of items array. Each element of items array will have the property according to mapCoinsToItems fn.
    
    const responsive={
      0:{//0pixels
        items:2,
      },
      512:{//if more than 512 pixels show 4 items
        items:4,
      }
    }

  return (
    <div style={cssStyles}>
      <>
      {/*AliceCarousel is horizontal moving row */}
        <AliceCarousel
        
        
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        items={items}
        />
      </>
    </div>
  )
}

export default Carousel