import { createContext, useState, useContext, useEffect, ReactNode } from "react";

// Define your data types
export interface Property {
  id: number;
  title: string;
  location: string;
  type: string;
  price: number;
  image: string;
  rating?: number;
  panoramaImages?: string[];
  beds?: number;
  baths?: number;
  guests?: number;
  amenities?: string[];
  description?: string;
  featured?: boolean;
}

export interface Vehicle {
  id: number;
  title: string;
  type: string;
  year: number;
  price: number;
  image: string;
  transmission?: string;
  seats?: number;
  description?: string;
  features?: string[];
  panoramaImages?: string[];
  featured?: boolean;
  lat?: number; // Added lat property
  lng?: number; // Added lng property
}

export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  location: string;
  rating: number;
  image: string;
  description?: string;
  priceRange: string;
  menu?: { category: string; items: { name: string; price: number; description: string }[] }[];
  featured?: boolean;
  lat?: number; // Added lat property
  lng?: number; // Added lng property
}

export interface Cafe {
  id: number;
  name: string;
  location?: string;
  rating: number;
  image?: string;
  lat: number;
  lng: number;
  description?: string;
}

interface MapSettings {
  mapStyle: string;
  zoomLevel: number;
  showMarkers: boolean;
  centerLat: number;
  centerLng: number;
}

interface SiteSettings {
  siteName: string;
  contactEmail: string;
  contactPhone: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  heroTitle: string;
  heroDescription: string;
  showCafeMap: boolean;
}

interface BookingRequest {
  id: number;
  name: string;
  email: string;
  type: string;
  date: string;
  status: string;
}

interface DataContextType {
  properties: Property[];
  vehicles: Vehicle[];
  restaurants: Restaurant[];
  cafes: Cafe[];
  mapSettings: MapSettings;
  siteSettings: SiteSettings;
  bookingRequests: BookingRequest[];
  updateProperties: (properties: Property[]) => void;
  updateVehicles: (vehicles: Vehicle[]) => void;
  updateRestaurants: (restaurants: Restaurant[]) => void;
  updateCafes: (cafes: Cafe[]) => void;
  updateMapSettings: (settings: MapSettings) => void;
  updateSiteSettings: (settings: SiteSettings) => void;
  updateBookingRequests: (requests: BookingRequest[]) => void;
  addBookingRequest: (request: Omit<BookingRequest, 'id'>) => void;
  updateProperty: (property: Property) => void;
  deleteProperty: (id: number) => void;
}

// Initialize with default data
const defaultProperties: Property[] = [
  {
    id: 1,
    title: "Modern Beachfront Apartment",
    location: "Martil Beach, Martil",
    type: "apartment",
    price: 120,
    image: "/images/property1.jpg",
    rating: 4.8,
    featured: true,
    beds: 2,
    baths: 1,
    guests: 4,
    amenities: ["WiFi", "Air Conditioning", "Kitchen", "Beach View"],
    description: "Beautiful modern apartment with amazing beach views, just steps away from the Mediterranean Sea."
  },
  {
    id: 2,
    title: "Traditional Moroccan Villa",
    location: "City Center, Martil",
    type: "villa",
    price: 300,
    image: "/images/property2.jpg",
    rating: 4.9,
    featured: false,
    beds: 4,
    baths: 3,
    guests: 8,
    amenities: ["Pool", "Garden", "WiFi", "Air Conditioning"],
    description: "Luxurious villa with traditional Moroccan architecture, private pool and garden."
  },
  {
    id: 3,
    title: "Cozy Family House",
    location: "Residential Area, Martil",
    type: "house",
    price: 180,
    image: "/images/property3.jpg",
    rating: 4.6,
    featured: true,
    beds: 3,
    baths: 2,
    guests: 6,
    amenities: ["WiFi", "Kitchen", "Free Parking", "Washing Machine"],
    description: "Comfortable family house in a quiet residential area, perfect for families looking for a peaceful stay."
  }
];

const defaultVehicles: Vehicle[] = [
  {
    id: 1,
    title: "Economy Car",
    type: "car",
    year: 2021,
    price: 35,
    image: "/images/car1.jpg",
    transmission: "automatic",
    seats: 5,
    description: "Fuel-efficient compact car, perfect for city driving and short trips.",
    featured: false,
    lat: 35.617367, // Added lat coordinate
    lng: -5.271562  // Added lng coordinate
  },
  {
    id: 2,
    title: "Luxury SUV",
    type: "car",
    year: 2022,
    price: 85,
    image: "/images/car2.jpg",
    transmission: "automatic",
    seats: 7,
    description: "Spacious and comfortable SUV for family trips and exploring the region.",
    featured: false,
    lat: 35.615367, // Added lat coordinate
    lng: -5.274562  // Added lng coordinate
  },
  {
    id: 3,
    title: "Sport Motorcycle",
    type: "motorcycle",
    year: 2023,
    price: 50,
    image: "/images/motorcycle1.jpg",
    transmission: "manual",
    seats: 2,
    description: "Fast and agile motorcycle for exciting rides along the coastal roads.",
    featured: false,
    lat: 35.618367, // Added lat coordinate
    lng: -5.273562  // Added lng coordinate
  }
];

const defaultRestaurants: Restaurant[] = [
  {
    id: 1,
    name: "Taste of Morocco",
    cuisine: "moroccan",
    location: "Downtown Martil",
    rating: 4.7,
    image: "/images/restaurant1.jpg",
    priceRange: "$$",
    description: "Authentic Moroccan cuisine with traditional decor and live music on weekends.",
    featured: false,
    lat: 35.616367, // Added lat coordinate
    lng: -5.270562  // Added lng coordinate
  },
  {
    id: 2,
    name: "Mediterranean Breeze",
    cuisine: "mediterranean",
    location: "Martil Beach",
    rating: 4.8,
    image: "/images/restaurant2.jpg",
    priceRange: "$$$",
    description: "Fresh seafood and Mediterranean specialties with a beautiful view of the sea.",
    featured: false,
    lat: 35.614567, // Added lat coordinate
    lng: -5.275562  // Added lng coordinate
  },
  {
    id: 3,
    name: "Coastal Delights",
    cuisine: "seafood",
    location: "Marina, Martil",
    rating: 4.6,
    image: "/images/restaurant3.jpg",
    priceRange: "$$",
    description: "Specializing in locally caught seafood prepared with both traditional and modern techniques.",
    featured: false,
    lat: 35.613367, // Added lat coordinate
    lng: -5.272562  // Added lng coordinate
  }
];

const defaultCafes: Cafe[] = [
  { id: 1, name: "Cafe Maroc", location: "Downtown Martil", rating: 4.8, image: "/images/cafe1.jpg", lat: 35.615367, lng: -5.271562, description: "Best traditional Moroccan coffee" },
  { id: 2, name: "Beach Coffee", location: "Martil Beach", rating: 4.6, image: "/images/cafe2.jpg", lat: 35.617367, lng: -5.273562, description: "Amazing views with great espresso" },
  { id: 3, name: "Sunset Cafe", location: "West Martil", rating: 4.9, image: "/images/cafe3.jpg", lat: 35.614567, lng: -5.274562, description: "Perfect place to watch the sunset" },
  { id: 4, name: "Martil Espresso", location: "City Center", rating: 4.7, image: "/images/cafe4.jpg", lat: 35.618367, lng: -5.270562, description: "Specialty coffee and pastries" },
  { id: 5, name: "Ocean View Coffee", location: "Coastal Road", rating: 4.5, image: "/images/cafe5.jpg", lat: 35.613367, lng: -5.275562, description: "Fresh sea breeze and fresh coffee" },
];

const defaultMapSettings: MapSettings = {
  mapStyle: "streets",
  zoomLevel: 14,
  showMarkers: true,
  centerLat: 35.616367,
  centerLng: -5.272562,
};

const defaultSiteSettings: SiteSettings = {
  siteName: "MartiStay",
  contactEmail: "info@martistay.com",
  contactPhone: "+212 123-456789",
  logoUrl: "/logo.png",
  primaryColor: "#1e40af",
  secondaryColor: "#f3f4f6",
  heroTitle: "Your Perfect Vacation in Martil",
  heroDescription: "Find the best properties, vehicles, and restaurants for an unforgettable experience in Morocco's coastal gem.",
  showCafeMap: true,
};

const defaultBookingRequests: BookingRequest[] = [
  { id: 1, name: "John Doe", email: "john@example.com", type: "property", date: "2025-05-01", status: "pending" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", type: "vehicle", date: "2025-05-02", status: "confirmed" },
  { id: 3, name: "Ahmed Hassan", email: "ahmed@example.com", type: "restaurant", date: "2025-05-03", status: "pending" },
];

// Create the context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Create a provider component
export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('properties');
    return saved ? JSON.parse(saved) : defaultProperties;
  });
  
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => {
    const saved = localStorage.getItem('vehicles');
    return saved ? JSON.parse(saved) : defaultVehicles;
  });
  
  const [restaurants, setRestaurants] = useState<Restaurant[]>(() => {
    const saved = localStorage.getItem('restaurants');
    return saved ? JSON.parse(saved) : defaultRestaurants;
  });
  
  const [cafes, setCafes] = useState<Cafe[]>(() => {
    const saved = localStorage.getItem('cafesList');
    return saved ? JSON.parse(saved) : defaultCafes;
  });
  
  const [mapSettings, setMapSettings] = useState<MapSettings>(() => {
    const saved = localStorage.getItem('mapSettings');
    return saved ? JSON.parse(saved) : defaultMapSettings;
  });
  
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('siteSettings');
    return saved ? JSON.parse(saved) : defaultSiteSettings;
  });
  
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>(() => {
    const saved = localStorage.getItem('bookingRequests');
    return saved ? JSON.parse(saved) : defaultBookingRequests;
  });

  // Update functions
  const updateProperties = (newProperties: Property[]) => {
    setProperties(newProperties);
    localStorage.setItem('properties', JSON.stringify(newProperties));
  };
  
  const updateVehicles = (newVehicles: Vehicle[]) => {
    setVehicles(newVehicles);
    localStorage.setItem('vehicles', JSON.stringify(newVehicles));
  };
  
  const updateRestaurants = (newRestaurants: Restaurant[]) => {
    setRestaurants(newRestaurants);
    localStorage.setItem('restaurants', JSON.stringify(newRestaurants));
  };
  
  const updateCafes = (newCafes: Cafe[]) => {
    setCafes(newCafes);
    localStorage.setItem('cafesList', JSON.stringify(newCafes));
  };
  
  const updateMapSettings = (newSettings: MapSettings) => {
    setMapSettings(newSettings);
    localStorage.setItem('mapSettings', JSON.stringify(newSettings));
  };
  
  const updateSiteSettings = (newSettings: SiteSettings) => {
    setSiteSettings(newSettings);
    localStorage.setItem('siteSettings', JSON.stringify(newSettings));
  };
  
  const updateBookingRequests = (newRequests: BookingRequest[]) => {
    setBookingRequests(newRequests);
    localStorage.setItem('bookingRequests', JSON.stringify(newRequests));
  };
  
  const addBookingRequest = (request: Omit<BookingRequest, 'id'>) => {
    const newRequest = {
      ...request,
      id: bookingRequests.length > 0 ? Math.max(...bookingRequests.map(r => r.id)) + 1 : 1
    };
    const updatedRequests = [...bookingRequests, newRequest];
    setBookingRequests(updatedRequests);
    localStorage.setItem('bookingRequests', JSON.stringify(updatedRequests));
  };

  // Add new update and delete property functions
  const updateProperty = (updatedProperty: Property) => {
    const updatedProperties = properties.map(prop => 
      prop.id === updatedProperty.id ? updatedProperty : prop
    );
    
    // If the property doesn't exist, add it
    if (!properties.find(p => p.id === updatedProperty.id)) {
      updatedProperties.push(updatedProperty);
    }
    
    setProperties(updatedProperties);
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
  };
  
  const deleteProperty = (id: number) => {
    const filteredProperties = properties.filter(property => property.id !== id);
    setProperties(filteredProperties);
    localStorage.setItem('properties', JSON.stringify(filteredProperties));
  };

  const value = {
    properties,
    vehicles,
    restaurants,
    cafes,
    mapSettings,
    siteSettings,
    bookingRequests,
    updateProperties,
    updateVehicles,
    updateRestaurants,
    updateCafes,
    updateMapSettings,
    updateSiteSettings,
    updateBookingRequests,
    addBookingRequest,
    updateProperty,
    deleteProperty
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// Hook for using the context
export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
