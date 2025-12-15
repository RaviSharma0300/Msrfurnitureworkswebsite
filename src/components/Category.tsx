import { ArrowLeft, ShoppingCart } from 'lucide-react';
import { Product } from '../App';
import { products } from './mockData';
import { motion } from 'framer-motion';

type CategoryProps = {
  category: string;
  onBack: () => void;
  onViewProduct: (product: Product) => void;
  onViewCart: () => void;
  cartCount: number;
};

export function Category({ category, onBack, onViewProduct, onViewCart, cartCount }: CategoryProps) {
  const categoryProducts = products.filter(p => p.category === category);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 bg-white z-10 border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <motion.button 
              onClick={onBack} 
              whileHover={{ scale: 1.05, x: -3 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-3 md:px-4 py-2 bg-[#964B00] text-white rounded-lg md:rounded-xl hover:bg-[#7a3d00] transition-colors shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-sm md:text-base font-medium">Back</span>
            </motion.button>
            <motion.h1 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[#2C2C2C] text-base md:text-lg lg:text-xl"
            >
              {category}
            </motion.h1>
          </div>
          <motion.div 
            className="relative cursor-pointer" 
            onClick={onViewCart}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-[#2C2C2C]" />
            {cartCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-[#964B00] text-white rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-xs font-medium"
              >
                {cartCount}
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 lg:py-8">
        <p className="text-gray-600 mb-4">{categoryProducts.length} items</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categoryProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onViewProduct(product)}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="aspect-square bg-gray-100">
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <div className="p-3">
                <h3 className="text-gray-900 mb-1 truncate">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <motion.p 
                    className="text-gray-900"
                    whileHover={{ scale: 1.1 }}
                  >
                    ₹{product.price}
                  </motion.p>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500 text-sm">★</span>
                    <span className="text-gray-600 text-sm">{product.rating}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}