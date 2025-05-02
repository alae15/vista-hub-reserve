
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Home, Car, MapPin,
  Settings
} from "lucide-react";

const MapView = () => {
  const [activeTab, setActiveTab] = useState("properties");
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [mapSettings, setMapSettings] = useState({
    zoomLevel: [8],
    mapStyle: "streets",
    showMarkers: true,
    showLabels: true
  });
  
  const mapContainerRef = useRef<HTMLDivElement>(null);
  
  // Function to simulate loading the map
  const handleLoadMap = () => {
    setIsMapLoaded(true);
    // In a real implementation, this is where you'd initialize the map library
    console.log("Map would be initialized here with:", mapSettings);
  };
  
  // Update map when settings change
  useEffect(() => {
    if (isMapLoaded) {
      console.log("Map settings updated:", mapSettings);
      // In a real implementation, this is where you'd update the map based on new settings
    }
  }, [mapSettings, isMapLoaded]);
  
  // Handle zoom level change
  const handleZoomChange = (value: number[]) => {
    setMapSettings(prev => ({ ...prev, zoomLevel: value }));
  };
  
  // Handle map style change
  const handleStyleChange = (value: string) => {
    setMapSettings(prev => ({ ...prev, mapStyle: value }));
  };
  
  // Toggle markers visibility
  const toggleMarkers = () => {
    setMapSettings(prev => ({ ...prev, showMarkers: !prev.showMarkers }));
  };
  
  // Toggle labels visibility
  const toggleLabels = () => {
    setMapSettings(prev => ({ ...prev, showLabels: !prev.showLabels }));
  };
  
  return (
    <div className="rounded-xl overflow-hidden border bg-white shadow-sm">
      <Tabs 
        defaultValue="properties" 
        className="w-full"
        onValueChange={setActiveTab}
      >
        <div className="flex justify-between items-center p-2 border-b">
          <TabsList>
            <TabsTrigger value="properties" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Properties</span>
            </TabsTrigger>
            <TabsTrigger value="vehicles" className="flex items-center gap-2">
              <Car className="h-4 w-4" />
              <span className="hidden sm:inline">Vehicles</span>
            </TabsTrigger>
            <TabsTrigger value="restaurants" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Restaurants</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Map Settings</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Map Settings</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>Zoom Level</Label>
                    <Slider 
                      value={mapSettings.zoomLevel} 
                      min={1} 
                      max={18} 
                      step={1} 
                      onValueChange={handleZoomChange} 
                    />
                    <div className="text-sm text-muted-foreground text-right">
                      Level: {mapSettings.zoomLevel}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Map Style</Label>
                    <Select value={mapSettings.mapStyle} onValueChange={handleStyleChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="streets">Street View</SelectItem>
                        <SelectItem value="satellite">Satellite</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                        <SelectItem value="terrain">Terrain</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-between">
                    <Label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={mapSettings.showMarkers} 
                        onChange={toggleMarkers} 
                        className="h-4 w-4"
                      />
                      Show Markers
                    </Label>
                    
                    <Label className="flex items-center gap-2 cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={mapSettings.showLabels} 
                        onChange={toggleLabels} 
                        className="h-4 w-4"
                      />
                      Show Labels
                    </Label>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
            
            <Button variant="outline" size="sm" className="hidden sm:flex">
              View Full Map
            </Button>
          </div>
        </div>
        
        <div className="relative h-[400px]" ref={mapContainerRef}>
          {isMapLoaded ? (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
              <div className="text-center p-4">
                <p className="text-lg font-medium">Interactive Map of Martil</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {activeTab === "properties" && "Showing available properties in Martil"}
                  {activeTab === "vehicles" && "Showing vehicle rental locations in Martil"}
                  {activeTab === "restaurants" && "Showing recommended restaurants in Martil"}
                </p>
                <p className="text-xs text-muted-foreground mt-4">
                  Map Style: {mapSettings.mapStyle} | Zoom: {mapSettings.zoomLevel}
                </p>
                <div className="absolute bottom-4 right-4 z-10">
                  <Button size="sm" variant="secondary" onClick={() => setIsMapLoaded(false)}>
                    Reset Map
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <div className="text-center p-4">
                <p className="text-lg font-medium">Interactive Map of Martil</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {activeTab === "properties" && "Show available properties in Martil"}
                  {activeTab === "vehicles" && "Show vehicle rental locations in Martil"}
                  {activeTab === "restaurants" && "Show recommended restaurants in Martil"}
                </p>
                <div className="flex justify-center mt-3">
                  <Button onClick={handleLoadMap}>Load Interactive Map</Button>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  Map Style: {mapSettings.mapStyle} | Zoom: {mapSettings.zoomLevel}
                </p>
              </div>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default MapView;
