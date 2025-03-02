
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Scale, Zap, BarChart3, Dna } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import GlassCard from "../ui/GlassCard";

const BreedingForm = () => {
  const [formData, setFormData] = useState({
    cowBreed: "",
    bullBreed: "",
    cowWeight: "",
    bullWeight: "",
    cowAge: "",
    cowMilkYield: "",
    cowHealthHistory: "",
    breedingNotes: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [breedingResult, setBreedingResult] = useState<any | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setBreedingResult(null);
    setAnalysisProgress(0);

    // Simulate progressive analysis with incremental progress updates
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        return newProgress > 95 ? 95 : newProgress;
      });
    }, 300);

    // Simulate an AI analysis
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    clearInterval(progressInterval);
    setAnalysisProgress(100);

    // Advanced breeding recommendation with detailed analysis
    setBreedingResult({
      summary: "Based on comprehensive genetic analysis, the proposed breeding pair shows excellent compatibility with a 87% genetic alignment score.",
      breedingCompatibility: 87,
      offspringPredictions: {
        maleRatio: 52,
        femaleRatio: 48,
        milkYieldPotential: "High (estimated 18-22 liters/day)",
        diseaseResistance: "Very Good",
        estimatedMaturityRate: "15-18 months",
        predictedTraits: [
          { trait: "Udder Health", probability: 85 },
          { trait: "Heat Tolerance", probability: 92 },
          { trait: "Feed Efficiency", probability: 78 },
          { trait: "Docile Temperament", probability: 88 }
        ]
      },
      breedingDetails: {
        gestationPeriod: "Approximately 279-283 days",
        successRate: "78% with artificial insemination",
        calfWeight: "Expected 28-32kg at birth",
        recommendations: [
          "Schedule breeding during cooler months for optimal success",
          "Implement supplemental feeding program 2 weeks before breeding",
          "Consider veterinary hormone intervention to increase success probability"
        ]
      }
    });
    
    setIsLoading(false);
    setActiveTab("overview");
  };

  return (
    <section className="py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* AI Analysis Form */}
          <div>
            <h2 className="text-3xl font-semibold mb-6">AI Analysis</h2>
            <GlassCard className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cowBreed">Cow Breed</Label>
                    <Input
                      type="text"
                      id="cowBreed"
                      name="cowBreed"
                      value={formData.cowBreed}
                      onChange={handleChange}
                      placeholder="Enter cow breed"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="bullBreed">Bull Breed</Label>
                    <Select onValueChange={(value) => setFormData(prevState => ({ ...prevState, bullBreed: value }))}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select bull breed" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Gir">Gir</SelectItem>
                        <SelectItem value="Sahiwal">Sahiwal</SelectItem>
                        <SelectItem value="Red Sindhi">Red Sindhi</SelectItem>
                        <SelectItem value="Ongole">Ongole</SelectItem>
                        <SelectItem value="Tharparkar">Tharparkar</SelectItem>
                        <SelectItem value="Kankrej">Kankrej</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cowAge">Cow Age (years)</Label>
                    <Input
                      type="number"
                      id="cowAge"
                      name="cowAge"
                      value={formData.cowAge}
                      onChange={handleChange}
                      placeholder="Enter cow age"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cowMilkYield">Avg. Milk Yield (L/day)</Label>
                    <Input
                      type="number"
                      id="cowMilkYield"
                      name="cowMilkYield"
                      value={formData.cowMilkYield}
                      onChange={handleChange}
                      placeholder="Enter milk yield"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="cowWeight">Cow Weight (kg)</Label>
                    <Input
                      type="number"
                      id="cowWeight"
                      name="cowWeight"
                      value={formData.cowWeight}
                      onChange={handleChange}
                      placeholder="Enter cow weight"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="bullWeight">Bull Weight (kg)</Label>
                    <Input
                      type="number"
                      id="bullWeight"
                      name="bullWeight"
                      value={formData.bullWeight}
                      onChange={handleChange}
                      placeholder="Enter bull weight"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="cowHealthHistory">Health History</Label>
                  <Textarea
                    id="cowHealthHistory"
                    name="cowHealthHistory"
                    value={formData.cowHealthHistory}
                    onChange={handleChange}
                    placeholder="Enter any health issues, vaccinations, or medical history"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="breedingNotes">Additional Notes</Label>
                  <Textarea
                    id="breedingNotes"
                    name="breedingNotes"
                    value={formData.breedingNotes}
                    onChange={handleChange}
                    placeholder="Any specific considerations for breeding?"
                    rows={3}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <span>AI Analyzing</span>
                      <span className="ml-1">...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Zap className="w-4 h-4 mr-2" />
                      <span>Generate AI Analysis</span>
                    </div>
                  )}
                </Button>

                {isLoading && (
                  <div className="space-y-2">
                    <Progress value={analysisProgress} className="h-2 w-full" />
                    <p className="text-xs text-center text-muted-foreground">
                      {analysisProgress < 30 ? "Analyzing genetic data..." : 
                       analysisProgress < 60 ? "Processing compatibility factors..." : 
                       analysisProgress < 90 ? "Calculating offspring predictions..." : 
                       "Finalizing recommendations..."}
                    </p>
                  </div>
                )}
              </form>
            </GlassCard>
          </div>

          {/* Enhanced Results Display */}
          <div>
            <h2 className="text-3xl font-semibold mb-6">AI Recommendation</h2>
            <GlassCard className="p-6">
              {breedingResult ? (
                <div className="space-y-6">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="w-full">
                      <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                      <TabsTrigger value="offspring" className="flex-1">Offspring</TabsTrigger>
                      <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="space-y-4 pt-4">
                      <div className="flex items-center justify-center mb-4">
                        <div 
                          className="radial-progress text-primary" 
                          style={{ 
                            "--value": breedingResult.breedingCompatibility, 
                            "--size": "8rem",
                            "--thickness": "0.8rem"
                          } as React.CSSProperties}
                        >
                          <span className="text-2xl font-bold">{breedingResult.breedingCompatibility}%</span>
                        </div>
                      </div>
                      <h3 className="text-xl font-medium">Compatibility Score</h3>
                      <p className="text-muted-foreground">{breedingResult.summary}</p>
                    </TabsContent>
                    
                    <TabsContent value="offspring" className="space-y-4 pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Dna className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-medium">Predicted Offspring Traits</h3>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="bg-secondary/10 p-3 rounded-lg">
                          <p className="text-sm font-medium">Male/Female Ratio</p>
                          <p className="text-muted-foreground">{breedingResult.offspringPredictions.maleRatio}% / {breedingResult.offspringPredictions.femaleRatio}%</p>
                        </div>
                        <div className="bg-secondary/10 p-3 rounded-lg">
                          <p className="text-sm font-medium">Milk Yield</p>
                          <p className="text-muted-foreground">{breedingResult.offspringPredictions.milkYieldPotential}</p>
                        </div>
                        <div className="bg-secondary/10 p-3 rounded-lg">
                          <p className="text-sm font-medium">Disease Resistance</p>
                          <p className="text-muted-foreground">{breedingResult.offspringPredictions.diseaseResistance}</p>
                        </div>
                        <div className="bg-secondary/10 p-3 rounded-lg">
                          <p className="text-sm font-medium">Maturity Rate</p>
                          <p className="text-muted-foreground">{breedingResult.offspringPredictions.estimatedMaturityRate}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Trait Probability</h4>
                        {breedingResult.offspringPredictions.predictedTraits.map((trait: any, index: number) => (
                          <div key={index} className="mb-2">
                            <div className="flex justify-between text-sm mb-1">
                              <span>{trait.trait}</span>
                              <span className="font-medium">{trait.probability}%</span>
                            </div>
                            <Progress value={trait.probability} className="h-1.5" />
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="details" className="space-y-4 pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <BarChart3 className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-medium">Breeding Details</h3>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium">Gestation Period</p>
                          <p className="text-muted-foreground">{breedingResult.breedingDetails.gestationPeriod}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Success Rate</p>
                          <p className="text-muted-foreground">{breedingResult.breedingDetails.successRate}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Expected Calf Weight</p>
                          <p className="text-muted-foreground">{breedingResult.breedingDetails.calfWeight}</p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium mb-2">Recommendations</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                          {breedingResult.breedingDetails.recommendations.map((rec: string, index: number) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[400px] text-center">
                  <Scale className="h-12 w-12 text-muted-foreground mb-4 opacity-40" />
                  <p className="text-muted-foreground max-w-md">
                    Complete the form to receive an AI-powered breeding recommendation with detailed genetic analysis and offspring predictions.
                  </p>
                </div>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreedingForm;
