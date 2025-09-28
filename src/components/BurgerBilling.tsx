import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import MenuCard from './MenuCard';
import Cart from './Cart';
import { Search, MapPin, Clock, Star } from 'lucide-react';

import classicBurger from '@/assets/classic-burger.jpg';
import deluxeBurger from '@/assets/deluxe-burger.jpg';
import chickenBurger from '@/assets/chicken-burger.jpg';
import restaurantHero from '@/assets/restaurant-hero.jpg';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  discount?: number;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const BurgerBilling = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const menuItems: MenuItem[] = [
    {
      id: '1',
      name: 'Classic Beef Burger',
      description: 'Juicy beef patty with lettuce, tomato, onion, and our special sauce',
      price: 12.99,
      image: classicBurger,
      category: 'beef',
    },
    {
      id: '2',
      name: 'Deluxe Double Burger',
      description: 'Double beef patty with cheese, bacon, lettuce, and premium toppings',
      price: 18.99,
      image: deluxeBurger,
      category: 'beef',
      discount: 15,
    },
    {
      id: '3',
      name: 'Grilled Chicken Burger',
      description: 'Tender grilled chicken breast with avocado, lettuce, and herb mayo',
      price: 14.99,
      image: chickenBurger,
      category: 'chicken',
    },
    {
      id: '4',
      name: 'BBQ Bacon Burger',
      description: 'Smoky BBQ sauce, crispy bacon, onion rings, and melted cheese',
      price: 16.99,
      image: classicBurger,
      category: 'beef',
      discount: 10,
    },
    {
      id: '5',
      name: 'Spicy Chicken Deluxe',
      description: 'Crispy fried chicken with spicy mayo, jalapenos, and pepper jack cheese',
      price: 15.99,
      image: chickenBurger,
      category: 'chicken',
    },
    {
      id: '6',
      name: 'Mushroom Swiss Burger',
      description: 'Beef patty with sautéed mushrooms, Swiss cheese, and garlic aioli',
      price: 15.49,
      image: deluxeBurger,
      category: 'beef',
    },
  ];

  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'beef', name: 'Beef Burgers' },
    { id: 'chicken', name: 'Chicken Burgers' },
  ];

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (item: MenuItem, quantity: number) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [...prev, { ...item, quantity }];
      }
    });

    toast({
      title: "Added to cart",
      description: `${quantity}x ${item.name} added to your order`,
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart",
    });
  };

  const handleCheckout = (deliveryOption: string) => {
    // Since this involves payment processing, we'd need Supabase for backend
    toast({
      title: "Order Processing",
      description: `Processing your ${deliveryOption} order. Payment integration requires backend setup.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-64 bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${restaurantHero})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative text-center text-white z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Hey Burger</h1>
          <p className="text-lg md:text-xl mb-6">Crafted with love, served with passion</p>
          <div className="flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>Burger Street</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>Open 9:00 AM - 10:00 PM</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span>4.5⭐⭐⭐⭐</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="mb-6">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search burgers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex gap-2 flex-wrap">
                {categories.map(category => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "burger" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
            </div>

            {/* Menu Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <MenuCard
                  key={item.id}
                  item={item}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No items found matching your search.</p>
              </div>
            )}
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Cart
                items={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerBilling;