'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Menu } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

export default function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-stone-800 flex items-center gap-2">
              <span className="text-orange-500">Fruit</span>
              <span className="text-stone-800">Delight</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-stone-600 hover:text-orange-500 transition-colors">Home</Link>
            <Link href="/planner" className="text-stone-600 hover:text-orange-500 transition-colors">Smart Planner</Link>
            <Link href="/#products" className="text-stone-600 hover:text-orange-500 transition-colors">Shop</Link>
            <Link href="/#about" className="text-stone-600 hover:text-orange-500 transition-colors">About</Link>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-stone-600 hover:text-orange-500 transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </button>
            <button 
              className="md:hidden p-2 text-stone-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-b border-stone-100 overflow-hidden"
        >
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link 
              href="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-orange-500 hover:bg-stone-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/planner" 
              className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-orange-500 hover:bg-stone-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Smart Planner
            </Link>
            <Link 
              href="/#products" 
              className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-orange-500 hover:bg-stone-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link 
              href="/#about" 
              className="block px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-orange-500 hover:bg-stone-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </motion.div>
      )}
    </nav>
  );
}
