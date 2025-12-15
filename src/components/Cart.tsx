import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem } from '../App';
import { motion, AnimatePresence } from 'framer-motion';

type CartProps = {
  items: CartItem[];
  onBack: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onCheckout: () => void;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  },
  exit: {
    x: 100,
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.3
    }
  }
};

export function Cart({ items, onBack, onUpdateQuantity, onCheckout }: CartProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50000 ? 0 : 500;
  const total = subtotal + shipping;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#FAF8F5]"
    >
      {/* Header */}
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 bg-white z-10 border-b border-[#8B7355]/15"
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3 md:py-4 flex items-center">
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
            className="ml-3 md:ml-4 text-[#2C2C2C] text-base md:text-lg lg:text-xl"
          >
            Shopping Cart
          </motion.h1>
        </div>
      </motion.div>

      {items.length === 0 ? (
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring" }}
          className="flex flex-col items-center justify-center py-20 px-4"
        >
          <motion.div 
            className="text-6xl mb-4"
            animate={{ 
              rotate: [0, -10, 10, -10, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatDelay: 1
            }}
          >
            🛒
          </motion.div>
          <h2 className="text-[#2C2C2C] mb-2 text-xl md:text-2xl">Your cart is empty</h2>
          <p className="text-[#6B6B6B] mb-6">Add some products to get started</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="bg-[#8B7355] text-white px-8 py-3 rounded-xl hover:bg-[#6B5A44] transition-colors"
          >
            Continue Shopping
          </motion.button>
        </motion.div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 md:py-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 mb-6 lg:mb-0">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                <AnimatePresence mode="popLayout">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      variants={itemVariants}
                      layout
                      className="bg-white rounded-2xl p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <motion.div 
                          className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-[#F5F1ED] flex-shrink-0"
                          whileHover={{ scale: 1.05 }}
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between gap-2 mb-2">
                            <h3 className="text-[#2C2C2C] font-medium line-clamp-1 text-sm md:text-base">
                              {item.name}
                            </h3>
                            <motion.button
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => onUpdateQuantity(item.id, 0)}
                              className="p-1.5 hover:bg-red-50 rounded-lg transition-colors flex-shrink-0"
                            >
                              <Trash2 className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                            </motion.button>
                          </div>
                          
                          <div className="flex items-end justify-between gap-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 md:gap-3">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#FAF8F5] hover:bg-[#E8E3DE] flex items-center justify-center transition-colors"
                              >
                                <Minus className="w-4 h-4 text-[#2C2C2C]" />
                              </motion.button>
                              
                              <motion.span 
                                key={item.quantity}
                                initial={{ scale: 1.3 }}
                                animate={{ scale: 1 }}
                                className="w-8 md:w-10 text-center font-medium text-[#2C2C2C] text-sm md:text-base"
                              >
                                {item.quantity}
                              </motion.span>
                              
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-[#8B7355] hover:bg-[#6B5A44] flex items-center justify-center transition-colors"
                              >
                                <Plus className="w-4 h-4 text-white" />
                              </motion.button>
                            </div>

                            {/* Price */}
                            <motion.p 
                              className="text-[#2C2C2C] font-medium text-base md:text-lg"
                              key={item.price}
                              initial={{ scale: 1.2 }}
                              animate={{ scale: 1 }}
                            >
                              ₹{(item.price * item.quantity).toLocaleString()}
                            </motion.p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl p-6 shadow-sm sticky top-24"
              >
                <h2 className="text-[#2C2C2C] mb-6 text-lg md:text-xl">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <motion.div 
                    className="flex justify-between text-[#2C2C2C]"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <span>Subtotal</span>
                    <motion.span
                      key={subtotal}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                    >
                      ₹{subtotal.toLocaleString()}
                    </motion.span>
                  </motion.div>
                  <motion.div 
                    className="flex justify-between text-[#6B6B6B]"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'FREE' : `₹${shipping.toLocaleString()}`}</span>
                  </motion.div>
                  <AnimatePresence>
                    {subtotal < 50000 && subtotal > 0 && (
                      <motion.p 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="text-[#8B7355] text-sm text-center py-3 bg-[#8B7355]/5 rounded-lg overflow-hidden"
                      >
                        Add ₹{(50000 - subtotal).toLocaleString()} more for free shipping
                      </motion.p>
                    )}
                  </AnimatePresence>
                  <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="border-t border-[#8B7355]/10 pt-4 flex justify-between text-[#2C2C2C] font-medium text-lg"
                  >
                    <span>Total</span>
                    <motion.span
                      key={total}
                      initial={{ scale: 1.3, color: '#8B7355' }}
                      animate={{ scale: 1, color: '#2C2C2C' }}
                    >
                      ₹{total.toLocaleString()}
                    </motion.span>
                  </motion.div>
                </div>

                <motion.button
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onCheckout}
                  className="w-full bg-[#8B7355] text-white py-4 rounded-xl hover:bg-[#6B5A44] transition-colors font-medium"
                >
                  Proceed to Checkout
                </motion.button>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}