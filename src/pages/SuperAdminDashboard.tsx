
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PropertyForm, PropertyFormData } from "@/components/PropertyForm";
import { useData } from "@/contexts/DataContext";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";

const SuperAdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [addPropertyOpen, setAddPropertyOpen] = useState(false);
  const [editProperty, setEditProperty] = useState<any>(null);
  
  const { 
    properties, updateProperties, updateProperty, deleteProperty,
    vehicles, updateVehicles,
    restaurants, updateRestaurants,
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
    deleteProperty(id);
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

  const handleAddProperty = (data: PropertyFormData) => {
    const newProperty = {
      ...data,
      id: properties.length > 0 ? Math.max(...properties.map(p => p.id)) + 1 : 1,
      price: parseFloat(data.price as string),
      rating: data.rating || 4.5,
      featured: data.featured || false,
    };
    
    updateProperty(newProperty);
    toast.success("Property added successfully");
  };
  
  const handleEditProperty = (data: PropertyFormData) => {
    const updatedProperty = {
      ...data,
      price: parseFloat(data.price as string),
      id: editProperty.id
    };
    
    updateProperty(updatedProperty);
    setEditProperty(null);
    toast.success("Property updated successfully");
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookingRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.name}</TableCell>
                      <TableCell>{request.email}</TableCell>
                      <TableCell>{request.type}</TableCell>
                      <TableCell>{request.date}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          request.status === "confirmed" ? "bg-green-100 text-green-800" : 
                          request.status === "rejected" ? "bg-red-100 text-red-800" : 
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                          {request.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {request.status === "pending" && (
                          <div className="space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleRejectBooking(request.id)}
                            >
                              Reject
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => handleApproveBooking(request.id)}
                            >
                              Approve
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </TabsContent>
          
          {/* Properties Tab */}
          <TabsContent value="properties" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Manage Properties</h2>
              <Button onClick={() => setAddPropertyOpen(true)}>
                <Plus className="mr-1" />
                Add Property
              </Button>
            </div>
            
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
                      onClick={() => setEditProperty(property)}
                    >
                      Edit
                    </Button>
                    <div className="space-x-2">
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
                    </div>
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
      
      {/* Add Property Form */}
      <PropertyForm 
        open={addPropertyOpen}
        onOpenChange={setAddPropertyOpen}
        onSubmit={handleAddProperty}
        title="Add New Property"
      />
      
      {/* Edit Property Form */}
      {editProperty && (
        <PropertyForm
          open={!!editProperty}
          onOpenChange={() => setEditProperty(null)}
          onSubmit={handleEditProperty}
          property={editProperty}
          title="Edit Property"
        />
      )}
    </div>
  );
};

export default SuperAdminDashboard;
