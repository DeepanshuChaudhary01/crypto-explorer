import React, { useRef, useEffect, useState } from 'react';
import { Chart } from 'chart.js/auto';
import { Button, CircularProgress, createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import { CryptoState } from '../CryptoContext';
import axios from 'axios';
import { HistoricalChart } from '../Config/api';
import { chartDays } from '../Config/data';

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
    "&:hover": {
      backgroundColor: "gold",
      color: "black",
    },
    width: "22%",
  },
}));

const CoinInfo = ({ coin }) => {
  const [historicData, setHistoricData] = useState();
  const [days, setDays] = useState(1);
  const [flag, setFlag] = useState(false);
  const { currency,selected,setSelected } = CryptoState(); // Change this state according to your logic
  const classes = useStyles();
  const chartRef = useRef(null);

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
    setFlag(true);
    setHistoricData(data.prices);
  };

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days, currency]);

  useEffect(() => {
    if (historicData && flag) {
      const ctx = document.getElementById('myChart');
      if (ctx) {
        const myChart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: historicData.map((coin) => {
              let date = new Date(coin[0]);
              let time = date.getHours() > 12
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
          },
          options: {
            elements: {
              point: {
                radius: 1,
              },
            },
          },
        });

        chartRef.current = myChart;
      }
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [historicData, flag, days, currency]);

  return (
    <ThemeProvider theme={createTheme({
      palette: {
        primary: {
          main: "#fff",
        },
        type: "dark",
      },
    })}>
      <div className={classes.container}>
        {!historicData || !flag ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <canvas id="myChart" />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <Button
                  key={day.value}
                  variant={day.value}
                  onClick={() => { setDays(day.value); setFlag(false); }}
                  className={classes.selectbutton}
                  style={{
                    backgroundColor: selected ? "gold" : "",
                    color: selected ? "black" : "",
                    fontWeight: selected ? 700 : 500,
                  }}
                >
                  {day.label}
                  {selected => setSelected(day.value === days)}
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default CoinInfo;
