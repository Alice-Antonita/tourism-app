'use client';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { SnackbarProvider } from 'notistack';
import { createContext, useContext, useEffect, useState } from 'react';
import { useJwt } from 'react-jwt';

interface AppContextI {
  currentCity: string;
  isLoggedIn: string;
  user: { email: string };
  handleCurrentCity: (value: string) => void;
  handleIsLoggedIn: (value: boolean) => void;
  handleUser: (value?: { email: string }) => void;
}

const AppContext = createContext<any>(undefined);

export const useAppContext = () => useContext<AppContextI>(AppContext);

export const AppContextProvider = ({ children }: { children: React.ReactElement }) => {
  const { push } = useRouter();

  const token = Cookies.get('token');

  const { decodedToken, isExpired } = useJwt<{ email: string }>(token ?? '');

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [currentCity, setCurrentCity] = useState<string>('');

  const [user, setUser] = useState<{ email: string }>();

  const handleUser = (value: { email: string }) => {
    setUser(value);
  };

  const handleIsLoggedIn = (value: boolean) => {
    setIsLoggedIn(value);
  };

  const handleCurrentCity = (value: string) => {
    setCurrentCity(value);
    value && push(`/recommendations/${value}`);
  };

  useEffect(() => {
    if (decodedToken && decodedToken.email && !isExpired) {
      setIsLoggedIn(true);
      setUser({ email: decodedToken.email });
      return;
    }
    // setIsLoggedIn(false);
    // setUser(undefined);
  }, [decodedToken]);

  return (
    <AppContext.Provider
      value={{
        currentCity,
        handleCurrentCity,
        isLoggedIn,
        handleIsLoggedIn,
        user,
        handleUser
      }}
    >
      <SnackbarProvider maxSnack={3}>{children}</SnackbarProvider>
    </AppContext.Provider>
  );
};
