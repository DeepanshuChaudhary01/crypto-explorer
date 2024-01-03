import Home from "./Pages/Home";
import Header from "./Components/Header.js";
import "./App.css";
import CoinPage from "./Pages/CoinPage";
import CryptoContext from "./CryptoContext";
import Alert from "./Components/Alert";

import {
  BrowserRouter,
  Routes, //switch
  Route,
  Link,
} from "react-router-dom";

// const useStyles = makeStyles({
//   App: {
//     backgroundColor: "#14161a",
//     color: "white",
//     minHeight: "100vh",
//   },
// });

function App() {
  let cssStyles = {
    color: "white",
    backgroundColor: "Black",
    minHeight: "100vh",
  };
  // creating object
  // const classes = useStyles();
  return (
    <>
      <BrowserRouter>
        
        <CryptoContext>
          <div style={cssStyles}>
            {/* <div className={classes.App}> */}
            <Header />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/coins/:id" element={<CoinPage />} />
            </Routes>
          </div>
          <Alert />
        </CryptoContext>
      </BrowserRouter>
    </>
  );
}

export default App;
