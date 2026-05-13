import { ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Sprout, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { motion } from "framer-motion";

export function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Our Products" },
    { href: "/location", label: "Location" },
    { href: "/contact", label: "Contact Us" },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col w-full bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between mx-auto px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2 group" data-testid="link-logo">
            <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors">
              <Sprout className="h-6 w-6 text-primary" />
            </div>
            <span className="font-serif font-bold text-xl md:text-2xl text-secondary">
              Mwea Nutritious Foods
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  location === link.href ? "text-primary" : "text-muted-foreground"
                }`}
                data-testid={`link-desktop-${link.label.toLowerCase().replace(" ", "-")}`}
              >
                {link.label}
              </Link>
            ))}
            <Button asChild className="rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/90" data-testid="button-nav-contact">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </nav>

          {/* Mobile Nav */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col border-border bg-background sm:max-w-sm">
              <div className="flex items-center gap-2 mb-8">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Sprout className="h-5 w-5 text-primary" />
                </div>
                <span className="font-serif font-bold text-lg text-secondary">Mwea Foods</span>
              </div>
              <nav className="flex flex-col gap-6 flex-1">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-lg font-medium transition-colors hover:text-primary ${
                      location === link.href ? "text-primary" : "text-muted-foreground"
                    }`}
                    data-testid={`link-mobile-${link.label.toLowerCase().replace(" ", "-")}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1 w-full">
        {children}
      </main>

      <footer className="w-full bg-secondary text-secondary-foreground py-12 md:py-16 mt-auto">
        <div className="container mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Sprout className="h-6 w-6 text-primary" />
              <span className="font-serif font-bold text-xl text-primary-foreground">Mwea Nutritious Foods</span>
            </div>
            <p className="text-secondary-foreground/80 text-sm max-w-sm">
              Providing wholesome, healthy flours, traditional uji, and legumes to our community and beyond.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <h3 className="font-serif font-semibold text-lg text-primary-foreground">Quick Links</h3>
            <nav className="flex flex-col gap-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-secondary-foreground/80 hover:text-primary transition-colors w-fit"
                  data-testid={`link-footer-${link.label.toLowerCase().replace(" ", "-")}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex flex-col gap-4">
            <h3 className="font-serif font-semibold text-lg text-primary-foreground">Contact Us</h3>
            <div className="flex flex-col gap-3 text-sm text-secondary-foreground/80">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary shrink-0" />
                <span data-testid="text-footer-location">Opposite Mjengo Hardware, Mwea</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary shrink-0" />
                <span>Contact us for orders</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 mt-12 pt-6 border-t border-secondary-foreground/10 text-center text-sm text-secondary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Mwea Nutritious Foods. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
