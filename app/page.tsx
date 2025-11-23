import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ProductListing from '@/components/ProductListing';
import CartDrawer from '@/components/CartDrawer';

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-50">
      <Navbar />
      <Hero />
      <ProductListing />
      <CartDrawer />
      
      <footer className="bg-stone-900 text-stone-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white text-lg font-bold mb-4">FruitDelight</h3>
              <p className="text-sm">Premium fruit delivery service bringing nature's best to your doorstep.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">All Fruits</a></li>
                <li><a href="#" className="hover:text-white">Fresh</a></li>
                <li><a href="#" className="hover:text-white">Exotic</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Newsletter</h4>
              <div className="flex gap-2">
                <input type="email" placeholder="Your email" className="bg-stone-800 border-none rounded-lg px-4 py-2 text-sm w-full" />
                <button className="bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-bold">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-stone-800 text-center text-xs">
            © 2024 FruitDelight. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
