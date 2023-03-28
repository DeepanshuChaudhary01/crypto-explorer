import { Snackbar } from '@material-ui/core';
import { CryptoState } from '../CryptoContext';
import MuiAlert from '@material-ui/lab/Alert'
import React from 'react'

const Alert = () => {
    const {alert,setAlert}=CryptoState();
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setAlert({open:false});
    };

  return (
    //used for showing alert type lower-left/right ...
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
      <MuiAlert
        onclose={handleClose}
        elevation={10}
        variant='filled'
        severity={alert.type}
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  )
}

export default Alert