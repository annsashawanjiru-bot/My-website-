import { useState } from "react";
import { MapPin, Phone, Clock, ShoppingCart, Truck } from "lucide-react";
import { BABY_UJI, ADULT_UJI, LEGUMES, CEREALS_RICE, OTHER_COMMODITIES, MILLING, PRODUCTS, type Product } from "@/data/products";
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
  { name: "Mary Wanjiku", initials: "MW", location: "Mwea", rating: 5, text: "Nimekuwa nikiamini Unga Sawa Mix kwa miaka miwili sasa. Uji wao ni mzuri sana na watoto wangu wanafurahi kunywa kila asubuhi. Asante sana!" },
  { name: "Peter Kamau", initials: "PK", location: "Kirinyaga", rating: 5, text: "The Pishori rice from here is the best in the area. Fresh, clean, and fairly priced. I always come back whenever I need quality cereals for my family." },
  { name: "Grace Njeri", initials: "GN", location: "Mwea", rating: 5, text: "Nilinunua uji wa mtoto wangu hapa na matokeo yamekuwa mazuri sana. Mtoto wangu wa miezi 8 anakula vizuri ana nguvu. Bidhaa ni safi na ya asili." },
  { name: "James Mwangi", initials: "JM", location: "Kerugoya", rating: 5, text: "Very honest business. Prices are fair and the quality never disappoints. I get my honey and kamande from here every month. Highly recommend to anyone in Mwea." },
  { name: "Esther Auma", initials: "EA", location: "Mwea", rating: 5, text: "Unga Sawa Mix ndio duka bora kwa uji wa kienyeji. Ninashukuru sana kwa huduma nzuri na bei nzuri. Familia yangu yote inapenda sana." },
  { name: "Samuel Otieno", initials: "SO", location: "Mwea Town", rating: 5, text: "Got my njahi and ndengu here last week. Very clean and well sorted. The lady at the shop was also very helpful and explained the nutritional benefits. Will definitely return." },
];

const WHY_US_REASONS = [
  { icon: "🌿", title: "100% Natural Ingredients", desc: "No artificial flavours, no preservatives, no fillers. Every product is made from ingredients you can name and trust." },
  { icon: "👶", title: "Safe for the Whole Family", desc: "From babies as young as 6 months to adults — our products are carefully made to meet every stage of life." },
  { icon: "💰", title: "Prices That Are Fair", desc: "We keep our prices honest and affordable because we believe nutrition should not be a luxury. Quality food for every household." },
  { icon: "📦", title: "Sealed & Spill-Proof Packaging", desc: "Every order is packed tightly and sealed so it arrives fresh and intact — whether you are in Mwea or across Kenya." },
  { icon: "🚚", title: "Nationwide Delivery", desc: "We deliver countrywide. Wherever you are, your order comes to you. Just ask us for a delivery quote." },
  { icon: "🤝", title: "Honest, Friendly Service", desc: "We answer every call and WhatsApp message personally. No bots, no scripts — just real people who care about your order." },
  { icon: "✨", title: "Freshly Milled on Request", desc: "We mill maize and dehusk rice fresh. Bring your grain or order our flour — always freshly processed, never sitting stale." },
  { icon: "🛡️", title: "Trusted by Families in Kirinyaga", desc: "We have been a trusted name in Mwea. Our customers return because the quality never drops and the service never disappoints." },
  { icon: "📞", title: "Always Reachable", desc: "Call or WhatsApp us any time Monday to Saturday and we will respond. Your order matters to us personally." },
];

const FOOTER_LINKS = [
  { name: "Overview", href: "#overview" },
  { name: "Baby Uji", href: "#baby-uji" },
  { name: "Adult Uji", href: "#adult-uji" },
  { name: "Cereals & Legumes", href: "#cereals-legumes" },
  { name: "Other Commodities", href: "#other-commodities" },
  { name: "Milling", href: "#milling" },
  { name: "Delivery", href: "#delivery" },
  { name: "Reviews", href: "#reviews" },
  { name: "Shop", href: "#shop" },
  { name: "Contact", href: "#contact" },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={`text-sm ${i < count ? "text-[#f59e0b]" : "text-gray-200"}`}>★</span>
      ))}
    </div>
  );
}

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0">
      {initials}
    </div>
  );
}

function ProductCard({ product, onAdd }: { product: Product; onAdd: (p: Product) => void }) {
  const isLegume = product.isLegume;
  const isMilling = product.category === "Milling";
  const isOther = product.category === "Other Commodities";
  const showWhatsApp = isLegume || isOther;

  return (
    <div className="bg-card rounded-2xl border border-border/60 overflow-hidden hover:shadow-md transition-shadow flex flex-col" data-testid={`card-product-${product.id}`}>
      <div className="p-5 flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="font-bold text-foreground text-sm leading-tight">{product.name}</h4>
          {product.badge && (
            <span className="shrink-0 text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">{product.badge}</span>
          )}
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed mb-3">{product.description}</p>
        {isLegume ? (
          <div className="text-xs text-muted-foreground bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 italic">
            Prices depend on the market — contact for price consultation
          </div>
        ) : (
          <p className="font-bold text-primary text-sm">
            {product.priceLabel}
            {product.unit && !isMilling && (
              <span className="font-normal text-muted-foreground text-xs"> / {product.unit}</span>
            )}
          </p>
        )}
      </div>
      <div className="px-5 pb-5">
        {showWhatsApp ? (
          <a
            href="https://wa.me/254721339862?text=Hello%20Unga%20Sawa%20Mix!%20I%20would%20like%20to%20ask%20about%20price%20and%20availability."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 w-full py-2 bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 rounded-full text-xs font-semibold hover:bg-[#25D366]/20 transition-colors"
          >
            Ask on WhatsApp
          </a>
        ) : isMilling ? (
          <a
            href="https://wa.me/254721339862?text=Hello%20Unga%20Sawa%20Mix!%20I%20would%20like%20to%20ask%20about%20milling%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 w-full py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-semibold hover:bg-primary/20 transition-colors"
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

function SectionLabel({ text }: { text: string }) {
  return <span className="text-xs font-semibold text-primary uppercase tracking-widest">Category</span>;
}

function smoothScroll(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  e.preventDefault();
  const el = document.querySelector(href);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function Home({ onAddToCart }: HomeProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const shopCategories = ["All", "Baby Uji", "Adult Uji", "Cereals & Legumes", "Other Commodities", "Milling"];
  const shopProducts = activeCategory === "All" ? PRODUCTS : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <main>
      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex flex-col items-start justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImg})` }} />
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/60 to-transparent" />
        <div className="relative container mx-auto px-4 md:px-6 pt-28 pb-20">
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground leading-tight mb-6 tracking-tight">
            Healthy food.<br />
            <span className="text-primary italic">Pure ingredients.</span><br />
            Happy homes.
          </h1>
          <p className="text-xl text-muted-foreground mb-8 font-serif leading-relaxed max-w-xl">
            Healthy Living Starts With What You Eat. Your trusted source for nutritious homemade flour, quality cereals, and reliable milling services.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#baby-uji" onClick={e => smoothScroll(e, "#baby-uji")} className="px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-medium hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
              View Our Products
            </a>
            <a href="tel:+254721339862" className="px-8 py-4 border-2 border-foreground/20 text-foreground rounded-full text-lg font-medium hover:border-foreground/40 hover:bg-muted/30 transition-all">
              Call 0721 339 862
            </a>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section id="overview" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Welcome to Unga Sawa Mix</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From babies as young as 6 months to adults — our products are carefully made to meet every stage of life.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {[
              { label: "Baby Uji", href: "#baby-uji", emoji: "🌱", desc: "Specially crafted for infants from 6 months+. Packed with essential nutrients — no additives." },
              { label: "Adult Uji", href: "#adult-uji", emoji: "🌾", desc: "Wholesome uji flour for the whole family. Freshly milled, nutritious, and affordable." },
              { label: "Cereals & Legumes", href: "#cereals-legumes", emoji: "🫘", desc: "Quality rice and legumes — Pishori, Kwamboka, Kamande, Njahi, Ndengu and more." },
              { label: "Other Commodities", href: "#other-commodities", emoji: "🍯", desc: "Pure natural honey and fresh kienyeji eggs — carefully sourced and always available." },
              { label: "Milling Services", href: "#milling", emoji: "⚙️", desc: "Bring your grain and we will mill it fresh. Fast, clean, and reliable in Mwea." },
            ].map(cat => (
              <a
                key={cat.label}
                href={cat.href}
                onClick={e => smoothScroll(e, cat.href)}
                className="group block bg-card rounded-2xl border border-border/60 p-5 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="text-3xl mb-3">{cat.emoji}</div>
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Category</span>
                <h3 className="font-bold text-foreground mt-1 mb-2 text-sm">{cat.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{cat.desc}</p>
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

      {/* ── WHY US ── */}
      <section id="why-us" className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Why Families Choose Unga Sawa Mix</h2>
            <p className="text-lg text-muted-foreground">In Mwea, word travels fast — and our customers keep coming back. Here is why.</p>
          </div>
          <div className="max-w-3xl mx-auto mb-16 bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-border/50">
            <p className="text-xl font-serif italic text-foreground leading-relaxed mb-6">
              "We started Unga Sawa Mix with one belief: every Kenyan family deserves food that is honest, clean, and truly nourishing — not just filling."
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We have watched too many families buy flour that looks fine on the outside but is mixed with cheap fillers and sold at prices that seem good until you realise what you are really eating. We refused to do that.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Every batch of uji we make is carefully blended from real ingredients — sorghum, moringa, pumpkin seeds, green bananas — things that grow from the earth and go straight into your family's bowl. No shortcuts. No compromise.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              From a mother in Mwea feeding her 6-month-old their first porridge, to a household ordering rice for the week — we treat every customer like a neighbour, because in Kirinyaga, that is what we are.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHY_US_REASONS.map(reason => (
              <div key={reason.title} className="bg-card rounded-2xl border border-border/60 p-6 hover:shadow-sm transition-shadow">
                <div className="text-3xl mb-4">{reason.icon}</div>
                <h3 className="font-bold text-foreground mb-2">{reason.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="#shop" onClick={e => smoothScroll(e, "#shop")} className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-all shadow hover:-translate-y-0.5">
              Order Now
            </a>
          </div>
        </div>
      </section>

      {/* ── BABY UJI ── */}
      <section id="baby-uji" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12">
            <SectionLabel text="Category" />
            <h2 className="text-4xl font-serif font-bold text-foreground mt-1 mb-3">Baby Uji</h2>
            <p className="text-muted-foreground max-w-xl mb-5">
              Specially crafted for infants and toddlers from 6 months and above. Packed with the essential nutrients growing children need — no additives, no shortcuts.
            </p>
            <div className="flex flex-wrap gap-2">
              {["Sorghum", "Amaranth", "Sweet Potatoes", "Pumpkins", "Green Banana", "Yellow Maize"].map(ing => (
                <span key={ing} className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium">{ing}</span>
              ))}
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <img src={lifestyleImg} alt="Baby porridge" className="rounded-3xl w-full h-[360px] object-cover shadow-lg" />
            <div className="space-y-6">
              <div className="bg-primary/5 rounded-2xl p-6 border border-primary/15">
                <h3 className="font-bold text-lg text-foreground mb-2">Natural Ingredients</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Rich in vitamins, minerals, iron, and calcium — supports healthy growth, strong immunity, and good appetite in young children.
                </p>
              </div>
              {BABY_UJI.map(p => (
                <div key={p.id} className="bg-card rounded-2xl border border-border/60 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-foreground">{p.name}</h3>
                    {p.badge && <span className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-full font-medium">{p.badge}</span>}
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

      {/* ── ADULT UJI ── */}
      <section id="adult-uji" className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12">
            <SectionLabel text="Category" />
            <h2 className="text-4xl font-serif font-bold text-foreground mt-1 mb-3">Adult Uji</h2>
            <p className="text-muted-foreground max-w-xl">
              Wholesome uji flour for the whole family. Freshly milled and carefully sourced — nutritious, filling, and affordable.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <img src={stacksImg} alt="Adult uji flour" className="rounded-3xl w-full h-[360px] object-cover shadow-lg" />
            <div className="space-y-6">
              {ADULT_UJI.map(p => (
                <div key={p.id} className="bg-card rounded-2xl border border-border/60 p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-lg text-foreground">{p.name}</h3>
                    {p.badge && <span className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-full font-medium">{p.badge}</span>}
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
                    >
                      <ShoppingCart size={13} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
              {/* Adult Uji Ingredients */}
              <div className="bg-primary/5 rounded-2xl border border-primary/20 p-6">
                <h3 className="font-bold text-foreground text-base mb-2">Ingredients for adult uji</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Very rich in calcium, zinc, magnesium and other minerals required for healthy bones and boosting immunity. Made from sorghum, sunflower seeds, pumpkin, moringa seeds, cassava, green bananas, and other wholesome grains.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Sunflower seeds", "Cassava", "Green bananas", "Avocado seeds", "Pumpkin", "Sorghum", "Moringa seeds"].map(ing => (
                    <span key={ing} className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-full font-medium">{ing}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CEREALS & LEGUMES ── */}
      <section id="cereals-legumes" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12">
            <SectionLabel text="Category" />
            <h2 className="text-4xl font-serif font-bold text-foreground mt-1 mb-3">Cereals & Legumes</h2>
            <p className="text-muted-foreground max-w-xl">
              Quality rice and legumes — sourced carefully and always available at our shop in Mwea.
            </p>
          </div>

          {/* Cereals / Rice */}
          <div className="mb-12">
            <h3 className="font-bold text-xl text-foreground mb-6">Cereals</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {CEREALS_RICE.map(p => (
                <ProductCard key={p.id} product={p} onAdd={onAddToCart} />
              ))}
            </div>
          </div>

          {/* Legumes */}
          <div>
            <h3 className="font-bold text-xl text-foreground mb-3">Legumes</h3>
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

      {/* ── OTHER COMMODITIES ── */}
      <section id="other-commodities" className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12">
            <SectionLabel text="Category" />
            <h2 className="text-4xl font-serif font-bold text-foreground mt-1 mb-3">Other Commodities That We Offer</h2>
            <p className="text-muted-foreground max-w-xl">
              Beyond flour and grains — pure natural honey and fresh kienyeji eggs, always available at our shop.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <img src={galleryStallImg} alt="Our shop" className="rounded-3xl w-full h-[320px] object-cover shadow-lg" />
            <div className="grid sm:grid-cols-2 gap-4">
              {OTHER_COMMODITIES.map(p => (
                <ProductCard key={p.id} product={p} onAdd={onAddToCart} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── MILLING ── */}
      <section id="milling" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12">
            <SectionLabel text="Category" />
            <h2 className="text-4xl font-serif font-bold text-foreground mt-1 mb-3">Milling Services</h2>
            <p className="text-muted-foreground max-w-xl">
              Bring your grain to us and we will mill it fresh for you. Fast, clean, and reliable — right here in Mwea.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <img src={millingImg} alt="Milling process" className="rounded-3xl w-full h-[420px] object-cover shadow-lg" />
            <div className="space-y-5">
              {MILLING.map(s => (
                <div key={s.id} className="bg-card rounded-2xl p-6 border border-border/50 hover:shadow-sm transition-shadow">
                  <p className="font-bold text-foreground mb-1">{s.name}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{s.description}</p>
                </div>
              ))}
              <div className="p-5 bg-primary/5 rounded-2xl border border-primary/20">
                <p className="text-sm text-foreground font-medium mb-3">Contact us to find out pricing and availability for milling services:</p>
                <a
                  href="https://wa.me/254721339862?text=Hello%20Unga%20Sawa%20Mix!%20I%20would%20like%20to%20ask%20about%20your%20milling%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white rounded-full text-sm font-semibold hover:bg-[#1ebe5d] transition-colors"
                >
                  Ask About Milling on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DELIVERY ── */}
      <section id="delivery" className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-6">
              <Truck size={36} />
              <h2 className="text-4xl font-serif font-bold">Nationwide Delivery Available</h2>
            </div>
            <p className="text-xl leading-relaxed opacity-90 mb-10">
              We deliver countrywide — wherever you are in Kenya, we can get your order to you. Delivery fee depends on your location. Our unga and rice are perfectly sealed and packed, so spilling is not a concern. Order with confidence.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 mb-10">
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
            <a
              href="https://wa.me/254721339862?text=Hello!%20I%20would%20like%20to%20ask%20about%20delivery%20to%20my%20location."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary font-semibold rounded-full hover:bg-white/90 transition-all shadow-lg text-sm"
            >
              Ask About Delivery on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-4xl font-serif font-bold text-foreground mb-6">Our Story & Promise</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed">
                <p>We are your trusted home for wholesome unga, grains, and natural food blends — bringing nutrition, tradition, and quality together in every pack.</p>
                <p>From everyday staples to specially crafted blends for families and young children, we are committed to providing food that not only fills your stomach but also nourishes your body.</p>
                <p>We believe healthy food starts with pure ingredients. That's why we focus on freshness, quality, and natural goodness in everything we offer.</p>
                <blockquote className="text-xl font-serif italic text-foreground border-l-4 border-secondary pl-6 py-2">
                  At the heart of our business is one simple mission — to make healthy, affordable, and nourishing food accessible to every household.
                </blockquote>
              </div>
            </div>
            <div className="order-1 md:order-2 relative">
              <div className="absolute inset-4 bg-secondary/10 rounded-full blur-3xl -z-10" />
              <img src={millingImg} alt="Traditional milling process" className="relative rounded-t-full rounded-b-[4rem] shadow-xl w-full h-[500px] object-cover border-8 border-white" />
            </div>
          </div>
        </div>
      </section>

      {/* ── PHOTOS ── */}
      <section id="photos" className="py-24 bg-foreground text-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-4xl font-serif font-bold mb-4 text-white">Market Fresh</h2>
              <p className="text-lg text-white/70 max-w-xl">A glimpse into our sun-drenched stall and the beautiful, natural ingredients we prepare for your family.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <img src={galleryStallImg} alt="Market Stall" className="w-full h-80 object-cover rounded-xl hover:opacity-90 transition-opacity" />
            <img src={stacksImg} alt="Grains and products" className="w-full h-80 object-cover rounded-xl hover:opacity-90 transition-opacity" />
            <img src={galleryFlourImg} alt="Flour" className="w-full h-80 object-cover rounded-xl hover:opacity-90 transition-opacity md:hidden lg:block" />
          </div>
        </div>
      </section>

      {/* ── REVIEWS ── */}
      <section id="reviews" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Serving facilities across mwea and country wide. Here is what they have to say.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <div key={i} className="bg-card rounded-2xl border border-border/60 p-6 hover:shadow-md transition-shadow flex flex-col">
                <Stars count={r.rating} />
                <p className="mt-4 text-sm text-muted-foreground leading-relaxed italic flex-1">"{r.text}"</p>
                <div className="mt-5 pt-4 border-t border-border/40 flex items-center gap-3">
                  <Avatar initials={r.initials} />
                  <div>
                    <p className="font-semibold text-sm text-foreground">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a
              href="https://wa.me/254721339862?text=Hello!%20I%20would%20like%20to%20share%20my%20experience%20with%20Unga%20Sawa%20Mix."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-primary text-primary rounded-full font-semibold hover:bg-primary hover:text-primary-foreground transition-all text-sm"
            >
              Share Your Experience
            </a>
          </div>
        </div>
      </section>

      {/* ── SHOP ── */}
      <section id="shop" className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Shop</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Add items to your cart and send your order directly on WhatsApp.</p>
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

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">Contact & Location</h2>
            <p className="text-lg text-muted-foreground">Come say hello or reach out to place your order.</p>
          </div>
          <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-xl p-8 md:p-12 border border-border/50">
            <div className="rounded-2xl overflow-hidden border border-border/50 shadow-sm mb-8">
              <iframe
                title="Mwea, Kirinyaga location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=37.3468%2C-0.6906%2C37.3668%2C-0.6806&layer=mapnik&marker=-0.6856%2C37.3568"
                width="100%"
                height="320"
                style={{ border: 0, display: "block" }}
                loading="lazy"
              />
            </div>
            <div className="flex justify-center mb-8">
              <a
                href="https://goo.gl/maps/jKAavUpX9NDT8smh6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold shadow hover:bg-primary/90 transition-all hover:-translate-y-0.5"
              >
                <MapPin size={16} />
                Get Directions
              </a>
            </div>
            <div className="grid sm:grid-cols-3 gap-6 mb-10">
              <div className="flex items-start gap-4 p-6 bg-muted/30 rounded-2xl">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0 mt-0.5"><MapPin size={18} /></div>
                <div>
                  <p className="font-bold text-foreground text-sm">Location</p>
                  <p className="text-muted-foreground text-sm mt-0.5">Opposite Mjengo Hardware, Mwea</p>
                  <p className="text-muted-foreground/70 text-xs mt-0.5">Mwea, Kirinyaga, Kenya</p>
                  <a href="https://goo.gl/maps/jKAavUpX9NDT8smh6" target="_blank" rel="noopener noreferrer" className="text-primary text-xs hover:underline mt-1 inline-block underline underline-offset-2">Get Directions</a>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-muted/30 rounded-2xl">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0 mt-0.5"><Phone size={18} /></div>
                <div>
                  <p className="font-bold text-foreground text-sm">Phone & WhatsApp</p>
                  <a href="tel:+254721339862" className="text-primary hover:underline font-semibold text-sm mt-0.5 block">0721 339 862</a>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-muted/30 rounded-2xl">
                <div className="w-10 h-10 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0 mt-0.5"><Clock size={18} /></div>
                <div>
                  <p className="font-bold text-foreground text-sm">Opening Hours</p>
                  <p className="text-muted-foreground text-sm mt-0.5">Monday – Saturday</p>
                  <p className="text-xs text-muted-foreground/60 mt-1 italic">Unless notified otherwise</p>
                </div>
              </div>
            </div>
            <div className="text-center flex flex-wrap gap-3 justify-center">
              <a href="tel:+254721339862" className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-medium hover:bg-primary/90 transition-all shadow-lg hover:-translate-y-0.5">
                <Phone size={20} />
                Call to Order
              </a>
              <a href="https://wa.me/254721339862?text=Hello%20Unga%20Sawa%20Mix!%20I%20would%20like%20to%20place%20an%20order." target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-[#25D366] text-white rounded-full text-lg font-medium hover:bg-[#1ebe5d] transition-all shadow-lg hover:-translate-y-0.5">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-foreground text-background">
        <div className="container mx-auto px-4 md:px-6 py-16">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h2 className="text-2xl font-serif font-bold text-[hsl(46,35%,96%)] mb-3">Unga Sawa Mix</h2>
              <p className="text-[hsl(46,35%,96%)]/70 text-sm leading-relaxed mb-6 font-serif italic">
                Healthy Living Starts With What You Eat. Your trusted source for nutritious flour, cereals, and milling services in Mwea, Kirinyaga.
              </p>
              <a
                href="https://wa.me/254721339862?text=Hello%20Unga%20Sawa%20Mix!%20I%20would%20like%20to%20place%20an%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white rounded-full text-sm font-semibold hover:bg-[#1ebe5d] transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[hsl(46,35%,96%)]/60 mb-5">Quick Links</p>
              <ul className="space-y-3">
                {FOOTER_LINKS.map(link => (
                  <li key={link.name}>
                    <a href={link.href} onClick={e => smoothScroll(e, link.href)} className="text-[hsl(46,35%,96%)]/70 text-sm hover:text-[hsl(46,35%,96%)] transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[hsl(46,35%,96%)]/60 mb-5">Contact & Location</p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-[hsl(46,35%,96%)]/60 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[hsl(46,35%,96%)]/80 text-sm">Opposite Mjengo Hardware, Mwea</p>
                    <p className="text-[hsl(46,35%,96%)]/60 text-sm">Mwea, Kirinyaga, Kenya</p>
                    <a href="https://goo.gl/maps/jKAavUpX9NDT8smh6" target="_blank" rel="noopener noreferrer" className="text-[hsl(46,35%,96%)]/60 text-xs hover:text-[hsl(46,35%,96%)] transition-colors mt-1 inline-block underline underline-offset-2">Get Directions</a>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Phone size={16} className="text-[hsl(46,35%,96%)]/60 shrink-0" />
                  <a href="tel:+254721339862" className="text-[hsl(46,35%,96%)]/80 text-sm hover:text-[hsl(46,35%,96%)] transition-colors">0721 339 862</a>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={16} className="text-[hsl(46,35%,96%)]/60 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[hsl(46,35%,96%)]/80 text-sm">Monday – Saturday</p>
                    <p className="text-[hsl(46,35%,96%)]/50 text-xs italic mt-0.5">Unless notified otherwise</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-[hsl(46,35%,96%)]/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-2xl font-serif font-bold text-[hsl(46,35%,96%)] leading-tight text-center md:text-left">
              Healthy food.<br />
              <span className="text-primary italic">Pure ingredients.</span><br />
              Happy homes.
            </p>
            <p className="text-[hsl(46,35%,96%)]/40 text-sm text-center md:text-right">
              © {new Date().getFullYear()} Unga Sawa Mix. All rights reserved.<br />
              Mwea, Kirinyaga, Kenya
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
