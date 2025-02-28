
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
import { Dna, ChevronRight, Mic } from "lucide-react";
import { toast } from "sonner";

type BreedingData = {
  cowId: string;
  breed: string;
  age: string;
  milkYield: string;
  healthHistory: string;
};

const BreedingForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);

  const form = useForm<BreedingData>({
    defaultValues: {
      cowId: "",
      breed: "",
      age: "",
      milkYield: "",
      healthHistory: ""
    }
  });

  const onSubmit = (data: BreedingData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Submitted data:", data);
      setIsLoading(false);
      toast.success("Cow data submitted successfully");
      form.reset();
    }, 1500);
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

  return (
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

            <Button 
              type="submit" 
              className="w-full flex items-center justify-center"
              disabled={isLoading}
            >
              {isLoading ? (
                <>Analyzing<span className="loading-dots">...</span></>
              ) : (
                <>
                  Get Breeding Recommendations
                  <ChevronRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BreedingForm;
