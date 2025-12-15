import { ShoppingCart, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import logoImage from 'figma:asset/4cb83bfcb7f331de81d5afb9c3eaeb3be34485a0.png';

type NavbarProps = {
  currentView: string;
  onNavigate: (view: any) => void;
  cartCount: number;
  onViewCart: () => void;
};

export function Navbar({ currentView, onNavigate, cartCount, onViewCart }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', view: 'home' },
    { label: 'About', view: 'about' },
    { label: 'Products', view: 'products' },
    { label: 'Contact', view: 'contact' },
  ];

  const handleNavigation = (view: any) => {
    onNavigate(view);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm sticky top-0 z-50 border-b border-[#001F3F]/10"
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* LEFT: Logo */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleNavigation('home')}
              className="z-50 flex-shrink-0"
            >
              <img src={logoImage} alt="MSR Furniture & Works" className="h-10 sm:h-12 lg:h-14" />
            </motion.button>

            {/* CENTER: Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navItems.map((item) => (
                <motion.button
                  key={item.view}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavigation(item.view)}
                  className={`transition-all relative text-base ${
                    currentView === item.view 
                      ? 'text-[#964B00] font-semibold' 
                      : 'text-[#001F3F] hover:text-[#964B00] font-medium'
                  }`}
                >
                  {item.label}
                  {currentView === item.view && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-[25px] left-0 right-0 h-0.5 bg-[#964B00]"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* RIGHT: Cart Icon (Desktop) */}
            <div className="hidden lg:flex items-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onViewCart}
                className="relative p-3 hover:bg-[#8B7355] rounded-full transition-colors group"
              >
                <ShoppingCart className="w-6 h-6 text-[#001F3F] group-hover:text-white transition-colors" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-[#964B00] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-semibold shadow-lg"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>

            {/* RIGHT: Mobile Menu Button and Cart */}
            <div className="lg:hidden flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onViewCart}
                className="relative p-2"
              >
                <ShoppingCart className="w-6 h-6 text-[#001F3F]" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-[#964B00] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              <motion.button 
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 z-50"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6 text-[#001F3F]" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6 text-[#001F3F]" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-40 top-16 lg:top-20"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed right-0 top-16 bottom-0 w-64 sm:w-80 bg-white shadow-2xl z-40 overflow-y-auto"
            >
              <div className="p-6">
                <nav className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.view}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 5, backgroundColor: '#F5F5F5' }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleNavigation(item.view)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        currentView === item.view
                          ? 'bg-[#964B00] text-white font-medium'
                          : 'text-[#001F3F] hover:bg-[#F5F5F5]'
                      }`}
                    >
                      {item.label}
                    </motion.button>
                  ))}
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}