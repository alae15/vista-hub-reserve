
import { useRef, useEffect, useState } from "react";

interface CafeMapProps {
  height?: string;
  mapStyle?: string;
  zoomLevel?: number;
  showMarkers?: boolean;
  centerLat?: number;
  centerLng?: number;
}

const CafeMap = ({
  height = "400px",
  mapStyle = "streets",
  zoomLevel = 14,
  showMarkers = true,
  centerLat = 35.616367,
  centerLng = -5.272562
}: CafeMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  
  // Load custom cafe data from localStorage if available
  const [cafes, setCafes] = useState(() => {
    const savedCafes = localStorage.getItem('cafesList');
    return savedCafes ? JSON.parse(savedCafes) : [
      { name: "Cafe Maroc", lat: 35.615367, lng: -5.271562, rating: 4.8 },
      { name: "Beach Coffee", lat: 35.617367, lng: -5.273562, rating: 4.6 },
      { name: "Sunset Cafe", lat: 35.614567, lng: -5.274562, rating: 4.9 },
      { name: "Martil Espresso", lat: 35.618367, lng: -5.270562, rating: 4.7 },
      { name: "Ocean View Coffee", lat: 35.613367, lng: -5.275562, rating: 4.5 },
    ];
  });

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
            ${cafes.map(cafe => `
              <div class="flex justify-between">
                <span>${cafe.name}</span>
                <span>Rating: ${cafe.rating}/5</span>
              </div>
            `).join('')}
          </div>
        `;
        fakeMap.appendChild(markersContainer);
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
  }, [mapStyle, zoomLevel, showMarkers, centerLat, centerLng, cafes]);

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
    </div>
  );
};

export default CafeMap;
