import { useState } from "react";
import { MapPin, Phone, Clock, Star, ShoppingCart, Check, Truck, Leaf, Wheat, Package } from "lucide-react";
import { BABY_FLOUR, ADULT_UJI_NON_LEGUME, LEGUMES, CEREALS, MILLING, PRODUCTS, type Product } from "@/data/products";
import type { CartItem } from "@/components/Cart";

import heroImg from "@assets/original-site/hero-grains-COVjSbdC.png";
import stacksImg from "@assets/original-site/product-sacks-BdyLH9oQ.png";
import millingImg from "@assets/original-site/process-milling-BTHiOClx.png";
import galleryFlourImg from "@assets/original-site/gallery-flour-U9HZ31IE.png";
import galleryStallImg from "@assets/original-site/gallery-stall-Cl1S-D4R.png";
import lifestyleImg from "@assets/original-site/lifestyle-porridge-hH9eW10a.png";

interface HomeProps {
  onAddToCart: (product: Product) => void;
  cartItems: CartItem[];
}

const REVIEWS = [
  {
    name: "Wanjiku M.",
    rating: 5,
    location: "Mwea",
    review: "Nimekuwa nikiamini Unga Sawa Mix kwa miaka miwili sasa. Uji wao ni mzuri sana na watoto wangu wanafurahi kunywa kila asubuhi. Asante sana!",
  },
  {
    name: "Achieng N.",
    rating: 5,
    location: "Mwea",
    review: "Nilinunua uji wa mtoto wangu hapa na matokeo yamekuwa mazuri sana. Mtoto wangu wa miezi 8 anakula vizuri na ana nguvu. Bidhaa ni safi na ya asili.",
  },
  {
    name: "Kamau J.",
    rating: 5,
    location: "Kirinyaga",
    review: "Unga Sawa Mix ndio duka bora kwa uji wa kienyeji. Ninashukuru sana kwa huduma nzuri na bei nzuri. Familia yangu yote inapenda sana.",
  },
  {
    name: "Grace W.",
    rating: 5,
    location: "Nairobi",
    review: "The Pishori rice from here is the best in the area. Fresh, clean, and fairly priced. I always come back whenever I need quality cereals for my family.",
  },
  {
    name: "Daniel O.",
    rating: 5,
    location: "Mwea",
    review: "Very honest business. Prices are fair and the quality never disappoints. I get my honey and kamande from here every month. Highly recommend to anyone in Mwea.",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < count ? "fill-secondary text-secondary" : "text-muted-foreground/30"}
        />
      ))}
    </div>
  );
}

function ProductCard({ product, onAdd }: { product: Product; onAdd: (p: Product) => void }) {
  const isLegume = product.isLegume;
  return (
    <div
      className="bg-card rounded-2xl border border-border/60 overflow-hidden hover:shadow-md transition-shadow flex flex-col"
      data-testid={`card-product-${product.id}`}
    >
      <div className="p-5 flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="font-bold text-foreground text-sm leading-tight" data-testid={`text-product-name-${product.id}`}>
            {product.name}
          </h4>
          {product.badge && (
            <span className="shrink-0 text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">
              {product.badge}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mb-3">{product.description}</p>
        {isLegume ? (
          <div className="text-xs text-muted-foreground bg-muted/40 rounded-lg px-3 py-2 italic">
            Prices depend on the market — contact for price consultation
          </div>
        ) : (
          <p className="font-bold text-primary text-sm" data-testid={`text-price-${product.id}`}>
            {product.priceLabel}
            {product.unit && product.category !== "Milling" && (
              <span className="font-normal text-muted-foreground text-xs"> / {product.unit}</span>
            )}
          </p>
        )}
      </div>
      <div className="px-5 pb-5">
        {isLegume ? (
          <a
            href="https://wa.me/254721339862?text=Hello%20Unga%20Sawa%20Mix!%20I%20would%20like%20to%20ask%20about%20price%20and%20availability."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 w-full py-2 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 rounded-full text-xs font-semibold hover:bg-[#25D366]/20 transition-colors"
            data-testid={`link-whatsapp-${product.id}`}
          >
            Ask on WhatsApp
          </a>
        ) : product.category === "Milling" ? (
          <a
            href="https://wa.me/254721339862?text=Hello%20Unga%20Sawa%20Mix!%20I%20would%20like%20to%20ask%20about%20milling%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 w-full py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-semibold hover:bg-primary/20 transition-colors"
            data-testid={`link-milling-${product.id}`}
          >
            Enquire on WhatsApp
          </a>
        ) : (
          <button
            onClick={() => onAdd(product)}
            className="flex items-center justify-center gap-1.5 w-full py-2 bg-primary text-primary-foreground rounded-full text-xs font-semibold hover:bg-primary/90 transition-colors"
            data-testid={`button-add-cart-${product.id}`}
          >
            <ShoppingCart size={12} />
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
}

export default function Home({ onAddToCart, cartItems }: HomeProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const shopCategories = ["All", "Baby Flour", "Adult Uji", "Cereals", "Milling"];
  const shopProducts = activeCategory === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <main>
      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-start justify-center pt-16 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        <div className="relative container mx-auto px-4 md:px-6 py-24">
          <span className="inline-block text-xs font-semibold tracking-widest text-primary-foreground/70 uppercase mb-4">
            100% Natural Ingredients
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-2xl mb-6">
            Healthy Living Starts With What You Eat.
          </h1>
          <p className="text-lg text-white/80 max-w-xl mb-10 leading-relaxed">
            Your trusted source for nutritious flour, cereals, and milling services in Mwea, Kirinyaga.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#shop"
              className="px-7 py-3.5 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              data-testid="link-hero-shop"
            >
              View Our Products
            </a>
            <a
              href="tel:+254721339862"
              className="px-7 py-3.5 bg-white/15 text-white border border-white/30 rounded-full font-semibold backdrop-blur-sm hover:bg-white/25 transition-all"
              data-testid="link-hero-call"
            >
              Call 0721 339 862
            </a>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section id="overview" className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Welcome to Unga Sawa Mix</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From babies as young as 6 months to adults — our products are carefully made to meet every stage of life.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Leaf size={22} />,
                label: "Baby Flour",
                href: "#baby-flour",
                desc: "Specially crafted for infants and toddlers from 6 months and above. Packed with the essential nutrients growing children need — no additives, no shortcuts.",
                badge: "Category",
              },
              {
                icon: <Wheat size={22} />,
                label: "Adult Uji & Legumes",
                href: "#adult-uji",
                desc: "Wholesome uji flour and quality legumes for the whole family. Freshly milled and carefully sourced — nutritious, filling, and affordable.",
                badge: "Category",
              },
              {
                icon: <Package size={22} />,
                label: "Cereals & More",
                href: "#cereals",
                desc: "Premium quality rice, natural honey, and fresh kienyeji eggs — sourced carefully and always available at our shop in Mwea.",
                badge: "Category",
              },
              {
                icon: <Truck size={22} />,
                label: "Milling Services",
                href: "#milling",
                desc: "Bring your grain to us and we will mill it fresh for you. Fast, clean, and reliable — right here in Mwea.",
                badge: "Category",
              },
            ].map(cat => (
              <a
                key={cat.label}
                href={cat.href}
                className="group block bg-card rounded-2xl border border-border/60 p-6 hover:shadow-md hover:-translate-y-0.5 transition-all"
                data-testid={`card-category-${cat.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="w-11 h-11 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  {cat.icon}
                </div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{cat.badge}</span>
                <h3 className="font-bold text-foreground mt-1 mb-2">{cat.label}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{cat.desc}</p>
              </a>
            ))}
          </div>
          <div className="mt-8 p-5 bg-primary/5 rounded-2xl border border-primary/20 text-center">
            <p className="text-sm text-foreground">
              We also stock a wide variety of quality cereals, rice, honey, eggs, and legumes — everything your household needs, fresh and at fair prices.
            </p>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="why-us" className="py-20 bg-muted/40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Families Choose Unga Sawa Mix</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              In Mwea, word travels fast — and our customers keep coming back. Here is why.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Natural Ingredients",
                desc: "No artificial flavours, no preservatives, no fillers. Every product is made from ingredients you can name and trust.",
              },
              {
                title: "Prices That Are Fair",
                desc: "We keep our prices honest and affordable because we believe nutrition should not be a luxury. Quality food for every household.",
              },
              {
                title: "Fresh Every Time",
                desc: "We mill maize and dehusk rice fresh. Bring your grain or order our flour — always freshly processed, never sitting stale.",
              },
              {
                title: "Happy homes.",
                desc: "We have been a trusted name in Mwea. Our customers return because the quality never drops and the service never disappoints.",
              },
            ].map(reason => (
              <div
                key={reason.title}
                className="bg-card rounded-2xl border border-border/60 p-6"
                data-testid={`card-reason-${reason.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Check size={16} />
                </div>
                <h3 className="font-bold text-foreground mb-2">{reason.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-center text-muted-foreground max-w-2xl mx-auto text-sm leading-relaxed">
            From a mother in Mwea feeding her 6-month-old their first porridge, to a household ordering rice for the week — we treat every customer like a neighbour, because in Kirinyaga, that is what we are.
          </p>
          <div className="text-center mt-6">
            <a
              href="#shop"
              className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all shadow hover:-translate-y-0.5"
              data-testid="link-why-us-shop"
            >
              Order Now
            </a>
          </div>
        </div>
      </section>

      {/* BABY FLOUR */}
      <section id="baby-flour" className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">Category</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-1 mb-3">Baby Flour</h2>
            <p className="text-muted-foreground max-w-xl">
              Specially crafted for infants and toddlers from 6 months and above. Packed with the essential nutrients growing children need — no additives, no shortcuts.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <img
              src={lifestyleImg}
              alt="Baby porridge"
              className="rounded-3xl w-full h-[360px] object-cover shadow-lg"
            />
            <div className="space-y-6">
              <div className="bg-primary/5 rounded-2xl p-6 border border-primary/15">
                <h3 className="font-bold text-lg text-foreground mb-2">Natural Ingredients</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Rich in vitamins, minerals, iron, and calcium — supports healthy growth, strong immunity, and good appetite in young children.
                </p>
              </div>
              {BABY_FLOUR.map(p => (
                <div key={p.id} className="bg-card rounded-2xl border border-border/60 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-foreground">{p.name}</h3>
                    {p.badge && (
                      <span className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-full font-medium">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-primary">
                      {p.priceLabel}
                      <span className="font-normal text-muted-foreground text-sm"> / {p.unit}</span>
                    </p>
                    <button
                      onClick={() => onAddToCart(p)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
                      data-testid={`button-add-baby-${p.id}`}
                    >
                      <ShoppingCart size={13} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ADULT UJI */}
      <section id="adult-uji" className="py-20 bg-muted/40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">Category</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-1 mb-3">Adult Uji & Legumes</h2>
            <p className="text-muted-foreground max-w-xl">
              Wholesome uji flour and quality legumes for the whole family. Freshly milled and carefully sourced — nutritious, filling, and affordable.
            </p>
          </div>

          {/* Adult Uji Product */}
          {ADULT_UJI_NON_LEGUME.map(p => (
            <div key={p.id} className="bg-card rounded-2xl border border-border/60 p-6 mb-6 max-w-2xl">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg text-foreground">{p.name}</h3>
                {p.badge && (
                  <span className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-full font-medium">
                    {p.badge}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.description}</p>
              <div className="flex items-center justify-between">
                <p className="font-bold text-primary">
                  {p.priceLabel}
                  <span className="font-normal text-muted-foreground text-sm"> / {p.unit}</span>
                </p>
                <button
                  onClick={() => onAddToCart(p)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
                  data-testid={`button-add-adult-${p.id}`}
                >
                  <ShoppingCart size={13} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}

          {/* Adult Uji Ingredients — immediately after Adult Uji product */}
          <div className="bg-primary/8 rounded-2xl border border-primary/20 p-6 mb-10 max-w-2xl">
            <h3 className="font-bold text-foreground text-lg mb-2">Ingredients for adults uji</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Very Rich in calcium, zinc, magnesium and other minerals required for healthy bones and boosting immunity
            </p>
            <ul className="flex flex-wrap gap-2">
              {["Sunflower seeds", "Cassava", "Green bananas", "Avocado seeds", "Pumpkin", "Sorghum", "Moringa seeds"].map(ing => (
                <li
                  key={ing}
                  className="flex items-center gap-1.5 text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium"
                >
                  <Check size={11} />
                  {ing}
                </li>
              ))}
            </ul>
          </div>

          {/* Legumes — after adult uji and ingredients */}
          <div>
            <h3 className="font-bold text-xl text-foreground mb-2">Legumes & More</h3>
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-6 max-w-xl">
              <p className="text-sm text-amber-800 font-medium">
                Prices depend on the market — contact for price consultation
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {LEGUMES.map(p => (
                <ProductCard key={p.id} product={p} onAdd={onAddToCart} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CEREALS */}
      <section id="cereals" className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">Category</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-1 mb-3">Cereals & More</h2>
            <p className="text-muted-foreground max-w-xl">
              Premium quality rice, natural honey, and fresh kienyeji eggs — sourced carefully and always available at our shop in Mwea.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <img
              src={stacksImg}
              alt="Cereals and grains"
              className="rounded-3xl w-full h-[360px] object-cover shadow-lg"
            />
            <div className="grid sm:grid-cols-2 gap-4">
              {CEREALS.map(p => (
                <ProductCard key={p.id} product={p} onAdd={onAddToCart} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MILLING */}
      <section id="milling" className="py-20 bg-muted/40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-10">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest">Category</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-1 mb-3">Milling Services</h2>
            <p className="text-muted-foreground max-w-xl">
              Bring your grain to us and we will mill it fresh for you. Fast, clean, and reliable — right here in Mwea.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <img
              src={millingImg}
              alt="Milling process"
              className="rounded-3xl w-full h-[420px] object-cover shadow-lg"
            />
            <div className="space-y-5">
              {[
                { title: "Maize Milling", desc: "Bring your maize and we will mill it into fresh, fine unga. Clean equipment, quality output." },
                { title: "Rice Dehusking", desc: "We dehusk rice cleanly and efficiently, preserving the grain quality throughout the process." },
                { title: "Custom Uji Blending", desc: "We can blend uji flour to your specification — combining sorghum, millet, moringa, and other healthy grains." },
              ].map(s => (
                <div key={s.title} className="bg-muted/30 rounded-2xl p-6 border border-border/50 hover:shadow-sm transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                      <Wheat size={16} />
                    </div>
                    <div>
                      <p className="font-bold text-foreground mb-1">{s.title}</p>
                      <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="p-5 bg-primary/5 rounded-2xl border border-primary/20 mt-2">
                <p className="text-sm text-foreground font-medium mb-3">
                  Contact us to find out pricing and availability for milling services:
                </p>
                <a
                  href="https://wa.me/254721339862?text=Hello%20Unga%20Sawa%20Mix!%20I%20would%20like%20to%20ask%20about%20your%20milling%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="link-milling-whatsapp"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white rounded-full text-sm font-semibold hover:bg-[#1ebe5d] transition-colors"
                >
                  Ask About Milling on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Truck size={32} />
              <h2 className="text-3xl font-bold">Nationwide Delivery Available</h2>
            </div>
            <p className="text-lg leading-relaxed opacity-90 mb-8">
              We deliver countrywide — wherever you are in Kenya, we can get your order to you. Delivery fee depends on your location. Our unga and rice are perfectly sealed and packed, so spilling is not a concern. Order with confidence.
            </p>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { title: "Countrywide Delivery", desc: "We ship to any location in Kenya." },
                { title: "Sealed & Packed", desc: "All products are tightly sealed. No spilling, guaranteed." },
                { title: "Flexible Fee", desc: "Delivery fee depends on your location. Ask us for a quote." },
              ].map(item => (
                <div key={item.title} className="bg-white/10 rounded-2xl p-6 border border-white/20">
                  <p className="font-bold text-lg mb-1">{item.title}</p>
                  <p className="text-sm opacity-80">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <a
                href="https://wa.me/254721339862?text=Hello!%20I%20would%20like%20to%20ask%20about%20delivery%20to%20my%20location."
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-delivery-whatsapp"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-primary font-semibold rounded-full hover:bg-white/90 transition-all shadow-lg text-sm"
              >
                Ask About Delivery on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-4xl font-bold text-foreground mb-6">Our Story & Promise</h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>We are your trusted home for wholesome unga, grains, and natural food blends — bringing nutrition, tradition, and quality together in every pack.</p>
                <p>From everyday staples to specially crafted blends for families and young children, we are committed to providing food that not only fills your stomach but also nourishes your body.</p>
                <p>We believe healthy food starts with pure ingredients. That's why we focus on freshness, quality, and natural goodness in everything we offer.</p>
                <p className="text-xl font-serif italic text-foreground border-l-4 border-secondary pl-6 py-2">
                  At the heart of our business is one simple mission — to make healthy, affordable, and nourishing food accessible to every household.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="absolute inset-4 bg-secondary/10 rounded-full blur-3xl -z-10" />
              <img
                src={millingImg}
                alt="Traditional milling process"
                className="relative rounded-t-full rounded-b-[4rem] shadow-xl w-full h-[500px] object-cover border-8 border-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PHOTOS */}
      <section id="photos" className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-bold mb-4 text-white">Market Fresh</h2>
              <p className="text-lg text-white/70 max-w-xl">
                A glimpse into our sun-drenched stall and the beautiful, natural ingredients we prepare for your family.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <img src={galleryStallImg} alt="Market Stall" className="w-full h-80 object-cover rounded-xl hover:opacity-90 transition-opacity" />
            <img src={stacksImg} alt="Grains" className="w-full h-80 object-cover rounded-xl hover:opacity-90 transition-opacity" />
            <img src={galleryFlourImg} alt="Flour" className="w-full h-80 object-cover rounded-xl hover:opacity-90 transition-opacity md:hidden lg:block" />
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Serving facilities across mwea and country wide. Here is what they have to say.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div
                key={i}
                className="bg-card rounded-2xl border border-border/60 p-6 hover:shadow-md transition-shadow"
                data-testid={`card-review-${i}`}
              >
                <Stars count={r.rating} />
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed italic">"{r.review}"</p>
                <div className="mt-4 pt-4 border-t border-border/40 flex items-center justify-between">
                  <p className="font-semibold text-sm text-foreground">{r.name}</p>
                  <p className="text-xs text-muted-foreground">{r.location}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="https://wa.me/254721339862?text=Hello!%20I%20would%20like%20to%20share%20my%20experience%20with%20Unga%20Sawa%20Mix."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition-all text-sm"
              data-testid="link-share-experience"
            >
              Share Your Experience
            </a>
          </div>
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="py-20 bg-muted/40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Shop</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Add items to your cart and send your order directly on WhatsApp.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {shopCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
                data-testid={`button-filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {shopProducts.map(p => (
              <ProductCard key={p.id} product={p} onAdd={onAddToCart} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2" />
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-xl p-8 md:p-16 border border-border/50 relative">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-foreground mb-4">Visit Us</h2>
              <p className="text-lg text-muted-foreground">Come say hello or reach out to place your order.</p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-border/50 shadow-sm mb-10">
              <iframe
                title="Mwea, Kirinyaga location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=37.3468%2C-0.6906%2C37.3668%2C-0.6806&layer=mapnik&marker=-0.6856%2C37.3568"
                width="100%"
                height="320"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                data-testid="map-location"
              />
            </div>

            <div className="mb-8 flex justify-center">
              <a
                href="https://goo.gl/maps/jKAavUpX9NDT8smh6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold shadow hover:bg-primary/90 transition-all hover:-translate-y-0.5"
                data-testid="link-get-directions"
              >
                <MapPin size={18} />
                Get Directions
              </a>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              <div className="flex items-center gap-4 p-6 bg-muted/30 rounded-2xl">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                  <MapPin size={22} />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm">Location</p>
                  <p className="text-muted-foreground text-sm mt-0.5">Opposite Mjengo Hardware, Mwea</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-muted/30 rounded-2xl">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                  <Phone size={22} />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm">Phone & WhatsApp</p>
                  <a href="tel:+254721339862" className="text-primary hover:underline font-semibold text-sm mt-0.5 block">
                    0721 339 862
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-4 p-6 bg-muted/30 rounded-2xl">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                  <Clock size={22} />
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm">Opening Hours</p>
                  <p className="text-muted-foreground text-sm mt-0.5">Mon – Sat</p>
                  <p className="text-xs text-muted-foreground/60 mt-1 italic">Unless notified otherwise</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <a
                href="tel:+254721339862"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                data-testid="link-call-now"
              >
                <Phone size={20} />
                Call Now to Order
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-foreground text-background py-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
                U
              </div>
              <span className="font-bold text-lg text-white">Unga Sawa Mix</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-white/60">
              <span>Opposite Mjengo Hardware, Mwea</span>
              <span className="hidden sm:block">·</span>
              <a href="tel:+254721339862" className="text-white/80 hover:text-white transition-colors">
                0721 339 862
              </a>
            </div>
            <div className="text-center">
              <p className="text-xl font-serif italic text-primary">Healthy food.</p>
              <p className="text-xs text-white/40 mt-1">
                © {new Date().getFullYear()} Unga Sawa Mix. All rights reserved. · Mwea, Kirinyaga, Kenya
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
