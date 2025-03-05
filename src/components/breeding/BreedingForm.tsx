
import { useState, useEffect } from "react";
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
import { Scale, Zap, BarChart3, Dna, AlertCircle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import GlassCard from "../ui/GlassCard";

// Breed data for more accurate predictions
const BREED_DATA = {
  "Holstein-Friesian": {
    milkYield: { min: 7500, max: 9000 },
    growth: "Fast",
    diseaseResistance: 75,
    climateAdaptation: "Temperate",
    heatToleranceScore: 60,
    feedingEfficiency: 82,
    reproductiveEfficiency: 85,
    geneticTraits: ["High milk production", "Large frame", "Black and white markings"]
  },
  "Jersey": {
    milkYield: { min: 5500, max: 7000 },
    growth: "Medium",
    diseaseResistance: 80,
    climateAdaptation: "Adaptable",
    heatToleranceScore: 73,
    feedingEfficiency: 88,
    reproductiveEfficiency: 87,
    geneticTraits: ["High butterfat content", "Small frame", "Fawn colored"]
  },
  "Gir": {
    milkYield: { min: 3500, max: 4800 },
    growth: "Medium",
    diseaseResistance: 90,
    climateAdaptation: "Tropical",
    heatToleranceScore: 92,
    feedingEfficiency: 85,
    reproductiveEfficiency: 83,
    geneticTraits: ["Heat tolerance", "Disease resistance", "Zebu humps"]
  },
  "Sahiwal": {
    milkYield: { min: 3200, max: 4500 },
    growth: "Medium",
    diseaseResistance: 92,
    climateAdaptation: "Tropical",
    heatToleranceScore: 95,
    feedingEfficiency: 80,
    reproductiveEfficiency: 78,
    geneticTraits: ["Tick resistance", "Heat tolerance", "Red to brown color"]
  },
  "Red Sindhi": {
    milkYield: { min: 2800, max: 4000 },
    growth: "Medium-Slow",
    diseaseResistance: 93,
    climateAdaptation: "Tropical",
    heatToleranceScore: 94,
    feedingEfficiency: 78,
    reproductiveEfficiency: 75,
    geneticTraits: ["Heat tolerance", "Disease resistance", "Red coloration"]
  },
  "Ongole": {
    milkYield: { min: 2200, max: 3500 },
    growth: "Medium",
    diseaseResistance: 89,
    climateAdaptation: "Tropical",
    heatToleranceScore: 90,
    feedingEfficiency: 70,
    reproductiveEfficiency: 72,
    geneticTraits: ["Draught power", "Heat tolerance", "White color"]
  },
  "Tharparkar": {
    milkYield: { min: 2500, max: 3800 },
    growth: "Medium",
    diseaseResistance: 91,
    climateAdaptation: "Arid",
    heatToleranceScore: 93,
    feedingEfficiency: 75,
    reproductiveEfficiency: 74,
    geneticTraits: ["Desert adaptation", "White/gray color", "Heat tolerance"]
  },
  "Kankrej": {
    milkYield: { min: 2400, max: 3700 },
    growth: "Medium-Fast",
    diseaseResistance: 88,
    climateAdaptation: "Semi-arid",
    heatToleranceScore: 91,
    feedingEfficiency: 73,
    reproductiveEfficiency: 76,
    geneticTraits: ["Drought tolerance", "Gray-white color", "Strong build"]
  },
  "Brown Swiss": {
    milkYield: { min: 6500, max: 8000 },
    growth: "Medium-Fast",
    diseaseResistance: 83,
    climateAdaptation: "Mountain",
    heatToleranceScore: 72,
    feedingEfficiency: 85,
    reproductiveEfficiency: 80,
    geneticTraits: ["Protein rich milk", "Brown color", "Sturdy build"]
  },
  "Angus": {
    milkYield: { min: 2000, max: 3000 },
    growth: "Fast",
    diseaseResistance: 78,
    climateAdaptation: "Temperate",
    heatToleranceScore: 65,
    feedingEfficiency: 90,
    reproductiveEfficiency: 88,
    geneticTraits: ["Meat quality", "Black color", "Polled"]
  }
};

// Health issues that can affect breeding
const HEALTH_ISSUES = [
  "mastitis", "lameness", "milk fever", "ketosis", "metritis",
  "retained placenta", "displaced abomasum", "tuberculosis",
  "brucellosis", "foot and mouth", "pneumonia", "parasite"
];

const BreedingForm = () => {
  const { toast } = useToast();
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

  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  const [breedingResult, setBreedingResult] = useState<any | null>(null);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [availableBreeds, setAvailableBreeds] = useState<string[]>(Object.keys(BREED_DATA));

  useEffect(() => {
    // Reset validation errors when form data changes
    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors({});
    }
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.cowBreed) {
      errors.cowBreed = "Cow breed is required";
    }
    
    if (!formData.bullBreed) {
      errors.bullBreed = "Bull breed is required";
    }
    
    if (!formData.cowWeight) {
      errors.cowWeight = "Cow weight is required";
    } else if (Number(formData.cowWeight) < 200 || Number(formData.cowWeight) > 900) {
      errors.cowWeight = "Cow weight should be between 200-900 kg";
    }
    
    if (!formData.bullWeight) {
      errors.bullWeight = "Bull weight is required";
    } else if (Number(formData.bullWeight) < 400 || Number(formData.bullWeight) > 1200) {
      errors.bullWeight = "Bull weight should be between 400-1200 kg";
    }
    
    if (formData.cowAge && (Number(formData.cowAge) < 2 || Number(formData.cowAge) > 12)) {
      errors.cowAge = "Cow age should be between 2-12 years";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Advanced AI analysis algorithm
  const performAdvancedAnalysis = async () => {
    // Simulate network request and complex analysis
    const cowBreedData = BREED_DATA[formData.cowBreed as keyof typeof BREED_DATA] || {};
    const bullBreedData = BREED_DATA[formData.bullBreed as keyof typeof BREED_DATA] || {};
    
    // Calculate genetic compatibility based on breed profiles
    const geneticCompatibility = calculateGeneticCompatibility(cowBreedData, bullBreedData);
    
    // Detect health risks
    const healthIssues = detectHealthIssues(formData.cowHealthHistory);
    const healthRiskFactor = calculateHealthRiskFactor(healthIssues);
    
    // Calculate optimal breeding factors
    const ageCompatibility = calculateAgeCompatibility(Number(formData.cowAge));
    const weightRatio = Number(formData.bullWeight) / Number(formData.cowWeight);
    const weightCompatibility = calculateWeightCompatibility(weightRatio);
    
    // Calculate overall compatibility score
    const overallCompatibility = Math.round(
      (geneticCompatibility * 0.5) + 
      (weightCompatibility * 0.2) + 
      (ageCompatibility * 0.15) +
      ((100 - healthRiskFactor) * 0.15)
    );
    
    // Predict offspring traits
    const offspringTraits = predictOffspringTraits(cowBreedData, bullBreedData, healthRiskFactor);
    
    // Generate breeding recommendations
    const recommendations = generateBreedingRecommendations(
      formData.cowBreed, formData.bullBreed, 
      healthIssues, overallCompatibility,
      cowBreedData, bullBreedData
    );
    
    // Return comprehensive analysis
    return {
      summary: `Based on comprehensive genetic analysis, the proposed breeding pair shows ${getCompatibilityDescription(overallCompatibility)} compatibility with a ${overallCompatibility}% genetic alignment score.`,
      breedingCompatibility: overallCompatibility,
      healthRisks: {
        detectedIssues: healthIssues,
        riskFactor: healthRiskFactor,
        managementSuggestions: generateHealthManagementSuggestions(healthIssues)
      },
      offspringPredictions: {
        maleRatio: calculateGenderRatio(cowBreedData, bullBreedData),
        femaleRatio: 100 - calculateGenderRatio(cowBreedData, bullBreedData),
        milkYieldPotential: predictMilkYield(cowBreedData, bullBreedData),
        diseaseResistance: predictDiseaseResistance(cowBreedData, bullBreedData, healthRiskFactor),
        estimatedMaturityRate: predictMaturityRate(cowBreedData, bullBreedData),
        predictedTraits: offspringTraits
      },
      breedingDetails: {
        gestationPeriod: "Approximately 279-283 days",
        successRate: `${calculateSuccessRate(overallCompatibility, healthRiskFactor)}% with artificial insemination`,
        calfWeight: predictCalfWeight(formData.cowWeight, formData.bullWeight, cowBreedData, bullBreedData),
        recommendations: recommendations
      }
    };
  };

  const calculateGeneticCompatibility = (cowBreed: any, bullBreed: any): number => {
    if (!cowBreed || !bullBreed) return 60; // Default for unknown breeds
    
    // Calculate based on multiple factors
    const heatToleranceMatch = 100 - Math.abs(cowBreed.heatToleranceScore - bullBreed.heatToleranceScore) * 0.5;
    const diseaseResistanceMatch = 100 - Math.abs(cowBreed.diseaseResistance - bullBreed.diseaseResistance) * 0.5;
    const feedingEfficiencyMatch = 100 - Math.abs(cowBreed.feedingEfficiency - bullBreed.feedingEfficiency) * 0.5;
    const reproductiveEfficiencyMatch = 100 - Math.abs(cowBreed.reproductiveEfficiency - bullBreed.reproductiveEfficiency) * 0.5;
    
    // Climate adaptation compatibility
    let climateMatch = 80;
    if (cowBreed.climateAdaptation === bullBreed.climateAdaptation) {
      climateMatch = 100;
    } else if (
      (cowBreed.climateAdaptation === "Adaptable") || 
      (bullBreed.climateAdaptation === "Adaptable")
    ) {
      climateMatch = 90;
    } else if (
      (cowBreed.climateAdaptation === "Tropical" && bullBreed.climateAdaptation === "Semi-arid") ||
      (cowBreed.climateAdaptation === "Semi-arid" && bullBreed.climateAdaptation === "Tropical") ||
      (cowBreed.climateAdaptation === "Temperate" && bullBreed.climateAdaptation === "Mountain") ||
      (cowBreed.climateAdaptation === "Mountain" && bullBreed.climateAdaptation === "Temperate")
    ) {
      climateMatch = 85;
    } else {
      climateMatch = 70;
    }
    
    return Math.round(
      (heatToleranceMatch * 0.2) +
      (diseaseResistanceMatch * 0.2) +
      (feedingEfficiencyMatch * 0.2) +
      (reproductiveEfficiencyMatch * 0.2) +
      (climateMatch * 0.2)
    );
  };

  const detectHealthIssues = (healthHistory: string): string[] => {
    if (!healthHistory) return [];
    
    const lowercaseHistory = healthHistory.toLowerCase();
    return HEALTH_ISSUES.filter(issue => lowercaseHistory.includes(issue.toLowerCase()));
  };

  const calculateHealthRiskFactor = (healthIssues: string[]): number => {
    if (healthIssues.length === 0) return 0;
    
    // Assign risk weights to different health issues
    const highRiskIssues = ["tuberculosis", "brucellosis", "foot and mouth"];
    const mediumRiskIssues = ["mastitis", "metritis", "ketosis", "displaced abomasum"];
    const lowRiskIssues = ["lameness", "milk fever", "retained placenta", "pneumonia", "parasite"];
    
    let riskScore = 0;
    
    healthIssues.forEach(issue => {
      if (highRiskIssues.includes(issue)) {
        riskScore += 25;
      } else if (mediumRiskIssues.includes(issue)) {
        riskScore += 15;
      } else if (lowRiskIssues.includes(issue)) {
        riskScore += 8;
      } else {
        riskScore += 5; // Unknown issues
      }
    });
    
    // Cap the risk factor at 100
    return Math.min(riskScore, 100);
  };

  const calculateAgeCompatibility = (age: number): number => {
    if (!age) return 85; // Default if age not provided
    
    if (age >= 3 && age <= 7) {
      return 100; // Optimal breeding age
    } else if (age > 7 && age <= 9) {
      return 85;
    } else if (age > 9 && age <= 12) {
      return 70;
    } else if (age === 2) {
      return 80; // Young but acceptable
    } else {
      return 60; // Too young or too old
    }
  };

  const calculateWeightCompatibility = (weightRatio: number): number => {
    if (isNaN(weightRatio)) return 80; // Default if weights not provided
    
    // Ideal weight ratio range: 1.4 to 1.7
    if (weightRatio >= 1.4 && weightRatio <= 1.7) {
      return 100;
    } else if (weightRatio > 1.7 && weightRatio <= 1.9) {
      return 85;
    } else if (weightRatio >= 1.2 && weightRatio < 1.4) {
      return 90;
    } else if (weightRatio > 1.9 && weightRatio <= 2.1) {
      return 70;
    } else if (weightRatio >= 1.0 && weightRatio < 1.2) {
      return 75;
    } else {
      return 60; // Weight ratio too extreme
    }
  };

  const predictOffspringTraits = (cowBreed: any, bullBreed: any, healthRiskFactor: number): any[] => {
    if (!cowBreed || !bullBreed) {
      // Default traits if breed data is unavailable
      return [
        { trait: "Udder Health", probability: 75 },
        { trait: "Heat Tolerance", probability: 70 },
        { trait: "Feed Efficiency", probability: 72 },
        { trait: "Docile Temperament", probability: 80 }
      ];
    }
    
    // Realistic trait probability calculations
    const heatTolerance = Math.round((cowBreed.heatToleranceScore * 0.6 + bullBreed.heatToleranceScore * 0.4) * (1 - healthRiskFactor/200));
    const diseaseResistance = Math.round((cowBreed.diseaseResistance * 0.5 + bullBreed.diseaseResistance * 0.5) * (1 - healthRiskFactor/200));
    const feedEfficiency = Math.round((cowBreed.feedingEfficiency * 0.45 + bullBreed.feedingEfficiency * 0.55) * (1 - healthRiskFactor/300));
    
    // Determine probabilities for other traits
    let milkQuality = 70;
    if (cowBreed.milkYield.max > 7000 || bullBreed.milkYield.max > 7000) {
      milkQuality = 85;
    }
    
    const docileTemperament = Math.min(85, 70 + (feedEfficiency - 70) / 2);
    
    return [
      { trait: "Disease Resistance", probability: diseaseResistance },
      { trait: "Heat Tolerance", probability: heatTolerance },
      { trait: "Feed Efficiency", probability: feedEfficiency },
      { trait: "Milk Quality", probability: milkQuality },
      { trait: "Docile Temperament", probability: docileTemperament }
    ];
  };

  const calculateGenderRatio = (cowBreed: any, bullBreed: any): number => {
    // This is a simplified model - in reality, genetics are more complex
    if (!cowBreed || !bullBreed) return 51; // Default male ratio
    
    // Slight variation based on breed characteristics
    const baseRatio = 51; // Slightly more males on average
    const variation = (cowBreed.reproductiveEfficiency - bullBreed.reproductiveEfficiency) / 10;
    
    return Math.round(baseRatio + variation);
  };

  const predictMilkYield = (cowBreed: any, bullBreed: any): string => {
    if (!cowBreed || !bullBreed) return "Average (10-15 liters/day)";
    
    // Calculate predicted milk yield
    const cowInfluence = cowBreed.milkYield.max * 0.7; // Cow has more influence on milk traits
    const bullInfluence = (bullBreed.milkYield?.max || 0) * 0.3;
    const predictedYield = (cowInfluence + bullInfluence) * 0.85; // Regression to mean
    
    if (predictedYield > 7000) {
      return "High (18-22+ liters/day)";
    } else if (predictedYield > 5000) {
      return "Good (15-18 liters/day)";
    } else if (predictedYield > 3500) {
      return "Average (10-15 liters/day)";
    } else {
      return "Moderate (6-10 liters/day)";
    }
  };

  const predictDiseaseResistance = (cowBreed: any, bullBreed: any, healthRiskFactor: number): string => {
    if (!cowBreed || !bullBreed) return "Average";
    
    const baseResistance = (cowBreed.diseaseResistance + bullBreed.diseaseResistance) / 2;
    const adjustedResistance = baseResistance * (1 - healthRiskFactor/200);
    
    if (adjustedResistance > 90) {
      return "Excellent";
    } else if (adjustedResistance > 80) {
      return "Very Good";
    } else if (adjustedResistance > 70) {
      return "Good";
    } else if (adjustedResistance > 60) {
      return "Average";
    } else {
      return "Below Average";
    }
  };

  const predictMaturityRate = (cowBreed: any, bullBreed: any): string => {
    if (!cowBreed || !bullBreed) return "15-18 months";
    
    if (cowBreed.growth === "Fast" || bullBreed.growth === "Fast") {
      return "12-15 months";
    } else if (cowBreed.growth === "Medium-Fast" || bullBreed.growth === "Medium-Fast") {
      return "14-16 months";
    } else if (cowBreed.growth === "Medium") {
      return "15-18 months";
    } else {
      return "18-22 months";
    }
  };

  const calculateSuccessRate = (compatibility: number, healthRiskFactor: number): number => {
    // Base success rate influenced by compatibility and health risk
    let successRate = 70 + (compatibility - 70) * 0.5 - healthRiskFactor * 0.3;
    
    // Ensure reasonable bounds
    return Math.round(Math.min(Math.max(successRate, 50), 95));
  };

  const predictCalfWeight = (cowWeight: string, bullWeight: string, cowBreed: any, bullBreed: any): string => {
    if (!cowWeight || !bullWeight || !cowBreed || !bullBreed) {
      return "Expected 25-35kg at birth";
    }
    
    // Calculate based on parental weights and breed characteristics
    const cowWeightNum = Number(cowWeight);
    const bullWeightNum = Number(bullWeight);
    
    // Calf birth weight is typically 5-10% of cow weight, influenced by bull
    const cowFactor = cowWeightNum * 0.07;
    const bullFactor = bullWeightNum * 0.025;
    
    const predictedCalfWeight = Math.round(cowFactor + bullFactor);
    const minWeight = Math.max(20, predictedCalfWeight - 4);
    const maxWeight = predictedCalfWeight + 4;
    
    return `Expected ${minWeight}-${maxWeight}kg at birth`;
  };

  const getCompatibilityDescription = (score: number): string => {
    if (score >= 90) return "excellent";
    if (score >= 80) return "very good";
    if (score >= 70) return "good";
    if (score >= 60) return "moderate";
    return "challenging";
  };

  const generateBreedingRecommendations = (
    cowBreed: string, 
    bullBreed: string, 
    healthIssues: string[], 
    compatibility: number,
    cowBreedData: any,
    bullBreedData: any
  ): string[] => {
    const recommendations: string[] = [];
    
    // Basic breeding window recommendation
    recommendations.push(
      "Schedule breeding during the cow's standing heat for optimal success rate"
    );
    
    // Climate-based recommendations
    if (cowBreedData?.climateAdaptation === "Tropical" || bullBreedData?.climateAdaptation === "Tropical") {
      recommendations.push("Schedule breeding during cooler months or cooler times of day");
    }
    
    // Health-based recommendations
    if (healthIssues.length > 0) {
      recommendations.push(
        "Complete a full course of treatment for existing health conditions before breeding"
      );
    }
    
    // Nutrition recommendations
    recommendations.push(
      "Implement balanced nutrition program with mineral supplements 3-4 weeks before breeding"
    );
    
    // Compatibility-based recommendations
    if (compatibility < 70) {
      recommendations.push(
        "Consider veterinary hormone intervention to increase success probability"
      );
    }
    
    // Breed-specific recommendations
    if ((cowBreed === "Holstein-Friesian" && bullBreed === "Jersey") || 
        (cowBreed === "Jersey" && bullBreed === "Holstein-Friesian")) {
      recommendations.push(
        "This cross typically produces offspring with balanced milk production and improved fertility"
      );
    }
    
    if ((cowBreed === "Gir" || bullBreed === "Gir") || 
        (cowBreed === "Sahiwal" || bullBreed === "Sahiwal")) {
      recommendations.push(
        "The zebu influence should improve heat tolerance in offspring; monitor for improved tick resistance"
      );
    }
    
    return recommendations;
  };

  const generateHealthManagementSuggestions = (healthIssues: string[]): string[] => {
    if (healthIssues.length === 0) {
      return ["Maintain regular vaccination schedule", "Continue preventive parasite control"];
    }
    
    const suggestions: string[] = [];
    
    if (healthIssues.includes("mastitis")) {
      suggestions.push("Complete antibiotics course and implement improved milking hygiene");
    }
    
    if (healthIssues.includes("lameness")) {
      suggestions.push("Regular hoof trimming and provide soft bedding surfaces");
    }
    
    if (healthIssues.includes("ketosis") || healthIssues.includes("milk fever")) {
      suggestions.push("Adjust transition diet with proper mineral balance before breeding");
    }
    
    if (healthIssues.includes("metritis") || healthIssues.includes("retained placenta")) {
      suggestions.push("Allow complete uterine recovery before breeding (minimum 60 days)");
    }
    
    if (healthIssues.includes("tuberculosis") || healthIssues.includes("brucellosis")) {
      suggestions.push("NOT RECOMMENDED FOR BREEDING - serious infectious disease detected");
    }
    
    if (healthIssues.includes("parasite")) {
      suggestions.push("Complete deworming treatment at least 30 days before breeding");
    }
    
    if (suggestions.length === 0) {
      suggestions.push("Consult with veterinarian for specific treatment protocols");
    }
    
    return suggestions;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      toast({
        title: "Validation Failed",
        description: "Please check the form for errors",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    setBreedingResult(null);
    setAnalysisProgress(0);

    // Simulate progressive analysis with incremental progress updates
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        return newProgress > 95 ? 95 : newProgress;
      });
    }, 200);
    
    try {
      // Simulate AI analysis with realistic timing
      await new Promise(resolve => setTimeout(resolve, 2800));
      
      // Perform the advanced analysis
      const analysisResult = await performAdvancedAnalysis();
      
      clearInterval(progressInterval);
      setAnalysisProgress(100);
      setBreedingResult(analysisResult);
      setActiveTab("overview");
      
      // Show success toast
      toast({
        title: "Analysis Complete",
        description: "AI breeding recommendation is ready",
      });
    } catch (error) {
      clearInterval(progressInterval);
      console.error("Analysis error:", error);
      
      toast({
        title: "Analysis Failed",
        description: "There was an error generating the breeding recommendation",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
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
                      className={validationErrors.cowBreed ? "border-red-500" : ""}
                      required
                    />
                    {validationErrors.cowBreed && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.cowBreed}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="bullBreed">Bull Breed</Label>
                    <Select 
                      value={formData.bullBreed} 
                      onValueChange={(value) => setFormData(prevState => ({ ...prevState, bullBreed: value }))}
                    >
                      <SelectTrigger className={`w-full ${validationErrors.bullBreed ? "border-red-500" : ""}`}>
                        <SelectValue placeholder="Select bull breed" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableBreeds.map(breed => (
                          <SelectItem key={breed} value={breed}>{breed}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {validationErrors.bullBreed && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.bullBreed}</p>
                    )}
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
                      className={validationErrors.cowAge ? "border-red-500" : ""}
                    />
                    {validationErrors.cowAge && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.cowAge}</p>
                    )}
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
                      className={validationErrors.cowWeight ? "border-red-500" : ""}
                      required
                    />
                    {validationErrors.cowWeight && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.cowWeight}</p>
                    )}
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
                      className={validationErrors.bullWeight ? "border-red-500" : ""}
                      required
                    />
                    {validationErrors.bullWeight && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.bullWeight}</p>
                    )}
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
                      {analysisProgress < 25 ? "Analyzing genetic profiles..." : 
                       analysisProgress < 50 ? "Calculating breed compatibility factors..." : 
                       analysisProgress < 75 ? "Generating health risk assessment..." : 
                       analysisProgress < 90 ? "Predicting offspring characteristics..." : 
                       "Finalizing breeding recommendations..."}
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
                      <TabsTrigger value="health" className="flex-1">Health</TabsTrigger>
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
                      
                      {breedingResult.healthRisks.detectedIssues.length > 0 && (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
                          <div className="flex">
                            <AlertCircle className="h-5 w-5 text-yellow-400 mr-2" />
                            <p className="text-sm text-yellow-700">
                              Health concerns detected that may affect breeding success. See the Health tab for details.
                            </p>
                          </div>
                        </div>
                      )}
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
                    
                    <TabsContent value="health" className="space-y-4 pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-5 w-5 text-primary" />
                        <h3 className="text-lg font-medium">Health Assessment</h3>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium">Health Risk Factor</p>
                          <div className="flex items-center mt-1">
                            <Progress 
                              value={breedingResult.healthRisks.riskFactor} 
                              className={`h-2 ${
                                breedingResult.healthRisks.riskFactor > 60 ? "bg-red-100" : 
                                breedingResult.healthRisks.riskFactor > 30 ? "bg-yellow-100" : 
                                "bg-green-100"
                              }`} 
                            />
                            <span className="ml-2 text-sm">
                              {breedingResult.healthRisks.riskFactor}%
                            </span>
                          </div>
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium">Detected Health Issues</p>
                          {breedingResult.healthRisks.detectedIssues.length > 0 ? (
                            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mt-1">
                              {breedingResult.healthRisks.detectedIssues.map((issue: string, index: number) => (
                                <li key={index} className="capitalize">{issue}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-muted-foreground mt-1">No significant health issues detected</p>
                          )}
                        </div>
                        
                        <div>
                          <p className="text-sm font-medium">Management Suggestions</p>
                          <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground mt-1">
                            {breedingResult.healthRisks.managementSuggestions.map((suggestion: string, index: number) => (
                              <li key={index}>{suggestion}</li>
                            ))}
                          </ul>
                        </div>
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
