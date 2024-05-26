import jwt from 'jsonwebtoken';
import { UserPayload } from '../types/user';

const secret = process.env.JWT_SECRET || 'your_secret_key';

export const generateToken = (user: UserPayload): string => {
  return jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1d' });
};
export const verifyToken = (token: string): UserPayload | null => {
  console.log(token, 'token verify');
  try {
    return jwt.verify(token, secret) as UserPayload;
  } catch (error) {
    return null;
  }
};
