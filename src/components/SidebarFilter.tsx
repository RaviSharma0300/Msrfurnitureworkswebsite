import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, X, SlidersHorizontal } from 'lucide-react';
import { categoryStructure } from './categoryData';

type SidebarFilterProps = {
  selectedFilters: {
    categories: string[];
    subcategories: string[];
    items: string[];
    priceRange: [number, number];
  };
  onFilterChange: (filters: any) => void;
  isOpen: boolean;
  onClose: () => void;
};

export function SidebarFilter({ selectedFilters, onFilterChange, isOpen, onClose }: SidebarFilterProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>(selectedFilters.priceRange);
  const [isDesktop, setIsDesktop] = useState(false);

  // Check if we're on desktop
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Auto-expand categories that have active filters
  useEffect(() => {
    if (selectedFilters.categories.length > 0) {
      const categoriesToExpand = categoryStructure
        .filter(cat => selectedFilters.categories.includes(cat.name))
        .map(cat => cat.id);
      setExpandedCategories(prev => {
        const newExpanded = [...new Set([...prev, ...categoriesToExpand])];
        return newExpanded;
      });
    }
  }, [selectedFilters.categories]);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleFilter = (type: 'categories' | 'subcategories' | 'items', value: string) => {
    const current = selectedFilters[type];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    
    onFilterChange({
      ...selectedFilters,
      [type]: updated,
    });
  };

  const handlePriceChange = (index: 0 | 1, value: number) => {
    const newRange: [number, number] = [...priceRange] as [number, number];
    newRange[index] = value;
    setPriceRange(newRange);
    onFilterChange({
      ...selectedFilters,
      priceRange: newRange,
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      categories: [],
      subcategories: [],
      items: [],
      priceRange: [0, 200000],
    });
    setPriceRange([0, 200000]);
  };

  const activeFilterCount = 
    selectedFilters.categories.length + 
    selectedFilters.subcategories.length + 
    selectedFilters.items.length;

  return (
    <>
      {/* Overlay - Show only on Mobile/Tablet when sidebar is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          x: isOpen || isDesktop ? 0 : -320 
        }}
        transition={{ type: 'spring', damping: 25 }}
        className="fixed lg:sticky lg:top-0 left-0 top-[140px] h-[calc(100vh-140px)] lg:h-[calc(100vh-5rem)] w-80 bg-white border-r border-[#8B7355]/15 overflow-y-auto z-50 lg:z-auto shadow-2xl lg:shadow-none rounded-tr-2xl rounded-br-2xl lg:rounded-none"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-[#8B7355]" />
              <h2 className="text-[#2C2C2C] font-medium">Filters</h2>
              {activeFilterCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-[#8B7355] text-white text-xs px-2 py-0.5 rounded-full"
                >
                  {activeFilterCount}
                </motion.span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {activeFilterCount > 0 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearAllFilters}
                  className="text-sm text-[#8B7355] hover:text-[#6B5A44]"
                >
                  Clear all
                </motion.button>
              )}
              <button onClick={onClose} className="lg:hidden p-1">
                <X className="w-5 h-5 text-[#2C2C2C]" />
              </button>
            </div>
          </div>

          {/* Price Range */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 pb-6 border-b border-[#8B7355]/10"
          >
            <h3 className="text-[#2C2C2C] font-medium mb-4 text-sm">Price Range</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(0, parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 bg-[#F5F1ED] rounded-lg border-0 text-sm"
                  placeholder="Min"
                />
                <span className="text-[#6B6B6B]">-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(1, parseInt(e.target.value) || 200000)}
                  className="w-full px-3 py-2 bg-[#F5F1ED] rounded-lg border-0 text-sm"
                  placeholder="Max"
                />
              </div>
              <input
                type="range"
                min="0"
                max="200000"
                step="1000"
                value={priceRange[1]}
                onChange={(e) => handlePriceChange(1, parseInt(e.target.value))}
                className="w-full accent-[#8B7355]"
              />
              <p className="text-xs text-[#6B6B6B]">
                ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
              </p>
            </div>
          </motion.div>

          {/* Category Filters */}
          <div className="space-y-3">
            {categoryStructure.map((category, categoryIdx) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: categoryIdx * 0.05 }}
                className="border-b border-[#8B7355]/10 pb-3"
              >
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between py-2 text-left group"
                >
                  <span className="text-[#2C2C2C] font-medium text-sm group-hover:text-[#8B7355] transition-colors">
                    {category.name}
                  </span>
                  <motion.div
                    animate={{ rotate: expandedCategories.includes(category.id) ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-[#6B6B6B]" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {expandedCategories.includes(category.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="pl-4 pt-2 space-y-3">
                        {category.subcategories.map((subcategory) => (
                          <div key={subcategory.name}>
                            <h4 className="text-[#8B7355] text-xs uppercase tracking-wide mb-2 font-medium">
                              {subcategory.name}
                            </h4>
                            <div className="space-y-1.5">
                              {subcategory.items.map((item) => (
                                <motion.label
                                  key={item}
                                  whileHover={{ x: 3 }}
                                  className="flex items-center gap-2 cursor-pointer group"
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedFilters.items.includes(item)}
                                    onChange={() => toggleFilter('items', item)}
                                    className="w-4 h-4 rounded border-[#8B7355]/30 text-[#8B7355] focus:ring-[#8B7355] accent-[#8B7355]"
                                  />
                                  <span className="text-sm text-[#2C2C2C] group-hover:text-[#8B7355] transition-colors">
                                    {item}
                                  </span>
                                </motion.label>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.aside>
    </>
  );
}