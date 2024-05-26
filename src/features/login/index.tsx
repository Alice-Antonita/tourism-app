'use client';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { useAppContext } from '@src/context';
import axios from '@src/utils/axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import validator from 'validator';

export const Login = () => {
  const { push } = useRouter();

  const { handleUser, handleIsLoggedIn } = useAppContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('/api/login', { email, password });
      console.log(response);
      Cookies.set('token', response.data.token, { expires: 1 });
      handleUser({ email });
      handleIsLoggedIn(true);
      push('/');
      // Set token in cookie for 1 day
      enqueueSnackbar('Login successful!', { variant: 'success' });
    } catch (err: any) {
      if (err.response) {
        enqueueSnackbar(err.response.data.error || 'An error occurred', { variant: 'error' });
      } else if (err.request) {
        enqueueSnackbar('No response from server', { variant: 'error' });
      } else {
        enqueueSnackbar('An error occurred', { variant: 'error' });
      }
    }
  };

  return (
    <div>
      <TextField
        id='tr-login-username'
        label='Email'
        variant='standard'
        sx={{ marginTop: '10px' }}
        fullWidth
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(event.target.value);
        }}
      />
      <TextField
        id='tr-login-pass'
        label='Password'
        type={showPassword ? 'text' : 'password'}
        autoComplete='current-password'
        variant='standard'
        fullWidth
        sx={{ marginTop: '20px' }}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton
                aria-label='toggle password visibility'
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge='end'
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(event.target.value);
        }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '50px'
        }}
      >
        <Button
          color='success'
          variant='contained'
          onClick={() => {
            handleSubmit();
          }}
          endIcon={<LoginIcon />}
          disabled={!validator.isEmail(email) || password === ''}
        >
          Login
        </Button>
      </div>
    </div>
  );
};
