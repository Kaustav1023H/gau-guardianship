
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import EnvironmentalImpact from "@/components/dashboard/EnvironmentalImpact";
import { LineChart } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-secondary/10 text-secondary mb-4">
              <LineChart className="h-4 w-4 mr-2" />
              Real-Time Metrics
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-semibold mb-4">
              Environmental Impact Dashboard
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Track your environmental contributions through biogas production, 
              carbon offset, and earn GauPoints for eco-friendly practices.
            </p>
          </div>
          
          <EnvironmentalImpact />
          
          <div className="mt-12 p-6 rounded-lg bg-primary/10 max-w-3xl mx-auto">
            <h3 className="text-xl font-medium mb-3">Redeem Your GauPoints</h3>
            <p className="text-muted-foreground mb-4">
              You've earned 780 GauPoints! These can be redeemed for various agricultural supplies 
              and services to further support your sustainable farming practices.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-background rounded-lg border border-border shadow-sm text-center">
                <div className="text-2xl font-semibold mb-1">500</div>
                <div className="text-sm text-muted-foreground">points</div>
                <div className="my-2 border-t border-border"></div>
                <div className="font-medium">Organic Seeds Pack</div>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border shadow-sm text-center">
                <div className="text-2xl font-semibold mb-1">750</div>
                <div className="text-sm text-muted-foreground">points</div>
                <div className="my-2 border-t border-border"></div>
                <div className="font-medium">Biogas Toolkit</div>
              </div>
              <div className="p-4 bg-background rounded-lg border border-border shadow-sm text-center">
                <div className="text-2xl font-semibold mb-1">1000</div>
                <div className="text-sm text-muted-foreground">points</div>
                <div className="my-2 border-t border-border"></div>
                <div className="font-medium">Vet Consultation</div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
