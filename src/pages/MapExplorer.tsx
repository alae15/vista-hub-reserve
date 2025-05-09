
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LocationMap from "@/components/LocationMap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const MapExplorer = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  
  const toggleEditMode = () => {
    // For security, you might want to implement a password prompt here
    setIsEditMode(!isEditMode);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-martil-navy">Map Explorer</h1>
              <p className="text-gray-600">Discover vehicles and restaurants across Martil</p>
            </div>
            
            <button 
              onClick={toggleEditMode}
              className={`text-sm px-4 py-2 rounded-full transition-colors ${
                isEditMode 
                  ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {isEditMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <Tabs defaultValue="map" className="w-full">
              <div className="bg-gray-50 px-4 py-2 border-b">
                <TabsList>
                  <TabsTrigger value="map">Interactive Map</TabsTrigger>
                  <TabsTrigger value="about">About This Map</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="map" className="p-0">
                <LocationMap height="70vh" isEditable={isEditMode} />
              </TabsContent>
              
              <TabsContent value="about" className="p-6">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-xl font-semibold mb-4">About the Martil Map Explorer</h2>
                  <p className="mb-4">
                    This interactive map shows the locations of available vehicles and recommended restaurants 
                    throughout Martil. Use the filters to show or hide different types of locations.
                  </p>
                  
                  <h3 className="font-medium mt-6 mb-2">How to Use</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    <li>Click on any marker to view details about that location</li>
                    <li>Use the toggle switches to filter what types of locations are displayed</li>
                    <li>In edit mode, you can drag and drop markers to update their positions</li>
                  </ul>
                  
                  <h3 className="font-medium mt-6 mb-2">About the Data</h3>
                  <p className="text-gray-700">
                    The locations shown on this map represent our current inventory of rental vehicles 
                    and our recommended restaurants in Martil. The map data is updated regularly to 
                    ensure accuracy.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MapExplorer;
