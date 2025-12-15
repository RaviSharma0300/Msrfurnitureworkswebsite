import { ArrowLeft, CreditCard, Lock, CheckCircle, Smartphone, Building2, Wallet } from 'lucide-react';
import { CartItem } from '../App';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type PaymentMethod = 'upi' | 'card' | 'debit' | 'netbanking' | 'upiapp';

type PaymentProps = {
  items: CartItem[];
  onBack: () => void;
  onSuccess: () => void;
};

export function Payment({ items, onBack, onSuccess }: PaymentProps) {
  const [step, setStep] = useState<'form' | 'processing' | 'success'>('form');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('upi');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    // UPI
    upiId: '',
    // Card
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    // Net Banking
    bankName: '',
    // UPI App
    upiApp: '',
  });

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 50000 ? 0 : 500;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  // Location validation - only Uttar Pradesh allowed
  const isValidLocation = formData.state === 'Uttar Pradesh' || formData.state === '';
  const showLocationError = formData.state !== '' && !isValidLocation;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check location validation before proceeding
    if (!isValidLocation) {
      return;
    }
    
    setStep('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      setStep('success');
      setTimeout(() => {
        onSuccess();
      }, 2000);
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  if (step === 'processing') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center px-4"
      >
        <div className="text-center">
          <motion.div 
            className="w-20 h-20 border-4 border-gray-200 border-t-black rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-900 mb-2"
          >
            Processing Payment
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600"
          >
            Please wait while we process your order...
          </motion.p>
          <motion.div 
            className="mt-6 flex justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 bg-black rounded-full"
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (step === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gray-50 flex items-center justify-center px-4"
      >
        <div className="text-center max-w-md">
          <motion.div 
            className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
            >
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>
          </motion.div>
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-gray-900 mb-2"
          >
            Order Successful!
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-600 mb-4"
          >
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </motion.p>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <p className="text-gray-500">Redirecting to home...</p>
          </motion.div>
        </div>
      </motion.div>
    );
  }

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
            className="ml-3 md:ml-4 text-base md:text-lg lg:text-xl"
          >
            Checkout
          </motion.h1>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6 md:py-8">
        <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6 mb-6 md:mb-8 lg:mb-0">
            {/* Shipping Information */}
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm"
            >
              <h2 className="text-gray-900 mb-4 md:mb-6 text-base md:text-lg">Shipping Information</h2>
              <div className="space-y-3 md:space-y-4">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="block text-gray-700 mb-2 text-sm md:text-base">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-50 rounded-lg md:rounded-xl border-0 focus:ring-2 focus:ring-black transition-all text-sm md:text-base"
                    placeholder="John Doe"
                  />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-50 rounded-lg md:rounded-xl border-0 focus:ring-2 focus:ring-black transition-all text-sm md:text-base"
                      placeholder="john@example.com"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.55 }}
                  >
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">Phone *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-50 rounded-lg md:rounded-xl border-0 focus:ring-2 focus:ring-black transition-all text-sm md:text-base"
                      placeholder="+1 (555) 000-0000"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <label className="block text-gray-700 mb-2 text-sm md:text-base">Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-50 rounded-lg md:rounded-xl border-0 focus:ring-2 focus:ring-black transition-all text-sm md:text-base"
                    placeholder="123 Main Street"
                  />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.65 }}
                  >
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">City *</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-gray-50 rounded-lg md:rounded-xl border-0 focus:ring-2 focus:ring-black transition-all text-sm md:text-base"
                      placeholder="New York"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">State *</label>
                    <select
                      required
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className={`w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border-2 transition-all ${
                        showLocationError
                          ? 'border-[#D32F2F] bg-red-50 focus:border-[#D32F2F] focus:ring-[#D32F2F]'
                          : formData.state === 'Uttar Pradesh'
                          ? 'border-green-500 bg-green-50 focus:border-green-500 focus:ring-0'
                          : 'border-gray-200 bg-gray-50 focus:border-[#8B7355] focus:ring-0'
                      }`}
                    >
                      <option value="">Select State</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                      <option value="Delhi">Delhi</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Tamil Nadu">Tamil Nadu</option>
                      <option value="Gujarat">Gujarat</option>
                      <option value="Rajasthan">Rajasthan</option>
                      <option value="West Bengal">West Bengal</option>
                      <option value="Madhya Pradesh">Madhya Pradesh</option>
                      <option value="Bihar">Bihar</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Kerala">Kerala</option>
                      <option value="Andhra Pradesh">Andhra Pradesh</option>
                      <option value="Telangana">Telangana</option>
                      <option value="Odisha">Odisha</option>
                      <option value="Jharkhand">Jharkhand</option>
                      <option value="Assam">Assam</option>
                      <option value="Chhattisgarh">Chhattisgarh</option>
                      <option value="Uttarakhand">Uttarakhand</option>
                    </select>
                    <AnimatePresence>
                      {showLocationError && (
                        <motion.p 
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="text-[#D32F2F] text-sm mt-2 font-medium"
                        >
                          Currently delivery is not available in this location. We only deliver in Uttar Pradesh.
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.75 }}
                  >
                    <label className="block text-gray-700 mb-2 text-sm md:text-base">Pincode *</label>
                    <input
                      type="text"
                      required
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      className={`w-full px-3 md:px-4 py-2.5 md:py-3 rounded-lg md:rounded-xl border-2 transition-all ${
                        showLocationError
                          ? 'border-[#D32F2F] bg-red-50 focus:border-[#D32F2F] focus:ring-[#D32F2F]'
                          : formData.state === 'Uttar Pradesh'
                          ? 'border-green-500 bg-green-50 focus:border-green-500 focus:ring-0'
                          : 'border-gray-200 bg-gray-50 focus:border-[#8B7355] focus:ring-0'
                      }`}
                      placeholder="201301"
                      maxLength={6}
                    />
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Payment Information */}
            <motion.div 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.75, type: "spring" }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-2 mb-6">
                <Wallet className="w-5 h-5 text-[#8B7355]" />
                <h2 className="text-[#001F3F]">Payment Method</h2>
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Lock className="w-4 h-4 text-green-600 ml-auto" />
                </motion.div>
              </div>

              {/* Payment Method Tabs */}
              <div className="grid grid-cols-5 gap-2 mb-6">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-[#8B7355] bg-[#8B7355]/10'
                      : 'border-gray-200 hover:border-[#8B7355]/50'
                  }`}
                >
                  <Smartphone className={`w-5 h-5 mx-auto mb-1 ${paymentMethod === 'upi' ? 'text-[#8B7355]' : 'text-gray-400'}`} />
                  <p className={`text-xs ${paymentMethod === 'upi' ? 'text-[#8B7355] font-medium' : 'text-gray-600'}`}>UPI</p>
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#8B7355] bg-[#8B7355]/10'
                      : 'border-gray-200 hover:border-[#8B7355]/50'
                  }`}
                >
                  <CreditCard className={`w-5 h-5 mx-auto mb-1 ${paymentMethod === 'card' ? 'text-[#8B7355]' : 'text-gray-400'}`} />
                  <p className={`text-xs ${paymentMethod === 'card' ? 'text-[#8B7355] font-medium' : 'text-gray-600'}`}>Credit</p>
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPaymentMethod('debit')}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    paymentMethod === 'debit'
                      ? 'border-[#8B7355] bg-[#8B7355]/10'
                      : 'border-gray-200 hover:border-[#8B7355]/50'
                  }`}
                >
                  <CreditCard className={`w-5 h-5 mx-auto mb-1 ${paymentMethod === 'debit' ? 'text-[#8B7355]' : 'text-gray-400'}`} />
                  <p className={`text-xs ${paymentMethod === 'debit' ? 'text-[#8B7355] font-medium' : 'text-gray-600'}`}>Debit</p>
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'border-[#8B7355] bg-[#8B7355]/10'
                      : 'border-gray-200 hover:border-[#8B7355]/50'
                  }`}
                >
                  <Building2 className={`w-5 h-5 mx-auto mb-1 ${paymentMethod === 'netbanking' ? 'text-[#8B7355]' : 'text-gray-400'}`} />
                  <p className={`text-xs ${paymentMethod === 'netbanking' ? 'text-[#8B7355] font-medium' : 'text-gray-600'}`}>Net Banking</p>
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPaymentMethod('upiapp')}
                  className={`p-3 rounded-xl border-2 transition-all ${
                    paymentMethod === 'upiapp'
                      ? 'border-[#8B7355] bg-[#8B7355]/10'
                      : 'border-gray-200 hover:border-[#8B7355]/50'
                  }`}
                >
                  <Wallet className={`w-5 h-5 mx-auto mb-1 ${paymentMethod === 'upiapp' ? 'text-[#8B7355]' : 'text-gray-400'}`} />
                  <p className={`text-xs ${paymentMethod === 'upiapp' ? 'text-[#8B7355] font-medium' : 'text-gray-600'}`}>UPI Apps</p>
                </motion.button>
              </div>

              {/* Payment Method Forms */}
              <AnimatePresence mode="wait">
                {/* UPI ID Form */}
                {paymentMethod === 'upi' && (
                  <motion.div
                    key="upi"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-[#2C2C2C] mb-2">UPI ID *</label>
                      <input
                        type="text"
                        required
                        value={formData.upiId}
                        onChange={(e) => handleInputChange('upiId', e.target.value)}
                        className="w-full px-4 py-3 bg-[#FAF8F5] rounded-xl border-2 border-transparent focus:border-[#8B7355] focus:ring-0 transition-all"
                        placeholder="yourname@upi"
                      />
                      <p className="text-gray-500 text-sm mt-2">Enter your UPI ID (e.g., 9876543210@paytm)</p>
                    </div>
                  </motion.div>
                )}

                {/* Credit Card Form */}
                {paymentMethod === 'card' && (
                  <motion.div
                    key="card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-[#2C2C2C] mb-2">Card Number *</label>
                      <input
                        type="text"
                        required
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        className="w-full px-4 py-3 bg-[#FAF8F5] rounded-xl border-2 border-transparent focus:border-[#8B7355] focus:ring-0 transition-all"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>

                    <div>
                      <label className="block text-[#2C2C2C] mb-2">Cardholder Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value)}
                        className="w-full px-4 py-3 bg-[#FAF8F5] rounded-xl border-2 border-transparent focus:border-[#8B7355] focus:ring-0 transition-all"
                        placeholder="JOHN DOE"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#2C2C2C] mb-2">Expiry Date *</label>
                        <input
                          type="text"
                          required
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          className="w-full px-4 py-3 bg-[#FAF8F5] rounded-xl border-2 border-transparent focus:border-[#8B7355] focus:ring-0 transition-all"
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className="block text-[#2C2C2C] mb-2">CVV *</label>
                        <input
                          type="text"
                          required
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          className="w-full px-4 py-3 bg-[#FAF8F5] rounded-xl border-2 border-transparent focus:border-[#8B7355] focus:ring-0 transition-all"
                          placeholder="123"
                          maxLength={3}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Debit Card Form */}
                {paymentMethod === 'debit' && (
                  <motion.div
                    key="debit"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-[#2C2C2C] mb-2">Debit Card Number *</label>
                      <input
                        type="text"
                        required
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                        className="w-full px-4 py-3 bg-[#FAF8F5] rounded-xl border-2 border-transparent focus:border-[#8B7355] focus:ring-0 transition-all"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                    </div>

                    <div>
                      <label className="block text-[#2C2C2C] mb-2">Cardholder Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.cardName}
                        onChange={(e) => handleInputChange('cardName', e.target.value)}
                        className="w-full px-4 py-3 bg-[#FAF8F5] rounded-xl border-2 border-transparent focus:border-[#8B7355] focus:ring-0 transition-all"
                        placeholder="JOHN DOE"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[#2C2C2C] mb-2">Expiry Date *</label>
                        <input
                          type="text"
                          required
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          className="w-full px-4 py-3 bg-[#FAF8F5] rounded-xl border-2 border-transparent focus:border-[#8B7355] focus:ring-0 transition-all"
                          placeholder="MM/YY"
                          maxLength={5}
                        />
                      </div>
                      <div>
                        <label className="block text-[#2C2C2C] mb-2">CVV *</label>
                        <input
                          type="text"
                          required
                          value={formData.cvv}
                          onChange={(e) => handleInputChange('cvv', e.target.value)}
                          className="w-full px-4 py-3 bg-[#FAF8F5] rounded-xl border-2 border-transparent focus:border-[#8B7355] focus:ring-0 transition-all"
                          placeholder="123"
                          maxLength={3}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Net Banking Form */}
                {paymentMethod === 'netbanking' && (
                  <motion.div
                    key="netbanking"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-[#2C2C2C] mb-2">Select Your Bank *</label>
                      <select
                        required
                        value={formData.bankName}
                        onChange={(e) => handleInputChange('bankName', e.target.value)}
                        className="w-full px-4 py-3 bg-[#FAF8F5] rounded-xl border-2 border-transparent focus:border-[#8B7355] focus:ring-0 transition-all"
                      >
                        <option value="">Choose your bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="pnb">Punjab National Bank</option>
                        <option value="bob">Bank of Baroda</option>
                        <option value="kotak">Kotak Mahindra Bank</option>
                        <option value="yes">YES Bank</option>
                        <option value="idbi">IDBI Bank</option>
                        <option value="other">Other Bank</option>
                      </select>
                      <p className="text-gray-500 text-sm mt-2">You will be redirected to your bank's secure payment page</p>
                    </div>
                  </motion.div>
                )}

                {/* UPI Apps Form */}
                {paymentMethod === 'upiapp' && (
                  <motion.div
                    key="upiapp"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-[#2C2C2C] mb-3">Select UPI App *</label>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { id: 'gpay', name: 'Google Pay', color: 'bg-blue-50 border-blue-200 hover:border-blue-400' },
                          { id: 'phonepe', name: 'PhonePe', color: 'bg-purple-50 border-purple-200 hover:border-purple-400' },
                          { id: 'paytm', name: 'Paytm', color: 'bg-blue-50 border-blue-200 hover:border-blue-400' },
                          { id: 'bhim', name: 'BHIM UPI', color: 'bg-orange-50 border-orange-200 hover:border-orange-400' },
                          { id: 'amazonpay', name: 'Amazon Pay', color: 'bg-yellow-50 border-yellow-200 hover:border-yellow-400' },
                          { id: 'whatsapp', name: 'WhatsApp Pay', color: 'bg-green-50 border-green-200 hover:border-green-400' },
                        ].map((app) => (
                          <motion.button
                            key={app.id}
                            type="button"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => handleInputChange('upiApp', app.id)}
                            className={`p-4 rounded-xl border-2 transition-all ${app.color} ${
                              formData.upiApp === app.id ? 'ring-2 ring-[#8B7355] border-[#8B7355]' : ''
                            }`}
                          >
                            <Smartphone className="w-6 h-6 mx-auto mb-2 text-gray-700" />
                            <p className="text-sm font-medium text-gray-900">{app.name}</p>
                          </motion.button>
                        ))}
                      </div>
                      <p className="text-gray-500 text-sm mt-3">Select your preferred UPI app to complete payment</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-6 p-4 bg-blue-50 rounded-xl flex items-start gap-2"
              >
                <Lock className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-blue-900 text-sm">
                  Your payment information is encrypted and secure. We never store your payment details.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="bg-white rounded-2xl p-6 shadow-sm sticky top-24"
            >
              <h2 className="text-gray-900 mb-4">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                <AnimatePresence>
                  {items.map((item, index) => (
                    <motion.div 
                      key={item.id}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex gap-3"
                    >
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-gray-900 text-sm truncate">{item.name}</h3>
                        <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                        <p className="text-gray-900 text-sm">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Pricing */}
              <div className="space-y-3 border-t border-gray-200 pt-4">
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex justify-between text-gray-600"
                >
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </motion.div>
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.85 }}
                  className="flex justify-between text-gray-600"
                >
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : `₹${shipping.toFixed(2)}`}</span>
                </motion.div>
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="flex justify-between text-gray-600"
                >
                  <span>Tax (10%)</span>
                  <span>₹{tax.toFixed(2)}</span>
                </motion.div>
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.95 }}
                  className="border-t border-gray-200 pt-3 flex justify-between"
                >
                  <span>Total</span>
                  <motion.span
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                  >
                    ₹{total.toFixed(2)}
                  </motion.span>
                </motion.div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={showLocationError}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                whileHover={{ scale: showLocationError ? 1 : 1.02 }}
                whileTap={{ scale: showLocationError ? 1 : 0.98 }}
                className={`w-full mt-6 py-4 rounded-xl flex items-center justify-center gap-2 relative overflow-hidden transition-all ${
                  showLocationError
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : formData.state === 'Uttar Pradesh'
                    ? 'bg-[#8B7355] text-white hover:bg-[#6B5A44]'
                    : 'bg-black text-white'
                }`}
              >
                <Lock className="w-5 h-5" />
                <span className="relative z-10">
                  {showLocationError ? 'Delivery Not Available' : `Place Order ₹${total.toFixed(2)}`}
                </span>
                {!showLocationError && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                )}
              </motion.button>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1 }}
                className="text-gray-500 text-sm text-center mt-4"
              >
                By placing this order, you agree to our terms and conditions
              </motion.p>
            </motion.div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}