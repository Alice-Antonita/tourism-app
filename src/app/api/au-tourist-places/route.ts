import { verifyToken } from '@src/utils/auth';
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

type Params = {
  city: string;
};

export async function GET(req: Request, context: { params: Params }) {
  const authHeader = req.headers.get('Authorization');
  const token = authHeader?.split(' ')[1];
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = verifyToken(token);
  if (!user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const city = searchParams.get('city');

  if (!city) {
    return NextResponse.json({ error: 'Missing city parameter' }, { status: 400 });
  }

  const jsonDirectory = path.join(process.cwd(), 'src/data');
  const fileContents = await fs.readFile(path.join(jsonDirectory, 'au-tourists.json'), 'utf8');

  const data = JSON.parse(fileContents);

  //   const nameData = data.find((item: { city: string }) => item.city === city);

  if (!data[city]) {
    return NextResponse.json({ error: 'City not found' }, { status: 404 });
  }

  return NextResponse.json(data[city]);
}
