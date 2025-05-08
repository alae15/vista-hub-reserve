
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useData } from "@/contexts/DataContext";
import { PropertyForm, FormField, PropertyFormData } from "@/components/PropertyForm";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const SuperAdminDashboard = () => {
  const { properties, vehicles, restaurants, updateProperty, deleteProperty } = useData();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("properties");
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"edit" | "create">("edit");

  // Define form fields for different content types
  const propertyFields: FormField[] = [
    { name: "title", label: "Title", required: true },
    { name: "location", label: "Location", required: true },
    { name: "type", label: "Type", required: true },
    { name: "price", label: "Price", required: true, type: "number" },
    { name: "image", label: "Image URL", required: true },
    { name: "description", label: "Description", type: "textarea" },
    { name: "beds", label: "Beds", type: "number", min: 0 },
    { name: "baths", label: "Bathrooms", type: "number", min: 0 },
    { name: "guests", label: "Max Guests", type: "number", min: 0 }
  ];

  // Handle item selection for editing
  const handleEditItem = (item: any) => {
    setSelectedItem(item);
    setModalType("edit");
    setIsModalOpen(true);
  };

  // Handle creating a new item
  const handleAddItem = () => {
    setSelectedItem(null);
    setModalType("create");
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleFormSubmit = (data: PropertyFormData) => {
    if (modalType === "edit" && selectedItem) {
      // Update existing item
      updateProperty({ ...data, id: selectedItem.id });
      toast({
        title: "Success",
        description: `${activeTab.slice(0, -1)} updated successfully`,
      });
    } else {
      // Create new item
      const newId = Math.max(...properties.map(p => p.id)) + 1;
      updateProperty({ ...data, id: newId });
      toast({
        title: "Success",
        description: `New ${activeTab.slice(0, -1)} added successfully`,
      });
    }
    setIsModalOpen(false);
  };

  // Handle item deletion
  const handleDeleteItem = (id: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      deleteProperty(id);
      toast({
        title: "Deleted",
        description: `${activeTab.slice(0, -1)} has been deleted`,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-martil-navy">Super Admin Dashboard</h1>
            <Button onClick={handleAddItem}>
              Add New {activeTab.slice(0, -1)}
            </Button>
          </div>

          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle>Full Access Dashboard</CardTitle>
              <CardDescription>
                You have full control over all content on the website
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Welcome to the Super Admin Dashboard. Here you can manage all aspects of the website including properties, vehicles, restaurants, and site content.
              </p>
            </CardContent>
          </Card>

          <Tabs 
            defaultValue="properties" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
              <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
            </TabsList>

            {/* Properties Tab */}
            <TabsContent value="properties" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {properties.map((property) => (
                  <Card key={property.id} className="overflow-hidden h-full">
                    <div className="h-40">
                      <img 
                        src={property.image} 
                        alt={property.title} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-xl">{property.title}</CardTitle>
                      <CardDescription>{property.location}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-lg font-medium">{property.price}</p>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {property.description || "No description available"}
                      </p>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" onClick={() => handleEditItem(property)}>
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive" 
                          onClick={() => handleDeleteItem(property.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Vehicles Tab */}
            <TabsContent value="vehicles">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vehicles.map((vehicle) => (
                  <Card key={vehicle.id} className="overflow-hidden h-full">
                    <div className="h-40">
                      <img 
                        src={vehicle.image} 
                        alt={vehicle.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-xl">{vehicle.name}</CardTitle>
                      <CardDescription>{vehicle.type}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-lg font-medium">{vehicle.price} / day</p>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm">Edit</Button>
                        <Button size="sm" variant="destructive">Delete</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Restaurants Tab */}
            <TabsContent value="restaurants">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {restaurants.map((restaurant) => (
                  <Card key={restaurant.id} className="overflow-hidden h-full">
                    <div className="h-40">
                      <img 
                        src={restaurant.image} 
                        alt={restaurant.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-xl">{restaurant.name}</CardTitle>
                      <CardDescription>{restaurant.cuisine}</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                        {restaurant.description || "No description available"}
                      </p>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm">Edit</Button>
                        <Button size="sm" variant="destructive">Delete</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <PropertyForm
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleFormSubmit}
        property={modalType === "edit" ? selectedItem : null}
        title={modalType === "edit" ? "Edit Property" : "Add New Property"}
        fields={propertyFields}
      />
      
      <Footer />
    </div>
  );
};

export default SuperAdminDashboard;
