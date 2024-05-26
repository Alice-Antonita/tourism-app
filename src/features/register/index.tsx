'use client';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { useAppContext } from '@src/context';
import axios from '@src/utils/axios';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import validator from 'validator';

export const Register = () => {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const { handleUser, handleIsLoggedIn } = useAppContext();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reEnterPassword, setReEnterPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [disableButton, setDisableButton] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleRegistration = async () => {
    if (!validator.isEmail(email)) {
      enqueueSnackbar(`Invalid Email`, { variant: 'error' });
      return;
    }
    if (email === '' || password === '' || reEnterPassword === '') {
      enqueueSnackbar(`Fields cant be empty`, { variant: 'error' });
      return;
    }
    if (password !== reEnterPassword) {
      enqueueSnackbar(`Passwords Don't match`, { variant: 'error' });
      // setPasswordError(`Passwords Don't match`);
      return;
    }

    try {
      const response = await axios.post('/api/register', { email, password });
      console.log(response);
      Cookies.set('token', response.data.token, { expires: 1 });
      enqueueSnackbar('Registration successful!', { variant: 'success' });
      handleUser({ email });
      handleIsLoggedIn(true);
      push('/');
    } catch (err: any) {
      if (err.response) {
        // Server responded with a status other than 200 range
        enqueueSnackbar(err.response.data.error || 'An error occurred', { variant: 'error' });
      } else if (err.request) {
        // Request was made but no response received
        enqueueSnackbar('No response from server', { variant: 'error' });
      } else {
        // Something else caused the error s
        enqueueSnackbar('An error occurred', { variant: 'error' });
      }
    }
  };

  useEffect(() => {
    if (email === '' || password === '' || reEnterPassword === '' || password !== reEnterPassword) {
      setDisableButton(true);
      return;
    }
    setDisableButton(false);
  }, [email, password, reEnterPassword]);

  return (
    <div>
      <TextField
        id='tr-login-username'
        label='Email'
        variant='standard'
        sx={{ marginTop: '10px' }}
        fullWidth
        value={email}
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
        value={password}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(event.target.value);
        }}
      />
      <TextField
        id='tr-login-pass'
        label='Re-enter Password'
        type='password'
        autoComplete='re-enter-password'
        variant='standard'
        fullWidth
        sx={{ marginTop: '20px' }}
        value={reEnterPassword}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setReEnterPassword(event.target.value);
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
          endIcon={<AppRegistrationIcon />}
          onClick={() => {
            handleRegistration();
          }}
          disabled={!validator.isEmail(email) || disableButton}
        >
          Register
        </Button>
      </div>
    </div>
  );
};
