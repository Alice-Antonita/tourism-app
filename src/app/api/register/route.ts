import { User, UserPayload } from '@src/types/user';
import { generateToken } from '@src/utils/auth';
import clientPromise from '@src/utils/mongodb';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import zxcvbn from 'zxcvbn';

interface RegisterRequest {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  const { email, password }: RegisterRequest = await req.json();
  // Check password strength
  const passwordStrength = zxcvbn(password);
  if (passwordStrength.score < 3) {
    return NextResponse.json({ error: 'Password is too weak' }, { status: 400 });
  }
  const client = await clientPromise;
  const db = client.db();
  const usersCollection = db.collection<User>('users');
  const existingUser = await usersCollection.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = { email, password: hashedPassword };
  const result = await usersCollection.insertOne(newUser);
  const userPayload: UserPayload = { id: result.insertedId.toString(), email: newUser.email };
  const token = generateToken(userPayload);
  return NextResponse.json({ token });
}
