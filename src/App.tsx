/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Search, 
  X, 
  Menu, 
  Instagram, 
  Facebook, 
  Twitter, 
  ArrowRight,
  Heart,
  ChevronDown
} from 'lucide-react';

// --- DATA ---
const PRODUCTS = [
  { 
    id: 1, 
    name: "Oud Impérial", 
    brand: "Collection Privée", 
    price: 1450, 
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800", 
    cat: "Luxe" 
  },
  { 
    id: 2, 
    name: "Rose de Minuit", 
    brand: "L'Aura", 
    price: 890, 
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800", 
    cat: "Femme" 
  },
  { 
    id: 3, 
    name: "Ambre Gris", 
    brand: "L'Aura", 
    price: 1200, 
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800", 
    cat: "Homme" 
  },
  { 
    id: 4, 
    name: "Nuit Blanche", 
    brand: "L'Aura", 
    price: 1350, 
    image: "https://images.unsplash.com/photo-1615484477771-31c160bacf5d?q=80&w=800", 
    cat: "Femme" 
  }
];

// --- COMPONENTS ---

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-serif italic mb-4 tracking-[0.2em] text-luxury-accent">SOPHIE</h1>
        <div className="w-12 h-[1px] bg-luxury-accent mx-auto mb-4" />
        <p className="text-[10px] uppercase tracking-[0.5em] opacity-60">ÉLÉGANCE ET INSPIRATION</p>
      </motion.div>
      <motion.div 
        className="absolute bottom-12 w-32 h-[1px] bg-luxury-text/10 overflow-hidden"
      >
        <motion.div 
          className="h-full bg-luxury-accent"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
    </motion.div>
  );
};

const Navbar = ({ 
  onViewChange, 
  onOpenCart, 
  cartCount,
  currentView 
}: { 
  onViewChange: (v: string) => void, 
  onOpenCart: () => void, 
  cartCount: number,
  currentView: string
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-700 px-6 py-4 flex justify-between items-center ${isScrolled ? 'bg-luxury-bg/95 backdrop-blur-md border-b border-luxury-accent/20 shadow-lg' : 'bg-transparent text-luxury-text'}`}>
      <motion.div 
        className="flex items-center gap-2 cursor-pointer" 
        onClick={() => onViewChange('home')}
        whileHover={{ scale: 1.05 }}
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-serif italic transition-colors ${isScrolled ? 'bg-luxury-accent text-luxury-bg' : 'bg-luxury-text text-luxury-bg'}`}>S</div>
        <span className={`font-serif uppercase tracking-[0.3em] font-bold text-lg transition-colors ${isScrolled ? 'text-luxury-accent' : 'text-luxury-text'}`}>SOPHIE</span>
      </motion.div>

      <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-widest font-semibold items-center">
        {['shop', 'collections', 'atelier'].map((item) => (
          <button 
            key={item}
            onClick={() => onViewChange(item === 'shop' ? 'shop' : 'home')} 
            className={`relative group h-full py-2 transition-all ${currentView === item ? 'text-luxury-accent border-b border-luxury-accent' : (isScrolled ? 'text-luxury-text/60 hover:text-luxury-text' : 'text-luxury-text/60 hover:text-luxury-text')}`}
          >
            {item}
            <motion.div 
              className="absolute -bottom-1 left-0 h-[1px] bg-luxury-accent"
              initial={{ width: 0 }}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.3 }}
            />
          </button>
        ))}
      </div>

      <div className="flex gap-6 items-center">
        <motion.button whileHover={{ scale: 1.1 }}>
          <Search size={18} className="cursor-pointer" />
        </motion.button>
        <motion.div 
          className="relative cursor-pointer" 
          onClick={onOpenCart}
          whileHover={{ scale: 1.1 }}
        >
          <ShoppingBag size={18} />
          {cartCount > 0 && (
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-2 bg-luxury-accent text-luxury-bg text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
            >
              {cartCount}
            </motion.span>
          )}
        </motion.div>
        <div className="md:hidden">
          <Menu size={20} />
        </div>
      </div>
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-luxury-surface text-luxury-text pt-24 pb-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="col-span-1 md:col-span-1">
            <h3 className="font-serif italic text-2xl mb-6 text-luxury-accent">SOPHIE</h3>
            <p className="text-luxury-text-dim text-sm leading-relaxed mb-8 font-light">
              L'art de la parfumerie française, inspiré par l'élégance et l'aspiration constante à l'exceptionnel.
            </p>
            <div className="flex gap-4">
              <Instagram size={18} className="text-luxury-text-dim hover:text-luxury-accent cursor-pointer transition" />
              <Facebook size={18} className="text-luxury-text-dim hover:text-luxury-accent cursor-pointer transition" />
              <Twitter size={18} className="text-luxury-text-dim hover:text-luxury-accent cursor-pointer transition" />
            </div>
          </div>
          
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8 text-luxury-accent">Navigation</h4>
            <ul className="space-y-4 text-sm text-luxury-text-dim font-light">
              <li><a href="#" className="hover:text-luxury-text transition">La Boutique</a></li>
              <li><a href="#" className="hover:text-luxury-text transition">Collections</a></li>
              <li><a href="#" className="hover:text-luxury-text transition">L'Atelier</a></li>
              <li><a href="#" className="hover:text-luxury-text transition">Nos Boutiques</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8 text-luxury-accent">Service Client</h4>
            <ul className="space-y-4 text-sm text-luxury-text-dim font-light">
              <li><a href="#" className="hover:text-luxury-text transition">Livraison & Retours</a></li>
              <li><a href="#" className="hover:text-luxury-text transition">Suivi de commande</a></li>
              <li><a href="#" className="hover:text-luxury-text transition">Contactez-nous</a></li>
              <li><a href="#" className="hover:text-luxury-text transition">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-8 text-luxury-accent">Lettre d'information</h4>
            <p className="text-xs text-luxury-text-dim mb-6 font-light">Inscrivez-vous pour recevoir nos dernières créations.</p>
            <div className="flex border-b border-luxury-text/10 py-2">
              <input 
                type="email" 
                placeholder="Votre adresse email" 
                className="bg-transparent text-sm w-full focus:outline-none placeholder:text-neutral-700 font-light"
              />
              <ArrowRight size={18} className="text-luxury-text-dim cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:row justify-between items-center gap-6">
          <p className="text-[10px] text-luxury-text-dim uppercase tracking-widest font-light">
            © 2026 SOPHIE. TOUS DROITS RÉSERVÉS.
          </p>
          <div className="flex gap-8 text-[10px] text-luxury-text-dim uppercase tracking-widest font-light">
            <a href="#" className="hover:text-luxury-text transition">Mentions Légales</a>
            <a href="#" className="hover:text-luxury-text transition">Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [view, setView] = useState('home');
  const [cart, setCart] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (p: any) => {
    setCart([...cart, p]);
    setIsCartOpen(true);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen">
      <AnimatePresence>
        {!isLoaded && <SplashScreen onComplete={() => setIsLoaded(true)} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <Navbar 
              onViewChange={setView} 
              onOpenCart={() => setIsCartOpen(true)} 
              cartCount={cart.length}
              currentView={view}
            />

            {/* VUE : ACCUEIL */}
            {view === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
              >
                <header className="relative h-screen flex items-center justify-center text-center text-luxury-text overflow-hidden bg-luxury-bg">
                  <div className="hero-bg-accent absolute inset-0 z-0 animate-pulse" />
                  <motion.img 
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 0.3 }}
                    transition={{ duration: 1.2 }}
                    src="https://images.unsplash.com/photo-1583445013765-46c20c4a6772?q=80&w=2000" 
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-30" 
                  />
                  <div className="relative max-w-2xl px-4 flex flex-col items-center z-10">
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                      className="uppercase tracking-[0.5em] text-[10px] mb-6 text-luxury-accent"
                    >
                      L'art du parfum à l'état pur
                    </motion.p>
                    <motion.h1 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.8 }}
                      className="text-5xl md:text-8xl font-serif italic mb-10 leading-tight"
                    >
                      L'Éveil de <br/> vos sens
                    </motion.h1>
                    <motion.button 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2, duration: 1 }}
                      onClick={() => setView('shop')} 
                      className="group relative bg-luxury-accent text-neutral-900 px-12 py-5 uppercase text-[10px] tracking-[0.3em] hover:bg-white transition-all duration-500 font-bold"
                    >
                      Découvrir la collection
                      <motion.div 
                        className="absolute inset-x-[-10%] inset-y-[-10%] border border-luxury-accent/30 scale-125 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500"
                      />
                    </motion.button>
                  </div>
                  
                  <motion.div 
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40 hover:opacity-100 cursor-pointer transition-opacity"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-[10px] uppercase tracking-widest font-light">Scroll</span>
                    <ChevronDown size={14} />
                  </motion.div>
                </header>
              </motion.div>
            )}

            {/* VUE : BOUTIQUE */}
            {view === 'shop' && (
              <motion.div
                key="shop"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="pt-40 max-w-7xl mx-auto px-6 mb-32"
              >
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/5 pb-12">
                  <div className="max-w-md">
                    <h2 className="text-5xl font-serif italic mb-4 text-luxury-accent">Les Essentiels</h2>
                    <p className="text-sm text-luxury-text-dim font-light leading-relaxed">
                      Chaque fragrance est une invitation au voyage, une signature olfactive qui raconte votre histoire à travers le temps.
                    </p>
                  </div>
                  <div className="text-[10px] uppercase tracking-[0.2em] flex gap-10 mt-8 md:mt-0 font-bold">
                    {['Tous', 'Homme', 'Femme', 'Unisexe'].map((cat, i) => (
                      <span key={cat} className={`cursor-pointer transition hover:text-luxury-accent ${i === 0 ? 'text-luxury-accent border-b border-luxury-accent' : 'text-luxury-text-dim'}`}>
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
                  {PRODUCTS.map((p, index) => (
                    <motion.div 
                      key={p.id} 
                      className="group cursor-pointer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="relative aspect-[3/4] overflow-hidden bg-luxury-surface mb-8">
                        <img 
                          src={p.image} 
                          className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                        />
                        <div className="absolute top-4 right-4 z-10">
                          <motion.button 
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 bg-luxury-bg/80 backdrop-blur-md rounded-full flex items-center justify-center text-luxury-text-dim hover:text-luxury-accent transition-colors shadow-sm"
                          >
                            <Heart size={16} />
                          </motion.button>
                        </div>
                        <motion.div 
                          className="absolute inset-0 bg-luxury-accent/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6"
                        >
                          <button 
                            onClick={() => addToCart(p)} 
                            className="w-full bg-luxury-accent text-neutral-900 py-4 text-[10px] uppercase tracking-[0.2em] hover:bg-white transition-all font-bold"
                          >
                            Ajouter au panier
                          </button>
                        </motion.div>
                      </div>
                      <div className="text-center">
                        <p className="text-[9px] uppercase tracking-[0.3em] text-luxury-accent mb-2 font-bold">{p.brand}</p>
                        <h3 className="text-xl font-serif italic mb-3">{p.name}</h3>
                        <p className="text-sm font-light tracking-widest text-luxury-text-dim">{p.price} MAD</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* VUE : CHECKOUT */}
            {view === 'checkout' && (
              <motion.div 
                key="checkout"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="pt-40 max-w-4xl mx-auto px-6 mb-32"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                  <div>
                    <h2 className="text-4xl font-serif italic mb-12">Finaliser la commande</h2>
                    <form className="space-y-8">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-gray-400">Prénom</label>
                          <input type="text" className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-black transition-colors" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] uppercase tracking-widest text-gray-400">Nom</label>
                          <input type="text" className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-black transition-colors" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400">Email</label>
                        <input type="email" className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-black transition-colors" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-gray-400">Adresse au Maroc</label>
                        <input type="text" className="w-full border-b border-gray-200 py-2 focus:outline-none focus:border-black transition-colors" />
                      </div>
                      
                      <div className="pt-10">
                        <h4 className="text-[10px] uppercase tracking-widest font-bold mb-6">Mode de Paiement</h4>
                        <div className="space-y-4">
                          <label className="flex items-center gap-4 cursor-pointer group">
                            <input type="radio" name="pay" defaultChecked className="accent-black" />
                            <span className="text-sm font-light">Paiement à la livraison</span>
                          </label>
                          <label className="flex items-center gap-4 cursor-pointer group">
                            <input type="radio" name="pay" className="accent-black" />
                            <span className="text-sm font-light">Carte Bancaire / Stripe</span>
                          </label>
                        </div>
                      </div>

                      <button 
                        type="button" 
                        onClick={() => alert("Votre commande de " + cartTotal + " MAD a été enregistrée.")}
                        className="w-full bg-luxury-accent text-neutral-900 py-6 text-[10px] uppercase tracking-[0.3em] font-bold mt-12 hover:bg-white transition"
                      >
                        Passer la commande
                      </button>
                    </form>
                  </div>

                  <div className="bg-luxury-surface p-10 h-fit border border-white/5">
                    <h3 className="text-xl font-serif italic mb-8 border-b border-white/5 pb-6 text-luxury-accent">Récapitulatif</h3>
                    <div className="space-y-6 max-h-[300px] overflow-y-auto mb-10 pr-4 custom-scrollbar">
                      {cart.map((item, i) => (
                        <div key={i} className="flex gap-4">
                          <img src={item.image} className="w-16 h-20 object-cover grayscale opacity-80" />
                          <div className="flex-1">
                            <h4 className="text-xs font-serif italic">{item.name}</h4>
                            <p className="text-[9px] text-luxury-text-dim uppercase mt-1">{item.brand}</p>
                            <p className="text-xs mt-1 font-bold text-luxury-accent">{item.price} MAD</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4 border-t border-white/5 pt-8">
                      <div className="flex justify-between text-xs text-luxury-text-dim">
                        <span>Sous-total</span>
                        <span>{cartTotal} MAD</span>
                      </div>
                      <div className="flex justify-between text-xs text-luxury-text-dim">
                        <span>Livraison</span>
                        <span>Gratuite</span>
                      </div>
                      <div className="flex justify-between text-sm font-bold pt-4 border-t border-white/5">
                        <span className="uppercase tracking-widest text-luxury-accent">Total</span>
                        <span>{cartTotal} MAD</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <Footer />

            {/* PANIER COULISSANT */}
            <AnimatePresence>
              {isCartOpen && (
                <div className="fixed inset-0 z-50">
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
                    onClick={() => setIsCartOpen(false)} 
                  />
                  <motion.div 
                    initial={{ x: "100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "100%" }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    className="absolute right-0 top-0 h-full w-full max-w-md bg-luxury-bg shadow-2xl p-10 flex flex-col border-l border-white/5"
                  >
                    <div className="flex justify-between items-center mb-12">
                      <h2 className="text-2xl font-serif italic text-luxury-accent">Mon Panier ({cart.length})</h2>
                      <button onClick={() => setIsCartOpen(false)} className="hover:rotate-90 transition-transform">
                        <X size={24} />
                      </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                      {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                          <ShoppingBag size={48} className="mb-6" />
                          <p className="italic font-light">Votre flacon vide attend sa fragrance...</p>
                        </div>
                      ) : (
                        cart.map((item, i) => (
                          <motion.div 
                            layout
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            key={i} 
                            className="flex gap-6 mb-8 items-center group"
                          >
                            <div className="relative overflow-hidden w-24 h-32 bg-luxury-surface">
                              <img src={item.image} className="w-full h-full object-cover opacity-80" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-serif italic text-lg leading-tight">{item.name}</h4>
                              <p className="text-[9px] text-luxury-text-dim mt-1 uppercase tracking-widest">{item.brand}</p>
                              <div className="flex justify-between items-end mt-4">
                                <p className="text-sm font-bold text-luxury-accent">{item.price} MAD</p>
                                <button className="text-[10px] uppercase border-b border-white/10 pb-0.5 opacity-40 hover:opacity-100 hover:text-luxury-accent hover:border-luxury-accent transition">Supprimer</button>
                              </div>
                            </div>
                          </motion.div>
                        ))
                      )}
                    </div>

                    {cart.length > 0 && (
                      <div className="mt-10 border-t border-white/5 pt-10">
                        <div className="flex justify-between mb-8">
                          <span className="uppercase tracking-[0.2em] text-[10px] font-bold text-luxury-accent">Total</span>
                          <span className="font-light">{cartTotal} MAD</span>
                        </div>
                        <button 
                          onClick={() => { setView('checkout'); setIsCartOpen(false); }} 
                          className="w-full bg-luxury-accent text-neutral-900 py-6 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white transition"
                        >
                          Passer à la commande
                        </button>
                      </div>
                    )}
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
