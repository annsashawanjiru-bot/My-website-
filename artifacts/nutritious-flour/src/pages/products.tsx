import { motion } from "framer-motion";
import { CheckCircle2, Info, Leaf, Wheat } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Products() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const adultUjiIngredients = [
    "Sunflower seeds",
    "Cassava",
    "Green bananas",
    "Avocado seeds",
    "Pumpkin",
    "Sorghum",
    "Moringa seeds"
  ];

  const legumes = [
    "Army beans",
    "Sorghum",
    "Amaranth",
    "Sweet potatoes",
    "Pumpkins",
    "Green banana",
    "Yellow maize"
  ];

  return (
    <div className="flex flex-col w-full bg-background min-h-screen pb-24">
      {/* Header */}
      <section className="w-full bg-secondary text-secondary-foreground py-16 md:py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Wheat className="w-48 h-48" />
        </div>
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
          <Badge className="bg-primary/20 text-primary-foreground hover:bg-primary/30 mb-6 py-1.5 px-4 text-sm border-none">
            Wholesome & Pure
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">Our Products</h1>
          <p className="text-lg md:text-xl text-secondary-foreground/80 leading-relaxed">
            Carefully milled flours and selected legumes crafted to bring maximum nutrition to your family's table.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 mt-16 max-w-5xl">
        <motion.div 
          className="space-y-16 md:space-y-24"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* 1. Baby Uji Section */}
          <motion.section variants={item} id="baby-uji" className="scroll-mt-32">
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2">
                <div className="h-10 w-2 bg-primary rounded-full" />
                <h2 className="text-3xl md:text-4xl font-bold text-secondary">Baby Uji</h2>
              </div>
              <Card className="overflow-hidden border-border/60 shadow-md">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 bg-accent/20 p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-border/60">
                    <div className="w-32 h-32 rounded-full bg-background flex items-center justify-center shadow-inner border border-primary/10">
                      <Wheat className="w-12 h-12 text-primary" />
                    </div>
                  </div>
                  <div className="md:w-2/3 p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Nutritious Baby Uji Flour</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed border-l-4 border-primary pl-4 py-1" data-testid="text-caption-baby-uji">
                      Nutritious baby uji flour made from carefully selected ingredients to support healthy growth and development for your little ones.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.section>

          {/* 2. Adult Uji Section */}
          <motion.section variants={item} id="adult-uji" className="scroll-mt-32">
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2">
                <div className="h-10 w-2 bg-primary rounded-full" />
                <h2 className="text-3xl md:text-4xl font-bold text-secondary">Adult Uji</h2>
              </div>
              
              <Card className="overflow-hidden border-border/60 shadow-md mb-8">
                <div className="flex flex-col md:flex-row-reverse">
                  <div className="md:w-1/3 bg-secondary/5 p-8 flex items-center justify-center border-b md:border-b-0 md:border-l border-border/60">
                    <div className="w-32 h-32 rounded-full bg-background flex items-center justify-center shadow-inner border border-primary/10">
                      <Wheat className="w-12 h-12 text-secondary" />
                    </div>
                  </div>
                  <div className="md:w-2/3 p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-serif font-bold text-foreground mb-4">Fortified Adult Uji Flour</h3>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                      A powerful, energy-boosting traditional porridge blend designed specifically for adult nutritional needs.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Ingredients Caption - MUST be placed right below adult uji, before legumes */}
              <div className="bg-primary/5 rounded-2xl p-6 md:p-8 border border-primary/10 relative overflow-hidden" data-testid="section-adult-uji-ingredients">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Info className="w-24 h-24" />
                </div>
                <h4 className="font-bold text-xl text-primary mb-3" data-testid="heading-adult-uji-ingredients">Ingredients for adults uji</h4>
                <p className="text-foreground/80 mb-6 text-lg" data-testid="body-adult-uji-ingredients">
                  Very Rich in calcium, zinc, magnesium and other minerals required for healthy bones and boosting immunity
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {adultUjiIngredients.map((ingredient, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span className="text-sm font-medium text-secondary">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>

          {/* 3. Legumes Section */}
          <motion.section variants={item} id="legumes" className="scroll-mt-32">
            <div className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-2">
                <div className="h-10 w-2 bg-primary rounded-full" />
                <h2 className="text-3xl md:text-4xl font-bold text-secondary">Legumes & Grains</h2>
              </div>
              
              <div className="bg-accent/20 border border-accent/40 rounded-xl p-4 text-center mb-6">
                <p className="text-secondary font-medium flex items-center justify-center gap-2" data-testid="text-legumes-price-notice">
                  <Info className="w-5 h-5 text-primary" />
                  Prices depend on the market — contact us for price consultation
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {legumes.map((legume, i) => (
                  <Card key={i} className="border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                        <Leaf className="w-6 h-6" />
                      </div>
                      <h3 className="font-bold text-lg text-secondary" data-testid={`text-legume-${legume.toLowerCase().replace(" ", "-")}`}>
                        {legume}
                      </h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}
