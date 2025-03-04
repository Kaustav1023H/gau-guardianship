
/**
 * Google Maps API integration utilities
 */

// Define response interface for type safety
export interface Location {
  lat: number;
  lng: number;
  address?: string;
  name?: string;
}

// List of predefined cow sanctuary locations in India
export const cowSanctuaries: Location[] = [
  { lat: 28.6139, lng: 77.2090, name: "Shree Krishna Gaushala", address: "Delhi, India" },
  { lat: 26.9124, lng: 75.7873, name: "Hingonia Gaushala", address: "Jaipur, Rajasthan" },
  { lat: 23.0225, lng: 72.5714, name: "Ahmedabad Gaushala", address: "Ahmedabad, Gujarat" },
  { lat: 19.0760, lng: 72.8777, name: "Mumbai Gau Seva Mandal", address: "Mumbai, Maharashtra" },
  { lat: 12.9716, lng: 77.5946, name: "Bangalore Gaushala", address: "Bangalore, Karnataka" },
  { lat: 22.5726, lng: 88.3639, name: "Kolkata Gosala", address: "Kolkata, West Bengal" },
  { lat: 17.3850, lng: 78.4867, name: "Hyderabad Gau Raksha", address: "Hyderabad, Telangana" },
  { lat: 13.0827, lng: 80.2707, name: "Chennai Gaushala Trust", address: "Chennai, Tamil Nadu" }
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

// Add type definition for the global window object
declare global {
  interface Window {
    initMap: () => void;
    google: any;
  }
}
