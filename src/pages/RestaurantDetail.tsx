
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { restaurants } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Share, MapPin, Phone, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [liked, setLiked] = useState(false);
  
  // Find restaurant by id
  const restaurant = restaurants.find(r => r.id === Number(id));
  
  if (!restaurant) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Restaurant not found</h2>
            <Button onClick={() => navigate("/restaurants")}>Back to restaurants</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const handleShare = () => {
    toast({
      title: "Share this restaurant",
      description: "Link copied to clipboard!",
    });
  };
  
  const handleWishlist = () => {
    setLiked(!liked);
    toast({
      title: liked ? "Removed from wishlist" : "Added to wishlist",
      description: liked ? "Restaurant removed from your saved items" : "Restaurant saved to your wishlist",
    });
  };
  
  const handleReserve = () => {
    toast({
      title: "Reservation requested",
      description: "We'll forward your request to the restaurant.",
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <div className="mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-1 text-sm"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to all restaurants</span>
            </Button>
          </div>
          
          {/* Restaurant Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-bold text-martil-navy mb-2">{restaurant.name}</h1>
                <Badge variant="outline">{restaurant.cuisine}</Badge>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{restaurant.location}</span>
                <div className="flex items-center ml-2">
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
                  <span>{restaurant.rating}</span>
                </div>
                <span>•</span>
                <span>{restaurant.priceRange}</span>
              </div>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={handleShare}
                className="flex items-center gap-1"
              >
                <Share className="h-4 w-4" />
                <span>Share</span>
              </Button>
              <Button
                variant={liked ? "default" : "outline"}
                size="sm"
                onClick={handleWishlist}
                className={`flex items-center gap-1 ${liked ? 'bg-red-500 hover:bg-red-600' : ''}`}
              >
                <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
                <span>{liked ? "Saved" : "Save"}</span>
              </Button>
            </div>
          </div>
          
          {/* Restaurant Image */}
          <div className="mb-8 rounded-xl overflow-hidden aspect-[16/9]">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Restaurant Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="menu">Menu</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="pt-6">
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-xl font-medium mb-4">About</h2>
                      <p className="text-muted-foreground">{restaurant.description}</p>
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-medium mb-4">Location & Contact</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <div className="aspect-[4/3] bg-gray-200 rounded-lg mb-4">
                            {/* Map placeholder */}
                            <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                              Map view of {restaurant.location}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground">{restaurant.location}</p>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-start gap-3">
                            <div className="mt-1">
                              <Clock className="h-5 w-5 text-martil-blue" />
                            </div>
                            <div>
                              <h3 className="font-medium">Hours</h3>
                              <p className="text-muted-foreground">{restaurant.openingHours}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-3">
                            <div className="mt-1">
                              <Phone className="h-5 w-5 text-martil-blue" />
                            </div>
                            <div>
                              <h3 className="font-medium">Contact</h3>
                              <p className="text-muted-foreground">{restaurant.contact}</p>
                            </div>
                          </div>
                          
                          <Button onClick={handleReserve}>Make a Reservation</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-medium mb-4">Features</h2>
                      <div className="grid grid-cols-2 gap-3">
                        {restaurant.features?.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-5 h-5 text-martil-blue"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="menu" className="pt-6">
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-xl font-medium mb-2">Popular Dishes</h2>
                      <p className="text-muted-foreground mb-4">These are the most ordered dishes at {restaurant.name}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {restaurant.popularDishes?.map((dish, index) => (
                          <div key={index} className="border rounded-lg overflow-hidden">
                            <div className="bg-gray-100 aspect-[4/3] flex items-center justify-center">
                              <p className="text-muted-foreground px-4 text-center">Image of {dish}</p>
                            </div>
                            <div className="p-3">
                              <h3 className="font-medium">{dish}</h3>
                              <p className="text-sm text-muted-foreground mt-1">
                                A delicious dish prepared with fresh local ingredients.
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-3">
                        Full menu available at the restaurant or by phone
                      </p>
                      <Button onClick={handleReserve}>Make a Reservation</Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="reviews" className="pt-6">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-6">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 text-yellow-500"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-medium text-lg">{restaurant.rating}</span>
                      <span className="text-muted-foreground">· 36 reviews</span>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="border-b pb-6">
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-martil-blue rounded-full text-white flex items-center justify-center font-medium">
                              MA
                            </div>
                            <div>
                              <p className="font-medium">Mohammed A.</p>
                              <p className="text-xs text-muted-foreground">April 2023</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-4 h-4 text-yellow-500"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm ml-1">5.0</span>
                          </div>
                        </div>
                        <p className="text-sm">
                          Absolutely incredible food. The seafood is the freshest I've had in Morocco, and the view of the ocean makes the experience perfect. Highly recommend the Seafood Tajine!
                        </p>
                      </div>
                      
                      <div className="border-b pb-6">
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-martil-orange rounded-full text-white flex items-center justify-center font-medium">
                              LT
                            </div>
                            <div>
                              <p className="font-medium">Laura T.</p>
                              <p className="text-xs text-muted-foreground">March 2023</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-4 h-4 text-yellow-500"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm ml-1">4.5</span>
                          </div>
                        </div>
                        <p className="text-sm">
                          We had a wonderful dinner here during our stay in Martil. The staff was very friendly and the atmosphere was perfect for a relaxing evening. Great value for the quality of food.
                        </p>
                      </div>
                      
                      <div className="border-b pb-6">
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-green-600 rounded-full text-white flex items-center justify-center font-medium">
                              JF
                            </div>
                            <div>
                              <p className="font-medium">Jean F.</p>
                              <p className="text-xs text-muted-foreground">February 2023</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-4 h-4 text-yellow-500"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-sm ml-1">4.7</span>
                          </div>
                        </div>
                        <p className="text-sm">
                          The authentic Moroccan flavors at this restaurant are exceptional. The service was impeccable, and I loved the traditional music they played. Will definitely return on my next trip to Martil.
                        </p>
                      </div>
                      
                      <Button variant="outline" className="w-full">View All 36 Reviews</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Info Card */}
            <div>
              <div className="bg-white rounded-xl border shadow-sm p-6 sticky top-20">
                <h2 className="text-xl font-medium mb-6">Restaurant Information</h2>
                
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <MapPin className="h-5 w-5 text-martil-blue" />
                    </div>
                    <div>
                      <h3 className="font-medium">Address</h3>
                      <p className="text-muted-foreground">{restaurant.location}</p>
                      <Button variant="link" className="px-0 h-auto text-martil-blue">
                        Get Directions
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Clock className="h-5 w-5 text-martil-blue" />
                    </div>
                    <div>
                      <h3 className="font-medium">Hours</h3>
                      <p className="text-muted-foreground">{restaurant.openingHours}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <Phone className="h-5 w-5 text-martil-blue" />
                    </div>
                    <div>
                      <h3 className="font-medium">Phone</h3>
                      <p className="text-muted-foreground">{restaurant.contact}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-5 w-5 text-martil-blue"
                      >
                        <path d="M12 7.5a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z" />
                        <path fillRule="evenodd" d="M1.5 4.875C1.5 3.839 2.34 3 3.375 3h17.25c1.035 0 1.875.84 1.875 1.875v9.75c0 1.036-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 14.625v-9.75zM8.25 9.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM18.75 9a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75V9.75a.75.75 0 00-.75-.75h-.008zM4.5 9.75A.75.75 0 015.25 9h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H5.25a.75.75 0 01-.75-.75V9.75z" clipRule="evenodd" />
                        <path d="M2.25 18a.75.75 0 000 1.5h19.5a.75.75 0 000-1.5H2.25z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium">Price Range</h3>
                      <p className="text-muted-foreground">{restaurant.priceRange}</p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button onClick={handleReserve} className="w-full">
                      Make a Reservation
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RestaurantDetail;
