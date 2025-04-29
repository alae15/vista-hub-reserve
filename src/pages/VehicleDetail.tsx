
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PanoramaViewer from "@/components/PanoramaViewer";
import { vehicles } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Share, Car, Motorcycle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 3))
  );
  const [liked, setLiked] = useState(false);
  
  // Find vehicle by id
  const vehicle = vehicles.find(v => v.id === Number(id));
  
  if (!vehicle) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Vehicle not found</h2>
            <Button onClick={() => navigate("/vehicles")}>Back to vehicles</Button>
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
      title: "Share this vehicle",
      description: "Link copied to clipboard!",
    });
  };
  
  const handleWishlist = () => {
    setLiked(!liked);
    toast({
      title: liked ? "Removed from wishlist" : "Added to wishlist",
      description: liked ? "Vehicle removed from your saved items" : "Vehicle saved to your wishlist",
    });
  };
  
  // Calculate rental days and total price
  const days = startDate && endDate ? Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) : 1;
  const totalPrice = vehicle.price * days;
  
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
              <span>Back to all vehicles</span>
            </Button>
          </div>
          
          {/* Vehicle Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-bold text-martil-navy mb-2">{vehicle.title}</h1>
                <Badge
                  variant={vehicle.type === "car" ? "default" : "outline"}
                  className={vehicle.type === "car" ? "bg-martil-blue hover:bg-martil-blue" : ""}
                >
                  {vehicle.type === "car" ? "Car" : "Motorcycle"}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span>{vehicle.year}</span>
                {vehicle.transmission && (
                  <>
                    <span>•</span>
                    <span>{vehicle.transmission}</span>
                  </>
                )}
                {vehicle.seats && (
                  <>
                    <span>•</span>
                    <span>{vehicle.seats} seats</span>
                  </>
                )}
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
            <PanoramaViewer images={vehicle.panoramaImages || [vehicle.image]} title={vehicle.title} />
          </div>
          
          {/* Vehicle Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-medium mb-4">Vehicle Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 flex items-center">
                      <div className="bg-martil-blue bg-opacity-20 p-3 rounded-full mr-3">
                        {vehicle.type === "car" ? (
                          <Car className="h-6 w-6 text-martil-blue" />
                        ) : (
                          <Motorcycle className="h-6 w-6 text-martil-blue" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Vehicle Type</p>
                        <p className="font-medium">{vehicle.type === "car" ? "Car" : "Motorcycle"}</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4 flex items-center">
                      <div className="bg-martil-blue bg-opacity-20 p-3 rounded-full mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-6 w-6 text-martil-blue"
                        >
                          <path d="M12.75 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM7.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM9.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM10.5 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12.75 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM14.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 17.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM15 12.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM16.5 13.5a.75.75 0 100-1.5.75.75 0 000 1.5z" />
                          <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Year</p>
                        <p className="font-medium">{vehicle.year}</p>
                      </div>
                    </div>
                    
                    {vehicle.transmission && (
                      <div className="bg-gray-50 rounded-lg p-4 flex items-center">
                        <div className="bg-martil-blue bg-opacity-20 p-3 rounded-full mr-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-6 w-6 text-martil-blue"
                          >
                            <path d="M5.566 4.657A4.505 4.505 0 016.75 4.5h10.5c.41 0 .806.055 1.183.157A3 3 0 0015.75 3h-7.5a3 3 0 00-2.684 1.657zM2.25 12a3 3 0 013-3h13.5a3 3 0 013 3v6a3 3 0 01-3 3H5.25a3 3 0 01-3-3v-6zM5.25 7.5c-.41 0-.806.055-1.184.157A3 3 0 016.75 6h10.5a3 3 0 012.683 1.657A4.505 4.505 0 0018.75 7.5H5.25z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Transmission</p>
                          <p className="font-medium">{vehicle.transmission}</p>
                        </div>
                      </div>
                    )}
                    
                    {vehicle.seats && (
                      <div className="bg-gray-50 rounded-lg p-4 flex items-center">
                        <div className="bg-martil-blue bg-opacity-20 p-3 rounded-full mr-3">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="h-6 w-6 text-martil-blue"
                          >
                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Seats</p>
                          <p className="font-medium">{vehicle.seats}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-medium mb-4">Description</h2>
                  <p className="text-muted-foreground">{vehicle.description}</p>
                </div>
                
                <div>
                  <h2 className="text-xl font-medium mb-4">Features</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {vehicle.features?.map((feature, index) => (
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
                
                <div>
                  <h2 className="text-xl font-medium mb-4">Pickup Location</h2>
                  <div className="aspect-[16/9] bg-gray-200 rounded-lg mb-4">
                    {/* Map placeholder */}
                    <div className="h-full w-full flex items-center justify-center">
                      <p className="text-muted-foreground">Martil Central Rental Office</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Our central rental office is conveniently located in downtown Martil, just a 5-minute walk from the beach. We offer free delivery to your accommodation for rentals of 3+ days.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Booking Form */}
            <div>
              <div className="bg-white rounded-xl border shadow-sm p-6 sticky top-20">
                <div className="font-medium text-xl mb-6">
                  ${vehicle.price} <span className="text-muted-foreground text-sm font-normal">day</span>
                </div>
                
                <form onSubmit={handleBooking} className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Rental period</label>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Pick-up</p>
                          <div className="border rounded-md px-3 py-2">
                            {startDate ? format(startDate, "MMM d, yyyy") : "Select date"}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Return</p>
                          <div className="border rounded-md px-3 py-2">
                            {endDate ? format(endDate, "MMM d, yyyy") : "Select date"}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Calendar
                      mode="range"
                      selected={{
                        from: startDate,
                        to: endDate,
                      }}
                      onSelect={(range) => {
                        setStartDate(range?.from);
                        setEndDate(range?.to);
                      }}
                      className="rounded-md border shadow mt-2"
                      numberOfMonths={1}
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    Reserve
                  </Button>
                  
                  <p className="text-center text-sm text-muted-foreground">
                    Free cancellation up to 24 hours before pickup
                  </p>
                  
                  <div className="space-y-2 pt-4">
                    <div className="flex justify-between">
                      <span>${vehicle.price} x {days} day{days > 1 ? 's' : ''}</span>
                      <span>${vehicle.price * days}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Insurance</span>
                      <span>$15</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>$10</span>
                    </div>
                    <div className="border-t pt-2 mt-2 flex justify-between font-medium">
                      <span>Total</span>
                      <span>${totalPrice + 15 + 10}</span>
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

export default VehicleDetail;
