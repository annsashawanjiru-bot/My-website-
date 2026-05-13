import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { FormEvent } from "react";

export default function Contact() {
  const { toast } = useToast();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out. We will get back to you shortly.",
    });
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  return (
    <div className="flex flex-col w-full bg-background min-h-screen">
      {/* Header */}
      <section className="w-full bg-primary/10 py-16 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 text-secondary">Contact Us</h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Have questions about our products, need a price consultation, or want to place a bulk order? We are here to help.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6 py-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-8"
          >
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-8">Get in Touch</h2>
              
              <div className="space-y-6">
                <Card className="border-none shadow-none bg-accent/20">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="bg-background p-3 rounded-full shadow-sm border border-border">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-1">Our Location</h3>
                      <p className="text-secondary font-medium text-lg" data-testid="text-contact-address">
                        Opposite Mjengo Hardware, Mwea
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-none bg-accent/20">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="bg-background p-3 rounded-full shadow-sm border border-border">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-1">Phone</h3>
                      <p className="text-muted-foreground mb-1">For general inquiries and price consultations</p>
                      <p className="text-secondary font-medium text-lg">Call us for orders</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-none bg-accent/20">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="bg-background p-3 rounded-full shadow-sm border border-border">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-1">Email</h3>
                      <p className="text-muted-foreground mb-1">Send us a message anytime</p>
                      <p className="text-secondary font-medium text-lg">info@mweanutritiousfoods.com</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-border shadow-xl rounded-2xl overflow-hidden">
              <div className="bg-secondary p-6 text-secondary-foreground">
                <h3 className="text-2xl font-bold font-serif mb-2">Send a Message</h3>
                <p className="opacity-80">Fill out the form below and we'll be in touch.</p>
              </div>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-medium text-foreground">First Name</label>
                        <Input id="firstName" required className="bg-accent/5 focus-visible:ring-primary border-border" placeholder="John" data-testid="input-first-name" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-medium text-foreground">Last Name</label>
                        <Input id="lastName" required className="bg-accent/5 focus-visible:ring-primary border-border" placeholder="Doe" data-testid="input-last-name" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone Number</label>
                      <Input id="phone" type="tel" required className="bg-accent/5 focus-visible:ring-primary border-border" placeholder="Your phone number" data-testid="input-phone" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
                      <Input id="subject" required className="bg-accent/5 focus-visible:ring-primary border-border" placeholder="Price consultation, bulk order, etc." data-testid="input-subject" />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                      <Textarea 
                        id="message" 
                        required 
                        className="min-h-[120px] bg-accent/5 focus-visible:ring-primary border-border resize-y" 
                        placeholder="How can we help you?"
                        data-testid="input-message"
                      />
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-12" data-testid="button-submit-contact">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
