
import { useRef, useEffect, useState } from "react";
import { Coffee } from "lucide-react";

interface Cafe {
  name: string;
  lat: number;
  lng: number;
  rating: number;
  description?: string;
}

interface CafeMapProps {
  height?: string;
  mapStyle?: string;
  zoomLevel?: number;
  showMarkers?: boolean;
  centerLat?: number;
  centerLng?: number;
  cafes?: Cafe[];
  onMarkerClick?: (cafe: Cafe) => void;
  isEditable?: boolean;
  onCafeUpdate?: (cafes: Cafe[]) => void;
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
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
  
  // Load custom cafe data from localStorage if available or use provided props
  const [cafes, setCafes] = useState<Cafe[]>(() => {
    if (propCafes) return propCafes;
    
    const savedCafes = localStorage.getItem('cafesList');
    return savedCafes ? JSON.parse(savedCafes) : [
      { name: "Cafe Maroc", lat: 35.615367, lng: -5.271562, rating: 4.8, description: "Best traditional Moroccan coffee" },
      { name: "Beach Coffee", lat: 35.617367, lng: -5.273562, rating: 4.6, description: "Amazing views with great espresso" },
      { name: "Sunset Cafe", lat: 35.614567, lng: -5.274562, rating: 4.9, description: "Perfect place to watch the sunset" },
      { name: "Martil Espresso", lat: 35.618367, lng: -5.270562, rating: 4.7, description: "Specialty coffee and pastries" },
      { name: "Ocean View Coffee", lat: 35.613367, lng: -5.275562, rating: 4.5, description: "Fresh sea breeze and fresh coffee" },
    ];
  });

  // Update localStorage when cafes change
  useEffect(() => {
    if (!propCafes) {
      localStorage.setItem('cafesList', JSON.stringify(cafes));
    }
    
    if (onCafeUpdate) {
      onCafeUpdate(cafes);
    }
  }, [cafes, propCafes, onCafeUpdate]);

  // Handle marker click
  const handleMarkerClick = (cafe: Cafe) => {
    setSelectedCafe(cafe);
    if (onMarkerClick) {
      onMarkerClick(cafe);
    }
  };

  useEffect(() => {
    // Create a mock implementation for demo purposes
    const initMap = () => {
      if (!mapContainerRef.current) return;
      
      // For demo purposes, we'll just show a placeholder
      const mapContainer = mapContainerRef.current;
      mapContainer.innerHTML = '';
      
      // Create main map container
      const mapDiv = document.createElement('div');
      mapDiv.className = 'relative w-full h-full bg-gray-200 rounded-lg overflow-hidden';
      
      // Create a header with map info
      const header = document.createElement('div');
      header.className = 'absolute top-0 left-0 right-0 bg-white/80 p-2 z-10 flex justify-between items-center';
      header.innerHTML = `
        <div>
          <span class="font-medium">Martil Cafes</span>
          <span class="text-xs ml-2 text-muted-foreground">Zoom: ${zoomLevel}</span>
        </div>
        <div class="text-xs text-muted-foreground">${mapStyle} view</div>
      `;
      
      // Create a map element
      const fakeMap = document.createElement('div');
      fakeMap.className = 'absolute inset-0 flex items-center justify-center text-center';
      fakeMap.innerHTML = `
        <div>
          <p class="text-muted-foreground mb-2">Interactive Map Centered at:</p>
          <p class="font-mono text-sm mb-4">Lat: ${centerLat.toFixed(6)}, Lng: ${centerLng.toFixed(6)}</p>
          <p class="text-xs text-muted-foreground">Note: This is a placeholder. In a real implementation,<br>this would be an interactive Mapbox or Google Maps component.</p>
        </div>
      `;
      
      // If markers are enabled, add cafe markers
      if (showMarkers) {
        const markersContainer = document.createElement('div');
        markersContainer.className = 'absolute bottom-4 left-4 right-4 bg-white/90 p-2 rounded shadow-sm';
        markersContainer.innerHTML = `
          <p class="text-sm font-medium mb-2">Top Cafes in Martil:</p>
          <div class="space-y-1 text-xs">
            ${cafes.map((cafe, index) => `
              <div class="flex justify-between p-1 cursor-pointer hover:bg-gray-100 rounded" 
                   id="cafe-${index}" 
                   data-lat="${cafe.lat}" 
                   data-lng="${cafe.lng}"
                   data-name="${cafe.name}"
                   data-rating="${cafe.rating}"
                   data-description="${cafe.description || ''}"
              >
                <span>${cafe.name}</span>
                <span>Rating: ${cafe.rating}/5</span>
              </div>
            `).join('')}
          </div>
        `;
        fakeMap.appendChild(markersContainer);
        
        // Add event listeners to the cafes
        setTimeout(() => {
          cafes.forEach((cafe, index) => {
            const cafeEl = document.getElementById(`cafe-${index}`);
            if (cafeEl) {
              cafeEl.addEventListener('click', () => {
                handleMarkerClick(cafe);
              });
            }
          });
        }, 0);
      }
      
      // If a cafe is selected, show its details
      if (selectedCafe) {
        const detailsContainer = document.createElement('div');
        detailsContainer.className = 'absolute top-14 left-4 right-4 bg-white p-3 rounded shadow-sm';
        detailsContainer.innerHTML = `
          <div class="flex justify-between items-start">
            <h3 class="font-medium">${selectedCafe.name}</h3>
            <div class="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 text-yellow-500 mr-1">
                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
              </svg>
              <span>${selectedCafe.rating}</span>
            </div>
          </div>
          <p class="text-sm mt-1">${selectedCafe.description || ''}</p>
          <p class="text-xs text-muted-foreground mt-2">Location: ${selectedCafe.lat.toFixed(6)}, ${selectedCafe.lng.toFixed(6)}</p>
        `;
        fakeMap.appendChild(detailsContainer);
      }
      
      mapDiv.appendChild(fakeMap);
      mapDiv.appendChild(header);
      mapContainer.appendChild(mapDiv);
      
      setMapLoaded(true);
    };

    // Initialize the map
    initMap();
    
    // Cleanup function not needed for our mock implementation
    return () => {};
  }, [mapStyle, zoomLevel, showMarkers, centerLat, centerLng, cafes, selectedCafe, onMarkerClick]);

  return (
    <div 
      ref={mapContainerRef}
      className="relative w-full overflow-hidden rounded-lg border shadow-sm"
      style={{ height }}
      data-state={mapLoaded ? "loaded" : "loading"}
    >
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <p>Loading map...</p>
        </div>
      )}
      {isEditable && (
        <div className="absolute top-14 right-2 z-20">
          <button 
            className="bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
            onClick={() => {
              const newCafe = {
                name: "New Cafe",
                lat: centerLat + (Math.random() - 0.5) * 0.01,
                lng: centerLng + (Math.random() - 0.5) * 0.01,
                rating: 4.0,
                description: "Add a description"
              };
              setCafes([...cafes, newCafe]);
            }}
          >
            <Coffee className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CafeMap;
