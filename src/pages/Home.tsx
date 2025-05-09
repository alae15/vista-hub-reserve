
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { useData } from "@/contexts/DataContext";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import LocationMap from "@/components/LocationMap";

const Home = () => {
  const { properties, siteSettings } = useData();
  const [featuredProperties, setFeaturedProperties] = useState([]);

  useEffect(() => {
    // Get featured properties from the properties list
    const featured = properties.filter(property => property.featured);
    setFeaturedProperties(featured.length > 0 ? featured : properties.slice(0, 3));
  }, [properties]);

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
                  to="/map"
                  className="inline-flex h-12 items-center justify-center rounded-md border border-white bg-transparent px-8 text-sm font-medium text-white shadow-md transition-all hover:bg-white/20 hover:scale-105 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                >
                  <MapPin className="mr-2 h-5 w-5" />
                  Explore Map
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

        {/* Interactive Map Section */}
        <section className="container mx-auto px-4 py-12 bg-gray-50 rounded-lg">
          <div className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-martil-navy mb-4">
              Explore Martil's Finest Locations
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our available vehicles and top restaurants across Martil. Use the interactive map to find the perfect spots for your stay.
            </p>
            <div className="mt-4">
              <Button asChild variant="outline">
                <Link to="/map" className="flex items-center">
                  <MapPin className="mr-2 h-5 w-5" />
                  Open Full Map Explorer
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="h-[500px] overflow-hidden rounded-xl shadow-lg">
            <LocationMap previewMode={true} />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
