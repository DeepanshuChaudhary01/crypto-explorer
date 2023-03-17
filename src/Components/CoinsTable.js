import React from 'react'
import { CryptoState } from '../CryptoContext';
import {useState,useEffect} from 'react'
import { createTheme, LinearProgress, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider } from '@material-ui/core';
import {Typography} from '@material-ui/core';
import {Container} from '@material-ui/core';
import {useNavigate} from "react-router-dom";
import {Pagination} from '@material-ui/lab';

const useStyles = makeStyles({
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "gold",
    },
    // '& .Mui-selected': {
    //   backgroundColor: 'gold',
    // },
  },
});

export function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const CoinsTable = () => {

  const [search, setSearch] = useState([]);
  const [page, setPage] = useState(1);
  const navigate=useNavigate();
  const { currency, symbol, coins, loading, setCoins,setLoading,fetchCoins } = CryptoState();



  // const fetchCoins=async()=>{
  //   setLoading(true);
  //   const {data}=await axios.get(CoinList(currency));
  //   setCoins(data);
  //   setLoading(false);
  // }; taking this fn to CryptoContext
  // console.log(coins);

  useEffect(() => {
    fetchCoins();
  }, [currency]);
  
  const darkTheme=createTheme({
    palette:{
      primary:{
        main:"#fff",
      },
      type:"dark",
    },
  })

  function handleSearchChange(e) {
    setSearch(e.target.value);
  }

  const handleSearch=()=>{//handleSearch an array
    return coins.filter((coin)=>(
      coin.name.toLowerCase().includes(search)||coin.symbol.toLowerCase().includes(search)
    )
    )
  }

  // function tableRowClickFn(row){
  //     navigate(`./coins/${row.id}`);
  // }

  const cssStyleRow={
    backgroundColor:'#16171a',
    cursor:'pointer',
    '&:hover':{
      backgroundColor:'#131111',
    },
    fontFamily:'Montserrat',
  }

  

  const classes = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{textAlign:"Center"}}>
        <Typography
        variant='h4'
        style={{margin:18,fontFamily:'Montserrat'}}
        >
          Crytocurrency Prices by Market Cap
        </Typography>

        <TextField label="Search For a Crypto Currency.." variant="outlined"
        style={{marginBottom:20,width:"100%"}}
        onChange={handleSearchChange}
        />
<TableContainer>
        
        {loading ? (
          <LinearProgress style={{backgroundColor: "gold"}}/>
        ):(
          <Table >
            <TableHead style={{backgroundColor:"#EEBC1D"}}>
              <TableRow>
                {
                  ['Coin','Price','24h Change','Market Cap'].map((head)=>(
                    <TableCell
                    style={{
                      color:"black",
                      fontWeight:"700",
                      fontFamily:"Montserrat",
                    }}
                    key={head}
                    align={head==='Coin'?"":'right'}
                    >
                      {head}
                    </TableCell>
                  ))
                }
              </TableRow>
            </TableHead>

                <TableBody>
                {handleSearch()
                .slice((page-1)*10,(page-1)*10+10)
                .map((row) => {
                    const profit = row.price_change_percentage_24h > 0;
                    return (
                      <TableRow
                      onClick={() => navigate(`/coins/${row.id}`)}
                      style={cssStyleRow}
                        key={row.name}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={{
                            display: "flex",
                            
                            gap: 15,
                          }}
                        >
                          <img
                            src={row?.image}
                            alt={row.name}
                            height="50"
                            style={{ marginBottom: 10 }}
                          />

                          <div
                          style={{
                            display:'flex',
                            flexDirection:'column'
                          }}
                          >
                            <span
                            style={{
                              textTransform:'uppercase',
                              fontSize:22,
                            }}
                            >
                              {row.symbol}
                            </span>
                            <span style={{color:'darkgrey'}}>
                              {row.name}
                            </span>
                          </div>
                        </TableCell>
                            
                        <TableCell align='right'>
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>

                        <TableCell align='right'
                        style={{
                          color:profit>0?"rgb(14,203,129)":"red",
                          fontWeight:500,
                        }}
                        >
                          {profit && "+"}{row.price_change_percentage_24h.toFixed(2)}%
                          
                        </TableCell>

                        <TableCell align='right'>
                        {symbol}{' '}{numberWithCommas(row.market_cap.toString().slice(0,-1))}M
                        </TableCell>

                      </TableRow>
                    );
                  })}
                </TableBody>

          </Table>
      )}
    </TableContainer>
      <Pagination
      style={{
        padding:20,
        width:'100%',
        display:'flex',
        justifyContent:'center'
      }}
      classes={{ ul: classes.pagination }}

      count={(handleSearch()?.length/10).toFixed(0)}
      onChange={(_,value)=>{
        setPage(value);
        window.scroll(0,450);
      }}
      />
      </Container>
    </ThemeProvider>
  )
}

export default CoinsTable