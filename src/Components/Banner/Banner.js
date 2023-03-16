import React from 'react'
import { Container, Typography } from '@material-ui/core'
import Carousel from './Carousel'

const Banner = () => {
  let cssStylesBanner={
    backgroundImage: `url("./banner2.jpg")`,
  }
  let cSBannerContent={
    height:400,
    display:"flex",
    flexDirection:"column",
    paddingTop:25,
    justifyContent: "space-around",
  }
  let cSTagline={
    height:"40%",
    display:"flex",
    flexDirection:"column",
    textAlign:"center",
    justifyContent: "center",
  }
  return (
  <>
    <div style={cssStylesBanner}>
      <Container style={cSBannerContent}>
        <div style={cSTagline}>
          <Typography
          variant="h2"
          style={{
            fontWeight: "bold",
            marginBottom: 15,
            fontFamily: "Montserrat",
          }}
          >
            Crypto Explorer
          </Typography>
          <Typography
          variant="subtitle2"
          style={{
            color:"darkgrey",
            textTransform:"capitalize",
            fontFamily: "Montserrat",
          }}
          >
            Get All The Info Regarding Your Favorite Crypto Currency
          </Typography>
        </div>
        <Carousel />
      </Container>

    </div>
  </>
    
  )
}

export default Banner