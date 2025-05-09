import { useRef, useEffect, useState } from "react";
import { MapPin, Map, Navigation, MapPinOff } from "lucide-react";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export interface LocationItem {
  id: number;
  title: string;
  lat: number;
  lng: number;
  type: "vehicle" | "restaurant";
  image?: string;
  description?: string;
}

interface LocationMapProps {
  height?: string;
  isEditable?: boolean;
  previewMode?: boolean;
}

const LocationMap = ({ 
  height = "600px", 
  isEditable = false,
  previewMode = false 
}: LocationMapProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedItem, setSelectedItem] = useState<LocationItem | null>(null);
  const [locations, setLocations] = useState<LocationItem[]>([]);
  const [showVehicles, setShowVehicles] = useState(true);
  const [showRestaurants, setShowRestaurants] = useState(true);
  const [isDraggingItem, setIsDraggingItem] = useState(false);
  const [dragItem, setDragItem] = useState<LocationItem | null>(null);
  const { vehicles, restaurants } = useData();
  const { toast } = useToast();
  
  // Center coordinates for Martil, Morocco
  const centerLat = 35.616367;
  const centerLng = -5.272562;

  // Initialize location data from vehicles and restaurants
  useEffect(() => {
    const vehicleLocations: LocationItem[] = vehicles.map(vehicle => ({
      id: vehicle.id,
      title: vehicle.title || "Unnamed Vehicle",
      lat: vehicle.lat || (centerLat + (Math.random() - 0.5) * 0.03),
      lng: vehicle.lng || (centerLng + (Math.random() - 0.5) * 0.03),
      type: "vehicle",
      image: vehicle.image,
      description: vehicle.description
    }));

    const restaurantLocations: LocationItem[] = restaurants.map(restaurant => ({
      id: restaurant.id,
      title: restaurant.name || "Unnamed Restaurant",
      lat: restaurant.lat || (centerLat + (Math.random() - 0.5) * 0.03),
      lng: restaurant.lng || (centerLng + (Math.random() - 0.5) * 0.03),
      type: "restaurant",
      image: restaurant.image,
      description: restaurant.description
    }));

    setLocations([...vehicleLocations, ...restaurantLocations]);
    setMapLoaded(true);
  }, [vehicles, restaurants]);

  // Handle item selection
  const handleItemClick = (item: LocationItem) => {
    setSelectedItem(prev => prev?.id === item.id ? null : item);
  };

  // Start dragging an item
  const startDragging = (item: LocationItem, e: React.MouseEvent) => {
    if (!isEditable) return;
    e.stopPropagation();
    setIsDraggingItem(true);
    setDragItem(item);
  };

  // Handle drag over map
  const handleMapDragOver = (e: React.DragEvent) => {
    if (!isEditable || !isDraggingItem) return;
    e.preventDefault();
  };

  // Handle drop on map
  const handleMapDrop = (e: React.DragEvent) => {
    if (!isEditable || !isDraggingItem || !dragItem) return;
    e.preventDefault();
    
    const mapRect = mapContainerRef.current?.getBoundingClientRect();
    if (!mapRect) return;
    
    // Calculate relative position in the map
    const relX = (e.clientX - mapRect.left) / mapRect.width;
    const relY = (e.clientY - mapRect.top) / mapRect.height;
    
    // Convert to lat/lng approximation (simple linear mapping)
    const newLat = centerLat + (0.06 * (0.5 - relY));
    const newLng = centerLng + (0.06 * (relX - 0.5));
    
    // Update locations
    setLocations(prev => 
      prev.map(loc => 
        loc.id === dragItem.id && loc.type === dragItem.type 
          ? { ...loc, lat: newLat, lng: newLng } 
          : loc
      )
    );
    
    toast({
      title: "Location Updated",
      description: `${dragItem.title} has been moved to a new position.`,
    });
    
    setIsDraggingItem(false);
    setDragItem(null);
  };

  // Save map changes
  const saveMapChanges = () => {
    if (!isEditable) return;
    
    toast({
      title: "Changes Saved",
      description: "All location changes have been saved successfully.",
    });
    
    // Here you would typically save to a database
    console.log("Saving updated locations:", locations);
  };

  // Reset a location to default position
  const resetLocation = (item: LocationItem) => {
    setLocations(prev => 
      prev.map(loc => 
        loc.id === item.id && loc.type === item.type 
          ? { 
              ...loc, 
              lat: centerLat + (Math.random() - 0.5) * 0.02, 
              lng: centerLng + (Math.random() - 0.5) * 0.02
            } 
          : loc
      )
    );
    
    toast({
      title: "Location Reset",
      description: `${item.title} has been reset to a default position.`,
    });
  };

  // Filter locations based on user selection
  const filteredLocations = locations.filter(item => 
    (item.type === "vehicle" && showVehicles) || 
    (item.type === "restaurant" && showRestaurants)
  );

  return (
    <div className="w-full flex flex-col">
      {/* Controls for map */}
      {!previewMode && (
        <div className="bg-white p-4 rounded-t-lg border-b flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch 
                id="show-vehicles" 
                checked={showVehicles} 
                onCheckedChange={setShowVehicles} 
              />
              <Label htmlFor="show-vehicles">Vehicles</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="show-restaurants" 
                checked={showRestaurants} 
                onCheckedChange={setShowRestaurants} 
              />
              <Label htmlFor="show-restaurants">Restaurants</Label>
            </div>
          </div>
          
          {isEditable && (
            <Button onClick={saveMapChanges} className="bg-martil-blue hover:bg-blue-600">
              Save Changes
            </Button>
          )}
        </div>
      )}
      
      {/* Map Container */}
      <div 
        ref={mapContainerRef}
        className="relative w-full overflow-hidden bg-blue-50 border"
        style={{ height }}
        onDragOver={handleMapDragOver}
        onDrop={handleMapDrop}
      >
        {!mapLoaded ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-martil-blue mb-3"></div>
              <p className="text-martil-blue">Loading map...</p>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full">
            {/* Header with map info */}
            <div className="absolute top-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-3 z-10 flex justify-between items-center shadow-sm">
              <div className="flex items-center">
                <Map className="h-5 w-5 mr-2 text-martil-blue" />
                <span className="font-medium text-martil-navy">Martil Map Explorer</span>
              </div>
              <div className="flex items-center">
                <Navigation className="h-4 w-4 mr-2 text-martil-blue" />
                <span className="text-xs">Lat: {centerLat.toFixed(4)}, Lng: {centerLng.toFixed(4)}</span>
              </div>
            </div>

            {/* Map grid visualization */}
            <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
              {Array(100).fill(0).map((_, i) => (
                <div key={i} className="border border-blue-100/30"></div>
              ))}
            </div>
            
            {/* Location markers */}
            {filteredLocations.map((item) => (
              <div 
                key={`${item.type}-${item.id}`}
                className={`absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 ${
                  selectedItem?.id === item.id && selectedItem?.type === item.type
                    ? 'z-30'
                    : ''
                }`}
                style={{ 
                  top: `${((centerLat + 0.03 - item.lat) / 0.06) * 100}%`, 
                  left: `${((item.lng - centerLng + 0.03) / 0.06) * 100}%`,
                }}
                onClick={() => handleItemClick(item)}
                onMouseDown={(e) => startDragging(item, e)}
                draggable={isEditable}
              >
                <div 
                  className={`flex items-center justify-center w-full h-full rounded-full ${
                    item.type === 'vehicle' 
                      ? 'bg-martil-blue text-white' 
                      : 'bg-martil-orange text-white'
                  } ${
                    selectedItem?.id === item.id && selectedItem?.type === item.type
                      ? 'ring-4 ring-white shadow-lg scale-110'
                      : 'shadow-md hover:scale-110'
                  } transition-all duration-200`}
                >
                  <MapPin className="h-4 w-4" />
                </div>
              </div>
            ))}

            {/* Selected item details */}
            {selectedItem && (
              <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg z-40 animate-fade-in">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <span className={`inline-block w-3 h-3 rounded-full mr-2 ${
                        selectedItem.type === 'vehicle' ? 'bg-martil-blue' : 'bg-martil-orange'
                      }`}></span>
                      <h3 className="font-medium text-martil-navy">
                        {selectedItem.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {selectedItem.type === 'vehicle' ? 'Vehicle' : 'Restaurant'}
                    </p>
                  </div>
                  
                  {isEditable && (
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => resetLocation(selectedItem)}
                      >
                        <MapPinOff className="h-4 w-4 mr-1" />
                        Reset
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="mt-2 flex items-center space-x-4">
                  {selectedItem.image && (
                    <div className="w-16 h-16 rounded overflow-hidden">
                      <img 
                        src={selectedItem.image} 
                        alt={selectedItem.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                  )}
                  
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {selectedItem.description || `This ${selectedItem.type} is located in Martil.`}
                    </p>
                    <div className="mt-2 text-xs text-gray-500">
                      <span>Position: {selectedItem.lat.toFixed(4)}, {selectedItem.lng.toFixed(4)}</span>
                    </div>
                  </div>
                </div>
                
                <button 
                  className="mt-3 text-xs text-martil-blue hover:underline"
                  onClick={() => setSelectedItem(null)}
                >
                  Close details
                </button>
              </div>
            )}

            {/* Map legend */}
            <div className="absolute bottom-4 right-4 bg-white/90 p-2 rounded shadow-md text-xs">
              <div className="flex items-center mb-1">
                <div className="w-3 h-3 rounded-full bg-martil-blue mr-2"></div>
                <span>Vehicles</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-martil-orange mr-2"></div>
                <span>Restaurants</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Instructions for editable mode */}
      {isEditable && !previewMode && (
        <div className="bg-blue-50 p-4 rounded-b-lg border-t border-blue-100">
          <h4 className="text-sm font-medium text-martil-navy mb-2">Editing Instructions:</h4>
          <ul className="text-xs text-gray-600 space-y-1">
            <li className="flex items-center">
              <span className="inline-block w-1 h-1 rounded-full bg-gray-500 mr-2"></span>
              Drag and drop markers to reposition vehicles and restaurants on the map
            </li>
            <li className="flex items-center">
              <span className="inline-block w-1 h-1 rounded-full bg-gray-500 mr-2"></span>
              Click on a marker to view and edit its details
            </li>
            <li className="flex items-center">
              <span className="inline-block w-1 h-1 rounded-full bg-gray-500 mr-2"></span>
              Use the reset button to return a marker to a default position
            </li>
            <li className="flex items-center">
              <span className="inline-block w-1 h-1 rounded-full bg-gray-500 mr-2"></span>
              Remember to save your changes when you're done editing
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LocationMap;
