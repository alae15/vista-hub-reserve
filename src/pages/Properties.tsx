
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import SearchFilters from "@/components/SearchFilters";
import { useData } from "@/contexts/DataContext";

const Properties = () => {
  const { properties: allProperties } = useData();
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [searchParams, setSearchParams] = useState({
    location: "",
    type: "",
    minPrice: "",
    maxPrice: "",
  });

  useEffect(() => {
    // Reset filtered properties when all properties change
    setFilteredProperties(allProperties);
  }, [allProperties]);

  const handleSearch = (filters) => {
    setSearchParams(filters);
    
    // Filter properties based on search parameters
    let results = [...allProperties];
    
    if (filters.location) {
      results = results.filter((property) =>
        property.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    
    if (filters.type) {
      results = results.filter((property) =>
        property.type.toLowerCase().includes(filters.type.toLowerCase())
      );
    }
    
    if (filters.minPrice) {
      results = results.filter(
        (property) => property.price >= parseInt(filters.minPrice)
      );
    }
    
    if (filters.maxPrice) {
      results = results.filter(
        (property) => property.price <= parseInt(filters.maxPrice)
      );
    }
    
    setFilteredProperties(results);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-bold text-martil-navy mb-8">
            Properties in Martil
          </h1>
          
          <SearchFilters onSearch={handleSearch} />
          
          <div className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.length > 0 ? (
                filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    id={property.id}
                    title={property.title}
                    location={property.location}
                    price={property.price}
                    image={property.image}
                    rating={property.rating || 4.5}
                    type={property.type}
                    featured={property.featured}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-muted-foreground">
                    No properties found matching your search criteria.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Properties;
