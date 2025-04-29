
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchFilters from "@/components/SearchFilters";
import PropertyCard from "@/components/PropertyCard";
import { properties } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Grid3X3, List } from "lucide-react";

const Properties = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="bg-martil-beige py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-martil-navy">
              Properties in Martil
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Find your perfect place to stay in this beautiful coastal town
            </p>
            
            <SearchFilters type="properties" />
            
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                <span className="font-medium text-martil-navy">{properties.length}</span> properties found
              </p>
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
                {properties.map(property => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {properties.map(property => (
                  <div key={property.id} className="listing-card overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-64 md:h-auto">
                        <img 
                          src={property.image} 
                          alt={property.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-medium text-martil-navy">{property.title}</h3>
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-4 h-4 text-yellow-500 mr-1"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm font-medium">{property.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{property.location}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {property.amenities?.slice(0, 3).map((amenity, index) => (
                            <span key={index} className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                              {amenity}
                            </span>
                          ))}
                          {property.amenities && property.amenities.length > 3 && (
                            <span className="text-xs px-2 py-1 rounded-full text-muted-foreground">
                              +{property.amenities.length - 3} more
                            </span>
                          )}
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
                          {property.description}
                        </p>
                        <div className="mt-4 flex justify-between items-end">
                          <div>
                            <div className="font-medium text-lg">
                              ${property.price} <span className="text-muted-foreground font-normal text-sm">/night</span>
                            </div>
                          </div>
                          <Button>View Details</Button>
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

export default Properties;
