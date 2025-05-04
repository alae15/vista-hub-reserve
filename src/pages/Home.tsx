
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
    name: cafe.name || "Unnamed Cafe",
    lat: cafe.lat || 35.616367,
    lng: cafe.lng || -5.272562,
    rating: cafe.rating || 4.0,
    description: cafe.description || "",
    location: cafe.location || "Martil",
    image: cafe.image || ""
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero section with enhanced gradient overlay */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-martil-navy/70 to-martil-blue/40 z-10"></div>
          <div className="h-[600px] bg-cover bg-center" style={{ backgroundImage: 'url(/images/martil-beach.jpg)' }}></div>
          <div className="container mx-auto px-4 lg:px-8 absolute inset-0 z-20 flex items-center">
            <div className="max-w-xl text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
                {siteSettings?.heroTitle || "Welcome to MartiStay"}
              </h1>
              <p className="text-lg md:text-xl mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                {siteSettings?.heroDescription || "Your perfect vacation in Martil, Morocco starts here"}
              </p>
              <div className="space-x-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                <Link 
                  to="/properties"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-martil-blue px-8 text-sm font-medium text-white shadow-lg transition-all hover:bg-blue-500 hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Browse Properties
                </Link>
                <Link
                  to="/book-now"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-white bg-transparent px-8 text-sm font-medium text-white shadow-md transition-all hover:bg-white/20 hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        </section>
        
        {/* Featured Properties with smooth animations */}
        <section className="container mx-auto px-4 py-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-martil-navy border-l-4 border-martil-blue pl-4">
              Featured Properties
            </h2>
            <Link 
              to="/properties" 
              className="text-martil-blue hover:underline hover:text-blue-600 transition-colors flex items-center"
            >
              View All Properties
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProperties.map((property, index) => (
              <div 
                key={property.id} 
                className="animate-fade-in" 
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <PropertyCard 
                  id={property.id}
                  title={property.title}
                  location={property.location}
                  price={property.price}
                  image={property.image}
                  rating={property.rating || 4.5}
                  type={property.type}
                  featured={property.featured}
                />
              </div>
            ))}
          </div>
        </section>
        
        {/* Cafe Map Section with improved styling */}
        {(!siteSettings || siteSettings.showCafeMap !== false) && (
          <section className="bg-martil-light py-16">
            <div className="container mx-auto px-4">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-martil-navy border-l-4 border-martil-blue pl-4">
                  Best Cafes in Martil
                </h2>
              </div>
              
              <div className="bg-white p-2 rounded-xl shadow-lg overflow-hidden">
                <CafeMap 
                  height="500px"
                  mapStyle={mapSettings?.mapStyle || "streets"}
                  zoomLevel={mapSettings?.zoomLevel || 14}
                  showMarkers={mapSettings?.showMarkers !== false}
                  centerLat={mapSettings?.centerLat || 35.616367}
                  centerLng={mapSettings?.centerLng || -5.272562}
                  cafes={mapCafes.length > 0 ? mapCafes : undefined}
                />
              </div>
            </div>
          </section>
        )}

        {/* Additional information section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-xl overflow-hidden border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-r from-martil-blue to-blue-400 p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Why Choose MartiStay?</h3>
                <p className="text-white/80">We offer the best selection of properties, vehicles and restaurants in Martil.</p>
              </div>
              <div className="p-6">
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-martil-blue mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Handpicked properties with quality assurance</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-martil-blue mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Local expertise and personalized recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-martil-blue mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Secure bookings and 24/7 customer support</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden border border-gray-100 shadow-md hover:shadow-lg transition-shadow">
              <div className="bg-gradient-to-r from-martil-orange to-orange-400 p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">Discover Martil</h3>
                <p className="text-white/80">Experience the beauty and charm of this Mediterranean gem.</p>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">
                  Nestled on Morocco's Mediterranean coast, Martil offers beautiful beaches, 
                  delicious cuisine, and a perfect blend of traditional charm and modern comfort.
                </p>
                <Link 
                  to="/book-now" 
                  className="inline-flex items-center justify-center rounded-md bg-martil-orange px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-orange-500"
                >
                  Plan Your Trip
                  <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
