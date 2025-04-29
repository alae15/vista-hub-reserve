
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Car, Motorcycle, MapPin } from "lucide-react";

const MapView = () => {
  const [activeTab, setActiveTab] = useState("properties");
  
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
          <Button variant="outline" size="sm" className="hidden sm:flex">
            View Full Map
          </Button>
        </div>
        
        <div className="relative h-[400px]">
          {/* This is a placeholder for the map. In a real application, you'd integrate a mapping library like Leaflet or Google Maps */}
          <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
            <div className="text-center p-4">
              <p className="text-lg font-medium">Interactive Map of Martil</p>
              <p className="text-sm text-muted-foreground mt-1">
                {activeTab === "properties" && "Showing available properties in Martil"}
                {activeTab === "vehicles" && "Showing vehicle rental locations in Martil"}
                {activeTab === "restaurants" && "Showing recommended restaurants in Martil"}
              </p>
              <div className="flex justify-center mt-3">
                <Button>Load Interactive Map</Button>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                For a real implementation, you would integrate a proper mapping solution like Google Maps, Mapbox, or Leaflet.
              </p>
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default MapView;
