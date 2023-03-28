import {React} from 'react'
import { AppBar,Container,createTheme,MenuItem,Select,Toolbar,Typography,ThemeProvider } from '@material-ui/core'
import {useNavigate} from "react-router-dom";
import { CryptoState } from '../CryptoContext';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';

const Header = () => {
  let cssStyles={
    flex:1,
    color:'gold',
    fontFamily:'Montserrat',
    fontWeight:'bold',
    cursor:'pointer'

  }
  
  const{currency,setCurrency,user}=CryptoState();
  console.log(currency);

  const darkTheme=createTheme({
    palette:{
      primary:{
        main:'#fff'
      },
      type:'dark',
    }
  })
  
  const navigate=useNavigate();
  // console.log('user1', user);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
          <Container>
            <Toolbar>
              {/* <a href="/" style={cssStyles} variant='h6'>Crypto Explorer</a> */}
              <Typography style={cssStyles} href='#' variant='h6'
              onClick={()=>navigate('/')}
              >Crypto Explorer</Typography>
              <Select variant='outlined' style={{width:100,height:40,marginLeft:15}} 
              value={currency}
              onChange={(e)=>setCurrency(e.target.value)}
              >
                <MenuItem value={'INR'}>INR</MenuItem>
                <MenuItem value={'USD'}>USD</MenuItem>
              </Select>
              {/*checking if user exists/means already Logged In show logout else display <Authmodal> i.e, login button */}
              {/* {user ? 'Logout' : <AuthModal/>} */}
              {/* inplace of logout text let's have login functionality */}
              {user ? <UserSidebar/> : <AuthModal/>}
              {/* <AuthModal/> */}

            </Toolbar>
          </Container>
        </AppBar>
        </ThemeProvider>
    </div>
    
  )
}


export default Header