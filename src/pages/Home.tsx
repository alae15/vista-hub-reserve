
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Home as HomeIcon, Car, MapPin, Search, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import VehicleCard from "@/components/VehicleCard";
import RestaurantCard from "@/components/RestaurantCard";
import MapView from "@/components/MapView";
import { properties, vehicles, restaurants } from "@/data/mockData";

const Home = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Filter featured items
  const featuredProperties = properties.filter(property => property.featured);
  const featuredVehicles = vehicles.filter(vehicle => vehicle.featured);
  const topRestaurants = restaurants.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <div className="hero-section text-white py-20 md:py-32 px-4 relative">
        <div className="container mx-auto max-w-4xl text-center z-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Your Perfect Vacation in Martil
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto">
            Find the best properties, vehicles, and restaurants for an unforgettable experience in Morocco's coastal gem.
          </p>
          
          {/* Search Box */}
          <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 text-left">
            <Tabs defaultValue="stay" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="stay" className="flex items-center gap-2">
                  <HomeIcon className="h-4 w-4" />
                  <span>Stay</span>
                </TabsTrigger>
                <TabsTrigger value="vehicle" className="flex items-center gap-2">
                  <Car className="h-4 w-4" />
                  <span>Vehicles</span>
                </TabsTrigger>
                <TabsTrigger value="eat" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Restaurants</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="stay" className="mt-0">
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="location" 
                          placeholder="Martil, Morocco" 
                          className="pl-9"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Check-in</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <Label>Check-out</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(new Date(date.getTime() + 86400000), "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date ? new Date(date.getTime() + 86400000) : undefined}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <Label>Guests</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select guests" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Guest</SelectItem>
                          <SelectItem value="2">2 Guests</SelectItem>
                          <SelectItem value="3">3 Guests</SelectItem>
                          <SelectItem value="4">4 Guests</SelectItem>
                          <SelectItem value="5+">5+ Guests</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" size="lg" className="gap-2">
                      <span>Search Properties</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="vehicle" className="mt-0">
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <Label>Pick-up Location</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Martil, Morocco" 
                          className="pl-9"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Pick-up Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <Label>Return Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(new Date(date.getTime() + 86400000), "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date ? new Date(date.getTime() + 86400000) : undefined}
                            onSelect={setDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <Label>Vehicle Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Vehicles</SelectItem>
                          <SelectItem value="car">Cars</SelectItem>
                          <SelectItem value="motorcycle">Motorcycles</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" size="lg" className="gap-2">
                      <span>Find Vehicles</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="eat" className="mt-0">
                <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Location</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Martil, Morocco" 
                          className="pl-9"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label>Cuisine</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Type of cuisine" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Cuisines</SelectItem>
                          <SelectItem value="moroccan">Moroccan</SelectItem>
                          <SelectItem value="mediterranean">Mediterranean</SelectItem>
                          <SelectItem value="seafood">Seafood</SelectItem>
                          <SelectItem value="international">International</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Price Range</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select price range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Prices</SelectItem>
                          <SelectItem value="$">$ (Budget)</SelectItem>
                          <SelectItem value="$$">$$ (Moderate)</SelectItem>
                          <SelectItem value="$$$">$$$ (Expensive)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" size="lg" className="gap-2">
                      <span>Find Restaurants</span>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12">
          {/* Featured Properties */}
          <section className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-martil-navy">Featured Properties</h2>
              <Link to="/properties" className="text-martil-blue hover:underline flex items-center">
                <span>View all</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProperties.map(property => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </section>
          
          {/* Vehicle Rentals */}
          <section className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-martil-navy">Vehicle Rentals</h2>
              <Link to="/vehicles" className="text-martil-blue hover:underline flex items-center">
                <span>View all</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVehicles.map(vehicle => (
                <VehicleCard key={vehicle.id} {...vehicle} />
              ))}
            </div>
          </section>
          
          {/* Map and Restaurants Section */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-martil-navy">Explore Martil</h2>
                <Button variant="outline" size="sm">Open Full Map</Button>
              </div>
              <MapView />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-martil-navy">Top Restaurants</h2>
                <Link to="/restaurants" className="text-martil-blue hover:underline flex items-center">
                  <span>View all</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              
              <div className="space-y-4">
                {topRestaurants.map(restaurant => (
                  <div key={restaurant.id} className="bg-white rounded-lg border shadow-sm overflow-hidden">
                    <div className="aspect-[16/9] overflow-hidden">
                      <img 
                        src={restaurant.image} 
                        alt={restaurant.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-lg">{restaurant.name}</h3>
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
                      <Link to={`/restaurant/${restaurant.id}`} className="mt-2 text-sm text-martil-blue hover:underline block">
                        View details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          
          {/* Call to Action */}
          <section className="mt-16 bg-gradient-to-r from-martil-blue to-blue-600 text-white rounded-2xl p-6 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Experience the Beauty of Martil</h2>
                <p className="mb-6">
                  Book your perfect vacation today and enjoy the stunning beaches, delicious cuisine, and vibrant culture of Morocco's hidden gem.
                </p>
                <Button size="lg" variant="secondary" className="text-martil-blue">
                  Start Planning Your Trip
                </Button>
              </div>
              <div className="hidden md:block text-right">
                <div className="inline-block relative">
                  <div className="absolute -top-4 -left-4 bg-martil-orange text-white p-3 rounded-xl z-10 rotate-3 shadow-lg">
                    <p className="text-lg font-semibold">Special Summer Offer</p>
                    <p className="text-sm">Up to 20% off selected properties!</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
