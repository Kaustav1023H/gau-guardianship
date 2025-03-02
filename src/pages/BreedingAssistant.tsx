
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BreedingForm from "@/components/breeding/BreedingForm";
import { Dna, Zap, BarChart3, LineChart } from "lucide-react";

const BreedingAssistant = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-primary/10 text-primary mb-4">
              <Zap className="h-4 w-4 mr-2" />
              AI Analysis
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-semibold mb-4">
              AI Breeding Assistant
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our enhanced AI-powered breeding assistant uses comprehensive genetic analysis to provide 
              detailed breeding recommendations, offspring predictions, and personalized guidance.
            </p>
          </div>
          
          <BreedingForm />
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-secondary/10 p-6 rounded-lg flex flex-col items-center text-center">
              <Dna className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Genetic Analysis</h3>
              <p className="text-muted-foreground text-sm">
                Advanced genetic compatibility algorithms analyze over 150 traits to ensure optimal breeding pairs
              </p>
            </div>
            
            <div className="bg-secondary/10 p-6 rounded-lg flex flex-col items-center text-center">
              <BarChart3 className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Offspring Predictions</h3>
              <p className="text-muted-foreground text-sm">
                Detailed predictions of offspring traits, health indicators, and productivity markers
              </p>
            </div>
            
            <div className="bg-secondary/10 p-6 rounded-lg flex flex-col items-center text-center">
              <LineChart className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-medium mb-2">Success Optimization</h3>
              <p className="text-muted-foreground text-sm">
                Personalized breeding timing, techniques, and conditions to maximize successful outcomes
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BreedingAssistant;
