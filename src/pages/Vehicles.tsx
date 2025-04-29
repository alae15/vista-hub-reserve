
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchFilters from "@/components/SearchFilters";
import VehicleCard from "@/components/VehicleCard";
import { vehicles } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Grid3X3, List, Car, Motorcycle } from "lucide-react";

const Vehicles = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState<"all" | "car" | "motorcycle">("all");

  const filteredVehicles = filter === "all" 
    ? vehicles 
    : vehicles.filter(vehicle => vehicle.type === filter);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="bg-martil-beige py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-martil-navy">
              Vehicle Rentals in Martil
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Find the perfect car or motorcycle to explore Martil and its surroundings
            </p>
            
            <SearchFilters type="vehicles" />
            
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2">
                <Button 
                  variant={filter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("all")}
                >
                  All Vehicles
                </Button>
                <Button 
                  variant={filter === "car" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("car")}
                  className="gap-1"
                >
                  <Car className="h-4 w-4" />
                  <span>Cars</span>
                </Button>
                <Button 
                  variant={filter === "motorcycle" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilter("motorcycle")}
                  className="gap-1"
                >
                  <Motorcycle className="h-4 w-4" />
                  <span>Motorcycles</span>
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button 
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredVehicles.map(vehicle => (
                  <VehicleCard key={vehicle.id} {...vehicle} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredVehicles.map(vehicle => (
                  <div key={vehicle.id} className="listing-card overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-64 md:h-auto">
                        <img 
                          src={vehicle.image} 
                          alt={vehicle.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-medium text-martil-navy">{vehicle.title}</h3>
                            {vehicle.type === "car" ? (
                              <span className="bg-martil-blue text-white text-xs px-2 py-0.5 rounded-full">Car</span>
                            ) : (
                              <span className="border border-martil-blue text-martil-blue text-xs px-2 py-0.5 rounded-full">Motorcycle</span>
                            )}
                          </div>
                          <div className="text-sm text-muted-foreground">{vehicle.year}</div>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-4">
                          {vehicle.seats && (
                            <div className="flex items-center text-sm text-muted-foreground">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-4 h-4 mr-1"
                              >
                                <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                              </svg>
                              {vehicle.seats} seats
                            </div>
                          )}
                          {vehicle.transmission && (
                            <div className="flex items-center text-sm text-muted-foreground">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-4 h-4 mr-1"
                              >
                                <path fillRule="evenodd" d="M8.34 1.804A1 1 0 019.32 1h1.36a1 1 0 01.98.804l.295 1.473c.497.144.971.342 1.416.587l1.25-.834a1 1 0 011.262.125l.962.962a1 1 0 01.125 1.262l-.834 1.25c.245.445.443.919.587 1.416l1.473.294a1 1 0 01.804.98v1.361a1 1 0 01-.804.98l-1.473.295a6.95 6.95 0 01-.587 1.416l.834 1.25a1 1 0 01-.125 1.262l-.962.962a1 1 0 01-1.262.125l-1.25-.834a6.953 6.953 0 01-1.416.587l-.294 1.473a1 1 0 01-.98.804H9.32a1 1 0 01-.98-.804l-.295-1.473a6.957 6.957 0 01-1.416-.587l-1.25.834a1 1 0 01-1.262-.125l-.962-.962a1 1 0 01-.125-1.262l.834-1.25a6.957 6.957 0 01-.587-1.416l-1.473-.294A1 1 0 011 10.68V9.32a1 1 0 01.804-.98l1.473-.295c.144-.497.342-.971.587-1.416l-.834-1.25a1 1 0 01.125-1.262l.962-.962A1 1 0 015.38 3.03l1.25.834a6.957 6.957 0 011.416-.587l.294-1.473zM13 10a3 3 0 11-6 0 3 3 0 016 0z" clipRule="evenodd" />
                              </svg>
                              {vehicle.transmission}
                            </div>
                          )}
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          {vehicle.features?.slice(0, 3).map((feature, index) => (
                            <span key={index} className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                              {feature}
                            </span>
                          ))}
                          {vehicle.features && vehicle.features.length > 3 && (
                            <span className="text-xs px-2 py-1 rounded-full text-muted-foreground">
                              +{vehicle.features.length - 3} more
                            </span>
                          )}
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
                          {vehicle.description}
                        </p>
                        <div className="mt-4 flex justify-between items-end">
                          <div>
                            <div className="font-medium text-lg">
                              ${vehicle.price} <span className="text-muted-foreground font-normal text-sm">/day</span>
                            </div>
                          </div>
                          <Button>Book Now</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Vehicles;
