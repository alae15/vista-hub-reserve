
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { properties as defaultProperties, vehicles as defaultVehicles, restaurants as defaultRestaurants } from "@/data/mockData";
import { PropertyFormData } from '@/components/PropertyForm';

interface Cafe {
  id?: number;
  name: string;
  lat: number;
  lng: number;
  rating: number;
  location?: string;
  image?: string;
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
  properties: any[];
  vehicles: any[];
  restaurants: any[];
  cafes: Cafe[];
  mapSettings: MapSettings;
  siteSettings: SiteSettings;
  bookingRequests: BookingRequest[];
  updateProperties: (properties: any[]) => void;
  updateVehicles: (vehicles: any[]) => void;
  updateRestaurants: (restaurants: any[]) => void;
  updateCafes: (cafes: Cafe[]) => void;
  updateMapSettings: (settings: MapSettings) => void;
  updateSiteSettings: (settings: SiteSettings) => void;
  updateBookingRequests: (requests: BookingRequest[]) => void;
  addBookingRequest: (request: Omit<BookingRequest, 'id'>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize states with localStorage data if available
  const [properties, setProperties] = useState(() => {
    const savedProperties = localStorage.getItem('properties');
    return savedProperties ? JSON.parse(savedProperties) : defaultProperties;
  });
  
  const [vehicles, setVehicles] = useState(() => {
    const savedVehicles = localStorage.getItem('vehicles');
    return savedVehicles ? JSON.parse(savedVehicles) : defaultVehicles;
  });
  
  const [restaurants, setRestaurants] = useState(() => {
    const savedRestaurants = localStorage.getItem('restaurants');
    return savedRestaurants ? JSON.parse(savedRestaurants) : defaultRestaurants;
  });
  
  const [cafes, setCafes] = useState<Cafe[]>(() => {
    const savedCafes = localStorage.getItem('cafesList');
    return savedCafes ? JSON.parse(savedCafes) : [
      { id: 1, name: "Cafe Maroc", location: "Downtown Martil", rating: 4.8, image: "/images/cafe1.jpg", lat: 35.615367, lng: -5.271562, description: "Best traditional Moroccan coffee" },
      { id: 2, name: "Beach Coffee", location: "Martil Beach", rating: 4.6, image: "/images/cafe2.jpg", lat: 35.617367, lng: -5.273562, description: "Amazing views with great espresso" },
      { id: 3, name: "Sunset Cafe", location: "West Martil", rating: 4.9, image: "/images/cafe3.jpg", lat: 35.614567, lng: -5.274562, description: "Perfect place to watch the sunset" },
      { id: 4, name: "Martil Espresso", location: "City Center", rating: 4.7, image: "/images/cafe4.jpg", lat: 35.618367, lng: -5.270562, description: "Specialty coffee and pastries" },
      { id: 5, name: "Ocean View Coffee", location: "Coastal Road", rating: 4.5, image: "/images/cafe5.jpg", lat: 35.613367, lng: -5.275562, description: "Fresh sea breeze and fresh coffee" },
    ];
  });
  
  // Map settings from localStorage if available
  const [mapSettings, setMapSettings] = useState<MapSettings>(() => {
    const savedMapSettings = localStorage.getItem('mapSettings');
    return savedMapSettings ? JSON.parse(savedMapSettings) : {
      mapStyle: "streets",
      zoomLevel: 14,
      showMarkers: true,
      centerLat: 35.616367,
      centerLng: -5.272562,
    };
  });
  
  // Website settings from localStorage if available
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const savedSiteSettings = localStorage.getItem('siteSettings');
    return savedSiteSettings ? JSON.parse(savedSiteSettings) : {
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
  });

  // Booking requests from localStorage if available
  const [bookingRequests, setBookingRequests] = useState<BookingRequest[]>(() => {
    const savedBookings = localStorage.getItem('bookingRequests');
    return savedBookings ? JSON.parse(savedBookings) : [
      { id: 1, name: "John Doe", email: "john@example.com", type: "property", date: "2025-05-01", status: "pending" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", type: "vehicle", date: "2025-05-02", status: "confirmed" },
      { id: 3, name: "Ahmed Hassan", email: "ahmed@example.com", type: "restaurant", date: "2025-05-03", status: "pending" },
    ];
  });

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  useEffect(() => {
    localStorage.setItem('restaurants', JSON.stringify(restaurants));
  }, [restaurants]);

  useEffect(() => {
    localStorage.setItem('cafesList', JSON.stringify(cafes));
  }, [cafes]);

  useEffect(() => {
    localStorage.setItem('mapSettings', JSON.stringify(mapSettings));
  }, [mapSettings]);

  useEffect(() => {
    localStorage.setItem('siteSettings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem('bookingRequests', JSON.stringify(bookingRequests));
  }, [bookingRequests]);

  // Context value
  const value = {
    properties,
    vehicles,
    restaurants,
    cafes,
    mapSettings,
    siteSettings,
    bookingRequests,
    updateProperties: (newProperties: any[]) => {
      setProperties(newProperties);
    },
    updateVehicles: (newVehicles: any[]) => {
      setVehicles(newVehicles);
    },
    updateRestaurants: (newRestaurants: any[]) => {
      setRestaurants(newRestaurants);
    },
    updateCafes: (newCafes: Cafe[]) => {
      setCafes(newCafes);
    },
    updateMapSettings: (newSettings: MapSettings) => {
      setMapSettings(newSettings);
    },
    updateSiteSettings: (newSettings: SiteSettings) => {
      setSiteSettings(newSettings);
    },
    updateBookingRequests: (newRequests: BookingRequest[]) => {
      setBookingRequests(newRequests);
    },
    addBookingRequest: (request: Omit<BookingRequest, 'id'>) => {
      const newRequest = {
        ...request,
        id: bookingRequests.length > 0 ? Math.max(...bookingRequests.map(r => r.id)) + 1 : 1
      };
      setBookingRequests([...bookingRequests, newRequest]);
    }
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
