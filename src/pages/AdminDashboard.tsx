
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { properties, vehicles, restaurants } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/admin");
  };
  
  const handleAdd = (type: string) => {
    toast({
      title: "Add new item",
      description: `Form to add a new ${type} would appear here.`,
    });
  };
  
  const handleEdit = (type: string, id: number) => {
    toast({
      title: "Edit item",
      description: `Form to edit ${type} #${id} would appear here.`,
    });
  };
  
  const handleDelete = (type: string, id: number) => {
    toast({
      title: "Delete item",
      description: `Confirmation to delete ${type} #${id} would appear here.`,
      variant: "destructive",
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-martil-navy">
              Admin Dashboard
            </h1>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
          
          <Tabs defaultValue="properties" className="bg-white rounded-xl shadow-sm border p-6">
            <TabsList className="grid grid-cols-3 w-full mb-8">
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
              <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
            </TabsList>
            
            <TabsContent value="properties">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Manage Properties</h2>
                <Button onClick={() => handleAdd("property")}>
                  Add New Property
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left">ID</th>
                      <th className="py-3 px-4 text-left">Image</th>
                      <th className="py-3 px-4 text-left">Title</th>
                      <th className="py-3 px-4 text-left">Location</th>
                      <th className="py-3 px-4 text-left">Type</th>
                      <th className="py-3 px-4 text-left">Price</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {properties.map(property => (
                      <tr key={property.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{property.id}</td>
                        <td className="py-3 px-4">
                          <img 
                            src={property.image} 
                            alt={property.title} 
                            className="w-16 h-12 object-cover rounded"
                          />
                        </td>
                        <td className="py-3 px-4">{property.title}</td>
                        <td className="py-3 px-4">{property.location}</td>
                        <td className="py-3 px-4">{property.type}</td>
                        <td className="py-3 px-4">${property.price}/night</td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex gap-2 justify-end">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEdit("property", property.id)}
                            >
                              Edit
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleDelete("property", property.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="vehicles">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Manage Vehicles</h2>
                <Button onClick={() => handleAdd("vehicle")}>
                  Add New Vehicle
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left">ID</th>
                      <th className="py-3 px-4 text-left">Image</th>
                      <th className="py-3 px-4 text-left">Title</th>
                      <th className="py-3 px-4 text-left">Type</th>
                      <th className="py-3 px-4 text-left">Year</th>
                      <th className="py-3 px-4 text-left">Price</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vehicles.map(vehicle => (
                      <tr key={vehicle.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{vehicle.id}</td>
                        <td className="py-3 px-4">
                          <img 
                            src={vehicle.image} 
                            alt={vehicle.title} 
                            className="w-16 h-12 object-cover rounded"
                          />
                        </td>
                        <td className="py-3 px-4">{vehicle.title}</td>
                        <td className="py-3 px-4">{vehicle.type}</td>
                        <td className="py-3 px-4">{vehicle.year}</td>
                        <td className="py-3 px-4">${vehicle.price}/day</td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex gap-2 justify-end">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEdit("vehicle", vehicle.id)}
                            >
                              Edit
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleDelete("vehicle", vehicle.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            <TabsContent value="restaurants">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Manage Restaurants</h2>
                <Button onClick={() => handleAdd("restaurant")}>
                  Add New Restaurant
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left">ID</th>
                      <th className="py-3 px-4 text-left">Image</th>
                      <th className="py-3 px-4 text-left">Name</th>
                      <th className="py-3 px-4 text-left">Cuisine</th>
                      <th className="py-3 px-4 text-left">Location</th>
                      <th className="py-3 px-4 text-left">Rating</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {restaurants.map(restaurant => (
                      <tr key={restaurant.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{restaurant.id}</td>
                        <td className="py-3 px-4">
                          <img 
                            src={restaurant.image} 
                            alt={restaurant.name} 
                            className="w-16 h-12 object-cover rounded"
                          />
                        </td>
                        <td className="py-3 px-4">{restaurant.name}</td>
                        <td className="py-3 px-4">{restaurant.cuisine}</td>
                        <td className="py-3 px-4">{restaurant.location}</td>
                        <td className="py-3 px-4">{restaurant.rating}</td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex gap-2 justify-end">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEdit("restaurant", restaurant.id)}
                            >
                              Edit
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              onClick={() => handleDelete("restaurant", restaurant.id)}
                            >
                              Delete
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
