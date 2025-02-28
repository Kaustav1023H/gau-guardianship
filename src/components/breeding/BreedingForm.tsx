
import { useState, useEffect } from "react";
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
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { 
  Dna, 
  ChevronRight, 
  Mic, 
  Award, 
  Check, 
  ThumbsUp, 
  Info, 
  LineChart, 
  Dices, 
  Heart, 
  Calendar,
  ShieldCheck, 
  Droplets,
  Scales,
  BarChart3
} from "lucide-react";
import { toast } from "sonner";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

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
  offspringPredictions: {
    probabilities: {
      female: number;
      male: number;
    };
    traits: {
      milkProduction: number;
      heatTolerance: number;
      diseaseResistance: number;
      feedEfficiency: number;
      longevity: number;
    };
  };
  successRate: number;
  gestation: {
    duration: string;
    expectedDifficulty: string;
  };
};

const BreedingForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recommendations, setRecommendations] = useState<BreedingRecommendation[]>([]);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const form = useForm<BreedingData>({
    defaultValues: {
      cowId: "",
      breed: "",
      age: "",
      milkYield: "",
      healthHistory: ""
    }
  });

  // Simulate AI analysis progress
  useEffect(() => {
    if (isLoading) {
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 300);

      return () => {
        clearInterval(interval);
        setAnalysisProgress(0);
      };
    }
  }, [isLoading]);

  // Enhanced AI breeding recommendations based on input data
  const generateRecommendations = (data: BreedingData): BreedingRecommendation[] => {
    // In a real app, this would call an AI model API
    const breed = data.breed.toLowerCase();
    const age = parseInt(data.age) || 4;
    const milkYield = parseInt(data.milkYield) || 12;
    const hasHealthIssues = data.healthHistory.toLowerCase().includes("issue") || 
                          data.healthHistory.toLowerCase().includes("disease") || 
                          data.healthHistory.toLowerCase().includes("problem");
    
    // Base recommendations adjusted by data inputs
    let recommendations: BreedingRecommendation[] = [];
    
    if (breed.includes("gir")) {
      recommendations = [
        {
          breedName: "Kankrej Bull",
          compatibilityScore: 92 - (hasHealthIssues ? 5 : 0) + (milkYield > 15 ? 3 : 0),
          milkYieldIncrease: `+${20 + Math.floor(milkYield/5)}%`,
          diseaseResistance: hasHealthIssues ? "Very High" : "High",
          notes: `Excellent genetic compatibility with Gir cows. ${age > 6 ? "For mature cows like yours, " : ""}Offspring typically have improved milk production and heat tolerance. ${hasHealthIssues ? "The Kankrej genetics help overcome the health challenges mentioned in your cow's history." : ""}`,
          offspringPredictions: {
            probabilities: {
              female: 0.52,
              male: 0.48
            },
            traits: {
              milkProduction: 85,
              heatTolerance: 90,
              diseaseResistance: hasHealthIssues ? 95 : 85,
              feedEfficiency: 75 + (milkYield > 15 ? 10 : 0),
              longevity: 80
            }
          },
          successRate: 88 - (age > 8 ? 15 : age > 6 ? 5 : 0),
          gestation: {
            duration: "9 months 12 days",
            expectedDifficulty: age > 8 ? "Moderate" : "Low" 
          }
        },
        {
          breedName: "Sahiwal Bull",
          compatibilityScore: 85 + (hasHealthIssues ? 5 : 0) - (milkYield > 15 ? 2 : 0),
          milkYieldIncrease: `+${12 + Math.floor(milkYield/4)}%`,
          diseaseResistance: "Very High",
          notes: `Good choice for disease resistance improvement. ${hasHealthIssues ? "Excellent choice given your cow's health history. " : ""}Offspring typically have better immunity to common cattle diseases and moderate milk production.`,
          offspringPredictions: {
            probabilities: {
              female: 0.56,
              male: 0.44
            },
            traits: {
              milkProduction: 70 + (milkYield > 15 ? 15 : 0),
              heatTolerance: 85,
              diseaseResistance: 95,
              feedEfficiency: 80,
              longevity: 85
            }
          },
          successRate: 92 - (age > 8 ? 12 : age > 6 ? 3 : 0),
          gestation: {
            duration: "9 months 8 days",
            expectedDifficulty: "Very Low"
          }
        },
        {
          breedName: "Red Sindhi Bull",
          compatibilityScore: 78 + (milkYield > 15 ? 7 : 0),
          milkYieldIncrease: `+${8 + Math.floor(milkYield/3)}%`,
          diseaseResistance: "Medium",
          notes: `Moderate compatibility. May improve milk fat content and overall productivity. ${milkYield > 15 ? "Given your cow's already high milk yield, this pairing could produce offspring with exceptional milk quality." : ""}`,
          offspringPredictions: {
            probabilities: {
              female: 0.49,
              male: 0.51
            },
            traits: {
              milkProduction: 75 + (milkYield > 15 ? 15 : 0),
              heatTolerance: 80,
              diseaseResistance: 70,
              feedEfficiency: 85,
              longevity: 75
            }
          },
          successRate: 82 - (age > 8 ? 18 : age > 6 ? 7 : 0),
          gestation: {
            duration: "9 months 5 days",
            expectedDifficulty: age > 7 ? "Moderate" : "Low"
          }
        }
      ];
    } else if (breed.includes("sahiwal")) {
      recommendations = [
        {
          breedName: "Gir Bull",
          compatibilityScore: 89 + (milkYield > 15 ? 4 : 0) - (hasHealthIssues ? 3 : 0),
          milkYieldIncrease: `+${15 + Math.floor(milkYield/4)}%`,
          diseaseResistance: "High",
          notes: `Great compatibility with Sahiwal cows. ${milkYield > 15 ? "Your cow's excellent milk production indicates this pairing could produce exceptional offspring. " : ""}Offspring typically have improved milk quality and quantity.`,
          offspringPredictions: {
            probabilities: {
              female: 0.54,
              male: 0.46
            },
            traits: {
              milkProduction: 90,
              heatTolerance: 85,
              diseaseResistance: 80,
              feedEfficiency: 85,
              longevity: 80
            }
          },
          successRate: 89 - (age > 8 ? 15 : age > 6 ? 5 : 0),
          gestation: {
            duration: "9 months 10 days",
            expectedDifficulty: age > 8 ? "Moderate" : "Low"
          }
        },
        {
          breedName: "Tharparkar Bull",
          compatibilityScore: 93 - (age > 7 ? 4 : 0) + (hasHealthIssues ? 4 : 0),
          milkYieldIncrease: `+${16 + Math.floor(milkYield/5)}%`,
          diseaseResistance: "Very High",
          notes: `Excellent choice for genetic diversity and disease resistance. ${hasHealthIssues ? "This pairing would help address the health issues mentioned in your cow's history. " : ""}Highly recommended pairing for balanced traits.`,
          offspringPredictions: {
            probabilities: {
              female: 0.55,
              male: 0.45
            },
            traits: {
              milkProduction: 80 + (milkYield > 15 ? 10 : 0),
              heatTolerance: 95,
              diseaseResistance: 95,
              feedEfficiency: 90,
              longevity: 90
            }
          },
          successRate: 95 - (age > 8 ? 12 : age > 6 ? 4 : 0),
          gestation: {
            duration: "9 months 7 days",
            expectedDifficulty: "Very Low"
          }
        },
        {
          breedName: "Rathi Bull",
          compatibilityScore: 84 + (milkYield < 12 ? 6 : 0),
          milkYieldIncrease: `+${18 + Math.floor(milkYield/6)}%`,
          diseaseResistance: "High",
          notes: `Good option for improving milk production. ${milkYield < 12 ? "This pairing is particularly recommended for your cow with moderate milk yield to improve offspring productivity. " : ""}Creates well-balanced offspring with good heat tolerance.`,
          offspringPredictions: {
            probabilities: {
              female: 0.51,
              male: 0.49
            },
            traits: {
              milkProduction: 85,
              heatTolerance: 90,
              diseaseResistance: 80,
              feedEfficiency: 85,
              longevity: 85
            }
          },
          successRate: 87 - (age > 8 ? 14 : age > 6 ? 6 : 0),
          gestation: {
            duration: "9 months 9 days",
            expectedDifficulty: age > 7 ? "Moderate" : "Low"
          }
        }
      ];
    } else {
      // Default recommendations for other breeds with some intelligence based on input parameters
      recommendations = [
        {
          breedName: "Gir Bull",
          compatibilityScore: 80 + (milkYield > 15 ? 5 : 0) - (hasHealthIssues ? 3 : 0),
          milkYieldIncrease: `+${13 + Math.floor(milkYield/5)}%`,
          diseaseResistance: "Medium-High",
          notes: `Generally compatible with most indigenous breeds. ${breed ? `May need additional monitoring for full compatibility with ${breed} cows. ` : ""}Improves milk production characteristics and provides decent heat tolerance.`,
          offspringPredictions: {
            probabilities: {
              female: 0.52,
              male: 0.48
            },
            traits: {
              milkProduction: 85,
              heatTolerance: 80,
              diseaseResistance: 75,
              feedEfficiency: 80,
              longevity: 80
            }
          },
          successRate: 85 - (age > 8 ? 15 : age > 6 ? 5 : 0),
          gestation: {
            duration: "9 months 10 days",
            expectedDifficulty: age > 7 ? "Moderate" : "Low"
          }
        },
        {
          breedName: "Sahiwal Bull",
          compatibilityScore: 75 + (hasHealthIssues ? 8 : 0),
          milkYieldIncrease: `+${10 + Math.floor(milkYield/6)}%`,
          diseaseResistance: "High",
          notes: `Good choice for improving overall herd health and disease resistance. ${hasHealthIssues ? "Strongly recommended given your cow's health history. " : ""}Creates hardy offspring with good immunity.`,
          offspringPredictions: {
            probabilities: {
              female: 0.54,
              male: 0.46
            },
            traits: {
              milkProduction: 75,
              heatTolerance: 85,
              diseaseResistance: 90,
              feedEfficiency: 85,
              longevity: 85
            }
          },
          successRate: 88 - (age > 8 ? 13 : age > 6 ? 4 : 0),
          gestation: {
            duration: "9 months 8 days",
            expectedDifficulty: "Low"
          }
        },
        {
          breedName: "Kankrej Bull",
          compatibilityScore: 72 + (milkYield < 10 ? 10 : 0),
          milkYieldIncrease: `+${15 + Math.floor(milkYield/4)}%`,
          diseaseResistance: "Medium",
          notes: `Good for improving milk production. ${milkYield < 10 ? "Excellent choice for boosting the milk yield of your cow's offspring. " : ""}Creates offspring with balanced characteristics.`,
          offspringPredictions: {
            probabilities: {
              female: 0.51,
              male: 0.49
            },
            traits: {
              milkProduction: 85,
              heatTolerance: 90,
              diseaseResistance: 70,
              feedEfficiency: 80,
              longevity: 75
            }
          },
          successRate: 82 - (age > 8 ? 17 : age > 6 ? 7 : 0),
          gestation: {
            duration: "9 months 12 days",
            expectedDifficulty: age > 7 ? "Moderate-High" : "Moderate"
          }
        }
      ];
    }
    
    // Sort by compatibility score
    return recommendations.sort((a, b) => b.compatibilityScore - a.compatibilityScore);
  };

  const onSubmit = (data: BreedingData) => {
    setIsLoading(true);
    setShowRecommendations(false);
    
    // Simulate AI processing with varying time based on data complexity
    const processingTime = 2500 + (data.healthHistory.length > 20 ? 1000 : 0);
    
    setTimeout(() => {
      console.log("Submitted data:", data);
      const aiRecommendations = generateRecommendations(data);
      setRecommendations(aiRecommendations);
      setShowRecommendations(true);
      setIsLoading(false);
      toast.success("AI analysis complete", {
        description: "Breeding recommendations generated successfully"
      });
    }, processingTime);
  };

  const handleVoiceInput = (field: keyof BreedingData) => {
    setIsRecording(true);
    
    // Simulate voice recognition with more realistic data for different fields
    setTimeout(() => {
      const fieldValues: Record<string, Record<keyof BreedingData, string>> = {
        cowId: {
          cowId: "GS-1234",
          breed: "Gir",
          age: "5",
          milkYield: "15",
          healthHistory: "No major issues, vaccinated last month"
        },
        breed: {
          cowId: "GS-1234",
          breed: "Gir",
          age: "5",
          milkYield: "15",
          healthHistory: "No major issues, vaccinated last month"
        },
        age: {
          cowId: "GS-1234",
          breed: "Gir",
          age: "4",
          milkYield: "15", 
          healthHistory: "No major issues, vaccinated last month"
        },
        milkYield: {
          cowId: "GS-1234",
          breed: "Gir",
          age: "5",
          milkYield: "18",
          healthHistory: "No major issues, vaccinated last month"
        },
        healthHistory: {
          cowId: "GS-1234",
          breed: "Gir",
          age: "5",
          milkYield: "15",
          healthHistory: "Treated for mastitis last year, otherwise healthy"
        }
      };
      
      form.setValue(field, fieldValues[field][field]);
      setIsRecording(false);
      toast.success("Voice input captured");
    }, 2000);
  };

  const handleReset = () => {
    form.reset();
    setShowRecommendations(false);
    setRecommendations([]);
  };

  const getTrustScore = (score: number) => {
    return Math.round(score);
  };

  return (
    <div className="space-y-8">
      <Card className="w-full max-w-2xl mx-auto shadow-sm">
        <CardHeader>
          <div className="flex items-center space-x-2 mb-2">
            <div className="p-2 rounded-full bg-primary/10">
              <Dna className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>AI Breeding Assistant</CardTitle>
          </div>
          <CardDescription>
            Enter your cow's details to get advanced breeding recommendations
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
                    <div className="w-full">
                      <div className="flex justify-between items-center mb-2">
                        <span>AI Analysis in Progress</span>
                        <span>{Math.round(analysisProgress)}%</span>
                      </div>
                      <Progress value={analysisProgress} className="h-2" />
                    </div>
                  ) : (
                    <>
                      Get Advanced Breeding Recommendations
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
        <div className="w-full max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
          <Alert className="bg-primary/5 border-primary">
            <Info className="h-4 w-4" />
            <AlertTitle>Advanced AI Analysis Complete</AlertTitle>
            <AlertDescription>
              Based on your cow's data, our AI has analyzed genetic compatibility, projected offspring traits, 
              and calculated success rates for the following breeding recommendations.
            </AlertDescription>
          </Alert>
          
          {recommendations.map((rec, index) => (
            <Card key={index} className={`border-l-4 ${
              index === 0 ? 'border-l-green-500' : 
              index === 1 ? 'border-l-amber-500' : 
              'border-l-blue-500'
            }`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <CardTitle className="text-xl flex items-center">
                    {index === 0 && <Award className="h-5 w-5 mr-2 text-amber-500" />}
                    {rec.breedName}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs bg-secondary/10 border-secondary/20">
                      {rec.successRate}% Success Rate
                    </Badge>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      rec.compatibilityScore >= 90 ? 'bg-green-100 text-green-800' :
                      rec.compatibilityScore >= 80 ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {rec.compatibilityScore}% Compatible
                    </span>
                  </div>
                </div>
                <CardDescription>Recommended breeding pair for your {form.getValues().breed || "cow"}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="offspring">Offspring Predictions</TabsTrigger>
                    <TabsTrigger value="details">Breeding Details</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-0">
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
                          <ShieldCheck className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Disease Resistance</p>
                          <p className="text-sm text-muted-foreground">{rec.diseaseResistance}</p>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.notes}</p>
                  </TabsContent>
                  
                  <TabsContent value="offspring" className="mt-0 space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Dices className="h-4 w-4 text-primary" />
                        <h4 className="text-sm font-medium">Gender Probability</h4>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                          <span className="text-xs">Male: {Math.round(rec.offspringPredictions.probabilities.male * 100)}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                          <span className="text-xs">Female: {Math.round(rec.offspringPredictions.probabilities.female * 100)}%</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="flex items-center gap-1 text-sm font-medium mb-3">
                        <LineChart className="h-4 w-4 text-primary" />
                        Predicted Offspring Traits
                      </h4>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Milk Production</span>
                            <span>{rec.offspringPredictions.traits.milkProduction}%</span>
                          </div>
                          <Progress value={rec.offspringPredictions.traits.milkProduction} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Heat Tolerance</span>
                            <span>{rec.offspringPredictions.traits.heatTolerance}%</span>
                          </div>
                          <Progress value={rec.offspringPredictions.traits.heatTolerance} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Disease Resistance</span>
                            <span>{rec.offspringPredictions.traits.diseaseResistance}%</span>
                          </div>
                          <Progress value={rec.offspringPredictions.traits.diseaseResistance} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Feed Efficiency</span>
                            <span>{rec.offspringPredictions.traits.feedEfficiency}%</span>
                          </div>
                          <Progress value={rec.offspringPredictions.traits.feedEfficiency} className="h-2" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Longevity</span>
                            <span>{rec.offspringPredictions.traits.longevity}%</span>
                          </div>
                          <Progress value={rec.offspringPredictions.traits.longevity} className="h-2" />
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="details" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="rounded-lg border p-3">
                        <div className="flex items-center gap-2 mb-2 text-sm font-medium">
                          <Calendar className="h-4 w-4 text-primary" />
                          Gestation Details
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Expected Duration:</span>
                            <span>{rec.gestation.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Calving Difficulty:</span>
                            <span>{rec.gestation.expectedDifficulty}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="rounded-lg border p-3">
                        <div className="flex items-center gap-2 mb-2 text-sm font-medium">
                          <BarChart3 className="h-4 w-4 text-primary" />
                          AI Confidence Metrics
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Trust Score:</span>
                            <span>{getTrustScore(rec.compatibilityScore)}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Data Quality:</span>
                            <span>{rec.compatibilityScore > 85 ? "High" : rec.compatibilityScore > 75 ? "Medium" : "Low"}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
              
              <CardFooter className="pt-0">
                <div className="w-full flex flex-wrap justify-between items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    <span>Best for: {rec.compatibilityScore > 90 ? "Overall Excellence" : rec.compatibilityScore > 85 ? "Disease Resistance" : "Milk Production"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Droplets className="h-3 w-3" />
                    <span>Recommended Water: {rec.compatibilityScore > 85 ? "25-30" : "20-25"} liters/day</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Scales className="h-3 w-3" />
                    <span>Breeding Season: {["Winter", "Spring", "Any Season"][index % 3]}</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BreedingForm;
