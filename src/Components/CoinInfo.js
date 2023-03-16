import React,{useState,useEffect} from 'react';
import { HistoricalChart } from '../Config/api';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { Button, CircularProgress, createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import {Line} from 'react-chartjs-2';
import {Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale} from 'chart.js';
import { chartDays } from '../Config/data';

Chart.register (LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);


const useStyles = makeStyles((theme) => ({
  container: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  
  },
  selectbutton: {
    border: "1px solid gold",
    borderRadius: 5,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    fontFamily: "Montserrat",
    cursor: "pointer",
    // backgroundColor: selected ? "gold" : "",
    // color: selected ? "black" : "",
    // fontWeight: selected ? 700 : 500,
    "&:hover": {
      backgroundColor: "gold",
      color: "black",
    },
    width: "22%",
    //   margin: 5,
  },
}));



const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const { currency,selected,setSelected } = CryptoState();
  const [flag,setflag] = useState(false);


  const classes = useStyles();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setflag(true);
    setHistoricData(data.prices);
  };

  console.log(coin);
  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days,currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={classes.container}>
        {!historicData | flag===false ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((coin) => {
                  
                  let date = new Date(coin[0]);
                  
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: historicData.map((coin) => coin[1]),
                    label: 'yes',
                    borderColor: "#EEBC1D",
                  },
                ],
                
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day)=>(
                <Button variant={day.value}
                onClick={() => {setDays(day.value);setflag(false);}}
                // selected={day.value === days}
                
                className={classes.selectbutton}
                style={{
                  backgroundColor: selected ? "gold" : "",
                  color: selected ? "black" : "",
                  fontWeight: selected ? 700 : 500,
                }}
                >
                  {day.label}
                  {({selected})=> setSelected(day.value === days)}
                  {/* if(selected){
                  setSelected(day.value === days)
                } */}
                </Button>
              ))}
              {/* {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))} */}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;