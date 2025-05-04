
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { useData } from "@/contexts/DataContext";
import CafeMap, { CafeMapCafe } from "@/components/CafeMap";

const Home = () => {
  const { properties, cafes, mapSettings, siteSettings } = useData();
  const [featuredProperties, setFeaturedProperties] = useState([]);

  useEffect(() => {
    // Get featured properties from the properties list
    const featured = properties.filter(property => property.featured);
    setFeaturedProperties(featured.length > 0 ? featured : properties.slice(0, 3));
  }, [properties]);

  // Map cafes to CafeMapCafe type ensuring all required fields exist
  const mapCafes: CafeMapCafe[] = cafes.map(cafe => ({
    id: typeof cafe.id === 'number' ? cafe.id : Math.floor(Math.random() * 10000),
    name: cafe.name,
    lat: cafe.lat,
    lng: cafe.lng,
    rating: cafe.rating,
    description: cafe.description || "",
    location: cafe.location || "",
    image: cafe.image || ""
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="relative">
          <div className="absolute inset-0 bg-martil-navy opacity-40 z-10"></div>
          <div className="h-[500px] bg-cover bg-center" style={{ backgroundImage: 'url(/images/martil-beach.jpg)' }}></div>
          <div className="container mx-auto px-4 lg:px-8 absolute inset-0 z-20 flex items-center">
            <div className="max-w-xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {siteSettings.heroTitle}
              </h1>
              <p className="text-lg md:text-xl mb-8">
                {siteSettings.heroDescription}
              </p>
              <div className="space-x-4">
                <Link 
                  to="/properties"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-martil-blue px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Browse Properties
                </Link>
                <Link
                  to="/book-now"
                  className="inline-flex h-10 items-center justify-center rounded-md border border-white bg-transparent px-8 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Properties */}
        <section className="container mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-martil-navy">
              Featured Properties
            </h2>
            <Link 
              to="/properties" 
              className="text-martil-blue hover:underline"
            >
              View All Properties
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property) => (
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
            ))}
          </div>
        </section>
        
        {/* Cafe Map Section */}
        {siteSettings.showCafeMap && (
          <section className="container mx-auto px-4 py-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-martil-navy">
                Best Cafes in Martil
              </h2>
            </div>
            
            <div className="min-h-[500px]">
              {mapCafes.length > 0 ? (
                <CafeMap 
                  height="500px"
                  mapStyle={mapSettings.mapStyle}
                  zoomLevel={mapSettings.zoomLevel}
                  showMarkers={mapSettings.showMarkers}
                  centerLat={mapSettings.centerLat}
                  centerLng={mapSettings.centerLng}
                  cafes={mapCafes}
                />
              ) : (
                <div className="bg-gray-100 rounded-lg p-4 text-center h-[500px] flex items-center justify-center">
                  <p>No cafes available to display. Add some cafes to see them on the map!</p>
                </div>
              )}
            </div>
          </section>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
