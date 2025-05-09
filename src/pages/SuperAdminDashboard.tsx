
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useData } from "@/contexts/DataContext";
import { toast } from "sonner";

const SuperAdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const { 
    properties, updateProperties,
    vehicles, updateVehicles,
    restaurants, updateRestaurants,
    cafes, updateCafes,
    mapSettings, updateMapSettings,
    siteSettings, updateSiteSettings,
    bookingRequests, updateBookingRequests
  } = useData();

  // Check if user is authenticated as super admin
  useEffect(() => {
    const isSuperAdmin = localStorage.getItem("isSuperAdmin") === "true";
    if (!isSuperAdmin) {
      toast.error("Unauthorized access");
      navigate("/super-admin");
      return;
    }
    setIsAuthorized(true);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isSuperAdmin");
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleApproveBooking = (id: number) => {
    const updatedRequests = bookingRequests.map(request => 
      request.id === id ? { ...request, status: "confirmed" } : request
    );
    updateBookingRequests(updatedRequests);
    toast.success("Booking approved");
  };

  const handleRejectBooking = (id: number) => {
    const updatedRequests = bookingRequests.map(request => 
      request.id === id ? { ...request, status: "rejected" } : request
    );
    updateBookingRequests(updatedRequests);
    toast.success("Booking rejected");
  };

  const handleDeleteProperty = (id: number) => {
    const updatedProperties = properties.filter(property => property.id !== id);
    updateProperties(updatedProperties);
    toast.success("Property deleted");
  };

  const handleDeleteVehicle = (id: number) => {
    const updatedVehicles = vehicles.filter(vehicle => vehicle.id !== id);
    updateVehicles(updatedVehicles);
    toast.success("Vehicle deleted");
  };

  const handleDeleteRestaurant = (id: number) => {
    const updatedRestaurants = restaurants.filter(restaurant => restaurant.id !== id);
    updateRestaurants(updatedRestaurants);
    toast.success("Restaurant deleted");
  };

  const handleFeatureProperty = (id: number) => {
    const updatedProperties = properties.map(property => 
      property.id === id ? { ...property, featured: !property.featured } : property
    );
    updateProperties(updatedProperties);
    toast.success("Property featured status updated");
  };

  if (!isAuthorized) {
    return <div className="p-8 text-center">Verifying access...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Super Admin Dashboard</h1>
          <Button variant="destructive" onClick={handleLogout}>Logout</Button>
        </div>
        
        <Tabs defaultValue="bookings" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
            <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
          </TabsList>
          
          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-4">
            <h2 className="text-2xl font-bold">Booking Requests</h2>
            {bookingRequests.length === 0 ? (
              <p>No booking requests found.</p>
            ) : (
              <div className="grid gap-4">
                {bookingRequests.map((request) => (
                  <Card key={request.id}>
                    <CardHeader>
                      <CardTitle>{request.name}</CardTitle>
                      <CardDescription>Request for {request.type} on {request.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p>Email: {request.email}</p>
                      <p className={`mt-2 font-semibold ${
                        request.status === "confirmed" ? "text-green-600" : 
                        request.status === "rejected" ? "text-red-600" : "text-yellow-600"
                      }`}>
                        Status: {request.status}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-end space-x-2">
                      {request.status === "pending" && (
                        <>
                          <Button 
                            variant="outline" 
                            onClick={() => handleRejectBooking(request.id)}
                          >
                            Reject
                          </Button>
                          <Button 
                            onClick={() => handleApproveBooking(request.id)}
                          >
                            Approve
                          </Button>
                        </>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Properties Tab */}
          <TabsContent value="properties" className="space-y-4">
            <h2 className="text-2xl font-bold">Manage Properties</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {properties.map((property) => (
                <Card key={property.id}>
                  <CardHeader>
                    <CardTitle>{property.title}</CardTitle>
                    <CardDescription>{property.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video relative">
                      <img 
                        src={property.image} 
                        alt={property.title} 
                        className="absolute inset-0 w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <p className="mt-2">Price: ${property.price}/night</p>
                    <p>Type: {property.type}</p>
                    <p className="mt-2 font-semibold">
                      {property.featured ? "⭐️ Featured" : "Not Featured"}
                    </p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={() => handleFeatureProperty(property.id)}
                    >
                      {property.featured ? "Unfeature" : "Feature"}
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={() => handleDeleteProperty(property.id)}
                    >
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Vehicles Tab */}
          <TabsContent value="vehicles" className="space-y-4">
            <h2 className="text-2xl font-bold">Manage Vehicles</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {vehicles.map((vehicle) => (
                <Card key={vehicle.id}>
                  <CardHeader>
                    <CardTitle>{vehicle.title}</CardTitle>
                    <CardDescription>{vehicle.type} - {vehicle.year}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video relative">
                      <img 
                        src={vehicle.image} 
                        alt={vehicle.title} 
                        className="absolute inset-0 w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <p className="mt-2">Price: ${vehicle.price}/day</p>
                    <p>Seats: {vehicle.seats}</p>
                    <p>Transmission: {vehicle.transmission}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button 
                      variant="destructive" 
                      onClick={() => handleDeleteVehicle(vehicle.id)}
                    >
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {/* Restaurants Tab */}
          <TabsContent value="restaurants" className="space-y-4">
            <h2 className="text-2xl font-bold">Manage Restaurants</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {restaurants.map((restaurant) => (
                <Card key={restaurant.id}>
                  <CardHeader>
                    <CardTitle>{restaurant.name}</CardTitle>
                    <CardDescription>{restaurant.cuisine} - {restaurant.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video relative">
                      <img 
                        src={restaurant.image} 
                        alt={restaurant.name} 
                        className="absolute inset-0 w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <p className="mt-2">Rating: {restaurant.rating}/5</p>
                    <p>Price Range: {restaurant.priceRange}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button 
                      variant="destructive" 
                      onClick={() => handleDeleteRestaurant(restaurant.id)}
                    >
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
