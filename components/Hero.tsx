'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center pt-16 overflow-hidden bg-[#FAFAFA]">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-orange-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-yellow-200/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-bold text-sm mb-6">
              Fastest Delivery in Town 🚀
            </span>
            <h1 className="text-5xl lg:text-7xl font-bold text-stone-800 leading-tight mb-6">
              Fresh Fruits <br />
              <span className="text-orange-500">Delivered</span> to <br />
              Your Doorstep
            </h1>
            <p className="text-lg text-stone-600 mb-8 max-w-lg">
              Experience the taste of nature with our hand-picked, premium quality fruits. 
              From exotic tropical delights to your daily vitamin dose.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-stone-800 text-white rounded-full font-bold hover:bg-stone-900 transition-colors shadow-lg shadow-stone-800/20">
                Shop Now
              </button>
              <button className="px-8 py-4 bg-white text-stone-800 rounded-full font-bold hover:bg-stone-50 transition-colors shadow-lg shadow-stone-200/50">
                Learn More
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative h-[500px] lg:h-[600px] w-full"
          >
             {/* Placeholder for a hero image if we had one, or a composition of fruits */}
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                    <Image 
                        src="/fruits/hero-basket.png" 
                        alt="Fruit Basket" 
                        fill
                        className="object-contain drop-shadow-2xl"
                        priority
                    />
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
