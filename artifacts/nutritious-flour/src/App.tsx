import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Cart, { type CartItem } from "@/components/Cart";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import Home from "@/pages/Home";
import type { Product } from "@/data/products";

const queryClient = new QueryClient();

function AppContent() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.product.id === product.id);
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const incQty = (id: string) =>
    setCartItems(prev =>
      prev.map(i => (i.product.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );

  const decQty = (id: string) =>
    setCartItems(prev =>
      prev
        .map(i => (i.product.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter(i => i.quantity > 0)
    );

  const removeItem = (id: string) =>
    setCartItems(prev => prev.filter(i => i.product.id !== id));

  const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <>
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <Home onAddToCart={addToCart} cartItems={cartItems} />
      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        onInc={incQty}
        onDec={decQty}
        onRemove={removeItem}
      />
      <WhatsAppFloat />
      <Toaster />
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
    </QueryClientProvider>
  );
}
