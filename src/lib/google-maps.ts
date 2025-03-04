/**
 * Google Maps API integration utilities for GauGuardianship
 */

// Define response interface for type safety
export interface Location {
  lat: number;
  lng: number;
  address?: string;
  name?: string;
  capacity?: number;
  services?: string[];
}

// List of predefined cow sanctuary locations in India with additional data
export const cowSanctuaries: Location[] = [
  { 
    lat: 28.6139, 
    lng: 77.2090, 
    name: "Shree Krishna Gaushala", 
    address: "Delhi, India",
    capacity: 500,
    services: ["Medical care", "Food production", "Biogas generation"]
  },
  { 
    lat: 26.9124, 
    lng: 75.7873, 
    name: "Hingonia Gaushala", 
    address: "Jaipur, Rajasthan",
    capacity: 1200,
    services: ["Elderly cow care", "Dairy products", "Organic fertilizer"]
  },
  { 
    lat: 23.0225, 
    lng: 72.5714, 
    name: "Ahmedabad Gaushala", 
    address: "Ahmedabad, Gujarat",
    capacity: 800,
    services: ["Rescue operations", "Panchagavya production", "Education center"]
  },
  { 
    lat: 19.0760, 
    lng: 72.8777, 
    name: "Mumbai Gau Seva Mandal", 
    address: "Mumbai, Maharashtra",
    capacity: 350,
    services: ["Rescue", "Rehabilitation", "Cow products"]
  },
  { 
    lat: 12.9716, 
    lng: 77.5946, 
    name: "Bangalore Gaushala", 
    address: "Bangalore, Karnataka",
    capacity: 450,
    services: ["Indigenous breed conservation", "Research center", "Milk production"]
  },
  { 
    lat: 22.5726, 
    lng: 88.3639, 
    name: "Kolkata Gosala", 
    address: "Kolkata, West Bengal",
    capacity: 300,
    services: ["Shelter", "Medical treatment", "Educational tours"]
  },
  { 
    lat: 17.3850, 
    lng: 78.4867, 
    name: "Hyderabad Gau Raksha", 
    address: "Hyderabad, Telangana",
    capacity: 600,
    services: ["Breed preservation", "Cow adoption programs", "Ayurvedic products"]
  },
  { 
    lat: 13.0827, 
    lng: 80.2707, 
    name: "Chennai Gaushala Trust", 
    address: "Chennai, Tamil Nadu",
    capacity: 400,
    services: ["Rehabilitation", "Dairy production", "Educational programs"]
  }
];

// These are hardcoded indigenous cow breeds with their specific locations for the map visualization
export const indigenousCowBreeds = [
  { breed: "Gir", lat: 21.5222, lng: 70.1891, region: "Gujarat", milkYield: "16-20 liters/day", description: "Known for high resistance to diseases and adaptability" },
  { breed: "Sahiwal", lat: 30.6520, lng: 75.6102, region: "Punjab/Haryana", milkYield: "10-15 liters/day", description: "Heat tolerant and tick resistant" },
  { breed: "Red Sindhi", lat: 24.8607, lng: 67.0011, region: "Originally from Sindh", milkYield: "8-12 liters/day", description: "Adapted to harsh climate" },
  { breed: "Tharparkar", lat: 26.9157, lng: 71.1500, region: "Rajasthan", milkYield: "7-10 liters/day", description: "Excellent in desert conditions" },
  { breed: "Rathi", lat: 28.0229, lng: 73.3119, region: "Rajasthan", milkYield: "6-8 liters/day", description: "Good dual-purpose breed" },
  { breed: "Kankrej", lat: 24.2618, lng: 71.2924, region: "Gujarat/Rajasthan", milkYield: "5-8 liters/day", description: "Excellent draft breed" },
  { breed: "Ongole", lat: 15.5057, lng: 80.0499, region: "Andhra Pradesh", milkYield: "4-7 liters/day", description: "Large build, good for draft work" },
  { breed: "Kangayam", lat: 10.5889, lng: 77.5703, region: "Tamil Nadu", milkYield: "3-6 liters/day", description: "Sturdy work animal" }
];

// Initialize the Google Maps API
export const initializeGoogleMaps = (
  apiKey: string = "AIzaSyC8S0v8H4NT76nd3QS6ELI7gHzzhxBMj1o", // Public API key with restrictions
  callback?: () => void
): void => {
  // Skip if Google Maps is already loaded
  if (window.google && window.google.maps) {
    if (callback) callback();
    return;
  }

  // Create script element
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`;
  script.async = true;
  script.defer = true;

  // Set global callback
  window.initMap = callback || (() => {
    console.log("Google Maps initialized");
  });

  // Append script to document
  document.head.appendChild(script);
};

// Find nearest sanctuaries to a location
export const findNearestSanctuaries = (
  location: Location,
  limit: number = 3
): Location[] => {
  // Calculate distances
  const sanctuariesWithDistance = cowSanctuaries.map(sanctuary => {
    const distance = calculateDistance(
      location.lat, location.lng,
      sanctuary.lat, sanctuary.lng
    );
    return { ...sanctuary, distance };
  });

  // Sort by distance and return top N
  return sanctuariesWithDistance
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit);
};

// Calculate distance between two points using Haversine formula
export const calculateDistance = (
  lat1: number, 
  lon1: number, 
  lat2: number, 
  lon2: number
): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  const distance = R * c; // Distance in km
  return distance;
};

// Convert degrees to radians
const deg2rad = (deg: number): number => {
  return deg * (Math.PI/180);
};

// Filter sanctuaries by services offered
export const filterSanctuariesByService = (
  service: string
): Location[] => {
  return cowSanctuaries.filter(sanctuary => 
    sanctuary.services && sanctuary.services.some(s => 
      s.toLowerCase().includes(service.toLowerCase())
    )
  );
};

// Get all unique services offered by sanctuaries
export const getAllUniqueServices = (): string[] => {
  const allServices = new Set<string>();
  
  cowSanctuaries.forEach(sanctuary => {
    sanctuary.services?.forEach(service => {
      allServices.add(service);
    });
  });
  
  return Array.from(allServices);
};

// Add type definition for the global window object
declare global {
  interface Window {
    initMap: () => void;
    google: any;
  }
}
