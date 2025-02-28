
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import GlassCard from "../ui/GlassCard";

const Hero = () => {
  return (
    <section className="min-h-[90vh] flex items-center py-20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gauseva-leaf/30 blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-gauseva-earth/30 blur-3xl animate-float" style={{ animationDelay: "-2s" }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-secondary/10 text-secondary">
              <span className="w-2 h-2 rounded-full bg-secondary mr-2"></span>
              Conservation Through Technology
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold leading-tight">
              Preserving India's <span className="text-primary">Cow Heritage</span> for Future Generations
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              GauSeva uses cutting-edge technology to help farmers breed, maintain, and benefit from indigenous cow breeds while promoting environmental sustainability.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <Link
                to="/breeding"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-transform hover:scale-105 active:scale-100"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-accent text-accent-foreground font-medium transition-all hover:bg-accent/80"
              >
                View Impact
              </Link>
            </div>
          </div>
          
          <div className="relative flex justify-center">
            <div className="w-full max-w-md aspect-square relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-gauseva-cream to-gauseva-sand rounded-3xl -rotate-6 transform-gpu"></div>
              <GlassCard className="w-full h-full flex items-center justify-center relative z-10 rounded-3xl bg-white/40 backdrop-blur-sm">
                <div className="text-center p-6">
                  <div className="w-48 h-48 mx-auto mb-6 bg-gauseva-earth/10 rounded-full flex items-center justify-center">
                    <span className="text-6xl">🐄</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Namaste!</h3>
                  <p className="text-muted-foreground">
                    Join our mission to conserve India's precious indigenous cow breeds
                  </p>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
