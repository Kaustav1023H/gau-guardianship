
import { Dna, Map, ShoppingBag, CloudCog, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import GlassCard from "../ui/GlassCard";
import { cn } from "@/lib/utils";

const featuresData = [
  {
    icon: Dna,
    title: "AI Breeding Assistant",
    description: "Optimize breeding pairs with our advanced genetic analysis model that considers milk yield, disease resistance, and pedigree.",
    link: "/breeding",
    color: "bg-amber-100 text-amber-800"
  },
  {
    icon: Map,
    title: "GauSeva Sanctuary Map",
    description: "Find nearby cow sanctuaries across India using Google Maps integration with real-time location data.",
    link: "/google-maps",
    color: "bg-green-100 text-green-800"
  },
  {
    icon: ShoppingBag,
    title: "Decentralized Marketplace",
    description: "Connect with biogas plants and Ayurvedic pharmacies to sell your surplus products.",
    link: "/marketplace",
    color: "bg-orange-100 text-orange-800"
  },
  {
    icon: CloudCog,
    title: "Offline Capability",
    description: "Continue working in low-bandwidth areas with our offline-first approach using Google Workbox.",
    link: "/offline",
    color: "bg-blue-100 text-blue-700"
  }
];

const Features = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-semibold mb-4">
            Cutting-Edge Tools for Farmers
          </h2>
          <p className="text-muted-foreground text-lg">
            Our comprehensive platform provides everything you need to conserve indigenous cow breeds
            while maximizing environmental and economic benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuresData.map((feature, index) => (
            <Link to={feature.link} key={index}>
              <div 
                className="animate-fade-in" 
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <GlassCard 
                  className="h-full transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl group"
                  hoverEffect={true}
                >
                  <div className="flex flex-col items-center text-center h-full">
                    <div className={cn("p-3 rounded-full mb-5 transition-all duration-300 group-hover:scale-110", feature.color)}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4 flex-grow">
                      {feature.description}
                    </p>
                    <span className="text-primary font-medium inline-flex items-center group-hover:gap-2 transition-all">
                      Learn more
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </GlassCard>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
