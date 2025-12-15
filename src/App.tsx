import { useState } from 'react';
import { Home } from './components/Home';
import { ProductDetail } from './components/ProductDetail';
import { Cart } from './components/Cart';
import { Category } from './components/Category';
import { About } from './components/About';
import { Products } from './components/Products';
import { Contact } from './components/Contact';
import { Navbar } from './components/Navbar';
import { Payment } from './components/Payment';
import { Footer } from './components/Footer';

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  subcategory?: string;
  itemType?: string;
  description: string;
  rating: number;
  reviews: number;
};

export type CartItem = Product & { quantity: number };

export type View = 'home' | 'about' | 'products' | 'contact' | 'product' | 'cart' | 'category' | 'payment';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev =>
        prev.map(item => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const viewProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('product');
  };

  const viewCategory = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setCurrentView('products');
    } else {
      setCurrentView('products'); // Changed from 'category' to 'products' for unified experience
    }
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const showNavbar = !['product', 'cart', 'category', 'payment'].includes(currentView);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {showNavbar && <Navbar currentView={currentView} onNavigate={setCurrentView} cartCount={cartCount} onViewCart={() => setCurrentView('cart')} />}
      
      <div className="flex-1">
        {currentView === 'home' && (
          <Home
            onViewProduct={viewProduct}
            onViewCategory={viewCategory}
            onViewCart={() => setCurrentView('cart')}
            cartCount={cartCount}
          />
        )}
        {currentView === 'about' && <About onBack={() => setCurrentView('home')} />}
        {currentView === 'products' && (
          <Products
            onViewProduct={viewProduct}
            onViewCart={() => setCurrentView('cart')}
            cartCount={cartCount}
            initialCategory={selectedCategory}
            onBack={() => setCurrentView('home')}
          />
        )}
        {currentView === 'contact' && <Contact onBack={() => setCurrentView('home')} />}
        {currentView === 'product' && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onBack={() => setCurrentView('products')}
            onAddToCart={addToCart}
            onViewCart={() => setCurrentView('cart')}
            onCheckout={() => setCurrentView('payment')}
            cartCount={cartCount}
          />
        )}
        {currentView === 'cart' && (
          <Cart
            items={cartItems}
            onBack={() => setCurrentView('products')}
            onUpdateQuantity={updateQuantity}
            onCheckout={() => setCurrentView('payment')}
          />
        )}
        {currentView === 'payment' && (
          <Payment
            items={cartItems}
            onBack={() => setCurrentView('cart')}
            onSuccess={() => {
              clearCart();
              setCurrentView('home');
            }}
          />
        )}
        {currentView === 'category' && (
          <Category
            category={selectedCategory}
            onBack={() => setCurrentView('products')}
            onViewProduct={viewProduct}
            onViewCart={() => setCurrentView('cart')}
            cartCount={cartCount}
          />
        )}
      </div>

      {showNavbar && <Footer />}
    </div>
  );
}