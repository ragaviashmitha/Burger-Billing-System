import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Minus, ShoppingCart } from 'lucide-react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  discount?: number;
}

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, quantity: number) => void;
}

const MenuCard = ({ item, onAddToCart }: MenuCardProps) => {
  const [quantity, setQuantity] = useState(1);
  
  const finalPrice = item.discount 
    ? item.price - (item.price * item.discount / 100)
    : item.price;

  const handleAddToCart = () => {
    onAddToCart(item, quantity);
    setQuantity(1);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg-custom transition-all duration-300 hover:scale-105 bg-card">
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        {item.discount && (
          <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
            {item.discount}% OFF
          </Badge>
        )}
      </div>
      
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg text-foreground">{item.name}</h3>
          <div className="text-right">
            {item.discount && (
              <span className="text-sm text-muted-foreground line-through">
                ${item.price.toFixed(2)}
              </span>
            )}
            <p className="text-lg font-bold text-primary">
              ${finalPrice.toFixed(2)}
            </p>
          </div>
        </div>
        <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          onClick={handleAddToCart}
          variant="burger"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenuCard;