import { motion } from "framer-motion";

export function About() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-8">
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-12">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-6 text-[#2C2C2C] text-2xl md:text-3xl lg:text-4xl"
        >
          About M.S.R. Furniture & Works
        </motion.h1>
        
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <p className="text-[#2C2C2C] mb-4 leading-relaxed text-base md:text-lg">
            Welcome to M.S.R. Furniture & Works, your trusted partner in creating beautiful and functional spaces. We produce a wide variety of furniture and interior design products that combine quality craftsmanship with modern aesthetics.
          </p>
          
          <p className="text-[#2C2C2C] mb-4 leading-relaxed text-base md:text-lg">
            Our extensive range includes everything from living room and bedroom furniture to office solutions and custom interior design products. Each piece is carefully crafted to meet the highest standards of quality and durability.
          </p>

          <motion.h2 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-[#8B7355] mt-8 mb-4 text-xl md:text-2xl"
          >
            Our Products & Services
          </motion.h2>
          <motion.ul 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[#2C2C2C] mb-6 space-y-2 text-base md:text-lg"
          >
            <li>Custom furniture manufacturing</li>
            <li>Complete interior design solutions</li>
            <li>Office furniture and workstations</li>
            <li>Residential furniture for all rooms</li>
            <li>Modular kitchen and wardrobes</li>
            <li>Renovation and refurbishment services</li>
          </motion.ul>

          <motion.h2 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-[#8B7355] mt-8 mb-4 text-xl md:text-2xl"
          >
            Why Choose Us?
          </motion.h2>
          <motion.ul 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-[#2C2C2C] mb-6 space-y-2 text-base md:text-lg"
          >
            <li>Premium quality materials and craftsmanship</li>
            <li>Customizable designs to match your vision</li>
            <li>Competitive pricing and transparent quotes</li>
            <li>Timely delivery and professional installation</li>
            <li>Excellent after-sales support and warranty</li>
          </motion.ul>

          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-[#2C2C2C] leading-relaxed text-base md:text-lg"
          >
            Whether you're furnishing a new home, renovating your office, or looking for that perfect piece to complete your space, M.S.R. Furniture & Works is here to bring your vision to life with quality products and exceptional service.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}