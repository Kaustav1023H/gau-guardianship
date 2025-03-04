import React, { useEffect, useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GlassCard from '@/components/ui/GlassCard';
import { 
  initializeGoogleMaps, 
  cowSanctuaries, 
  findNearestSanctuaries, 
  Location, 
  filterSanctuariesByService,
  getAllUniqueServices,
  indigenousCowBreeds
} from '@/lib/google-maps';
import { 
  Map, 
  Navigation, 
  Info, 
  Home, 
  MapPin, 
  Filter, 
  Search, 
  Leaf 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const GoogleMapsPage = () => {
  const { toast: hookToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [nearestSanctuaries, setNearestSanctuaries] = useState<Location[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [selectedService, setSelectedService] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('sanctuaries');
  const [services, setServices] = useState<string[]>([]);

  useEffect(() => {
    setServices(getAllUniqueServices());
    
    initializeGoogleMaps(undefined, () => {
      if (mapRef.current) {
        const indiaCenter = { lat: 20.5937, lng: 78.9629 };
        googleMapRef.current = new window.google.maps.Map(mapRef.current, {
          center: indiaCenter,
          zoom: 5,
          mapTypeId: window.google.maps.MapTypeId.ROADMAP,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
        });

        showMarkersBasedOnTab();
        setLoading(false);
      }
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userLoc);
          
          const nearest = findNearestSanctuaries(userLoc);
          setNearestSanctuaries(nearest);
          
          if (googleMapRef.current) {
            googleMapRef.current.setCenter(userLoc);
            googleMapRef.current.setZoom(8);
            
            new window.google.maps.Marker({
              position: userLoc,
              map: googleMapRef.current,
              icon: {
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#4285F4',
                fillOpacity: 1,
                strokeColor: '#FFFFFF',
                strokeWeight: 2,
              },
              title: 'Your Location'
            });
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          hookToast({
            title: 'Location access denied',
            description: 'Using default view of India',
            variant: 'default',
          });
        }
      );
    }

    return () => {
      if (markersRef.current) {
        markersRef.current.forEach(marker => marker.setMap(null));
      }
    };
  }, []);

  useEffect(() => {
    showMarkersBasedOnTab();
  }, [activeTab, selectedService]);

  const showMarkersBasedOnTab = () => {
    if (!googleMapRef.current) return;
    
    if (markersRef.current) {
      markersRef.current.forEach(marker => marker.setMap(null));
    }
    
    if (activeTab === 'sanctuaries') {
      const displayedSanctuaries = selectedService === 'all' 
        ? cowSanctuaries 
        : filterSanctuariesByService(selectedService);
      
      markersRef.current = displayedSanctuaries.map(sanctuary => {
        const marker = new window.google.maps.Marker({
          position: { lat: sanctuary.lat, lng: sanctuary.lng },
          map: googleMapRef.current,
          title: sanctuary.name,
          animation: window.google.maps.Animation.DROP,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(32, 32),
          },
        });
        
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 12px; max-width: 300px;">
              <h3 style="margin: 0 0 8px; font-weight: bold; color: #16a34a;">${sanctuary.name}</h3>
              <p style="margin: 0 0 8px;"><strong>Address:</strong> ${sanctuary.address}</p>
              <p style="margin: 0 0 8px;"><strong>Capacity:</strong> ${sanctuary.capacity} cows</p>
              <div style="margin: 0 0 8px;">
                <strong>Services:</strong>
                <ul style="margin: 4px 0 0 16px; padding: 0;">
                  ${sanctuary.services?.map(service => `<li>${service}</li>`).join('') || ''}
                </ul>
              </div>
            </div>
          `
        });
        
        marker.addListener('click', () => {
          infoWindow.open(googleMapRef.current, marker);
        });
        
        return marker;
      });
    } else if (activeTab === 'breeds') {
      markersRef.current = indigenousCowBreeds.map(breed => {
        const marker = new window.google.maps.Marker({
          position: { lat: breed.lat, lng: breed.lng },
          map: googleMapRef.current,
          title: breed.breed,
          animation: window.google.maps.Animation.DROP,
          icon: {
            url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b45309" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22c-4.97 0-9-1.79-9-4v-3.83c0-.79.32-1.54.89-2.09.56-.56 1.33-.89 2.11-.89.78 0 1.55.33 2.11.89.57.55.89 1.3.89 2.09.78 0 1.55.33 2.11.89.57.55.89 1.3.89 2.09.78 0 1.55.33 2.11.89.57.55.89 1.3.89 2.09V22Z"/>
                <path d="M19 5.5C19 6.88 17.88 8 16.5 8S14 6.88 14 5.5C14 4.12 16.5 2 16.5 2S19 4.12 19 5.5Z"/>
                <path d="M13 5.5C13 6.88 11.88 8 10.5 8S8 6.88 8 5.5C8 4.12 10.5 2 10.5 2S13 4.12 13 5.5Z"/>
                <path d="M7 5.5C7 6.88 5.88 8 4.5 8S2 6.88 2 5.5C2 4.12 4.5 2 4.5 2S7 4.12 7 5.5Z"/>
                <path d="M16.35 22h.65c.78 0 1.55-.33 2.11-.89.57-.55.89-1.3.89-2.11v-3.89c0-.81-.33-1.56-.89-2.11-.57-.55-1.33-.89-2.11-.89v6.89Z"/>
              </svg>
            `),
            scaledSize: new window.google.maps.Size(36, 36),
          },
        });
        
        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 12px; max-width: 300px;">
              <h3 style="margin: 0 0 8px; font-weight: bold; color: #b45309;">${breed.breed}</h3>
              <p style="margin: 0 0 8px;"><strong>Region:</strong> ${breed.region}</p>
              <p style="margin: 0 0 8px;"><strong>Milk Yield:</strong> ${breed.milkYield}</p>
              <p style="margin: 0 0 8px;"><strong>Characteristics:</strong> ${breed.description}</p>
            </div>
          `
        });
        
        marker.addListener('click', () => {
          infoWindow.open(googleMapRef.current, marker);
        });
        
        return marker;
      });
    }
    
    if (markersRef.current.length > 0 && googleMapRef.current) {
      const bounds = new window.google.maps.LatLngBounds();
      markersRef.current.forEach(marker => {
        bounds.extend(marker.getPosition());
      });
      googleMapRef.current.fitBounds(bounds);
      
      const listener = window.google.maps.event.addListener(googleMapRef.current, "idle", function() { 
        if (googleMapRef.current.getZoom() > 7) googleMapRef.current.setZoom(7); 
        window.google.maps.event.removeListener(listener); 
      });
    }
  };

  const handleShowDirections = (sanctuary: Location) => {
    if (!userLocation) {
      toast('Please allow location access to show directions', {
        position: 'bottom-right',
      });
      return;
    }
    
    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${sanctuary.lat},${sanctuary.lng}`;
    window.open(url, '_blank');
  };

  const handleCenterOnIndia = () => {
    if (googleMapRef.current) {
      googleMapRef.current.setCenter({ lat: 20.5937, lng: 78.9629 });
      googleMapRef.current.setZoom(5);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (value === 'breeds') {
      setSelectedService('all');
    }
  };

  const handleServiceChange = (value: string) => {
    setSelectedService(value);
  };

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
                onClick={handleCenterOnIndia}
              >
                <Home className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Show All India</span>
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
                <Leaf className="w-4 h-4" />
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
                  <strong>Showing cow sanctuaries across India.</strong> These centers support indigenous cow 
                  conservation, offering medical care, rehabilitation, and sustainable cow product development.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="breeds" className="space-y-4">
              <div className="text-sm bg-amber-100 p-4 rounded-lg mb-4">
                <p>
                  <strong>Showing indigenous cow breed origins across India.</strong> These native breeds are 
                  adapted to local climates, possess natural disease resistance, and are essential to 
                  India's biodiversity and cultural heritage.
                </p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <GlassCard className="mb-6 p-0 overflow-hidden h-[500px]">
                {loading ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                      <p className="mt-4 text-muted-foreground">Loading map...</p>
                    </div>
                  </div>
                ) : (
                  <div ref={mapRef} className="w-full h-full"></div>
                )}
              </GlassCard>
            </div>
            
            <div>
              <GlassCard className="mb-6">
                <div className="flex items-center mb-4">
                  <Info className="w-5 h-5 text-primary mr-2" />
                  <h2 className="text-xl font-semibold">
                    {activeTab === 'sanctuaries' ? 'Nearby Cow Sanctuaries' : 'Indigenous Cow Breeds'}
                  </h2>
                </div>
                
                {activeTab === 'sanctuaries' ? (
                  userLocation ? (
                    nearestSanctuaries.length > 0 ? (
                      <div className="space-y-4">
                        {nearestSanctuaries.map((sanctuary, index) => (
                          <div key={index} className="p-3 bg-muted rounded-lg">
                            <h3 className="font-medium">{sanctuary.name}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{sanctuary.address}</p>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {sanctuary.services?.map((service, i) => (
                                <span key={i} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                                  {service}
                                </span>
                              ))}
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded">
                                {Math.round((sanctuary as any).distance)} km away
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-xs"
                                onClick={() => handleShowDirections(sanctuary)}
                              >
                                <Navigation className="w-3 h-3 mr-1" />
                                Directions
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">Finding nearby sanctuaries...</p>
                    )
                  ) : (
                    <div className="text-center py-4">
                      <MapPin className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">Enable location services to find nearby sanctuaries</p>
                      <Button 
                        className="mt-2" 
                        variant="outline"
                        onClick={() => {
                          navigator.geolocation.getCurrentPosition(
                            (position) => {
                              const userLoc = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude
                              };
                              setUserLocation(userLoc);
                              const nearest = findNearestSanctuaries(userLoc);
                              setNearestSanctuaries(nearest);
                            },
                            (error) => {
                              hookToast({
                                title: 'Error',
                                description: 'Could not access your location',
                                variant: 'destructive',
                              });
                            }
                          );
                        }}
                      >
                        Share Location
                      </Button>
                    </div>
                  )
                ) : (
                  <div className="space-y-3">
                    {indigenousCowBreeds.map((breed, index) => (
                      <div key={index} className="p-3 bg-amber-50 rounded-lg">
                        <h3 className="font-medium text-amber-800">{breed.breed}</h3>
                        <p className="text-xs text-amber-700 mb-1">Region: {breed.region}</p>
                        <p className="text-sm text-muted-foreground mb-1">{breed.description}</p>
                        <div className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded inline-block">
                          Milk yield: {breed.milkYield}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </GlassCard>
              
              <GlassCard className="text-sm">
                <h3 className="font-medium mb-2">About GauSeva Sanctuary Locator</h3>
                <p className="text-muted-foreground mb-3">
                  This interactive Google Maps integration helps locate cow sanctuaries (gaushalas) across India and 
                  provides information about indigenous cow breeds. Our mission is to support conservation of native 
                  cow breeds, which are vital for sustainable agriculture and India's biodiversity.
                </p>
                <p className="text-xs text-muted-foreground">
                  Powered by Google Maps Platform | Part of the Google Solution Challenge submission
                </p>
              </GlassCard>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GoogleMapsPage;
