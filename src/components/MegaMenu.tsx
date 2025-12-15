import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { categoryStructure } from './categoryData';

type MegaMenuProps = {
  onCategorySelect: (category: string, subcategory?: string, item?: string) => void;
};

export function MegaMenu({ onCategorySelect }: MegaMenuProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleCategoryClick = (categoryId: string) => {
    // Toggle on click for mobile/tablet
    if (window.innerWidth < 1024) {
      setActiveMenu(activeMenu === categoryId ? null : categoryId);
    }
  };

  const handleMouseEnter = (categoryId: string) => {
    // Hover behavior for desktop only
    if (window.innerWidth >= 1024) {
      setActiveMenu(categoryId);
    }
  };

  const handleMouseLeave = () => {
    // Clear on mouse leave for desktop only
    if (window.innerWidth >= 1024) {
      setActiveMenu(null);
    }
  };

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white border-b border-[#8B7355]/15 relative z-40 hidden md:block"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-center gap-4 lg:gap-8 py-4 overflow-x-auto">
          {categoryStructure.map((category) => (
            <div
              key={category.id}
              onMouseEnter={() => handleMouseEnter(category.id)}
              onMouseLeave={handleMouseLeave}
              className="relative"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleCategoryClick(category.id)}
                className={`flex items-center gap-1 py-2 px-3 rounded-lg transition-all ${
                  activeMenu === category.id
                    ? 'text-[#8B7355] bg-[#FAF8F5]'
                    : 'text-[#2C2C2C] hover:text-[#8B7355] hover:bg-[#FAF8F5]'
                }`}
              >
                <span className="text-sm font-medium whitespace-nowrap">{category.name}</span>
                <motion.div
                  animate={{ rotate: activeMenu === category.id ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </motion.button>

              {/* Mega Menu Dropdown */}
              <AnimatePresence>
                {activeMenu === category.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50"
                    style={{ minWidth: window.innerWidth < 768 ? '300px' : '600px' }}
                    onMouseEnter={() => setActiveMenu(category.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <motion.div 
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1 }}
                      className="bg-white rounded-xl shadow-2xl border border-[#8B7355]/15 p-6 lg:p-8 max-h-[80vh] overflow-y-auto"
                    >
                      <div className={`grid ${category.subcategories.length > 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6 lg:gap-8`}>
                        {category.subcategories.map((subcategory, idx) => (
                          <motion.div
                            key={subcategory.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                          >
                            <h3 className="text-[#8B7355] font-medium mb-3 text-sm uppercase tracking-wide">
                              {subcategory.name}
                            </h3>
                            <ul className="space-y-2">
                              {subcategory.items.map((item) => (
                                <motion.li
                                  key={item}
                                  whileHover={{ x: 5 }}
                                  transition={{ duration: 0.15 }}
                                >
                                  <button
                                    onClick={() => {
                                      onCategorySelect(category.name, subcategory.name, item);
                                      setActiveMenu(null);
                                    }}
                                    className="text-[#2C2C2C] hover:text-[#8B7355] hover:bg-[#FAF8F5] text-sm transition-colors text-left w-full px-2 py-1.5 rounded"
                                  >
                                    {item}
                                  </button>
                                </motion.li>
                              ))}
                            </ul>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}