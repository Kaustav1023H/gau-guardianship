
import React, { useEffect, useState, useRef } from 'react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GlassCard from '@/components/ui/GlassCard';
import { initializeGoogleMaps, cowSanctuaries, findNearestSanctuaries, Location } from '@/lib/google-maps';
import { Map, Navigation, Info, Home, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const GoogleMapsPage = () => {
  const { toast: hookToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [nearestSanctuaries, setNearestSanctuaries] = useState<Location[]>([]);
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    // Initialize Google Maps
    initializeGoogleMaps(undefined, () => {
      if (mapRef.current) {
        // Create map centered on India
        const indiaCenter = { lat: 20.5937, lng: 78.9629 };
        googleMapRef.current = new window.google.maps.Map(mapRef.current, {
          center: indiaCenter,
          zoom: 5,
          mapTypeId: window.google.maps.MapTypeId.ROADMAP,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
        });

        // Add markers for cow sanctuaries
        addSanctuaryMarkers();
        setLoading(false);
      }
    });

    // Get user's location if available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLoc = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userLoc);
          
          // Find nearest sanctuaries
          const nearest = findNearestSanctuaries(userLoc);
          setNearestSanctuaries(nearest);
          
          // Center map on user location and add marker
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
      // Clear markers on unmount
      if (markersRef.current) {
        markersRef.current.forEach(marker => marker.setMap(null));
      }
    };
  }, []);

  const addSanctuaryMarkers = () => {
    if (!googleMapRef.current) return;
    
    // Clear existing markers
    if (markersRef.current) {
      markersRef.current.forEach(marker => marker.setMap(null));
    }
    
    markersRef.current = cowSanctuaries.map(sanctuary => {
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
      
      // Add info window
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 10px;">
            <h3 style="margin: 0 0 5px; font-weight: bold;">${sanctuary.name}</h3>
            <p style="margin: 0;">${sanctuary.address}</p>
          </div>
        `
      });
      
      marker.addListener('click', () => {
        infoWindow.open(googleMapRef.current, marker);
      });
      
      return marker;
    });
  };

  const handleShowDirections = (sanctuary: Location) => {
    if (!userLocation) {
      toast('Please allow location access to show directions', {
        position: 'bottom-right',
      });
      return;
    }
    
    // Open Google Maps directions in a new tab
    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${sanctuary.lat},${sanctuary.lng}`;
    window.open(url, '_blank');
  };

  const handleCenterOnIndia = () => {
    if (googleMapRef.current) {
      googleMapRef.current.setCenter({ lat: 20.5937, lng: 78.9629 });
      googleMapRef.current.setZoom(5);
    }
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
                  <h2 className="text-xl font-semibold">Nearby Cow Sanctuaries</h2>
                </div>
                
                {userLocation ? (
                  nearestSanctuaries.length > 0 ? (
                    <div className="space-y-4">
                      {nearestSanctuaries.map((sanctuary, index) => (
                        <div key={index} className="p-3 bg-muted rounded-lg">
                          <h3 className="font-medium">{sanctuary.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{sanctuary.address}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
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
                )}
              </GlassCard>
              
              <GlassCard className="text-sm">
                <h3 className="font-medium mb-2">About GauSeva Sanctuary Locator</h3>
                <p className="text-muted-foreground">
                  This map shows cow sanctuaries (gaushalas) across India. These sanctuaries provide care and protection for cows, which are sacred in Hindu tradition. Enable location services to find sanctuaries nearest to you.
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
