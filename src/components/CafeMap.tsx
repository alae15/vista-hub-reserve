
import { useRef, useEffect, useState } from "react";
import { Coffee } from "lucide-react";
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
  
  // Load custom cafe data from localStorage if available or use provided props
  const [cafes, setCafes] = useState<CafeMapCafe[]>(() => {
    try {
      // If props are provided, use them
      if (propCafes && propCafes.length > 0) return propCafes;
      
      // Otherwise, try to use context cafes
      if (contextCafes && contextCafes.length > 0) {
        return contextCafes.map(cafe => ({
          id: typeof cafe.id === 'number' ? cafe.id : Math.floor(Math.random() * 1000),
          name: cafe.name,
          lat: cafe.lat,
          lng: cafe.lng,
          rating: cafe.rating,
          description: cafe.description || "",
          location: cafe.location || "",
          image: cafe.image
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

  useEffect(() => {
    if (!mapContainerRef.current) return;
    
    // Clean up function to handle component unmounting or re-rendering
    const mapContainer = mapContainerRef.current;
    
    const renderMap = () => {
      try {
        if (!mapContainer) return;
        
        // Create new elements instead of modifying existing ones
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
        if (showMarkers && cafes && cafes.length > 0) {
          const markersContainer = document.createElement('div');
          markersContainer.className = 'absolute bottom-4 left-4 right-4 bg-white/90 p-2 rounded shadow-sm';
          
          let markersHTML = `
            <p class="text-sm font-medium mb-2">Top Cafes in Martil:</p>
            <div class="space-y-1 text-xs cafe-list">
          `;
          
          cafes.forEach(cafe => {
            markersHTML += `
              <div class="flex justify-between p-1 cursor-pointer hover:bg-gray-100 rounded cafe-item" 
                   data-id="${cafe.id}" 
                   data-name="${cafe.name}"
                   data-rating="${cafe.rating}"
                   data-description="${cafe.description || ''}"
              >
                <span>${cafe.name}</span>
                <span>Rating: ${cafe.rating}/5</span>
              </div>
            `;
          });
          
          markersHTML += `</div>`;
          markersContainer.innerHTML = markersHTML;
          fakeMap.appendChild(markersContainer);
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
            <p class="text-xs text-muted-foreground mt-2">Location: ${selectedCafe.location || ''}</p>
          `;
          fakeMap.appendChild(detailsContainer);
        }
        
        mapDiv.appendChild(fakeMap);
        mapDiv.appendChild(header);
        
        // Clear container and append new content
        while (mapContainer.firstChild) {
          mapContainer.removeChild(mapContainer.firstChild);
        }
        
        mapContainer.appendChild(mapDiv);
        
        // Now add event listeners after the elements are in the DOM
        setTimeout(() => {
          if (!mapContainer) return;
          
          const cafeItems = mapContainer.querySelectorAll('.cafe-item');
          
          cafeItems.forEach(item => {
            if (item instanceof HTMLElement) {
              item.addEventListener('click', () => {
                const id = Number(item.dataset.id);
                const selectedCafe = cafes.find(cafe => cafe.id === id);
                if (selectedCafe) {
                  handleMarkerClick(selectedCafe);
                }
              });
            }
          });
          
          setMapLoaded(true);
        }, 0);
        
      } catch (error) {
        console.error("Error rendering map:", error);
        // Create a basic error display
        if (mapContainer) {
          mapContainer.innerHTML = '<div class="h-full flex items-center justify-center bg-gray-100"><p>Error loading map. Please try again.</p></div>';
          setMapLoaded(true); // Still mark as loaded to avoid loading state
        }
      }
    };
    
    // Render the map
    renderMap();
    
    // Cleanup function
    return () => {
      if (mapContainer) {
        // Remove event listeners by replacing inner HTML
        const tempNode = mapContainer.cloneNode(false);
        if (mapContainer.parentNode) {
          mapContainer.parentNode.replaceChild(tempNode, mapContainer);
        }
      }
    };
  }, [mapStyle, zoomLevel, showMarkers, centerLat, centerLng, cafes, selectedCafe]);

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
            onClick={createNewCafe}
            type="button"
          >
            <Coffee className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default CafeMap;
