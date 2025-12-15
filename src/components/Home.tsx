import { motion } from 'framer-motion';
import { Product } from '../App';
import { products, categories } from './mockData';
import { ArrowRight, Sofa, Bed, UtensilsCrossed, Briefcase, Trees, Building2, Palette } from 'lucide-react';
import { useState } from 'react';

type HomeProps = {
  onViewProduct: (product: Product) => void;
  onViewCategory: (category: string) => void;
  onViewCart: () => void;
  cartCount: number;
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

// Minimalist Navy Blue Line-Art Icons - Updated with specific icons for each category
const categoryIcons: { [key: string]: React.ReactNode } = {
  'Living Room Furniture': <Sofa className="w-full h-full stroke-[1.5]" />,
  'Bedroom Furniture': <Bed className="w-full h-full stroke-[1.5]" />,
  'Dining & Kitchen Furniture': <UtensilsCrossed className="w-full h-full stroke-[1.5]" />,
  'Office & Study Furniture': <Briefcase className="w-full h-full stroke-[1.5]" />,
  'Outdoor & Garden Furniture': <Trees className="w-full h-full stroke-[1.5]" />,
  'Commercial & Institutional': <Building2 className="w-full h-full stroke-[1.5]" />,
  'Interior & Decor Products': <Palette className="w-full h-full stroke-[1.5]" />,
};

export function Home({ onViewProduct, onViewCategory, onViewCart, cartCount }: HomeProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pb-20"
    >
      {/* Hero Section - Photorealistic Living Room Background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden"
      >
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1680775079384-bb80cb150152?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBsdXh1cnklMjBsaXZpbmclMjByb29tJTIwbmF2eSUyMGJsdWUlMjBmdXJuaXR1cmV8ZW58MXx8fHwxNzY1NzEyOTQ2fDA&ixlib=rb-4.1.0&q=80&w=1080')`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-white text-4xl md:text-5xl lg:text-7xl mb-4 md:mb-6 font-extrabold leading-tight"
              style={{ 
                textShadow: '0 2px 10px rgba(0,0,0,0.5)'
              }}
            >
              Transform Your Space
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-white text-base md:text-lg lg:text-xl mb-6 md:mb-8 leading-relaxed font-normal"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}
            >
              Discover premium furniture and interior design solutions crafted with excellence. 
              From living rooms to commercial spaces, we bring your vision to life.
            </motion.p>
            <motion.button
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(150, 75, 0, 0.4)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onViewCategory('All')}
              className="bg-[#964B00] text-white px-8 md:px-10 py-3 md:py-4 rounded-lg font-semibold hover:bg-[#7a3d00] transition-all text-sm md:text-base shadow-lg flex items-center gap-2"
            >
              Explore Collection
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Categories Section - Clean White Cards with Navy Blue Line Icons */}
        <div className="py-12 md:py-16 lg:py-20">
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <motion.h2 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[#001F3F] text-2xl md:text-3xl lg:text-4xl font-extrabold cursor-pointer group/heading inline-block"
            >
              <span className="relative">
                Shop by Category
                <motion.span 
                  className="absolute bottom-0 left-0 w-0 h-[3px] bg-[#001F3F] group-hover/heading:w-1/2 transition-all duration-700"
                ></motion.span>
              </span>
            </motion.h2>
            <motion.button
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onViewCategory('All')}
              className="text-[#964B00] hover:text-[#7a3d00] font-semibold flex items-center gap-2 text-sm md:text-base group"
            >
              View All Categories
              <motion.div
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </motion.div>
            </motion.button>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
          >
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all border border-[#001F3F]/10 overflow-hidden group cursor-pointer"
                onClick={() => onViewCategory(category.name)}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-6 md:p-8 h-full flex flex-col"
                >
                  {/* Navy Blue Minimalist Line Icon with Advanced Animations */}
                  <motion.div 
                    className="w-12 h-12 md:w-16 md:h-16 mb-4 md:mb-6 text-[#001F3F] group-hover:text-[#964B00] transition-colors flex-shrink-0"
                    initial={{ scale: 1, rotate: 0 }}
                    whileHover={{ 
                      scale: 1.15, 
                      rotate: [0, -5, 5, -5, 0],
                      transition: { 
                        rotate: { 
                          duration: 0.5, 
                          repeat: Infinity, 
                          repeatDelay: 0.5 
                        },
                        scale: { 
                          duration: 0.3,
                          type: "spring",
                          stiffness: 300
                        }
                      }
                    }}
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      y: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.1
                      }
                    }}
                  >
                    {categoryIcons[category.name] || <Sofa className="w-full h-full stroke-[1.5]" />}
                  </motion.div>
                  
                  {/* Text Content - Flexible Space */}
                  <div className="flex-grow">
                    <h3 className="text-[#001F3F] mb-2 group-hover:text-[#964B00] transition-colors text-sm md:text-base font-semibold min-h-[2.5rem] md:min-h-[3rem]">
                      {category.name}
                    </h3>
                    <p className="text-[#6B6B6B] text-xs md:text-sm font-normal mb-4">{category.count} items</p>
                  </div>
                  
                  {/* View All Button - Fixed at Bottom */}
                  <div className="relative overflow-hidden rounded-lg group/btn mt-auto flex-shrink-0">
                    <motion.div
                      className="w-full py-2.5 md:py-3 bg-[#F5F5F5] group-hover/btn:bg-[#7a3d00] text-[#964B00] group-hover/btn:text-white transition-all duration-300 text-xs md:text-sm font-semibold rounded-lg flex items-center justify-center gap-2"
                    >
                      <span>View All</span>
                      <motion.div
                        className="inline-block"
                        animate={{ x: 0 }}
                        whileHover={{ x: 3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Featured Products */}
        <div className="py-12 md:py-16 lg:py-20">
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <motion.h2
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-[#001F3F] text-2xl md:text-3xl lg:text-4xl font-extrabold cursor-pointer group/heading inline-block"
            >
              <span className="relative">
                Featured Products
                <motion.span 
                  className="absolute bottom-0 left-0 w-0 h-[3px] bg-[#001F3F] group-hover/heading:w-1/2 transition-all duration-700"
                ></motion.span>
              </span>
            </motion.h2>
            <motion.button
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onViewCategory('All')}
              className="text-[#964B00] hover:text-[#7a3d00] font-semibold flex items-center gap-2 text-sm md:text-base"
            >
              View All
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </motion.button>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6"
          >
            {products.slice(0, 8).map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onViewProduct(product)}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all cursor-pointer group border border-[#001F3F]/10"
              >
                <div className="relative aspect-square overflow-hidden bg-[#F5F5F5]">
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
                    className="absolute inset-0 bg-gradient-to-t from-[#001F3F]/80 to-transparent flex items-end p-4"
                  >
                    <span className="text-white text-sm font-semibold">View Details</span>
                  </motion.div>
                </div>
                
                <div className="p-4 md:p-5">
                  <h3 className="text-[#001F3F] mb-2 group-hover:text-[#964B00] transition-colors line-clamp-1 text-sm md:text-base font-semibold">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <motion.div 
                      className="text-[#964B00] font-semibold text-base md:text-lg"
                      whileHover={{ scale: 1.05 }}
                    >
                      ₹{product.price.toLocaleString()}
                    </motion.div>
                    <div className="flex items-center gap-1">
                      <span className="text-[#964B00] text-sm">★</span>
                      <span className="text-[#001F3F] text-xs md:text-sm font-medium">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}