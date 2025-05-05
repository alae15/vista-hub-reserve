
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useData } from "@/contexts/DataContext";

const BookNow = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { properties, vehicles, restaurants, addBookingRequest } = useData();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      bookingType: "",
      bookingItem: "",
      message: "",
      date: undefined, // Add date to form state
    },
  });

  const bookingTypes = [
    { value: "property", label: "Property" },
    { value: "vehicle", label: "Vehicle" },
    { value: "restaurant", label: "Restaurant" },
  ];

  const [bookingItems, setBookingItems] = useState([]);
  const [selectedType, setSelectedType] = useState("");

  const handleTypeChange = (value) => {
    setSelectedType(value);
    form.setValue("bookingType", value);
    form.setValue("bookingItem", "");

    switch (value) {
      case "property":
        setBookingItems(properties.map(item => ({ 
          value: item.id.toString(), 
          label: item.title 
        })));
        break;
      case "vehicle":
        setBookingItems(vehicles.map(item => ({ 
          value: item.id.toString(), 
          label: item.title 
        })));
        break;
      case "restaurant":
        setBookingItems(restaurants.map(item => ({ 
          value: item.id.toString(), 
          label: item.name 
        })));
        break;
      default:
        setBookingItems([]);
    }
  };

  // Update form date value when calendar date changes
  const handleDateChange = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    form.setValue("date", selectedDate);
  };

  const onSubmit = (data) => {
    if (!date) {
      toast({
        title: "Missing date",
        description: "Please select a booking date.",
        variant: "destructive",
      });
      return;
    }

    // Add to booking requests
    addBookingRequest({
      name: data.name,
      email: data.email,
      type: data.bookingType,
      date: format(date, "yyyy-MM-dd"),
      status: "pending"
    });

    toast({
      title: "Booking request submitted",
      description: "We'll get back to you shortly to confirm your booking.",
    });

    navigate("/");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-center mb-8">Book Your Martil Experience</h1>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    rules={{ required: "Name is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    rules={{ 
                      required: "Email is required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Please enter a valid email",
                      },
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+1 234 567 890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Booking Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? format(date, "PPP") : "Select a date"}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={handleDateChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="bookingType"
                    rules={{ required: "Booking type is required" }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Booking Type</FormLabel>
                        <Select 
                          onValueChange={(value) => handleTypeChange(value)}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select what you want to book" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {bookingTypes.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="bookingItem"
                    rules={{ required: selectedType ? "Please select an item" : false }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {selectedType === "property" && "Select Property"}
                          {selectedType === "vehicle" && "Select Vehicle"}
                          {selectedType === "restaurant" && "Select Restaurant"}
                          {!selectedType && "Select Item"}
                        </FormLabel>
                        <Select
                          disabled={!selectedType}
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={
                                selectedType 
                                  ? `Select a ${selectedType}`
                                  : "Choose booking type first"
                              } />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {bookingItems.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Requests</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any special requirements or questions..."
                          className="resize-none"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full">
                  Submit Booking Request
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookNow;
