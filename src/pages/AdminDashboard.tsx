
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { properties, vehicles, restaurants } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { PropertyForm, PropertyFormData } from "@/components/PropertyForm";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, FileImage, MapPin, PenTool, Globe, Car, Utensils } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [propertiesList, setPropertiesList] = useState(properties);
  const [vehiclesList, setVehiclesList] = useState(vehicles);
  const [restaurantsList, setRestaurantsList] = useState(restaurants);
  const [siteSettings, setSiteSettings] = useState({
    siteName: "MartiStay",
    contactEmail: "info@martistay.com",
    contactPhone: "+212 123-456789",
    logoUrl: "/logo.png",
    primaryColor: "#1e40af",
    secondaryColor: "#f3f4f6",
  });
  
  // State for property operations
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [isEditPropertyOpen, setIsEditPropertyOpen] = useState(false);
  const [isDeletePropertyOpen, setIsDeletePropertyOpen] = useState(false);
  const [currentProperty, setCurrentProperty] = useState<PropertyFormData | undefined>(undefined);
  
  // State for tabs
  const [activeTab, setActiveTab] = useState("properties");
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/admin");
  };
  
  // Property operations
  const handleAddProperty = (data: PropertyFormData) => {
    const newProperty = {
      ...data,
      id: propertiesList.length + 1,
      price: parseInt(data.price),
      panoramaImages: [],
      rating: 0,
      beds: 0,
      baths: 0,
      guests: 0,
      amenities: [],
      description: "",
      featured: false
    };
    setPropertiesList([...propertiesList, newProperty]);
    toast({
      title: "Property added",
      description: "The property has been added successfully.",
    });
  };
  
  const handleEditProperty = (data: PropertyFormData) => {
    if (!currentProperty) return;
    
    const updatedProperties = propertiesList.map(property => 
      property.id === currentProperty.id ? 
        { 
          ...property, 
          title: data.title,
          location: data.location,
          type: data.type,
          price: parseInt(data.price),
          image: data.image
        } : 
        property
    );
    
    setPropertiesList(updatedProperties);
    toast({
      title: "Property updated",
      description: "The property has been updated successfully.",
    });
  };
  
  const handleDeleteProperty = () => {
    if (!currentProperty) return;
    
    const updatedProperties = propertiesList.filter(
      property => property.id !== currentProperty.id
    );
    
    setPropertiesList(updatedProperties);
    setIsDeletePropertyOpen(false);
    
    toast({
      title: "Property deleted",
      description: `Property #${currentProperty.id} has been deleted.`,
      variant: "destructive",
    });
  };
  
  // Generic handlers for other types
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

  const handleSiteSettingsUpdate = () => {
    toast({
      title: "Settings updated",
      description: "Your site settings have been updated successfully.",
    });
  };
  
  // Handle Map Settings
  const handleMapSettingsUpdate = () => {
    toast({
      title: "Map settings updated",
      description: "Your map configuration has been saved successfully.",
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
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" 
                  onClick={() => setActiveTab("properties")}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Properties</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{propertiesList.length}</div>
                <p className="text-xs text-muted-foreground">
                  Manage your properties listings
                </p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setActiveTab("vehicles")}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Vehicles</CardTitle>
                <Car className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{vehiclesList.length}</div>
                <p className="text-xs text-muted-foreground">
                  Manage your vehicle rentals
                </p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setActiveTab("restaurants")}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Restaurants</CardTitle>
                <Utensils className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{restaurantsList.length}</div>
                <p className="text-xs text-muted-foreground">
                  Manage your restaurant listings
                </p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setActiveTab("settings")}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Site Settings</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">
                  Configure your website settings
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-white rounded-xl shadow-sm border p-6">
            <TabsList className="grid grid-cols-4 w-full mb-8">
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
              <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
              <TabsTrigger value="settings">Site Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="properties">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Manage Properties</h2>
                <Dialog open={isAddPropertyOpen} onOpenChange={setIsAddPropertyOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      Add New Property
                    </Button>
                  </DialogTrigger>
                  <PropertyForm
                    open={isAddPropertyOpen}
                    onOpenChange={setIsAddPropertyOpen}
                    onSubmit={handleAddProperty}
                    title="Add New Property"
                  />
                </Dialog>
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
                    {propertiesList.map(property => (
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
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => {
                                    setCurrentProperty({
                                      id: property.id,
                                      title: property.title,
                                      location: property.location,
                                      type: property.type,
                                      price: property.price.toString(),
                                      image: property.image
                                    });
                                    setIsEditPropertyOpen(true);
                                  }}
                                >
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <PropertyForm
                                open={isEditPropertyOpen}
                                onOpenChange={setIsEditPropertyOpen}
                                onSubmit={handleEditProperty}
                                property={currentProperty}
                                title="Edit Property"
                              />
                            </Dialog>
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => {
                                    setCurrentProperty({
                                      id: property.id,
                                      title: property.title,
                                      location: property.location,
                                      type: property.type,
                                      price: property.price.toString(),
                                      image: property.image
                                    });
                                    setIsDeletePropertyOpen(true);
                                  }}
                                >
                                  Delete
                                </Button>
                              </AlertDialogTrigger>
                              <DeleteConfirmation
                                open={isDeletePropertyOpen}
                                onOpenChange={setIsDeletePropertyOpen}
                                onConfirm={handleDeleteProperty}
                                title="Delete Property"
                                description={`Are you sure you want to delete "${property.title}"? This action cannot be undone.`}
                              />
                            </AlertDialog>
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
                    {vehiclesList.map(vehicle => (
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
                    {restaurantsList.map(restaurant => (
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
            
            <TabsContent value="settings">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-medium mb-4">Site Configuration</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Site Name</label>
                      <input 
                        type="text"
                        className="w-full p-2 border rounded"
                        value={siteSettings.siteName}
                        onChange={(e) => setSiteSettings({...siteSettings, siteName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Contact Email</label>
                      <input 
                        type="email"
                        className="w-full p-2 border rounded"
                        value={siteSettings.contactEmail}
                        onChange={(e) => setSiteSettings({...siteSettings, contactEmail: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Contact Phone</label>
                      <input 
                        type="text"
                        className="w-full p-2 border rounded"
                        value={siteSettings.contactPhone}
                        onChange={(e) => setSiteSettings({...siteSettings, contactPhone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Logo URL</label>
                      <input 
                        type="text"
                        className="w-full p-2 border rounded"
                        value={siteSettings.logoUrl}
                        onChange={(e) => setSiteSettings({...siteSettings, logoUrl: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button onClick={handleSiteSettingsUpdate} className="mt-4">
                    Save Site Settings
                  </Button>
                </div>
                
                <div className="pt-4 border-t">
                  <h2 className="text-xl font-medium mb-4">Map Configuration</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Default Center Latitude</label>
                      <input 
                        type="text"
                        className="w-full p-2 border rounded"
                        defaultValue="35.616367"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Default Center Longitude</label>
                      <input 
                        type="text"
                        className="w-full p-2 border rounded"
                        defaultValue="-5.272562"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Default Zoom Level</label>
                      <input 
                        type="number"
                        className="w-full p-2 border rounded"
                        defaultValue="14"
                        min="1"
                        max="20"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Map Style</label>
                      <select className="w-full p-2 border rounded">
                        <option value="streets">Streets</option>
                        <option value="satellite">Satellite</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                      </select>
                    </div>
                  </div>
                  <Button onClick={handleMapSettingsUpdate} className="mt-4">
                    Save Map Settings
                  </Button>
                </div>
                
                <div className="pt-4 border-t">
                  <h2 className="text-xl font-medium mb-4">Media Management</h2>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50">
                      <FileImage className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600">
                        Click to upload images or videos for your reel
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        Supports: JPG, PNG, MP4, WebM (Max: 10MB)
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button variant="destructive" size="sm">Remove</Button>
                        </div>
                      </div>
                      <div className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden">
                        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Button variant="destructive" size="sm">Remove</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
