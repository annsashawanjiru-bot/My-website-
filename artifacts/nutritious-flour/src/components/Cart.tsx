import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onInc: (id: string) => void;
  onDec: (id: string) => void;
  onRemove: (id: string) => void;
}

function buildWhatsAppMessage(items: CartItem[]): string {
  const lines = ["Hello Unga Sawa Mix! I would like to place an order.", ""];
  items.forEach(item => {
    const priceStr = item.product.priceNum
      ? `KSh ${(item.product.priceNum * item.quantity).toLocaleString()}`
      : item.product.priceLabel;
    lines.push(`• ${item.product.name} x${item.quantity} (${item.product.unit}) — ${priceStr}`);
  });
  lines.push("");
  lines.push("Please confirm availability, final prices, and delivery cost. Thank you!");
  return encodeURIComponent(lines.join("\n"));
}

export default function Cart({ open, onClose, items, onInc, onDec, onRemove }: CartProps) {
  const fixedTotal = items.reduce((sum, i) => sum + (i.product.priceNum ?? 0) * i.quantity, 0);
  const hasVariablePrice = items.some(i => !i.product.priceNum);

  const waUrl = `https://wa.me/254721339862?text=${buildWhatsAppMessage(items)}`;

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm"
        onClick={onClose}
      />
      <aside className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white z-50 shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-bold text-lg text-foreground">Your Cart</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted/60 transition-colors"
            data-testid="button-cart-close"
          >
            <X size={18} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center p-6">
            <ShoppingBag size={48} className="text-muted-foreground/40" />
            <p className="font-semibold text-foreground">Your cart is empty.</p>
            <p className="text-sm text-muted-foreground">Add products from the shop to get started.</p>
            <button
              onClick={onClose}
              className="mt-2 px-6 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
            >
              View Cart
            </button>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.map(item => (
                <li key={item.product.id} className="flex gap-3" data-testid={`cart-item-${item.product.id}`}>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-foreground truncate" data-testid={`cart-name-${item.product.id}`}>
                      {item.product.name}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5" data-testid={`cart-price-${item.product.id}`}>
                      {item.product.priceNum
                        ? `KSh ${(item.product.priceNum * item.quantity).toLocaleString()}`
                        : item.product.priceLabel}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onDec(item.product.id)}
                      className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted/60 transition-colors"
                      data-testid={`cart-dec-${item.product.id}`}
                    >
                      <Minus size={12} />
                    </button>
                    <span className="text-sm font-medium w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onInc(item.product.id)}
                      className="w-7 h-7 rounded-full border border-border flex items-center justify-center hover:bg-muted/60 transition-colors"
                      data-testid={`cart-inc-${item.product.id}`}
                    >
                      <Plus size={12} />
                    </button>
                    <button
                      onClick={() => onRemove(item.product.id)}
                      className="w-7 h-7 ml-1 rounded-full text-destructive hover:bg-destructive/10 flex items-center justify-center transition-colors"
                      data-testid={`cart-remove-${item.product.id}`}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="px-5 py-4 border-t border-border space-y-3">
              {fixedTotal > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Fixed items subtotal</span>
                  <span className="font-bold text-foreground">KSh {fixedTotal.toLocaleString()}</span>
                </div>
              )}
              {hasVariablePrice && (
                <p className="text-xs text-muted-foreground bg-muted/40 rounded-lg p-2.5">
                  Some prices will be confirmed on WhatsApp.
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                WhatsApp will open with your order pre-filled and ready to send.
              </p>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-[#25D366] text-white rounded-full font-semibold text-sm hover:bg-[#1ebe5d] transition-colors"
                data-testid="button-whatsapp-order"
              >
                Order on WhatsApp
              </a>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
