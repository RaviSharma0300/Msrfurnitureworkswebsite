import { motion } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { Bed, Utensils, Laptop, TreePine, Sofa, Archive, ChevronLeft, ChevronRight } from 'lucide-react';

type CategoryNavBarProps = {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

const categories = [
  { name: 'Living Room', icon: Sofa },
  { name: 'Bedroom', icon: Bed },
  { name: 'Dining', icon: Utensils },
  { name: 'Office', icon: Laptop },
  { name: 'Outdoor', icon: TreePine },
  { name: 'Storage', icon: Archive },
];

export function CategoryNavBar({ activeCategory, onCategoryChange }: CategoryNavBarProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeftArrow(scrollLeft > 10);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener('resize', checkScrollButtons);
    return () => window.removeEventListener('resize', checkScrollButtons);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 300;
    const targetScroll = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });

    setTimeout(checkScrollButtons, 300);
  };

  return (
    <div className="relative bg-white border-b border-[#001F3F]/10">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="relative">
          {/* Left Arrow Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: showLeftArrow ? 1 : 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-[#001F3F] hover:bg-[#F5F5F5] transition-all"
            style={{ pointerEvents: showLeftArrow ? 'auto' : 'none' }}
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScrollButtons}
            className="flex gap-8 overflow-x-auto py-4 scrollbar-hide scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = activeCategory === category.name;

              return (
                <motion.button
                  key={category.name}
                  onClick={() => onCategoryChange(category.name)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-full transition-all whitespace-nowrap shrink-0
                    ${isActive 
                      ? 'bg-[#FFF8F0] text-[#964B00] font-bold' 
                      : 'text-[#4A4A4A] font-medium hover:bg-[#F5F5F5]'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.5]'}`} />
                  <span className="text-sm md:text-base">{category.name}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <motion.button
            initial={{ opacity: 1 }}
            animate={{ opacity: showRightArrow ? 1 : 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg rounded-full flex items-center justify-center text-[#001F3F] hover:bg-[#F5F5F5] transition-all"
            style={{ pointerEvents: showRightArrow ? 'auto' : 'none' }}
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Hide scrollbar for webkit browsers */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}