import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Phone } from "lucide-react";

const NAV_LINKS = [
  { label: "Overview", href: "#overview" },
  { label: "Why Us", href: "#why-us" },
  { label: "Baby Flour", href: "#baby-flour" },
  { label: "Adult Uji", href: "#adult-uji" },
  { label: "Cereals", href: "#cereals" },
  { label: "Milling", href: "#milling" },
  { label: "Delivery", href: "#delivery" },
  { label: "Reviews", href: "#reviews" },
  { label: "Shop", href: "#shop" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  cartCount: number;
  onCartOpen: () => void;
}

export default function Navbar({ cartCount, onCartOpen }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border/60" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
              U
            </div>
            <span className="font-bold text-lg text-foreground">Unga Sawa Mix</span>
          </a>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="tel:+254721339862"
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              data-testid="link-call-nav"
            >
              <Phone size={15} />
              0721 339 862
            </a>

            <button
              onClick={onCartOpen}
              className="relative flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
              data-testid="button-cart-open"
            >
              <ShoppingCart size={15} />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-secondary text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className="lg:hidden p-2 rounded-md text-foreground hover:bg-muted/50 transition-colors"
              onClick={() => setMobileOpen(v => !v)}
              data-testid="button-mobile-menu"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-white/98 backdrop-blur-md border-t border-border/60 shadow-lg">
          <nav className="container mx-auto px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-2.5 text-sm font-medium text-foreground hover:bg-muted/60 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:+254721339862"
              className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-primary mt-1 border-t border-border/40 pt-3"
            >
              <Phone size={15} />
              Call Us: 0721 339 862
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
