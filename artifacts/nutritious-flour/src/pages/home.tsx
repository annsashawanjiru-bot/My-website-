import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Leaf, ArrowRight, HeartPulse, ShieldCheck, Sun } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 lg:py-40 bg-accent/30 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl space-y-6 md:space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
            >
              <Leaf className="w-4 h-4" />
              <span>Nourishing the nation</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.1]"
              data-testid="text-hero-heading"
            >
              Your trusted source for <span className="text-primary relative inline-block">healthy food<div className="absolute -bottom-2 left-0 w-full h-3 bg-primary/20 -z-10 rounded-full" /></span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
            >
              Wholesome, traditional, and nutrient-rich flours and legumes carefully sourced and prepared to support your family's health and vitality.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Button asChild size="lg" className="rounded-full text-base h-14 px-8 bg-secondary hover:bg-secondary/90 shadow-xl shadow-secondary/20" data-testid="button-explore-products">
                <Link href="/products" className="flex items-center gap-2">
                  Explore Products
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full text-base h-14 px-8 border-primary/20 hover:bg-primary/5 text-primary" data-testid="button-find-us">
                <Link href="/location">Find Us in Mwea</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Offerings Section */}
      <section className="w-full py-20 md:py-32 bg-background relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-secondary">Healthy, Nutritious Products</h2>
            <p className="text-muted-foreground text-lg">
              We carefully process and select the finest ingredients to bring you wholesome food that honors tradition and prioritizes your health.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Sun className="w-8 h-8 text-primary" />,
                title: "Traditional Uji",
                description: "Rich, deeply nourishing porridge blends formulated specifically for adults and infants to boost immunity and energy."
              },
              {
                icon: <HeartPulse className="w-8 h-8 text-primary" />,
                title: "Healthy Flours",
                description: "Milled from premium grains with maximum nutrient retention for your daily baking and cooking needs."
              },
              {
                icon: <ShieldCheck className="w-8 h-8 text-primary" />,
                title: "Quality Legumes",
                description: "A wide variety of protein-rich beans, seeds, and grains sourced for purity and nutritional value."
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="h-full border-border/50 bg-card/50 hover:bg-card hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md group">
                  <CardContent className="p-8 flex flex-col items-center text-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-secondary mt-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-20 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSI+PC9yZWN0Pgo8cGF0aCBkPSJNMCAwTDggOFpNOCAwTDAgOFoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMSI+PC9wYXRoPgo8L3N2Zz4=')] mix-blend-overlay" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-cream">What Our Customers Say</h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                text: "The adult uji blend has completely transformed my mornings. I feel more energetic throughout the day.",
                name: "Grace K."
              },
              {
                text: "We supply our school with their nutritious flours. Serving facilities across mwea and country wide, they never disappoint on quality.",
                name: "John M."
              },
              {
                text: "The baby uji has been perfect for my little one. Easy to digest and clearly packed with good nutrients.",
                name: "Sarah W."
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-primary-foreground/10 backdrop-blur-sm p-8 rounded-3xl border border-primary-foreground/20"
              >
                <div className="flex gap-1 text-accent mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-primary-foreground text-lg leading-relaxed mb-6 font-medium" data-testid={`text-testimonial-${idx}`}>
                  "{testimonial.text}"
                </p>
                <p className="font-serif font-bold text-accent">{testimonial.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
