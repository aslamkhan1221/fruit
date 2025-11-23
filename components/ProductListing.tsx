'use client';

import React, { useEffect, useState } from 'react';
import FruitCard from './FruitCard';

interface Fruit {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export default function ProductListing() {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFruits() {
      try {
        const res = await fetch('/api/fruits');
        const data = await res.json();
        setFruits(data);
      } catch (error) {
        console.error('Failed to fetch fruits', error);
      } finally {
        setLoading(false);
      }
    }
    fetchFruits();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <section id="products" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-stone-800 mb-4">Our Fresh Selection</h2>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Browse our wide range of organic and fresh fruits, harvested daily and delivered with care.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {fruits.map((fruit) => (
            <FruitCard key={fruit.id} fruit={fruit} />
          ))}
        </div>
      </div>
    </section>
  );
}
