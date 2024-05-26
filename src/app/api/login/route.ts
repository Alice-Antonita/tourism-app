import { User, UserPayload } from '@src/types/user';
import { generateToken } from '@src/utils/auth';
import clientPromise from '@src/utils/mongodb';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

interface LoginRequest {
  email: string;
  password: string;
}
export async function POST(req: Request) {
  const { email, password }: LoginRequest = await req.json();
  const client = await clientPromise;
  const db = client.db();
  const usersCollection = db.collection<User>('users');
  const user = await usersCollection.findOne({ email });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
  const userPayload: UserPayload = { id: user._id!.toString(), email: user.email };
  const token = generateToken(userPayload);
  return NextResponse.json({ token });
}
