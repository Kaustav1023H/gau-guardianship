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
import { Scale } from "lucide-react";
import GlassCard from "../ui/GlassCard";

const BreedingForm = () => {
  const [formData, setFormData] = useState({
    cowBreed: "",
    bullBreed: "",
    cowWeight: "",
    bullWeight: "",
    breedingNotes: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [breedingResult, setBreedingResult] = useState<string | null>(null);

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

    // Simulate an API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate a successful breeding recommendation
    setBreedingResult("Based on the provided information, the system recommends prioritizing bulls with high scores in Disease Resistance and Milk Production to enhance the offspring's resilience and productivity.");
    setIsLoading(false);
  };

  return (
    <section className="py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Breeding Form */}
          <div>
            <h2 className="text-3xl font-semibold mb-6">Optimize Your Breeding Strategy</h2>
            <GlassCard className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
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
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="cowWeight">Cow Weight (kg)</Label>
                  <Input
                    type="number"
                    id="cowWeight"
                    name="cowWeight"
                    value={formData.cowWeight}
                    onChange={handleChange}
                    placeholder="Enter cow weight in kg"
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
                    placeholder="Enter bull weight in kg"
                    required
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
                    rows={4}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      Analyzing <span className="loading-dots"></span>
                    </>
                  ) : (
                    "Get Recommendation"
                  )}
                </Button>
              </form>
            </GlassCard>
          </div>

          {/* Breeding Result */}
          <div>
            <h2 className="text-3xl font-semibold mb-6">Breeding Recommendation</h2>
            <GlassCard className="p-6 flex flex-col items-center justify-center">
              {breedingResult ? (
                <>
                  <Scale className="h-10 w-10 text-primary mb-4" />
                  <p className="text-lg text-center">{breedingResult}</p>
                </>
              ) : (
                <p className="text-muted-foreground text-center">
                  Fill out the form to receive a breeding recommendation.
                </p>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BreedingForm;
