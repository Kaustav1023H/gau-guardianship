
import { ArrowRight, Download } from "lucide-react";
import { Link } from "react-router-dom";
import GlassCard from "../ui/GlassCard";

const Hero = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center py-20 overflow-hidden">
      {/* Enhanced background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-gauseva-leaf/30 blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full bg-gauseva-earth/30 blur-3xl animate-float" style={{ animationDelay: "-2s" }}></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-gauseva-cream/30 blur-3xl animate-float" style={{ animationDelay: "-4s" }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-primary/10 text-primary border border-primary/20">
              <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse-gentle"></span>
              Conservation Through Technology
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-semibold leading-tight">
              Preserving India's <span className="text-primary relative inline-block">
                Cow Heritage
                <span className="absolute bottom-0 left-0 w-full h-1 bg-primary/30 rounded-full"></span>
              </span> for Future Generations
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
              GauSeva uses cutting-edge technology to help farmers breed, maintain, and benefit from indigenous cow breeds while promoting environmental sustainability.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <Link
                to="/breeding"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/20 active:scale-100"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 animate-pulse-gentle" />
              </Link>
              
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gauseva-cream text-gauseva-bark font-medium transition-all hover:bg-gauseva-cream/80 hover:shadow-md"
              >
                View Impact
              </Link>
            </div>
            
            <div className="inline-flex items-center text-sm text-muted-foreground pt-2 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <Download className="mr-2 h-4 w-4" /> 
              Download our app for offline usage
            </div>
          </div>
          
          <div className="relative flex justify-center">
            <div className="w-full max-w-md aspect-square relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-gauseva-cream to-gauseva-sand rounded-3xl -rotate-6 transform-gpu"></div>
              <GlassCard className="w-full h-full flex items-center justify-center relative z-10 rounded-3xl bg-white/60 backdrop-blur-md shadow-xl border border-white/40 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
                <div className="text-center p-6">
                  <div className="relative w-64 h-64 mx-auto mb-6 overflow-hidden rounded-lg">
                    <img 
                      src="https://images.unsplash.com/photo-1493962853295-0fd70327578a" 
                      alt="Indigenous cow" 
                      className="object-cover w-full h-full transition-transform duration-10000 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gauseva-bark/30 to-transparent"></div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-2 text-gauseva-bark">Namaste!</h3>
                  <p className="text-muted-foreground">
                    Join our mission to conserve India's precious indigenous cow breeds
                  </p>
                </div>
              </GlassCard>
              
              {/* Floating cow illustrations */}
              <div className="absolute -right-16 top-12 w-32 h-32 animate-float" style={{ animationDelay: "-3s" }}>
                <div className="relative w-full h-full">
                  <img 
                    src="https://images.unsplash.com/photo-1465379944081-7f47de8d74ac" 
                    alt="Cow silhouette" 
                    className="object-cover w-full h-full rounded-full shadow-lg border-4 border-white"
                  />
                </div>
              </div>
              
              <div className="absolute -left-12 bottom-20 w-24 h-24 animate-float" style={{ animationDelay: "-1.5s" }}>
                <div className="relative w-full h-full">
                  <div className="w-full h-full bg-gauseva-cream rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    <span className="text-4xl">🐄</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
