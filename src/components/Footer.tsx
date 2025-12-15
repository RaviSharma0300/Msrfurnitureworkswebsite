import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-[#001F3F] text-white mt-16"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8"
        >
          {/* Company Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white mb-4">M.S.R. Furniture & Works</h3>
            <p className="text-[#D4C5B9] mb-4 text-sm leading-relaxed">
              Creating beautiful and functional spaces with premium furniture and interior design solutions.
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                <motion.a
                  key={index}
                  href="#"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-[#964B00] rounded-full flex items-center justify-center hover:bg-[#7a3d00] transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {['Home', 'About', 'Products', 'Contact', 'FAQs', 'Terms & Conditions'].map((link) => (
                <motion.li 
                  key={link}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a href="#" className="text-[#D4C5B9] hover:text-white transition-colors text-sm">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white mb-4">Categories</h3>
            <ul className="space-y-3">
              {['Living Room', 'Bedroom', 'Dining & Kitchen', 'Office & Study', 'Outdoor & Garden', 'Interior & Decor'].map((category) => (
                <motion.li 
                  key={category}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a href="#" className="text-[#D4C5B9] hover:text-white transition-colors text-sm">
                    {category}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white mb-4">Contact Us</h3>
            <div className="space-y-4">
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-start gap-3"
              >
                <MapPin className="w-5 h-5 text-[#964B00] flex-shrink-0 mt-1" />
                <p className="text-[#D4C5B9] text-sm">
                  123 Furniture Ave,<br />
                  Design District,<br />
                  NY 10001
                </p>
              </motion.div>
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center gap-3"
              >
                <Phone className="w-5 h-5 text-[#964B00] flex-shrink-0" />
                <div className="flex flex-col gap-1">
                  <a href="tel:+9415543010" className="text-[#D4C5B9] hover:text-white transition-colors text-sm">
                    +94 15543010
                  </a>
                  <a href="tel:+8418834676" className="text-[#D4C5B9] hover:text-white transition-colors text-sm">
                    +84 18834676
                  </a>
                </div>
              </motion.div>
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-center gap-3"
              >
                <Mail className="w-5 h-5 text-[#964B00] flex-shrink-0" />
                <a href="mailto:info@msrfurniture.com" className="text-[#D4C5B9] hover:text-white transition-colors text-sm">
                  info@msrfurniture.com
                </a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="border-t border-[#8B7355]/30 pt-8 mb-8"
        >
          <div className="max-w-md mx-auto text-center">
            <h3 className="text-white mb-2">Stay Updated</h3>
            <p className="text-[#D4C5B9] mb-4 text-sm">Subscribe to our newsletter for exclusive offers and updates</p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 sm:gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 bg-[#003366] border border-[#964B00]/30 rounded-xl text-white placeholder-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#964B00] text-sm"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-[#964B00] text-white rounded-xl hover:bg-[#7a3d00] transition-colors font-semibold w-full sm:w-auto text-sm"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="border-t border-[#8B7355]/30 pt-6 text-center"
        >
          <p className="text-[#D4C5B9] text-sm">
            © {currentYear} M.S.R. Furniture & Works. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}