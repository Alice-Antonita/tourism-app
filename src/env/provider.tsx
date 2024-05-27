'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { getEnv } from './env';

export const EnvContext = createContext<Record<string, string> | undefined>({});

export const EnvProvider = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [env, setEnv] = useState<Record<string, string>>();

  useEffect(() => {
    getEnv().then((env) => {
      setEnv(env);
    });
  }, []);
  return <EnvContext.Provider value={env}>{children}</EnvContext.Provider>;
};

export const useEnv = () => {
  return useContext(EnvContext);
};
