
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchFilters from "@/components/SearchFilters";
import RestaurantCard from "@/components/RestaurantCard";
import MapView from "@/components/MapView";
import { restaurants } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Grid3X3, List, MapPin } from "lucide-react";

const Restaurants = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="bg-martil-beige py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-martil-navy">
              Restaurants in Martil
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Discover delicious local and international cuisine
            </p>
            
            <SearchFilters type="restaurants" />
            
            <div className="flex justify-between items-center mb-6">
              <p className="text-muted-foreground">
                <span className="font-medium text-martil-navy">{restaurants.length}</span> restaurants found
              </p>
              <div className="flex items-center gap-2">
                <Button 
                  variant={showMap ? "outline" : "default"}
                  size="sm"
                  onClick={() => setShowMap(false)}
                  className="gap-1 hidden md:flex"
                >
                  <Grid3X3 className="h-4 w-4" />
                  <span>Gallery</span>
                </Button>
                <Button 
                  variant={showMap ? "default" : "outline"}
                  size="sm"
                  onClick={() => setShowMap(true)}
                  className="gap-1 hidden md:flex"
                >
                  <MapPin className="h-4 w-4" />
                  <span>Map View</span>
                </Button>
                <div className="md:hidden flex items-center gap-2">
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
            </div>
            
            {showMap ? (
              <div className="md:grid md:grid-cols-2 gap-6">
                <div className="hidden md:block h-[calc(100vh-300px)] sticky top-20">
                  <MapView />
                </div>
                <div className="space-y-4">
                  {restaurants.map(restaurant => (
                    <div key={restaurant.id} className="listing-card overflow-hidden">
                      <div className="flex flex-row">
                        <div className="w-1/3 h-32">
                          <img 
                            src={restaurant.image} 
                            alt={restaurant.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-2/3 p-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-medium text-martil-navy">{restaurant.name}</h3>
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
                              <span className="text-sm font-medium">{restaurant.rating}</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">{restaurant.cuisine} · {restaurant.location}</p>
                          <p className="text-xs text-muted-foreground mt-1">{restaurant.priceRange}</p>
                          <Button size="sm" variant="outline" className="mt-2 text-xs">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {restaurants.map(restaurant => (
                  <RestaurantCard key={restaurant.id} {...restaurant} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {restaurants.map(restaurant => (
                  <div key={restaurant.id} className="listing-card overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3 h-64 md:h-auto">
                        <img 
                          src={restaurant.image} 
                          alt={restaurant.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-medium text-martil-navy">{restaurant.name}</h3>
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
                            <span className="text-sm font-medium">{restaurant.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{restaurant.cuisine} · {restaurant.location}</p>
                        <p className="text-sm text-muted-foreground mt-1">{restaurant.priceRange}</p>
                        
                        <div className="mt-3">
                          <h4 className="text-sm font-medium">Popular Dishes:</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {restaurant.popularDishes?.join(", ")}
                          </p>
                        </div>
                        
                        <div className="mt-3 flex flex-wrap gap-2">
                          {restaurant.features?.map((feature, index) => (
                            <span key={index} className="bg-secondary text-secondary-foreground text-xs px-2 py-1 rounded-full">
                              {feature}
                            </span>
                          ))}
                        </div>
                        
                        <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
                          {restaurant.description}
                        </p>
                        
                        <div className="mt-4 flex justify-between items-end">
                          <div className="text-sm">
                            <span className="font-medium">Hours:</span>{" "}
                            <span className="text-muted-foreground">{restaurant.openingHours}</span>
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

export default Restaurants;
