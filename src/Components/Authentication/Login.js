import { Box, Button, TextField } from '@material-ui/core';
import React, { useState } from 'react'
import { CryptoState } from '../../CryptoContext';
import { auth } from '../../Firebase';
import {signInWithEmailAndPassword} from 'firebase/auth'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const {setAlert}=CryptoState();

    const handleSubmit=async()=>{
      if(!email||!password){
        setAlert({
          open:true,
          message:'Please fill all the Fields',
          type:'error',
        })
      }
      try {
        const result=await signInWithEmailAndPassword(auth,email,password);
        setAlert({
          open: true,
          message: `Login Successful. Welcome ${result.user.email}`,
          type: "success",
        });
      
      } catch (error) {
        setAlert({
          
            open: true,
            message: error.message,
            type: "error",
          
        })
      }
    }

  return (
    <Box
    p={3}
    style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        padding:'20px'
    }}
    >
        <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        >
        
        </TextField>

        <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        />
        <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        style={{ backgroundColor: "#EEBC1D" }}
        >
            Submit
        </Button>
    </Box>
    
  )
}

export default Login