
import { Star, Quote } from "lucide-react";
import GlassCard from "../ui/GlassCard";

const testimonials = [
  {
    name: "Rajesh Singh",
    role: "Dairy Farmer, Punjab",
    content: "GauSeva's breeding assistant helped me improve milk yield by 32% while preserving our local Gir breed characteristics.",
    stars: 5
  },
  {
    name: "Anita Patel",
    role: "Farm Manager, Gujarat",
    content: "The marketplace feature connected us with three new Ayurvedic companies, creating a sustainable revenue stream for our sanctuary.",
    stars: 5
  },
  {
    name: "Kunal Sharma",
    role: "Conservation Advocate, Rajasthan",
    content: "Finding nearby sanctuaries through the map feature has created a network of support for our conservation efforts.",
    stars: 4
  }
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-gauseva-cream/50 text-gauseva-bark mb-4">
            <Quote className="h-4 w-4 mr-2 text-primary" />
            Success Stories
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
            Trusted by Farmers Across India
          </h2>
          <p className="text-muted-foreground text-lg">
            See how GauSeva is making a difference in indigenous cow conservation and sustainable farming.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <GlassCard className="h-full hover:shadow-xl transition-all duration-300">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${i < testimonial.stars ? 'text-amber-400 fill-amber-400' : 'text-muted'}`} 
                      />
                    ))}
                  </div>
                  
                  <p className="text-foreground mb-6 italic flex-grow">"{testimonial.content}"</p>
                  
                  <div className="flex items-center gap-3 mt-auto">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
