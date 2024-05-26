import { verifyToken } from '@src/utils/auth';
import { promises as fs } from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  const token = authHeader?.split(' ')[1];
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const user = verifyToken(token);
  if (!user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
  const jsonDirectory = path.join(process.cwd(), 'src/data');
  const fileContents = await fs.readFile(path.join(jsonDirectory, 'recomendations.json'), 'utf8');
  const data = JSON.parse(fileContents);

  return Response.json(data);
}
