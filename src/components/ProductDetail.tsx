import { ArrowLeft, Star, ShoppingCart } from 'lucide-react';
import { Product } from '../App';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AddedToCartModal } from './AddedToCartModal';

type ProductDetailProps = {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
  onViewCart: () => void;
  onCheckout: () => void;
  cartCount: number;
};

export function ProductDetail({ product, onBack, onAddToCart, onViewCart, onCheckout, cartCount }: ProductDetailProps) {
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product);
    setShowModal(true);
  };

  const handleCheckout = () => {
    setShowModal(false);
    onCheckout();
  };

  const handleContinueShopping = () => {
    setShowModal(false);
    onBack();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#FAF8F5] pb-24"
    >
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 bg-white z-10 border-b border-[#8B7355]/15"
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center">
            <motion.button 
              onClick={onBack} 
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 -ml-2 hover:bg-[#FAF8F5] rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 md:w-6 md:h-6 text-[#2C2C2C]" />
            </motion.button>
            <motion.h1 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="ml-3 md:ml-4 text-[#2C2C2C] text-base md:text-lg lg:text-2xl"
            >
              Product Details
            </motion.h1>
          </div>
          <motion.div 
            className="relative cursor-pointer" 
            onClick={onViewCart}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-[#2C2C2C]" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-2 -right-2 bg-[#8B7355] text-white rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-xs font-medium"
                >
                  {cartCount}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:p-8">
          {/* Product Image */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="relative aspect-square lg:rounded-2xl overflow-hidden bg-white"
          >
            <motion.img
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring" }}
            className="p-4 md:p-6 lg:p-0"
          >
            <div className="max-w-xl">
              {/* Category Badge */}
              {product.subcategory && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring" }}
                  className="inline-block mb-3 md:mb-4 px-3 md:px-4 py-1 md:py-1.5 bg-[#8B7355]/10 text-[#8B7355] rounded-full text-xs md:text-sm font-medium"
                >
                  {product.subcategory}
                </motion.span>
              )}

              {/* Product Name */}
              <motion.h2 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-[#2C2C2C] mb-3 md:mb-4 text-xl md:text-2xl lg:text-3xl xl:text-4xl"
              >
                {product.name}
              </motion.h2>

              {/* Rating */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.75 }}
                className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6"
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.8 + i * 0.05 }}
                    >
                      <Star
                        className={`w-4 h-4 md:w-5 md:h-5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>
                <span className="text-[#2C2C2C] font-medium text-sm md:text-base">{product.rating}</span>
                <span className="text-[#6B6B6B] text-xs md:text-sm">({product.reviews} reviews)</span>
              </motion.div>

              {/* Price */}
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
                whileHover={{ scale: 1.02 }}
                className="mb-5 md:mb-6 p-4 md:p-6 bg-gradient-to-br from-[#FAF8F5] to-white rounded-xl md:rounded-2xl border border-[#8B7355]/10"
              >
                <p className="text-[#6B6B6B] mb-1 text-xs md:text-sm">Price</p>
                <motion.p 
                  className="text-[#2C2C2C] text-2xl md:text-3xl lg:text-4xl font-medium"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.9, type: "spring", stiffness: 200 }}
                >
                  ₹{product.price.toLocaleString()}
                </motion.p>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mb-6 md:mb-8"
              >
                <h3 className="text-[#2C2C2C] mb-2 md:mb-3 text-base md:text-lg font-medium">Description</h3>
                <p className="text-[#6B6B6B] leading-relaxed text-sm md:text-base">
                  {product.description}
                </p>
              </motion.div>

              {/* Add to Cart Button */}
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="w-full py-3 md:py-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 text-base md:text-lg bg-[#8B7355] text-white hover:bg-[#6B5A44]"
              >
                <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                Add to Cart
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Added to Cart Modal */}
      <AddedToCartModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        product={product}
        onCheckout={handleCheckout}
        onContinueShopping={handleContinueShopping}
      />
    </motion.div>
  );
}