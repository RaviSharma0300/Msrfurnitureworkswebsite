import { Mail, Phone, MapPin, Send, Clock, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface ContactProps {
  onBack?: () => void;
}

export function Contact({ onBack }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] pb-8">
      {/* Back Button - Hidden on Desktop, Visible on Mobile/Tablet */}
      <div className="lg:hidden max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pt-4 md:pt-6">
        <motion.button
          onClick={onBack || (() => window.history.back())}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-[#964B00] text-white px-4 py-2.5 rounded-lg hover:bg-[#7a3d00] transition-colors shadow-sm"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
          <span className="text-sm md:text-base font-medium">Back</span>
        </motion.button>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pb-6 md:pb-8 lg:pb-12 pt-4 lg:pt-0">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8 text-[#2C2C2C] text-2xl md:text-3xl lg:text-4xl"
        >
          Contact Us
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <h2 className="mb-4 text-[#8B7355] text-xl md:text-2xl">Get in Touch</h2>
              <p className="text-[#2C2C2C] mb-6 text-base md:text-lg">
                Have a question or want to discuss your furniture needs? We're here to help!
              </p>
            </div>

            <div className="space-y-5">
              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-start gap-4 p-4 bg-white rounded-xl"
              >
                <MapPin className="w-5 h-5 text-[#8B7355] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-[#2C2C2C] font-medium mb-1">Address</h3>
                  <p className="text-[#6B6B6B] text-sm md:text-base">
                    123 Furniture Ave,<br />
                    Design District,<br />
                    NY 10001
                  </p>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-start gap-4 p-4 bg-white rounded-xl"
              >
                <Phone className="w-5 h-5 text-[#8B7355] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-[#2C2C2C] font-medium mb-1">Phone</h3>
                  <a href="tel:+9415543010" className="block text-[#6B6B6B] hover:text-[#8B7355] transition-colors text-sm md:text-base">
                    +94 15543010
                  </a>
                  <a href="tel:+8418834676" className="block text-[#6B6B6B] hover:text-[#8B7355] transition-colors text-sm md:text-base">
                    +84 18834676
                  </a>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-start gap-4 p-4 bg-white rounded-xl"
              >
                <Mail className="w-5 h-5 text-[#8B7355] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-[#2C2C2C] font-medium mb-1">Email</h3>
                  <a href="mailto:info@msrfurniture.com" className="text-[#6B6B6B] hover:text-[#8B7355] transition-colors text-sm md:text-base">
                    info@msrfurniture.com
                  </a>
                </div>
              </motion.div>

              <motion.div 
                whileHover={{ x: 5 }}
                className="flex items-start gap-4 p-4 bg-white rounded-xl"
              >
                <Clock className="w-5 h-5 text-[#8B7355] flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-[#2C2C2C] font-medium mb-1">Business Hours</h3>
                  <p className="text-[#6B6B6B] text-sm md:text-base">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                  <p className="text-[#6B6B6B] text-sm md:text-base">Sunday: Closed</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 md:p-8 rounded-2xl shadow-sm"
          >
            <h2 className="mb-6 text-[#8B7355] text-xl md:text-2xl">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[#2C2C2C] mb-2 text-sm md:text-base">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F5F1ED] rounded-xl border-0 focus:ring-2 focus:ring-[#8B7355] transition-all text-[#2C2C2C] text-sm md:text-base"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-[#2C2C2C] mb-2 text-sm md:text-base">Email *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F5F1ED] rounded-xl border-0 focus:ring-2 focus:ring-[#8B7355] transition-all text-[#2C2C2C] text-sm md:text-base"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-[#2C2C2C] mb-2 text-sm md:text-base">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F5F1ED] rounded-xl border-0 focus:ring-2 focus:ring-[#8B7355] transition-all text-[#2C2C2C] text-sm md:text-base"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              <div>
                <label className="block text-[#2C2C2C] mb-2 text-sm md:text-base">Message *</label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-[#F5F1ED] rounded-xl border-0 focus:ring-2 focus:ring-[#8B7355] transition-all h-32 resize-none text-[#2C2C2C] text-sm md:text-base"
                  placeholder="Tell us about your project..."
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#8B7355] text-white py-3 md:py-4 rounded-xl hover:bg-[#6B5A44] transition-colors font-medium text-sm md:text-base"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}