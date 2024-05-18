import { Visibility, VisibilityOff } from '@mui/icons-material';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { useState } from 'react';
export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div>
      <TextField
        id='tr-login-username'
        label='Email'
        variant='standard'
        sx={{ marginTop: '10px' }}
        fullWidth
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
      />
      <TextField
        id='tr-login-pass'
        label='Re-enter Password'
        type='password'
        autoComplete='re-enter-password'
        variant='standard'
        fullWidth
        sx={{ marginTop: '20px' }}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '50px'
        }}
      >
        <Button color='success' variant='contained' endIcon={<AppRegistrationIcon />}>
          Register
        </Button>
      </div>
    </div>
  );
};
