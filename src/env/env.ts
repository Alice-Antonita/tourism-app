'use server';
import { envsafe, str } from 'envsafe';

export const getEnv = async () =>
  envsafe({
    NEXT_PUBLIC_USP_KEY: str()
  });
