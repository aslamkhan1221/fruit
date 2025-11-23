import { NextResponse } from 'next/server';
import { openDb } from '@/database/db';

const MOCK_FRUITS = [
  { id: 1, name: 'Organic Apple', price: 2.5, description: 'Fresh organic apples from the valley.', image: '/fruits/apple.png', category: 'Fresh' },
  { id: 2, name: 'Banana Bunch', price: 1.2, description: 'Sweet and ripe bananas.', image: '/fruits/banana.png', category: 'Fresh' },
  { id: 3, name: 'Exotic Dragonfruit', price: 5.0, description: 'Vibrant and delicious dragonfruit.', image: '/fruits/dragonfruit.png', category: 'Exotic' },
  { id: 4, name: 'Juicy Orange', price: 3.0, description: 'Vitamin C packed oranges.', image: '/fruits/orange.png', category: 'Citrus' },
  { id: 5, name: 'Fresh Berries', price: 4.5, description: 'Mixed berries for your smoothie.', image: '/fruits/berries.png', category: 'Berries' },
  { id: 6, name: 'Mango', price: 3.5, description: 'King of fruits, sweet and juicy.', image: '/fruits/mango.png', category: 'Tropical' },
  { id: 7, name: 'Avocado', price: 2.8, description: 'Creamy and perfect for toast.', image: '/fruits/avocado.png', category: 'Fresh' },
  { id: 8, name: 'Pineapple', price: 4.0, description: 'Tropical sweetness in every bite.', image: '/fruits/pineapple.png', category: 'Tropical' },
];

export async function GET() {
  try {
    const db = await openDb();
    const fruits = await db.all('SELECT * FROM fruits');
    return NextResponse.json(fruits);
  } catch (error) {
    console.warn('Database error (using mock data):', error);
    // Fallback to mock data if database fails (e.g. on Vercel serverless)
    return NextResponse.json(MOCK_FRUITS);
  }
}
