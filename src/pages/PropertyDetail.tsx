import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PanoramaViewer from "@/components/PanoramaViewer";
import { properties } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Heart, Share, MapPin, ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns"; // Added import for format function

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [guests, setGuests] = useState(1);
  const [liked, setLiked] = useState(false);
  
  // Find property by id
  const property = properties.find(p => p.id === Number(id));
  
  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Property not found</h2>
            <Button onClick={() => navigate("/properties")}>Back to properties</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Booking request received!",
      description: "We'll get back to you shortly with confirmation.",
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Share this property",
      description: "Link copied to clipboard!",
    });
  };
  
  const handleWishlist = () => {
    setLiked(!liked);
    toast({
      title: liked ? "Removed from wishlist" : "Added to wishlist",
      description: liked ? "Property removed from your saved items" : "Property saved to your wishlist",
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
              <span>Back to all properties</span>
            </Button>
          </div>
          
          {/* Property Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-martil-navy mb-2">{property.title}</h1>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{property.location}</span>
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
                  <span>{property.rating}</span>
                </div>
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
          
          {/* 360 Viewer */}
          <div className="mb-8">
            <PanoramaViewer images={property.panoramaImages || [property.image]} title={property.title} />
          </div>
          
          {/* Property Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="pt-6">
                  <div className="mb-6">
                    <div className="flex items-center gap-6 mb-4">
                      <div>
                        <Badge variant="outline" className="text-xs">
                          {property.type}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4 text-muted-foreground"
                        >
                          <path d="M10.75 1.25a.75.75 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                        </svg>
                        <span className="text-sm text-muted-foreground">
                          {property.guests} guests
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4 text-muted-foreground"
                        >
                          <path d="M10.75 1.25a.75.75 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
                        </svg>
                        <span className="text-sm text-muted-foreground">
                          {property.beds} beds
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-4 h-4 text-muted-foreground"
                        >
                          <path fillRule="evenodd" d="M9.5 1a.75.75 0 01.75.75v1.506a9.751 9.751 0 019 9.744c0 .551-.097 1.111-.222 1.5H3.973c-.125-.389-.222-.949-.222-1.5a9.75 9.75 0 019-9.744V1.75A.75.75 0 019.5 1zM4.5 15.5h11c.14 0 .25.11.25.25v1.5a.75.75 0 01-.75.75h-10A.75.75 0 014.25 17.25v-1.5c0-.14.11-.25.25-.25z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-muted-foreground">
                          {property.baths} baths
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {property.description}
                    </p>
                    <h3 className="font-medium text-lg mb-3">Location</h3>
                    <div className="aspect-[16/9] bg-gray-200 rounded-lg mb-4">
                      {/* Map placeholder */}
                      <div className="h-full w-full flex items-center justify-center">
                        <p className="text-muted-foreground">Map view of {property.location}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Located in the beautiful coastal town of Martil, this property offers easy access to beaches, restaurants, and local attractions.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="amenities" className="pt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    {property.amenities?.map((amenity, index) => (
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
                        <span>{amenity}</span>
                      </div>
                    ))}
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
                      <span className="font-medium text-lg">{property.rating}</span>
                      <span className="text-muted-foreground">· 24 reviews</span>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="border-b pb-6">
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-martil-blue rounded-full text-white flex items-center justify-center font-medium">
                              JD
                            </div>
                            <div>
                              <p className="font-medium">John Doe</p>
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
                          Amazing property with incredible views! The location is perfect, just a short walk to the beach. The host was very responsive and helpful throughout our stay.
                        </p>
                      </div>
                      
                      <div className="border-b pb-6">
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-martil-orange rounded-full text-white flex items-center justify-center font-medium">
                              SM
                            </div>
                            <div>
                              <p className="font-medium">Sarah Miller</p>
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
                            <span className="text-sm ml-1">4.8</span>
                          </div>
                        </div>
                        <p className="text-sm">
                          We had a wonderful stay at this property. It was clean, comfortable, and had all the amenities we needed. The location is ideal for exploring Martil and nearby areas.
                        </p>
                      </div>
                      
                      <Button variant="outline" className="w-full">View All 24 Reviews</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Booking Form */}
            <div>
              <div className="bg-white rounded-xl border shadow-sm p-6 sticky top-20">
                <div className="flex items-center justify-between mb-6">
                  <div className="font-medium text-xl">
                    ${property.price} <span className="text-muted-foreground text-sm font-normal">night</span>
                  </div>
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
                    <span className="text-sm">{property.rating} · 24 reviews</span>
                  </div>
                </div>
                
                <form onSubmit={handleBooking} className="space-y-4">
                  <div className="border rounded-lg overflow-hidden">
                    <div className="grid grid-cols-2 divide-x">
                      <div className="p-3">
                        <Label className="text-xs">Check-in</Label>
                        <div className="font-medium">
                          {date ? format(date, "MMM d, yyyy") : "Select date"}
                        </div>
                      </div>
                      <div className="p-3">
                        <Label className="text-xs">Check-out</Label>
                        <div className="font-medium">
                          {date ? format(new Date(date.getTime() + 86400000 * 3), "MMM d, yyyy") : "Select date"}
                        </div>
                      </div>
                    </div>
                    <div className="border-t p-3">
                      <Label htmlFor="guests" className="text-xs">Guests</Label>
                      <div className="flex justify-between items-center mt-1">
                        <Input 
                          id="guests" 
                          type="number" 
                          min={1} 
                          max={property.guests} 
                          value={guests}
                          onChange={(e) => setGuests(Number(e.target.value))}
                          className="w-20 text-center border-none"
                        />
                        <span className="text-sm text-muted-foreground">{property.guests} max</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border shadow"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Reserve
                  </Button>
                  
                  <p className="text-center text-sm text-muted-foreground">
                    You won't be charged yet
                  </p>
                  
                  <div className="space-y-2 pt-4">
                    <div className="flex justify-between">
                      <span>${property.price} x 3 nights</span>
                      <span>${property.price * 3}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cleaning fee</span>
                      <span>$50</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>$30</span>
                    </div>
                    <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                      <span>Total</span>
                      <span>${property.price * 3 + 50 + 30}</span>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetail;
