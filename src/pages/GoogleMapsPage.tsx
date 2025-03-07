
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { 
  Map, 
  Navigation, 
  Info, 
  MapPin, 
  ExternalLink 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GlassCard from '@/components/ui/GlassCard';
import { 
  cowSanctuaries, 
  indigenousCowBreeds, 
  getAllUniqueServices,
  filterSanctuariesByService,
  Location
} from '@/lib/google-maps';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

const GoogleMapsPage = () => {
  const [selectedService, setSelectedService] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('sanctuaries');
  const [services, setServices] = useState<string[]>([]);

  useEffect(() => {
    setServices(getAllUniqueServices());
  }, []);

  const handleViewOnGoogleMaps = (location: Location) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
    window.open(url, '_blank');
  };

  const handleViewAllSanctuaries = () => {
    // Center of India
    const url = 'https://www.google.com/maps/search/cow+sanctuary+india';
    window.open(url, '_blank');
  };

  const handleViewAllBreeds = () => {
    const url = 'https://www.google.com/maps/search/indigenous+cow+breeds+india';
    window.open(url, '_blank');
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
  };

  const displayedSanctuaries = selectedService === 'all' 
    ? cowSanctuaries 
    : filterSanctuariesByService(selectedService);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center mb-6">
            <Map className="w-8 h-8 text-primary mr-3" />
            <h1 className="text-3xl font-bold">GauSeva Sanctuary Locator</h1>
            <div className="ml-auto">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={activeTab === 'sanctuaries' ? handleViewAllSanctuaries : handleViewAllBreeds}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>View All on Google Maps</span>
              </Button>
            </div>
          </div>

          <Tabs defaultValue="sanctuaries" className="mb-6" onValueChange={handleTabChange}>
            <TabsList className="mb-4">
              <TabsTrigger value="sanctuaries" className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>Cow Sanctuaries</span>
              </TabsTrigger>
              <TabsTrigger value="breeds" className="flex items-center gap-1">
                <Info className="w-4 h-4" />
                <span>Indigenous Breeds</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sanctuaries" className="space-y-4">
              <div className="flex justify-end">
                <Select value={selectedService} onValueChange={handleServiceChange}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Services</SelectItem>
                    {services.map((service, index) => (
                      <SelectItem key={index} value={service}>{service}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="text-sm bg-primary/10 p-4 rounded-lg mb-4">
                <p>
                  <strong>Cow sanctuaries across India.</strong> These centers support indigenous cow 
                  conservation, offering medical care, rehabilitation, and sustainable cow product development.
                  Click on any sanctuary to view it on Google Maps.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {displayedSanctuaries.map((sanctuary, index) => (
                  <GlassCard key={index} className="h-full cursor-pointer hover:shadow-md transition-shadow" 
                    onClick={() => handleViewOnGoogleMaps(sanctuary)}>
                    <div className="flex flex-col h-full">
                      <h3 className="font-medium text-lg">{sanctuary.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{sanctuary.address}</p>
                      <p className="text-sm mb-3">Capacity: {sanctuary.capacity} cows</p>
                      <div className="flex flex-wrap gap-1 mt-auto">
                        {sanctuary.services?.map((service, i) => (
                          <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                            {service}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center mt-3 text-primary">
                        <ExternalLink className="w-3.5 h-3.5 mr-1" />
                        <span className="text-xs">View on Google Maps</span>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="breeds" className="space-y-4">
              <div className="text-sm bg-amber-100 p-4 rounded-lg mb-4">
                <p>
                  <strong>Indigenous cow breed origins across India.</strong> These native breeds are 
                  adapted to local climates, possess natural disease resistance, and are essential to 
                  India's biodiversity and cultural heritage. Click on any breed to view its location on Google Maps.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {indigenousCowBreeds.map((breed, index) => (
                  <GlassCard key={index} className="h-full cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleViewOnGoogleMaps(breed)}>
                    <div className="flex flex-col h-full">
                      <h3 className="font-medium text-lg text-amber-800">{breed.breed}</h3>
                      <p className="text-sm mb-1"><strong>Region:</strong> {breed.region}</p>
                      <p className="text-sm mb-3"><strong>Milk Yield:</strong> {breed.milkYield}</p>
                      <p className="text-sm text-muted-foreground">{breed.description}</p>
                      <div className="flex items-center mt-3 text-amber-800">
                        <ExternalLink className="w-3.5 h-3.5 mr-1" />
                        <span className="text-xs">View on Google Maps</span>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <GlassCard className="text-sm mt-8">
            <h3 className="font-medium mb-2">About GauSeva Sanctuary Locator</h3>
            <p className="text-muted-foreground mb-3">
              This page helps locate cow sanctuaries (gaushalas) across India and 
              provides information about indigenous cow breeds. Our mission is to support conservation of native 
              cow breeds, which are vital for sustainable agriculture and India's biodiversity.
            </p>
            <p className="text-xs text-muted-foreground">
              Powered by Google Maps | Part of the GauSeva solution for indigenous cow conservation
            </p>
          </GlassCard>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GoogleMapsPage;
