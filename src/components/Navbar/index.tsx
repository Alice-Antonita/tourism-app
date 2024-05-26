'use client';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Avatar, Fab, Menu, MenuItem } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAppContext } from '@src/context';
import axios from '@src/utils/axios';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { ScrollTop } from '../ScrollToTop';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */
  return color;
}

function stringAvatar(name: string) {
  const splitName = name.split(' ');

  const firstNameInitial = splitName[0] ? splitName[0][0] : '';
  const lastNameInitial = splitName.length > 1 ? splitName[splitName.length - 1][0] : '';

  return {
    sx: {
      bgcolor: stringToColor(name)
    },
    children: `${firstNameInitial}${lastNameInitial}`
  };
}

export default function TopNavBar({ children }: { children: React.ReactNode }) {
  const { push } = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, user, handleUser, handleIsLoggedIn } = useAppContext();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    try {
      await axios.get('/api/logout');
      handleUser(undefined);
      handleIsLoggedIn(false);
      push('/login');
      // Redirect to login page
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position='sticky'
          color='default'
          sx={{
            '&.MuiAppBar-colorDefault': {
              backgroundColor: '#fff'
            }
          }}
        >
          <Toolbar id='back-to-top-anchor'>
            <IconButton size='large' edge='start' color='inherit' aria-label='menu' sx={{ mr: 2 }}>
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography
              variant='h4'
              component='div'
              sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 200 }}
            >
              WanderCove
            </Typography>
            {!isLoggedIn && !pathname.includes('login') && (
              <Button color='inherit' onClick={() => push('/login')}>
                Login
              </Button>
            )}

            {isLoggedIn && user && (
              <>
                <IconButton
                  size='large'
                  aria-label='account of current user'
                  aria-controls='menu-appbar'
                  aria-haspopup='true'
                  onClick={handleMenu}
                  sx={{ textTransform: 'uppercase' }}
                >
                  <Avatar {...stringAvatar(user.email)} />{' '}
                </IconButton>
                <Menu
                  id='menu-appbar'
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={() => {
                      logout();
                      handleClose();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            )}
          </Toolbar>
        </AppBar>
        {/* <Toolbar /> */}
      </Box>
      <div>{children}</div>
      <ScrollTop>
        <Fab size='small' aria-label='scroll back to top'>
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </>
  );
}
