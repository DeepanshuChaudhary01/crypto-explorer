import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import { CryptoState } from '../../CryptoContext';
import { Avatar } from '@material-ui/core';
import {signOut} from 'firebase/auth'
import { auth } from '../../Firebase';
import { numberWithCommas } from '../CoinsTable';
import {AiFillDelete} from 'react-icons/ai';
import { db } from '../../Firebase';
import {doc,setDoc} from 'firebase/firestore'

const useStyles = makeStyles({
  container:{
    width:350,
    padding:25,
    height:'100%',
    display:'flex',
    flexDirection:'column',
    fontFamily:'monospace',
  },
  profile: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
    height: "92%",
  },
  picture: {
    width: 200,
    height: 200,
    cursor: "pointer",
    backgroundColor: "#EEBC1D",
    objectFit: "contain",
  },
  logout: {
    height: "8%",
    width: "100%",
    backgroundColor: "#EEBC1D",
    marginTop: 20,
  },
  watchlist: {
    flex: 1,
    width: "100%",
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 15,
    paddingTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    overflowY: "scroll",
  },
  coin: {
    padding: 10,
    borderRadius: 5,
    color: "black",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#EEBC1D",
    boxShadow: "0 0 3px black",
  },
});

export default function UserSidebar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  

  const removeFromWatchlist=async(coin)=>{
    
    function filterWatchlist(watch) {
      return watch !== coin?.id;
    }

    const coinRef=doc(db,'watchlist',user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter(filterWatchlist) }
        ,{merge:'true'}//to merge it with orig. document
      );
        //if watchlist have something then add all of that else add only one i.e, current coin only
      
      setAlert({
        open:true,
        message: `${coin.name} Removed from the Watchlist`,
        type: 'seccess',
      })
    } catch (error) {
      setAlert({
        open:true,
        message: error.message,
        type: 'error',
      })
    }
  }

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
        Show
    </div>
  );

  const {user,setAlert,watchlist,coins,symbol}=CryptoState();
  console.log('user', user);

  const logOut=()=>{
    signOut(auth);

    setAlert({
      open:true,
      type:'success',
      message:'Logout Successful !!'
    })
  }

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
            {/* for showing avatar icon */}
            <Avatar
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              marginLeft: 15,
              cursor: "pointer",
              backgroundColor: "#EEBC1D",
            }}
            src={user?.photoURL}
            alt={user?.displayName || user?.email}
          />
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            <div className={classes.container} >
                <div className={classes.profile}>
                    <Avatar
                    className={classes.picture}
                    src={user.photoURL}
                    alt={user.displayName||user.email}
                    >
                    </Avatar>
                    <span
                    style={{
                      width: "100%",
                      fontSize: 25,
                      textAlign: "center",
                      fontWeight: "bolder",
                      wordWrap: "break-word",
                    }}
                    >
                      {user.displayName||user.email}
                    </span>
                    <div className={classes.watchlist}>
                      <span
                        style={{fontSize:15,textShadow:'0 0 5px black'}}
                      >
                        Watchlist
                      </span>
                      {coins.map(coin=>{
                        if(watchlist.includes(coin.id))
                        return(
                          <div className='classes.coin'>
                            <span>
                              {coin.name}
                            </span>
                            <span style={{display:'flex',gap:8}}>
                          {symbol}
                          {numberWithCommas(coin.current_price.toFixed(2))}
                          <AiFillDelete
                            style={{cursor:'pointer'}}
                            fontSize='16'
                            onClick={()=>removeFromWatchlist(coin)}
                          />
                            </span>
                          </div>
                        )
                      })}
                    </div>
                </div>
                <Button
                  variant='contained'
                  className={classes.logout}
                  onClick={logOut}
                >
                  LogOut
                </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}