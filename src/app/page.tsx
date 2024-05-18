'use client';

import { Card, CardActions, CardContent, Link } from '@mui/material';
import TabsContainer, { TabNodeI } from '@src/components/Tabs';
import { Login } from '@src/features/login';
import { Register } from '@src/features/register';
import { SnackbarProvider } from 'notistack';
import { useState } from 'react';
import styles from './page.module.css';

export default function LoginPage() {
  const TABS: TabNodeI[] = [
    { name: 'Login', component: <Login /> },
    { name: 'Register', component: <Register /> }
  ];

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <main className={styles.main}>
      <SnackbarProvider maxSnack={3}>
        <Card sx={{ width: 300, height: 400, margin: 'auto' }}>
          <CardContent>
            <TabsContainer
              tabs={TABS}
              tabsContainerName='Login/Register'
              value={value}
              handleChange={handleChange}
            />
            {value === 0 && (
              <CardActions
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Link href='#' underline='always' onClick={() => setValue(1)}>
                  {`Don't have an account?`}
                </Link>
              </CardActions>
            )}
          </CardContent>
        </Card>
      </SnackbarProvider>
    </main>
  );
}
