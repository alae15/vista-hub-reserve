
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { PropertyForm, PropertyFormData, FormField } from "@/components/PropertyForm";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, FileImage, MapPin, Coffee, Edit, Mail, Send, Car, Utensils } from "lucide-react";
import CafeMap, { CafeMapCafe } from "@/components/CafeMap";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { useData } from "@/contexts/DataContext";

// Define interfaces for our forms
interface Cafe {
  id?: number;
  name: string;
  lat: number;
  lng: number;
  rating: number;
  location?: string;
  image?: string;
  description?: string;
}

interface Vehicle {
  id: number;
  title: string;
  type: string;
  price: number;
  image: string;
  year: number;
  location?: string;
  seats?: number;
  transmission?: string;
  description?: string;
  features?: string[];
  panoramaImages?: string[];
  featured?: boolean;
}

interface Restaurant {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  priceRange: string;
  location: string;
  title?: string;
  type?: string;
  price?: number;
  description?: string;
  menu?: { category: string; items: { name: string; price: number; description: string }[] }[];
  featured?: boolean;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { properties: allProperties, vehicles: allVehicles, restaurants: allRestaurants, cafes: allCafes, updateProperties, updateVehicles, updateRestaurants, updateCafes } = useData();
  
  // Initialize states with context data
  const [propertiesList, setPropertiesList] = useState(allProperties || []);
  const [vehiclesList, setVehiclesList] = useState(allVehicles || []);
  const [restaurantsList, setRestaurantsList] = useState(allRestaurants || []);
  
  // Update local state when context data changes
  useEffect(() => {
    if (allProperties) setPropertiesList(allProperties);
  }, [allProperties]);
  
  useEffect(() => {
    if (allVehicles) setVehiclesList(allVehicles);
  }, [allVehicles]);
  
  useEffect(() => {
    if (allRestaurants) setRestaurantsList(allRestaurants);
  }, [allRestaurants]);
  
  // Initialize cafes state from context or localStorage
  const [cafesList, setCafesList] = useState(() => {
    if (allCafes && allCafes.length > 0) return allCafes;
    
    const savedCafes = localStorage.getItem('cafesList');
    return savedCafes ? JSON.parse(savedCafes) : [
      { id: 1, name: "Cafe Maroc", location: "Downtown Martil", rating: 4.8, image: "/images/cafe1.jpg", lat: 35.615367, lng: -5.271562, description: "Best traditional Moroccan coffee" },
      { id: 2, name: "Beach Coffee", location: "Martil Beach", rating: 4.6, image: "/images/cafe2.jpg", lat: 35.617367, lng: -5.273562, description: "Amazing views with great espresso" },
      { id: 3, name: "Sunset Cafe", location: "West Martil", rating: 4.9, image: "/images/cafe3.jpg", lat: 35.614567, lng: -5.274562, description: "Perfect place to watch the sunset" },
      { id: 4, name: "Martil Espresso", location: "City Center", rating: 4.7, image: "/images/cafe4.jpg", lat: 35.618367, lng: -5.270562, description: "Specialty coffee and pastries" },
      { id: 5, name: "Ocean View Coffee", location: "Coastal Road", rating: 4.5, image: "/images/cafe5.jpg", lat: 35.613367, lng: -5.275562, description: "Fresh sea breeze and fresh coffee" },
    ];
  });
  
  // Map settings from localStorage if available
  const [mapSettings, setMapSettings] = useState(() => {
    const savedMapSettings = localStorage.getItem('mapSettings');
    return savedMapSettings ? JSON.parse(savedMapSettings) : {
      mapStyle: "streets",
      zoomLevel: 14,
      showMarkers: true,
      centerLat: 35.616367,
      centerLng: -5.272562,
    };
  });
  
  // Website settings from localStorage if available
  const [siteSettings, setSiteSettings] = useState(() => {
    const savedSiteSettings = localStorage.getItem('siteSettings');
    return savedSiteSettings ? JSON.parse(savedSiteSettings) : {
      siteName: "MartiStay",
      contactEmail: "info@martistay.com",
      contactPhone: "+212 123-456789",
      logoUrl: "/logo.png",
      primaryColor: "#1e40af",
      secondaryColor: "#f3f4f6",
      heroTitle: "Your Perfect Vacation in Martil",
      heroDescription: "Find the best properties, vehicles, and restaurants for an unforgettable experience in Morocco's coastal gem.",
      showCafeMap: true,
    };
  });

  // Booking requests from localStorage if available
  const [bookingRequests, setBookingRequests] = useState(() => {
    const savedBookings = localStorage.getItem('bookingRequests');
    return savedBookings ? JSON.parse(savedBookings) : [
      { id: 1, name: "John Doe", email: "john@example.com", type: "property", date: "2025-05-01", status: "pending" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", type: "vehicle", date: "2025-05-02", status: "confirmed" },
      { id: 3, name: "Ahmed Hassan", email: "ahmed@example.com", type: "restaurant", date: "2025-05-03", status: "pending" },
    ];
  });
  
  // State for property operations
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const [isEditPropertyOpen, setIsEditPropertyOpen] = useState(false);
  const [isDeletePropertyOpen, setIsDeletePropertyOpen] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);
  
  // State for vehicle operations
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [isEditVehicleOpen, setIsEditVehicleOpen] = useState(false);
  const [isDeleteVehicleOpen, setIsDeleteVehicleOpen] = useState(false);
  const [currentVehicle, setCurrentVehicle] = useState<Vehicle | null>(null);
  
  // State for restaurant operations
  const [isAddRestaurantOpen, setIsAddRestaurantOpen] = useState(false);
  const [isEditRestaurantOpen, setIsEditRestaurantOpen] = useState(false);
  const [isDeleteRestaurantOpen, setIsDeleteRestaurantOpen] = useState(false);
  const [currentRestaurant, setCurrentRestaurant] = useState<Restaurant | null>(null);
  
  // State for cafe operations
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
  const [isEditCafeOpen, setIsEditCafeOpen] = useState(false);
  
  // State for tabs
  const [activeTab, setActiveTab] = useState("properties");
  
  // Form for map settings
  const mapForm = useForm({
    defaultValues: mapSettings
  });

  // Form for editing cafe
  const cafeForm = useForm({
    defaultValues: selectedCafe || {
      name: "",
      lat: 0,
      lng: 0,
      rating: 0,
      description: ""
    }
  });

  // Forms for vehicles and restaurants
  const vehicleForm = useForm();
  const restaurantForm = useForm();

  // Save data to context whenever it changes
  useEffect(() => {
    if (propertiesList?.length) {
      updateProperties(propertiesList);
      localStorage.setItem('properties', JSON.stringify(propertiesList));
    }
  }, [propertiesList, updateProperties]);

  useEffect(() => {
    if (vehiclesList?.length) {
      updateVehicles(vehiclesList);
      localStorage.setItem('vehicles', JSON.stringify(vehiclesList));
    }
  }, [vehiclesList, updateVehicles]);

  useEffect(() => {
    if (restaurantsList?.length) {
      updateRestaurants(restaurantsList);
      localStorage.setItem('restaurants', JSON.stringify(restaurantsList));
    }
  }, [restaurantsList, updateRestaurants]);

  useEffect(() => {
    if (cafesList?.length) {
      updateCafes(cafesList);
      localStorage.setItem('cafesList', JSON.stringify(cafesList));
    }
  }, [cafesList, updateCafes]);

  // Reset cafe form when selected cafe changes
  useEffect(() => {
    if (selectedCafe) {
      cafeForm.reset(selectedCafe);
    }
  }, [selectedCafe, cafeForm]);
  
  // Apply map settings
  const handleMapSettingsUpdate = (values) => {
    setMapSettings(values);
    localStorage.setItem('mapSettings', JSON.stringify(values));
    toast({
      title: "Map settings updated",
      description: "Your map configuration has been saved and applied.",
    });
  };
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/admin");
  };
  
  // Update site content
  const handleSiteSettingsUpdate = () => {
    localStorage.setItem('siteSettings', JSON.stringify(siteSettings));
    toast({
      title: "Settings updated",
      description: "Your site content has been updated successfully.",
    });
  };
  
  // Property operations
  const handleAddProperty = (data) => {
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
    const updatedProperties = [...propertiesList, newProperty];
    setPropertiesList(updatedProperties);
    updateProperties(updatedProperties);
    
    toast({
      title: "Property added",
      description: "The property has been added successfully.",
    });
    setIsAddPropertyOpen(false);
  };
  
  const handleEditProperty = (data) => {
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
    updateProperties(updatedProperties);
    
    toast({
      title: "Property updated",
      description: "The property has been updated successfully.",
    });
  };

  const handleTogglePropertyFeature = (id, featured) => {
    const updatedProperties = propertiesList.map(property => 
      property.id === id ? { ...property, featured } : property
    );
    
    setPropertiesList(updatedProperties);
    updateProperties(updatedProperties);
    
    toast({
      title: featured ? "Property featured" : "Property unfeatured",
      description: `Property #${id} has been ${featured ? "added to" : "removed from"} featured properties.`,
    });
  };
  
  const handleDeleteProperty = () => {
    if (!currentProperty) return;
    
    const updatedProperties = propertiesList.filter(
      property => property.id !== currentProperty.id
    );
    
    setPropertiesList(updatedProperties);
    updateProperties(updatedProperties);
    setIsDeletePropertyOpen(false);
    
    toast({
      title: "Property deleted",
      description: `Property #${currentProperty.id} has been deleted.`,
      variant: "destructive",
    });
  };
  
  // Vehicle operations
  const handleAddVehicle = (data) => {
    const newVehicle = {
      ...data,
      id: vehiclesList.length + 1,
      price: parseInt(data.price),
      year: parseInt(data.year),
      seats: data.seats ? parseInt(data.seats) : undefined,
      panoramaImages: [],
      features: [],
      description: "",
      featured: false
    };
    
    const updatedVehicles = [...vehiclesList, newVehicle];
    setVehiclesList(updatedVehicles);
    updateVehicles(updatedVehicles);
    
    toast({
      title: "Vehicle added",
      description: "The vehicle has been added successfully.",
    });
    setIsAddVehicleOpen(false);
  };
  
  const handleEditVehicle = (data) => {
    if (!currentVehicle) return;
    
    const updatedVehicles = vehiclesList.map(vehicle => 
      vehicle.id === currentVehicle.id ? 
        { 
          ...vehicle, 
          title: data.title,
          type: data.type,
          price: parseInt(data.price),
          year: parseInt(data.year),
          seats: data.seats ? parseInt(data.seats) : undefined,
          transmission: data.transmission,
          image: data.image
        } : 
        vehicle
    );
    
    setVehiclesList(updatedVehicles);
    updateVehicles(updatedVehicles);
    
    toast({
      title: "Vehicle updated",
      description: "The vehicle has been updated successfully.",
    });
    setIsEditVehicleOpen(false);
  };
  
  const handleToggleVehicleFeature = (id, featured) => {
    const updatedVehicles = vehiclesList.map(vehicle => 
      vehicle.id === id ? { ...vehicle, featured } : vehicle
    );
    
    setVehiclesList(updatedVehicles);
    updateVehicles(updatedVehicles);
    
    toast({
      title: featured ? "Vehicle featured" : "Vehicle unfeatured",
      description: `Vehicle #${id} has been ${featured ? "added to" : "removed from"} featured vehicles.`,
    });
  };
  
  const handleDeleteVehicle = () => {
    if (!currentVehicle) return;
    
    const updatedVehicles = vehiclesList.filter(
      vehicle => vehicle.id !== currentVehicle.id
    );
    
    setVehiclesList(updatedVehicles);
    updateVehicles(updatedVehicles);
    setIsDeleteVehicleOpen(false);
    
    toast({
      title: "Vehicle deleted",
      description: `Vehicle #${currentVehicle.id} has been deleted.`,
      variant: "destructive",
    });
  };
  
  const handleVehicleDetailUpdate = (id, field, value) => {
    const updatedVehicles = vehiclesList.map(vehicle => 
      vehicle.id === id ? { ...vehicle, [field]: value } : vehicle
    );
    
    setVehiclesList(updatedVehicles);
    updateVehicles(updatedVehicles);
    
    toast({
      title: "Vehicle updated",
      description: `Vehicle #${id} ${field} has been updated.`,
    });
  };
  
  // Restaurant operations
  const handleAddRestaurant = (data) => {
    const newRestaurant = {
      ...data,
      id: restaurantsList.length + 1,
      rating: parseFloat(data.rating) || 4.0,
      menu: [],
      description: "",
      featured: false
    };
    
    const updatedRestaurants = [...restaurantsList, newRestaurant];
    setRestaurantsList(updatedRestaurants);
    updateRestaurants(updatedRestaurants);
    
    toast({
      title: "Restaurant added",
      description: "The restaurant has been added successfully.",
    });
    setIsAddRestaurantOpen(false);
  };
  
  const handleEditRestaurant = (data) => {
    if (!currentRestaurant) return;
    
    const updatedRestaurants = restaurantsList.map(restaurant => 
      restaurant.id === currentRestaurant.id ? 
        { 
          ...restaurant, 
          name: data.name,
          cuisine: data.cuisine,
          priceRange: data.priceRange,
          location: data.location,
          rating: parseFloat(data.rating) || restaurant.rating,
          image: data.image
        } : 
        restaurant
    );
    
    setRestaurantsList(updatedRestaurants);
    updateRestaurants(updatedRestaurants);
    
    toast({
      title: "Restaurant updated",
      description: "The restaurant has been updated successfully.",
    });
    setIsEditRestaurantOpen(false);
  };
  
  const handleToggleRestaurantFeature = (id, featured) => {
    const updatedRestaurants = restaurantsList.map(restaurant => 
      restaurant.id === id ? { ...restaurant, featured } : restaurant
    );
    
    setRestaurantsList(updatedRestaurants);
    updateRestaurants(updatedRestaurants);
    
    toast({
      title: featured ? "Restaurant featured" : "Restaurant unfeatured",
      description: `Restaurant #${id} has been ${featured ? "added to" : "removed from"} featured restaurants.`,
    });
  };
  
  const handleDeleteRestaurant = () => {
    if (!currentRestaurant) return;
    
    const updatedRestaurants = restaurantsList.filter(
      restaurant => restaurant.id !== currentRestaurant.id
    );
    
    setRestaurantsList(updatedRestaurants);
    updateRestaurants(updatedRestaurants);
    setIsDeleteRestaurantOpen(false);
    
    toast({
      title: "Restaurant deleted",
      description: `Restaurant #${currentRestaurant.id} has been deleted.`,
      variant: "destructive",
    });
  };
  
  const handleRestaurantDetailUpdate = (id, field, value) => {
    const updatedRestaurants = restaurantsList.map(restaurant => 
      restaurant.id === id ? { ...restaurant, [field]: value } : restaurant
    );
    
    setRestaurantsList(updatedRestaurants);
    updateRestaurants(updatedRestaurants);
    
    toast({
      title: "Restaurant updated",
      description: `Restaurant #${id} ${field} has been updated.`,
    });
  };
  
  // Cafe operations
  const handleCafeUpdate = (updatedCafes) => {
    // Map the cafe data to our expected format
    const formattedCafes = updatedCafes.map((cafe) => ({
      id: cafe.id,
      name: cafe.name,
      lat: cafe.lat, 
      lng: cafe.lng,
      rating: cafe.rating,
      description: cafe.description || "",
      location: cafe.location || "",
      image: cafe.image
    }));
    
    setCafesList(formattedCafes);
    updateCafes(formattedCafes);
    localStorage.setItem('cafesList', JSON.stringify(formattedCafes));
  };
  
  const handleAddCafe = () => {
    const newCafe = {
      id: cafesList.length + 1,
      name: "New Cafe",
      lat: mapSettings.centerLat + (Math.random() - 0.5) * 0.01,
      lng: mapSettings.centerLng + (Math.random() - 0.5) * 0.01,
      rating: 4.0,
      description: "Add a description",
      location: "Martil",
      image: "/images/placeholder.svg"
    };
    
    const updatedCafes = [...cafesList, newCafe];
    setCafesList(updatedCafes);
    localStorage.setItem('cafesList', JSON.stringify(updatedCafes));
    
    toast({
      title: "Cafe added",
      description: "A new cafe has been added to the list.",
    });
  };
  
  const handleEditCafe = (data) => {
    if (!selectedCafe) return;
    
    const updatedCafes = cafesList.map(cafe => 
      cafe.id === selectedCafe.id ? { ...data, id: selectedCafe.id } : cafe
    );
    
    setCafesList(updatedCafes);
    localStorage.setItem('cafesList', JSON.stringify(updatedCafes));
    setIsEditCafeOpen(false);
    
    toast({
      title: "Cafe updated",
      description: `${data.name} has been updated successfully.`,
    });
  };
  
  const handleDeleteCafe = (id) => {
    const updatedCafes = cafesList.filter(cafe => cafe.id !== id);
    setCafesList(updatedCafes);
    localStorage.setItem('cafesList', JSON.stringify(updatedCafes));
    
    toast({
      title: "Cafe deleted",
      description: "The cafe has been deleted successfully.",
      variant: "destructive",
    });
  };
  
  // Booking request management
  const handleUpdateBookingStatus = (id, status) => {
    const updatedRequests = bookingRequests.map(request => 
      request.id === id ? {...request, status} : request
    );
    
    setBookingRequests(updatedRequests);
    localStorage.setItem('bookingRequests', JSON.stringify(updatedRequests));
    
    toast({
      title: "Status updated",
      description: `Booking request #${id} is now ${status}.`,
    });
  };
  
  // Respond to an email booking request
  const handleRespondToBooking = (id) => {
    const booking = bookingRequests.find(request => request.id === id);
    
    if (!booking) return;
    
    toast({
      title: "Email sent",
      description: `Response email sent to ${booking.email}`,
    });
    
    // Update the status to responded
    handleUpdateBookingStatus(id, "responded");
  };
  
  // Update property description and other details
  const handlePropertyDetailUpdate = (id, field, value) => {
    const updatedProperties = propertiesList.map(property => 
      property.id === id ? { ...property, [field]: value } : property
    );
    
    setPropertiesList(updatedProperties);
    updateProperties(updatedProperties);
    
    toast({
      title: "Property updated",
      description: `Property #${id} ${field} has been updated.`,
    });
  };
  
  // Map cafes to CafeMapCafe type for the CafeMap component
  const mapCafes = cafesList.map(cafe => ({
    id: cafe.id,
    name: cafe.name,
    lat: cafe.lat, 
    lng: cafe.lng,
    rating: cafe.rating,
    description: cafe.description || "",
    location: cafe.location || "",
    image: cafe.image
  }));

  // Define form fields for different entity types
  const vehicleFormFields: FormField[] = [
    { name: "title", label: "Title", required: true },
    { name: "type", label: "Type", required: true },
    { name: "price", label: "Price", required: true, type: "number" },
    { name: "year", label: "Year", required: true, type: "number", min: 1990, max: 2030 },
    { name: "image", label: "Image URL", required: true },
    { name: "seats", label: "Seats", type: "number", min: 1, max: 9 },
    { name: "transmission", label: "Transmission" },
    { name: "location", label: "Pickup Location" }
  ];

  const restaurantFormFields: FormField[] = [
    { name: "name", label: "Name", required: true },
    { name: "cuisine", label: "Cuisine", required: true },
    { name: "priceRange", label: "Price Range", required: true },
    { name: "location", label: "Location", required: true },
    { name: "rating", label: "Rating", type: "number", min: 1, max: 5, step: 0.1 },
    { name: "image", label: "Image URL", required: true }
  ];
  
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            <Card className="cursor-pointer hover:shadow-md transition-shadow" 
                  onClick={() => setActiveTab("properties")}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Properties</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{propertiesList?.length || 0}</div>
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
                <div className="text-2xl font-bold">{vehiclesList?.length || 0}</div>
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
                <div className="text-2xl font-bold">{restaurantsList?.length || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Manage your restaurant listings
                </p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setActiveTab("cafes")}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Cafes</CardTitle>
                <Coffee className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{cafesList?.length || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Manage cafe listings and map
                </p>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setActiveTab("bookings")}>
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">Bookings</CardTitle>
                <Mail className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{bookingRequests?.length || 0}</div>
                <p className="text-xs text-muted-foreground">
                  Manage booking requests
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-white rounded-xl shadow-sm border p-6">
            <TabsList className="grid w-full mb-8" style={{ gridTemplateColumns: "repeat(6, 1fr)" }}>
              <TabsTrigger value="properties">Properties</TabsTrigger>
              <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
              <TabsTrigger value="restaurants">Restaurants</TabsTrigger>
              <TabsTrigger value="cafes">Cafes</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            {/* Content for the Properties tab */}
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
                      <th className="py-3 px-4 text-left">Featured</th>
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
                        <td className="py-3 px-4">
                          <input 
                            type="text" 
                            value={property.title}
                            onChange={(e) => handlePropertyDetailUpdate(property.id, 'title', e.target.value)}
                            className="border-b border-dashed border-gray-300 bg-transparent px-1 w-full focus:outline-none focus:border-primary"
                          />
                        </td>
                        <td className="py-3 px-4">{property.location}</td>
                        <td className="py-3 px-4">{property.type}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            $
                            <input 
                              type="number" 
                              value={property.price}
                              onChange={(e) => handlePropertyDetailUpdate(property.id, 'price', parseInt(e.target.value))}
                              className="border-b border-dashed border-gray-300 bg-transparent px-1 w-20 focus:outline-none focus:border-primary"
                            />
                            <span className="text-sm text-muted-foreground">/night</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Switch 
                            checked={property.featured} 
                            onCheckedChange={(checked) => handleTogglePropertyFeature(property.id, checked)} 
                          />
                        </td>
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
                                description="Are you sure you want to delete this property? This action cannot be undone."
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
            
            {/* Content for the Vehicles tab */}
            <TabsContent value="vehicles">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Manage Vehicles</h2>
                <Dialog open={isAddVehicleOpen} onOpenChange={setIsAddVehicleOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      Add New Vehicle
                    </Button>
                  </DialogTrigger>
                  <PropertyForm
                    open={isAddVehicleOpen}
                    onOpenChange={setIsAddVehicleOpen}
                    onSubmit={handleAddVehicle}
                    title="Add New Vehicle"
                    fields={vehicleFormFields}
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
                      <th className="py-3 px-4 text-left">Type</th>
                      <th className="py-3 px-4 text-left">Year</th>
                      <th className="py-3 px-4 text-left">Price</th>
                      <th className="py-3 px-4 text-left">Featured</th>
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
                        <td className="py-3 px-4">
                          <input 
                            type="text" 
                            value={vehicle.title}
                            onChange={(e) => handleVehicleDetailUpdate(vehicle.id, 'title', e.target.value)}
                            className="border-b border-dashed border-gray-300 bg-transparent px-1 w-full focus:outline-none focus:border-primary"
                          />
                        </td>
                        <td className="py-3 px-4">{vehicle.type}</td>
                        <td className="py-3 px-4">{vehicle.year}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center">
                            $
                            <input 
                              type="number" 
                              value={vehicle.price}
                              onChange={(e) => handleVehicleDetailUpdate(vehicle.id, 'price', parseInt(e.target.value))}
                              className="border-b border-dashed border-gray-300 bg-transparent px-1 w-20 focus:outline-none focus:border-primary"
                            />
                            <span className="text-sm text-muted-foreground">/day</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Switch 
                            checked={vehicle.featured} 
                            onCheckedChange={(checked) => handleToggleVehicleFeature(vehicle.id, checked)} 
                          />
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex gap-2 justify-end">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => {
                                    setCurrentVehicle(vehicle);
                                    setIsEditVehicleOpen(true);
                                  }}
                                >
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <PropertyForm
                                open={isEditVehicleOpen}
                                onOpenChange={setIsEditVehicleOpen}
                                onSubmit={handleEditVehicle}
                                property={currentVehicle}
                                title="Edit Vehicle"
                                fields={vehicleFormFields}
                              />
                            </Dialog>
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => {
                                    setCurrentVehicle(vehicle);
                                    setIsDeleteVehicleOpen(true);
                                  }}
                                >
                                  Delete
                                </Button>
                              </AlertDialogTrigger>
                              <DeleteConfirmation
                                open={isDeleteVehicleOpen}
                                onOpenChange={setIsDeleteVehicleOpen}
                                onConfirm={handleDeleteVehicle}
                                title="Delete Vehicle"
                                description="Are you sure you want to delete this vehicle? This action cannot be undone."
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
            
            {/* Content for the Restaurants tab */}
            <TabsContent value="restaurants">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Manage Restaurants</h2>
                <Dialog open={isAddRestaurantOpen} onOpenChange={setIsAddRestaurantOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      Add New Restaurant
                    </Button>
                  </DialogTrigger>
                  <PropertyForm
                    open={isAddRestaurantOpen}
                    onOpenChange={setIsAddRestaurantOpen}
                    onSubmit={handleAddRestaurant}
                    title="Add New Restaurant"
                    fields={restaurantFormFields}
                  />
                </Dialog>
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
                      <th className="py-3 px-4 text-left">Featured</th>
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
                        <td className="py-3 px-4">
                          <input 
                            type="text" 
                            value={restaurant.name}
                            onChange={(e) => handleRestaurantDetailUpdate(restaurant.id, 'name', e.target.value)}
                            className="border-b border-dashed border-gray-300 bg-transparent px-1 w-full focus:outline-none focus:border-primary"
                          />
                        </td>
                        <td className="py-3 px-4">{restaurant.cuisine}</td>
                        <td className="py-3 px-4">{restaurant.location}</td>
                        <td className="py-3 px-4">
                          <input 
                            type="number" 
                            value={restaurant.rating}
                            min="1"
                            max="5"
                            step="0.1"
                            onChange={(e) => handleRestaurantDetailUpdate(restaurant.id, 'rating', parseFloat(e.target.value))}
                            className="border-b border-dashed border-gray-300 bg-transparent px-1 w-16 focus:outline-none focus:border-primary"
                          />
                        </td>
                        <td className="py-3 px-4">
                          <Switch 
                            checked={restaurant.featured} 
                            onCheckedChange={(checked) => handleToggleRestaurantFeature(restaurant.id, checked)} 
                          />
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex gap-2 justify-end">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => {
                                    setCurrentRestaurant(restaurant);
                                    setIsEditRestaurantOpen(true);
                                  }}
                                >
                                  Edit
                                </Button>
                              </DialogTrigger>
                              <PropertyForm
                                open={isEditRestaurantOpen}
                                onOpenChange={setIsEditRestaurantOpen}
                                onSubmit={handleEditRestaurant}
                                property={currentRestaurant}
                                title="Edit Restaurant"
                                fields={restaurantFormFields}
                              />
                            </Dialog>
                            
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button 
                                  size="sm" 
                                  variant="destructive"
                                  onClick={() => {
                                    setCurrentRestaurant(restaurant);
                                    setIsDeleteRestaurantOpen(true);
                                  }}
                                >
                                  Delete
                                </Button>
                              </AlertDialogTrigger>
                              <DeleteConfirmation
                                open={isDeleteRestaurantOpen}
                                onOpenChange={setIsDeleteRestaurantOpen}
                                onConfirm={handleDeleteRestaurant}
                                title="Delete Restaurant"
                                description="Are you sure you want to delete this restaurant? This action cannot be undone."
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
            
            {/* Content for the Cafes tab */}
            <TabsContent value="cafes">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Manage Cafes and Map</h2>
                <Button onClick={handleAddCafe}>
                  Add New Cafe
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Cafe Map */}
                <div className="h-[500px] rounded-xl shadow-sm border overflow-hidden">
                  <CafeMap 
                    cafes={mapCafes}
                    onCafesUpdate={handleCafeUpdate}
                    onCafeSelect={setSelectedCafe}
                    center={[mapSettings.centerLat, mapSettings.centerLng]} 
                    zoom={mapSettings.zoomLevel}
                    options={{ style: mapSettings.mapStyle, markers: mapSettings.showMarkers }}
                  />
                </div>
                
                {/* Cafe List */}
                <div className="rounded-xl shadow-sm border p-4 overflow-auto max-h-[500px]">
                  <h3 className="text-lg font-medium mb-4">Cafe Listings</h3>
                  
                  <div className="space-y-4">
                    {cafesList.map(cafe => (
                      <div key={cafe.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 border cursor-pointer">
                        <img 
                          src={cafe.image || "/images/placeholder.svg"} 
                          alt={cafe.name} 
                          className="w-16 h-16 object-cover rounded"
                        />
                        
                        <div className="flex-1">
                          <h4 className="font-medium">{cafe.name}</h4>
                          <p className="text-sm text-muted-foreground">{cafe.location}</p>
                          <div className="flex items-center text-xs">
                            <span className="text-yellow-500">★</span>
                            <span className="ml-1">{cafe.rating.toFixed(1)}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              setSelectedCafe(cafe);
                              setIsEditCafeOpen(true);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          
                          <Button 
                            size="sm" 
                            variant="destructive"
                            onClick={() => handleDeleteCafe(cafe.id)}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Dialog open={isEditCafeOpen} onOpenChange={setIsEditCafeOpen}>
                    <Form {...cafeForm}>
                      <form onSubmit={cafeForm.handleSubmit(handleEditCafe)} className="space-y-4">
                        <FormField
                          control={cafeForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={cafeForm.control}
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={cafeForm.control}
                          name="rating"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Rating (1-5)</FormLabel>
                              <FormControl>
                                <Input 
                                  type="number" 
                                  min="1" 
                                  max="5" 
                                  step="0.1" 
                                  {...field} 
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={cafeForm.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={cafeForm.control}
                          name="image"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Image URL</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <div className="flex justify-end gap-2">
                          <Button type="button" variant="outline" onClick={() => setIsEditCafeOpen(false)}>
                            Cancel
                          </Button>
                          <Button type="submit">
                            Save Changes
                          </Button>
                        </div>
                      </form>
                    </Form>
                  </Dialog>
                </div>
              </div>
              
              <div className="mt-6 border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-4">Map Settings</h3>
                <Form {...mapForm}>
                  <form onSubmit={mapForm.handleSubmit(handleMapSettingsUpdate)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={mapForm.control}
                        name="mapStyle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Map Style</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select style" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="streets">Streets</SelectItem>
                                <SelectItem value="satellite">Satellite</SelectItem>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={mapForm.control}
                        name="zoomLevel"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Zoom Level</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="10" 
                                max="18" 
                                step="1" 
                                {...field} 
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={mapForm.control}
                        name="centerLat"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Center Latitude</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                step="0.0001" 
                                {...field} 
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={mapForm.control}
                        name="centerLng"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Center Longitude</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                step="0.0001" 
                                {...field} 
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={mapForm.control}
                        name="showMarkers"
                        render={({ field }) => (
                          <FormItem className="flex items-center justify-between space-y-0 rounded-lg border p-3">
                            <FormLabel className="m-0">Show Cafe Markers</FormLabel>
                            <FormControl>
                              <Switch 
                                checked={field.value} 
                                onCheckedChange={field.onChange} 
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit">
                        Apply Map Settings
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </TabsContent>
            
            {/* Content for the Bookings tab */}
            <TabsContent value="bookings">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Manage Booking Requests</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left">ID</th>
                      <th className="py-3 px-4 text-left">Name</th>
                      <th className="py-3 px-4 text-left">Email</th>
                      <th className="py-3 px-4 text-left">Type</th>
                      <th className="py-3 px-4 text-left">Date</th>
                      <th className="py-3 px-4 text-left">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingRequests.map(request => (
                      <tr key={request.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{request.id}</td>
                        <td className="py-3 px-4">{request.name}</td>
                        <td className="py-3 px-4">{request.email}</td>
                        <td className="py-3 px-4">
                          <span className="capitalize">{request.type}</span>
                        </td>
                        <td className="py-3 px-4">{request.date}</td>
                        <td className="py-3 px-4">
                          <Select 
                            defaultValue={request.status}
                            onValueChange={(value) => handleUpdateBookingStatus(request.id, value)}
                          >
                            <SelectTrigger className="w-[130px]">
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                              <SelectItem value="responded">Responded</SelectItem>
                            </SelectContent>
                          </Select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleRespondToBooking(request.id)}
                          >
                            <Send className="mr-2 h-4 w-4" />
                            Respond
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
            
            {/* Content for the Settings tab */}
            <TabsContent value="settings">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium">Site Settings</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-lg border p-4 space-y-4">
                  <h3 className="font-medium">General Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="siteName">Site Name</Label>
                      <Input 
                        id="siteName" 
                        value={siteSettings.siteName}
                        onChange={(e) => setSiteSettings({...siteSettings, siteName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactEmail">Contact Email</Label>
                      <Input 
                        id="contactEmail" 
                        value={siteSettings.contactEmail}
                        onChange={(e) => setSiteSettings({...siteSettings, contactEmail: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactPhone">Contact Phone</Label>
                      <Input 
                        id="contactPhone" 
                        value={siteSettings.contactPhone}
                        onChange={(e) => setSiteSettings({...siteSettings, contactPhone: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="logoUrl">Logo URL</Label>
                      <Input 
                        id="logoUrl" 
                        value={siteSettings.logoUrl}
                        onChange={(e) => setSiteSettings({...siteSettings, logoUrl: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="rounded-lg border p-4 space-y-4">
                  <h3 className="font-medium">Homepage Content</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="heroTitle">Hero Title</Label>
                      <Input 
                        id="heroTitle" 
                        value={siteSettings.heroTitle}
                        onChange={(e) => setSiteSettings({...siteSettings, heroTitle: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="heroDescription">Hero Description</Label>
                      <Textarea 
                        id="heroDescription" 
                        value={siteSettings.heroDescription}
                        onChange={(e) => setSiteSettings({...siteSettings, heroDescription: e.target.value})}
                        rows={4}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="primaryColor">Primary Color</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="primaryColor" 
                          value={siteSettings.primaryColor}
                          onChange={(e) => setSiteSettings({...siteSettings, primaryColor: e.target.value})}
                        />
                        <div 
                          className="w-8 h-8 rounded border"
                          style={{ backgroundColor: siteSettings.primaryColor }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondaryColor">Secondary Color</Label>
                      <div className="flex items-center gap-2">
                        <Input 
                          id="secondaryColor" 
                          value={siteSettings.secondaryColor}
                          onChange={(e) => setSiteSettings({...siteSettings, secondaryColor: e.target.value})}
                        />
                        <div 
                          className="w-8 h-8 rounded border"
                          style={{ backgroundColor: siteSettings.secondaryColor }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between space-y-0 rounded-lg border p-3">
                      <Label htmlFor="showCafeMap" className="m-0">Show Cafe Map on Homepage</Label>
                      <Switch 
                        id="showCafeMap"
                        checked={siteSettings.showCafeMap} 
                        onCheckedChange={(checked) => setSiteSettings({...siteSettings, showCafeMap: checked})}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button onClick={handleSiteSettingsUpdate}>
                  Save Settings
                </Button>
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
