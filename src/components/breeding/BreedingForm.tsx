
import { useState } from "react";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Dna, ChevronRight, Mic, Award, Check, ThumbsUp, Info } from "lucide-react";
import { toast } from "sonner";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";

type BreedingData = {
  cowId: string;
  breed: string;
  age: string;
  milkYield: string;
  healthHistory: string;
};

type BreedingRecommendation = {
  breedName: string;
  compatibilityScore: number;
  milkYieldIncrease: string;
  diseaseResistance: string;
  notes: string;
};

const BreedingForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recommendations, setRecommendations] = useState<BreedingRecommendation[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const form = useForm<BreedingData>({
    defaultValues: {
      cowId: "",
      breed: "",
      age: "",
      milkYield: "",
      healthHistory: ""
    }
  });

  // Mock AI breeding recommendations based on input data
  const generateRecommendations = (data: BreedingData): BreedingRecommendation[] => {
    // In a real app, this would call an AI model API
    const breed = data.breed.toLowerCase();
    
    if (breed.includes("gir")) {
      return [
        {
          breedName: "Kankrej Bull",
          compatibilityScore: 92,
          milkYieldIncrease: "+25%",
          diseaseResistance: "High",
          notes: "Excellent genetic compatibility with Gir cows. Offspring typically have improved milk production and heat tolerance."
        },
        {
          breedName: "Sahiwal Bull",
          compatibilityScore: 85,
          milkYieldIncrease: "+15%",
          diseaseResistance: "Very High",
          notes: "Good choice for disease resistance improvement. Offspring typically have better immunity to common cattle diseases."
        },
        {
          breedName: "Red Sindhi Bull",
          compatibilityScore: 78,
          milkYieldIncrease: "+10%",
          diseaseResistance: "Medium",
          notes: "Moderate compatibility. May improve milk fat content and overall productivity."
        }
      ];
    } else if (breed.includes("sahiwal")) {
      return [
        {
          breedName: "Gir Bull",
          compatibilityScore: 89,
          milkYieldIncrease: "+18%",
          diseaseResistance: "High",
          notes: "Great compatibility with Sahiwal cows. Offspring typically have improved milk quality and quantity."
        },
        {
          breedName: "Tharparkar Bull",
          compatibilityScore: 93,
          milkYieldIncrease: "+20%",
          diseaseResistance: "Very High",
          notes: "Excellent choice for genetic diversity and disease resistance. Highly recommended pairing."
        }
      ];
    } else {
      // Default recommendations for other breeds
      return [
        {
          breedName: "Gir Bull",
          compatibilityScore: 80,
          milkYieldIncrease: "+15%",
          diseaseResistance: "Medium-High",
          notes: "Generally compatible with most indigenous breeds. Improves milk production characteristics."
        },
        {
          breedName: "Sahiwal Bull",
          compatibilityScore: 75,
          milkYieldIncrease: "+12%",
          diseaseResistance: "High",
          notes: "Good choice for improving overall herd health and disease resistance."
        }
      ];
    }
  };

  const onSubmit = (data: BreedingData) => {
    setIsLoading(true);
    
    // Simulate AI processing
    setTimeout(() => {
      console.log("Submitted data:", data);
      const aiRecommendations = generateRecommendations(data);
      setRecommendations(aiRecommendations);
      setShowRecommendations(true);
      setIsLoading(false);
      toast.success("AI analysis complete", {
        description: "Breeding recommendations generated successfully"
      });
    }, 2500);
  };

  const handleVoiceInput = (field: keyof BreedingData) => {
    setIsRecording(true);
    
    // Simulate voice recognition
    setTimeout(() => {
      const demoValues: Record<keyof BreedingData, string> = {
        cowId: "GS-1234",
        breed: "Gir",
        age: "5",
        milkYield: "15",
        healthHistory: "No major issues, vaccinated last month"
      };
      
      form.setValue(field, demoValues[field]);
      setIsRecording(false);
      toast.success("Voice input captured");
    }, 2000);
  };

  const handleReset = () => {
    form.reset();
    setShowRecommendations(false);
    setRecommendations([]);
  };

  return (
    <div className="space-y-8">
      <Card className="w-full max-w-2xl mx-auto shadow-sm">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <div className="p-2 rounded-full bg-primary/10">
              <Dna className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>Breeding Assistant</CardTitle>
          </div>
          <CardDescription>
            Enter your cow's details to get breeding recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="cowId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cow ID</FormLabel>
                      <div className="flex">
                        <FormControl>
                          <Input placeholder="e.g. GS-1234" {...field} />
                        </FormControl>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon" 
                          className="ml-2"
                          onClick={() => handleVoiceInput("cowId")}
                          disabled={isRecording}
                        >
                          <Mic className={`h-4 w-4 ${isRecording ? 'text-destructive animate-pulse' : ''}`} />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="breed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Breed</FormLabel>
                      <div className="flex">
                        <FormControl>
                          <Input placeholder="e.g. Gir, Sahiwal" {...field} />
                        </FormControl>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon" 
                          className="ml-2"
                          onClick={() => handleVoiceInput("breed")}
                          disabled={isRecording}
                        >
                          <Mic className={`h-4 w-4 ${isRecording ? 'text-destructive animate-pulse' : ''}`} />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age (Years)</FormLabel>
                      <div className="flex">
                        <FormControl>
                          <Input type="number" placeholder="e.g. 5" {...field} />
                        </FormControl>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon" 
                          className="ml-2"
                          onClick={() => handleVoiceInput("age")}
                          disabled={isRecording}
                        >
                          <Mic className={`h-4 w-4 ${isRecording ? 'text-destructive animate-pulse' : ''}`} />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="milkYield"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Milk Yield (Liters/day)</FormLabel>
                      <div className="flex">
                        <FormControl>
                          <Input type="number" placeholder="e.g. 15" {...field} />
                        </FormControl>
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon" 
                          className="ml-2"
                          onClick={() => handleVoiceInput("milkYield")}
                          disabled={isRecording}
                        >
                          <Mic className={`h-4 w-4 ${isRecording ? 'text-destructive animate-pulse' : ''}`} />
                        </Button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="healthHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Health History</FormLabel>
                    <div className="flex">
                      <FormControl>
                        <Input placeholder="Brief history of health issues or treatments" {...field} />
                      </FormControl>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="icon" 
                        className="ml-2"
                        onClick={() => handleVoiceInput("healthHistory")}
                        disabled={isRecording}
                      >
                        <Mic className={`h-4 w-4 ${isRecording ? 'text-destructive animate-pulse' : ''}`} />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex space-x-3">
                <Button 
                  type="submit" 
                  className="flex-1 flex items-center justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>Analyzing<span className="loading-dots"></span></>
                  ) : (
                    <>
                      Get Breeding Recommendations
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
                {showRecommendations && (
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      {showRecommendations && recommendations.length > 0 && (
        <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in">
          <Alert className="bg-primary/5 border-primary">
            <Info className="h-4 w-4" />
            <AlertTitle>AI Analysis Complete</AlertTitle>
            <AlertDescription>
              Based on the provided cow details, our AI has generated the following breeding recommendations 
              ranked by compatibility score.
            </AlertDescription>
          </Alert>
          
          {recommendations.map((rec, index) => (
            <Card key={index} className={`border-l-4 ${index === 0 ? 'border-l-green-500' : index === 1 ? 'border-l-amber-500' : 'border-l-blue-500'}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl flex items-center">
                    {index === 0 && <Award className="h-5 w-5 mr-2 text-amber-500" />}
                    {rec.breedName}
                  </CardTitle>
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    rec.compatibilityScore >= 90 ? 'bg-green-100 text-green-800' :
                    rec.compatibilityScore >= 80 ? 'bg-blue-100 text-blue-800' :
                    'bg-amber-100 text-amber-800'
                  }`}>
                    {rec.compatibilityScore}% Compatible
                  </span>
                </div>
                <CardDescription>Recommended breeding pair for your {form.getValues().breed} cow</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-start">
                    <div className="p-1.5 rounded-full bg-green-100 text-green-800 mr-2">
                      <ThumbsUp className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Expected Milk Yield Increase</p>
                      <p className="text-sm text-muted-foreground">{rec.milkYieldIncrease}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="p-1.5 rounded-full bg-blue-100 text-blue-800 mr-2">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Disease Resistance</p>
                      <p className="text-sm text-muted-foreground">{rec.diseaseResistance}</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{rec.notes}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BreedingForm;
