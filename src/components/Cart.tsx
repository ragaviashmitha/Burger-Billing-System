import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus, Minus, CreditCard } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  discount?: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: (deliveryOption: string) => void;
}

const Cart = ({ items, onUpdateQuantity, onRemoveItem, onCheckout }: CartProps) => {
  const [deliveryOption, setDeliveryOption] = useState<string>('pickup');

  const subtotal = items.reduce((sum, item) => {
    const finalPrice = item.discount 
      ? item.price - (item.price * item.discount / 100)
      : item.price;
    return sum + (finalPrice * item.quantity);
  }, 0);

  const deliveryFee = deliveryOption === 'delivery' ? 5.99 : 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryFee + tax;

  const handleCheckout = () => {
    onCheckout(deliveryOption);
  };

  if (items.length === 0) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Your cart is empty</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Your Order
          <Badge variant="secondary">{items.length} items</Badge>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {items.map((item) => {
          const finalPrice = item.discount 
            ? item.price - (item.price * item.discount / 100)
            : item.price;
            
          return (
            <div key={item.id} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-medium text-sm">{item.name}</h4>
                <p className="text-sm text-muted-foreground">
                  ${finalPrice.toFixed(2)} each
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveItem(item.id)}
                className="text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          );
        })}

        <div className="space-y-3 pt-4 border-t">
          <div className="space-y-2">
            <label className="text-sm font-medium">Delivery Option</label>
            <Select value={deliveryOption} onValueChange={setDeliveryOption}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pickup">Pickup - Free</SelectItem>
                <SelectItem value="delivery">Delivery - $5.99</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {deliveryFee > 0 && (
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg border-t pt-1">
              <span>Total:</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className="w-full" 
          onClick={handleCheckout}
          variant="burger"
          size="lg"
        >
          <CreditCard className="h-4 w-4 mr-2" />
          Proceed to Payment
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Cart;