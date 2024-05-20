import { Visibility, VisibilityOff } from '@mui/icons-material';
import LoginIcon from '@mui/icons-material/Login';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import type { VariantType } from 'notistack';
import { useSnackbar } from 'notistack';
import { useState } from 'react';

export const Login = () => {
  const { push } = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }; 

  const handleClickVariant = (message: string, variant: VariantType) => {
    console.log('snack!');
    push('/home');
    enqueueSnackbar(message, { variant });
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
            handleClickVariant('Successful Login!', 'success');
          }}
          endIcon={<LoginIcon />}
        >
          Login
        </Button>
      </div>
    </div>
  );
};
