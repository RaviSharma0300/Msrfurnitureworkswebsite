import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, X } from 'lucide-react';
import { Product } from '../App';

type AddedToCartModalProps = {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onCheckout: () => void;
  onContinueShopping: () => void;
};

export function AddedToCartModal({ 
  isOpen, 
  onClose, 
  product, 
  onCheckout,
  onContinueShopping 
}: AddedToCartModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-[#6B6B6B]" />
              </motion.button>

              <div className="p-6 md:p-8">
                {/* Success Icon & Message */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                  className="flex items-center gap-3 mb-6"
                >
                  <CheckCircle className="w-7 h-7 text-green-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-[#2C2C2C] text-xl font-semibold">
                      Successfully added to cart!
                    </h3>
                  </div>
                </motion.div>

                {/* Product Info */}
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex gap-4 mb-8 p-4 bg-[#FAF8F5] rounded-xl"
                >
                  {/* Product Thumbnail */}
                  <div className="w-20 h-20 flex-shrink-0 bg-white rounded-lg overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[#2C2C2C] font-medium mb-1 truncate">
                      {product.name}
                    </h4>
                    {product.subcategory && (
                      <p className="text-[#6B6B6B] text-sm mb-2">
                        {product.subcategory}
                      </p>
                    )}
                    <p className="text-[#8B7355] font-semibold">
                      ₹{product.price.toLocaleString()}
                    </p>
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  {/* Primary: Proceed to Checkout */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onCheckout}
                    className="flex-1 py-3.5 px-6 bg-[#8B7355] text-white rounded-lg font-medium hover:bg-[#6B5A44] transition-colors shadow-lg shadow-[#8B7355]/20"
                  >
                    Proceed to Checkout
                  </motion.button>

                  {/* Secondary: Continue Shopping */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onContinueShopping}
                    className="flex-1 py-3.5 px-6 border-2 border-[#001F3F] text-[#001F3F] rounded-lg font-medium hover:bg-[#001F3F] hover:text-white transition-colors"
                  >
                    Continue Shopping
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
