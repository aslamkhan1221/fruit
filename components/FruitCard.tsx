'use client';

import React from 'react';
import Image from 'next/image';
import { Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { CartItem, useCart } from '@/context/CartContext';

interface Fruit {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export default function FruitCard({ fruit }: { fruit: Fruit }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: fruit.id,
      name: fruit.name,
      price: fruit.price,
      image: fruit.image,
      quantity: 1,
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white rounded-3xl p-4 shadow-xl shadow-stone-200/50 border border-stone-100 group"
    >
      <div className="relative h-48 w-full mb-4 bg-stone-50 rounded-2xl overflow-hidden">
        <Image
          src={fruit.image}
          alt={fruit.name}
          fill
          className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
        />
        <button 
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 p-3 bg-white rounded-full shadow-lg hover:bg-orange-500 hover:text-white transition-colors text-stone-800"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      
      <div className="px-2 pb-2">
        <div className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-1">{fruit.category}</div>
        <h3 className="text-lg font-bold text-stone-800 mb-1">{fruit.name}</h3>
        <p className="text-stone-500 text-sm mb-3 line-clamp-2">{fruit.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-stone-800">${fruit.price.toFixed(2)}</span>
        </div>
      </div>
    </motion.div>
  );
}
