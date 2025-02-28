
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BreedingForm from "@/components/breeding/BreedingForm";
import { Dna } from "lucide-react";

const BreedingAssistant = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-primary/10 text-primary mb-4">
              <Dna className="h-4 w-4 mr-2" />
              AI-Powered Analysis
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-semibold mb-4">
              Breeding Assistant
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Our AI-powered breeding assistant uses advanced genetic analysis to recommend 
              optimal breeding pairs based on milk yield, disease resistance, and pedigree.
            </p>
          </div>
          
          <BreedingForm />
          
          <div className="mt-12 p-6 rounded-lg bg-secondary/10 max-w-2xl mx-auto">
            <h3 className="text-xl font-medium mb-3 text-secondary">How it works</h3>
            <ol className="list-decimal ml-6 space-y-3 text-muted-foreground">
              <li>
                Enter your cow's details using the form or voice input
              </li>
              <li>
                Our AI analyzes the data against our extensive genetic database
              </li>
              <li>
                Receive tailored recommendations for optimal breeding pairs
              </li>
              <li>
                Access detailed genetic compatibility reports and predictions
              </li>
            </ol>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BreedingAssistant;
