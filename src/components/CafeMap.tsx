
import { useRef, useEffect, useState } from "react";
import { Coffee, Star } from "lucide-react";
import { useData } from "@/contexts/DataContext";

// Make sure we're using a consistent Cafe type
export interface CafeMapCafe {
  id: number;
  name: string;
  lat: number;
  lng: number;
  rating: number;
  description?: string;
  location?: string;
  image?: string;
}

interface CafeMapProps {
  height?: string;
  mapStyle?: string;
  zoomLevel?: number;
  showMarkers?: boolean;
  centerLat?: number;
  centerLng?: number;
  cafes?: CafeMapCafe[];
  onMarkerClick?: (cafe: CafeMapCafe) => void;
  isEditable?: boolean;
  onCafeUpdate?: (cafes: CafeMapCafe[]) => void;
}

const CafeMap = ({
  height = "400px",
  mapStyle = "streets",
  zoomLevel = 14,
  showMarkers = true,
  centerLat = 35.616367,
  centerLng = -5.272562,
  cafes: propCafes,
  onMarkerClick,
  isEditable = false,
  onCafeUpdate
}: CafeMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState<CafeMapCafe | null>(null);
  const { cafes: contextCafes } = useData();
  
  // Load custom cafe data from props, context or defaults
  const [cafes, setCafes] = useState<CafeMapCafe[]>(() => {
    try {
      // If props are provided, use them
      if (propCafes && propCafes.length > 0) return propCafes;
      
      // Otherwise, try to use context cafes
      if (contextCafes && contextCafes.length > 0) {
        return contextCafes.map(cafe => ({
          id: typeof cafe.id === 'number' ? cafe.id : Math.floor(Math.random() * 1000),
          name: cafe.name || "Unnamed Cafe",
          lat: cafe.lat || 35.616367,
          lng: cafe.lng || -5.272562,
          rating: cafe.rating || 4.0,
          description: cafe.description || "",
          location: cafe.location || "Martil",
          image: cafe.image || ""
        })) as CafeMapCafe[];
      }
      
      // Fallback to default cafes with guaranteed IDs
      return [
        { id: 1, name: "Cafe Maroc", lat: 35.615367, lng: -5.271562, rating: 4.8, description: "Best traditional Moroccan coffee", location: "Downtown Martil" },
        { id: 2, name: "Beach Coffee", lat: 35.617367, lng: -5.273562, rating: 4.6, description: "Amazing views with great espresso", location: "Martil Beach" },
        { id: 3, name: "Sunset Cafe", lat: 35.614567, lng: -5.274562, rating: 4.9, description: "Perfect place to watch the sunset", location: "West Martil" },
        { id: 4, name: "Martil Espresso", lat: 35.618367, lng: -5.270562, rating: 4.7, description: "Specialty coffee and pastries", location: "City Center" },
        { id: 5, name: "Ocean View Coffee", lat: 35.613367, lng: -5.275562, rating: 4.5, description: "Fresh sea breeze and fresh coffee", location: "Coastal Road" },
      ];
    } catch (error) {
      console.error("Error initializing cafes:", error);
      // Return a minimal set of cafes if there's an error
      return [
        { id: 1, name: "Cafe Maroc", lat: 35.615367, lng: -5.271562, rating: 4.8, description: "Best traditional Moroccan coffee", location: "Downtown Martil" }
      ];
    }
  });

  // Update onCafeUpdate when cafes change
  useEffect(() => {
    if (onCafeUpdate && cafes) {
      onCafeUpdate(cafes);
    }
  }, [cafes, onCafeUpdate]);

  // Handle marker click
  const handleMarkerClick = (cafe: CafeMapCafe) => {
    setSelectedCafe(cafe);
    if (onMarkerClick) {
      onMarkerClick(cafe);
    }
  };

  // Create a new cafe with a unique ID
  const createNewCafe = () => {
    const newId = cafes.length > 0 ? Math.max(...cafes.map(c => c.id)) + 1 : 1;
    
    const newCafe: CafeMapCafe = {
      id: newId,
      name: "New Cafe",
      lat: centerLat + (Math.random() - 0.5) * 0.01,
      lng: centerLng + (Math.random() - 0.5) * 0.01,
      rating: 4.0,
      description: "Add a description",
      location: "Martil"
    };
    
    setCafes([...cafes, newCafe]);
  };

  // Set map as loaded after component mounts
  useEffect(() => {
    setMapLoaded(true);
  }, []);

  return (
    <div 
      ref={mapContainerRef}
      className="relative w-full overflow-hidden rounded-lg border shadow-sm transition-shadow hover:shadow-md"
      style={{ height }}
      data-state={mapLoaded ? "loaded" : "loading"}
    >
      {!mapLoaded ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-martil-blue mb-3"></div>
            <p className="text-martil-blue">Loading map...</p>
          </div>
        </div>
      ) : (
        <div className="relative w-full h-full bg-gray-200 rounded-lg overflow-hidden">
          {/* Header with map info */}
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-white/95 to-white/80 backdrop-blur-sm p-3 z-10 flex justify-between items-center shadow-sm">
            <div>
              <span className="font-medium text-martil-navy">Martil Cafes</span>
              <span className="text-xs ml-2 text-muted-foreground bg-gray-100 px-2 py-0.5 rounded-full">Zoom: {zoomLevel}</span>
            </div>
            <div className="text-xs px-2 py-1 bg-martil-blue/10 rounded-full text-martil-blue">{mapStyle} view</div>
          </div>

          {/* Map visualization with grid lines */}
          <div className="absolute inset-0 bg-blue-50">
            <div className="absolute inset-0 grid grid-cols-8 grid-rows-8">
              {Array(64).fill(0).map((_, i) => (
                <div key={i} className="border border-blue-100/50"></div>
              ))}
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center text-center">
              <div className="max-w-md p-6 rounded-lg bg-white/80 backdrop-blur-sm shadow-lg">
                <div className="inline-block p-3 rounded-full bg-blue-100 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-martil-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <p className="font-medium text-martil-navy mb-2">Interactive Map Centered at:</p>
                <p className="font-mono text-sm bg-blue-50 rounded-md p-2 mb-4 inline-block">
                  Lat: {centerLat.toFixed(6)}, Lng: {centerLng.toFixed(6)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Note: This is a visualization. In a real implementation,<br />
                  this would be an interactive Mapbox or Google Maps component.
                </p>
              </div>
            </div>
            
            {/* Cafe markers visualization */}
            {showMarkers && cafes && cafes.length > 0 && cafes.map((cafe, index) => (
              <div 
                key={cafe.id}
                className="absolute h-4 w-4 bg-martil-blue rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-150 transition-all"
                style={{ 
                  top: `${30 + (cafe.lat - centerLat) * 1000}%`, 
                  left: `${50 + (cafe.lng - centerLng) * 1000}%`,
                  zIndex: selectedCafe?.id === cafe.id ? 30 : 20,
                  animationDelay: `${index * 0.1}s`
                }}
                onClick={() => handleMarkerClick(cafe)}
              >
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-white rounded-full border border-martil-blue"></div>
              </div>
            ))}
          </div>

          {/* Cafe list */}
          {showMarkers && cafes && cafes.length > 0 && (
            <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg z-20">
              <p className="text-sm font-medium mb-3 text-martil-navy border-l-4 border-martil-blue pl-2">
                Top Cafes in Martil:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[150px] overflow-y-auto pr-1 custom-scrollbar">
                {cafes.map((cafe) => (
                  <div 
                    key={cafe.id}
                    className={`flex justify-between p-2 cursor-pointer rounded-md transition-all ${
                      selectedCafe?.id === cafe.id 
                        ? "bg-martil-blue/10 border border-martil-blue/30" 
                        : "hover:bg-gray-100 border border-transparent"
                    }`}
                    onClick={() => handleMarkerClick(cafe)}
                  >
                    <div className="flex items-center">
                      <Coffee className="h-3 w-3 text-martil-blue mr-2" />
                      <span className="text-xs font-medium text-martil-navy">{cafe.name}</span>
                    </div>
                    <div className="flex items-center text-xs">
                      <Star className="h-3 w-3 text-yellow-500 mr-1 fill-current" />
                      <span>{cafe.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Selected cafe details */}
          {selectedCafe && (
            <div className="absolute top-14 left-4 right-4 bg-white p-4 rounded-lg shadow-lg z-30 animate-fade-in">
              <div className="flex justify-between items-start">
                <h3 className="font-medium text-martil-navy">{selectedCafe.name}</h3>
                <div className="flex items-center bg-yellow-50 px-2 py-0.5 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500 mr-1">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium text-sm">{selectedCafe.rating}</span>
                </div>
              </div>
              <p className="text-sm mt-2 text-gray-600">{selectedCafe.description || ''}</p>
              <div className="mt-3 flex items-center text-xs text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{selectedCafe.location || ''}</span>
              </div>
              {selectedCafe.image && (
                <div className="mt-3 rounded-md overflow-hidden h-20 w-full">
                  <img 
                    src={selectedCafe.image} 
                    alt={selectedCafe.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <button 
                onClick={() => setSelectedCafe(null)}
                className="mt-3 text-xs text-martil-blue hover:underline focus:outline-none"
              >
                Close details
              </button>
            </div>
          )}
        </div>
      )}

      {/* Add cafe button */}
      {isEditable && mapLoaded && (
        <div className="absolute top-14 right-2 z-20">
          <button 
            className="bg-white rounded-full p-2 shadow-md hover:bg-martil-blue hover:text-white transition-all"
            onClick={createNewCafe}
            type="button"
          >
            <Coffee className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Add custom scrollbar styling */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ccc;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #0EA5E9;
        }
      `}</style>
    </div>
  );
};

export default CafeMap;
