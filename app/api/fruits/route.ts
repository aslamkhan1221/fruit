import { NextResponse } from 'next/server';
import { openDb } from '@/database/db';

export async function GET() {
  try {
    const db = await openDb();
    const fruits = await db.all('SELECT * FROM fruits');
    return NextResponse.json(fruits);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch fruits' }, { status: 500 });
  }
}
