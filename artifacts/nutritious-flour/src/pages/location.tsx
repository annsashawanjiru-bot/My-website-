import { motion } from "framer-motion";
import { MapPin, Navigation, Clock, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Location() {
  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      {/* Header */}
      <section className="w-full bg-secondary text-secondary-foreground py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Visit Our Store</h1>
          <p className="text-lg md:text-xl text-secondary-foreground/80 leading-relaxed">
            Find us in the heart of Mwea for all your nutritious food needs.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-16 max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Location Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-secondary mb-6">Our Location</h2>
              
              <Card className="border-primary/20 shadow-md overflow-hidden bg-primary/5">
                <CardContent className="p-8 flex flex-col gap-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/20 p-3 rounded-full mt-1">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-2">Main Store</h3>
                      <p className="text-xl font-serif text-primary font-medium" data-testid="text-business-address">
                        Opposite Mjengo Hardware, Mwea
                      </p>
                      <p className="text-muted-foreground mt-2">
                        Look for our green sign. We are conveniently located for easy access.
                      </p>
                    </div>
                  </div>

                  <div className="h-px w-full bg-border" />

                  <div className="flex items-start gap-4">
                    <div className="bg-secondary/10 p-3 rounded-full mt-1">
                      <Clock className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Operating Hours</h3>
                      <div className="text-muted-foreground space-y-1">
                        <p>Monday - Saturday: 8:00 AM - 6:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>

                  <div className="h-px w-full bg-border" />

                  <div className="flex items-start gap-4">
                    <div className="bg-secondary/10 p-3 rounded-full mt-1">
                      <Phone className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground mb-1">Contact Us</h3>
                      <p className="text-muted-foreground">
                        For price consultation or bulk orders, please reach out to us.
                      </p>
                      <Button asChild className="mt-4 w-full sm:w-auto bg-secondary hover:bg-secondary/90">
                        <a href="/contact">Go to Contact Page</a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Map Illustration Placeholder */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full h-[500px] rounded-3xl overflow-hidden shadow-lg border border-border relative bg-accent/20 flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, hsl(var(--primary)) 1px, transparent 0)", backgroundSize: "32px 32px" }}></div>
            
            <div className="relative z-10 flex flex-col items-center p-8 text-center max-w-sm">
              <div className="w-20 h-20 bg-background rounded-full flex items-center justify-center shadow-xl mb-6 relative">
                <div className="absolute inset-0 border-2 border-primary rounded-full animate-ping opacity-20" />
                <Navigation className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-secondary mb-2">Mwea Town</h3>
              <p className="text-muted-foreground font-medium mb-6">Opposite Mjengo Hardware</p>
              
              <div className="px-6 py-3 bg-background rounded-full shadow-md border border-border text-sm font-medium text-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                Store Location
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
