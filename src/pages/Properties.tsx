
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchFilters from "@/components/SearchFilters";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Grid3X3, List } from "lucide-react";

const Properties = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const location = useLocation();
  
  // Load properties from localStorage
  const [properties, setProperties] = useState(() => {
    const savedProperties = localStorage.getItem('properties');
    return savedProperties ? JSON.parse(savedProperties) : [];
  });
  
  // Listen for changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const savedProperties = localStorage.getItem('properties');
      if (savedProperties) {
        setProperties(JSON.parse(savedProperties));
      }
    };
    
    // Listen for storage events (when other tabs/windows update localStorage)
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    // Parse query params when the page loads or URL changes
    const searchParams = new URLSearchParams(location.search);
    
    if (searchParams.toString()) {
      // Apply filters based on URL parameters
      const searchLocation = searchParams.get('location');
      const propertyType = searchParams.get('type');
      const minPrice = Number(searchParams.get('minPrice') || 0);
      const maxPrice = Number(searchParams.get('maxPrice') || 1000);
      
      // Filter properties based on search parameters
      const filtered = properties.filter(property => {
        // Filter by location if provided
        if (searchLocation && !property.location.toLowerCase().includes(searchLocation.toLowerCase())) {
          return false;
        }
        
        // Filter by type if provided and not "all"
        if (propertyType && propertyType !== "all" && property.type !== propertyType) {
          return false;
        }
        
        // Filter by price range
        if (property.price < minPrice || property.price > maxPrice) {
          return false;
        }
        
        return true;
      });
      
      setFilteredProperties(filtered);
    } else {
      setFilteredProperties(properties);
    }
  }, [location.search, properties]);

  const handleSearch = (filters: any) => {
    // Apply filters to the properties
    const filtered = properties.filter(property => {
      // Filter by location if provided
      if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }
      
      // Filter by type if provided and not "all"
      if (filters.propertyType && filters.propertyType !== "all" && property.type !== filters.propertyType) {
        return false;
      }
      
      // Filter by price range
      if (property.price < filters.priceRange[0] || property.price > filters.priceRange[1]) {
        return false;
      }
      
      return true;
    });
    
    setFilteredProperties(filtered);
  };

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
            
            <SearchFilters type="properties" onSearch={handleSearch} />
            
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                <span className="font-medium text-martil-navy">{filteredProperties.length}</span> properties found
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
                {filteredProperties.map(property => (
                  <PropertyCard key={property.id} {...property} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProperties.map(property => (
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
