import { Search, ShoppingCart, Filter, SlidersHorizontal, X } from 'lucide-react';
import { Product } from '../App';
import { products, categories } from './mockData';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SidebarFilter } from './SidebarFilter';

type ProductsProps = {
  onViewProduct: (product: Product) => void;
  onViewCart: () => void;
  cartCount: number;
  initialCategory?: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  },
  exit: {
    scale: 0.8,
    opacity: 0,
    transition: {
      duration: 0.2
    }
  }
};

export function Products({ onViewProduct, onViewCart, cartCount, initialCategory }: ProductsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [] as string[],
    subcategories: [] as string[],
    items: [] as string[],
    priceRange: [0, 200000] as [number, number],
  });
  const [sortBy, setSortBy] = useState('featured');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Apply initial category filter when component mounts or initialCategory changes
  useEffect(() => {
    if (initialCategory && initialCategory !== 'All') {
      setSelectedFilters(prev => ({
        ...prev,
        categories: [initialCategory]
      }));
    } else if (initialCategory === 'All') {
      setSelectedFilters(prev => ({
        ...prev,
        categories: []
      }));
    }
  }, [initialCategory]);

  // Filter products based on search, filters, and price
  const filteredProducts = products.filter(product => {
    // Search filter
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = selectedFilters.categories.length === 0 || 
                           selectedFilters.categories.includes(product.category);
    
    // Subcategory filter
    const matchesSubcategory = selectedFilters.subcategories.length === 0 || 
                               (product.subcategory && selectedFilters.subcategories.includes(product.subcategory));
    
    // Item type filter
    const matchesItemType = selectedFilters.items.length === 0 || 
                           (product.itemType && selectedFilters.items.includes(product.itemType));
    
    // Price filter
    const matchesPrice = product.price >= selectedFilters.priceRange[0] && 
                        product.price <= selectedFilters.priceRange[1];
    
    return matchesSearch && matchesCategory && matchesSubcategory && matchesItemType && matchesPrice;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const handleCategorySelect = (category: string, subcategory?: string, item?: string) => {
    if (item) {
      setSelectedFilters(prev => ({
        ...prev,
        items: prev.items.includes(item) 
          ? prev.items.filter(i => i !== item)
          : [...prev.items, item]
      }));
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white border-b border-[#8B7355]/15 sticky top-0 z-40"
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-4">
          <h1 className="text-[#2C2C2C] text-2xl">Browse Products</h1>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filter */}
          <div className="hidden lg:block">
            <SidebarFilter
              selectedFilters={selectedFilters}
              onFilterChange={setSelectedFilters}
              isOpen={true}
              onClose={() => {}}
            />
          </div>

          {/* Mobile Filter Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden fixed bottom-6 right-6 z-30 bg-[#8B7355] text-white p-4 rounded-full shadow-lg"
          >
            <SlidersHorizontal className="w-6 h-6" />
          </motion.button>

          {/* Mobile Sidebar */}
          <div className="lg:hidden">
            <SidebarFilter
              selectedFilters={selectedFilters}
              onFilterChange={setSelectedFilters}
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and Sort */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mb-8 space-y-4"
            >
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B6B6B]" />
                <input
                  type="text"
                  placeholder="Search furniture..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-[#8B7355]/15 rounded-xl text-[#2C2C2C] placeholder-[#6B6B6B] focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                />
                {searchQuery && (
                  <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-[#E8E3DE] rounded-full"
                  >
                    <X className="w-4 h-4 text-[#6B6B6B]" />
                  </motion.button>
                )}
              </div>

              {/* Sort and Results Count */}
              <div className="flex items-center justify-between">
                <p className="text-[#6B6B6B] text-sm">
                  {sortedProducts.length} {sortedProducts.length === 1 ? 'product' : 'products'} found
                </p>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 bg-white border border-[#8B7355]/15 rounded-lg text-[#2C2C2C] text-sm focus:outline-none focus:ring-2 focus:ring-[#8B7355]"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </motion.div>

            {/* Products Grid */}
            {sortedProducts.length > 0 ? (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {sortedProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={itemVariants}
                      layout
                      whileHover={{ y: -8 }}
                      onClick={() => onViewProduct(product)}
                      className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer group"
                    >
                      {/* Product Image */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F1ED]">
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.4 }}
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4"
                        >
                          <span className="text-white text-xs md:text-sm font-medium">
                            View Details
                          </span>
                        </motion.div>
                      </div>

                      {/* Product Info */}
                      <div className="p-5">
                        <div className="mb-3">
                          <h3 className="text-[#2C2C2C] font-medium mb-1 group-hover:text-[#8B7355] transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-[#6B6B6B] text-sm line-clamp-2">
                            {product.description}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <motion.p 
                            className="text-[#2C2C2C] font-medium text-lg"
                            whileHover={{ scale: 1.1 }}
                          >
                            ₹{product.price.toLocaleString()}
                          </motion.p>
                          
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-[#2C2C2C] text-sm font-medium">
                              {product.rating}
                            </span>
                            <span className="text-[#6B6B6B] text-sm">
                              ({product.reviews})
                            </span>
                          </div>
                        </div>

                        {product.subcategory && (
                          <div className="mt-3 pt-3 border-t border-[#8B7355]/10">
                            <span className="text-xs text-[#8B7355] bg-[#8B7355]/10 px-2 py-1 rounded-full">
                              {product.subcategory}
                            </span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 bg-[#E8E3DE] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-[#6B6B6B]" />
                </div>
                <h3 className="text-[#2C2C2C] text-xl font-medium mb-2">No products found</h3>
                <p className="text-[#6B6B6B]">Try adjusting your filters or search query</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}