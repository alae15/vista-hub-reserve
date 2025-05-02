
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const BookNow = () => {
  const { toast } = useToast();
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 3))
  );

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Booking request received!",
      description: "We'll get back to you shortly with confirmation.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-martil-beige">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-martil-navy">
            Book Your Stay in Martil
          </h1>
          <p className="text-lg text-muted-foreground text-center mb-8">
            Fill out the form below to request your booking
          </p>
          
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8">
            <form onSubmit={handleBooking} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter your full name" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="Enter your email" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" placeholder="Enter your phone number" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Select>
                    <SelectTrigger id="guests">
                      <SelectValue placeholder="Select number of guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3">3 Guests</SelectItem>
                      <SelectItem value="4">4 Guests</SelectItem>
                      <SelectItem value="5">5+ Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="booking-type">What would you like to book?</Label>
                  <Select>
                    <SelectTrigger id="booking-type">
                      <SelectValue placeholder="Select booking type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="property">Property / Accommodation</SelectItem>
                      <SelectItem value="vehicle">Vehicle Rental</SelectItem>
                      <SelectItem value="restaurant">Restaurant Reservation</SelectItem>
                      <SelectItem value="package">Complete Package</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Stay/Rental Period</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Check-in / Start Date</p>
                    <div className="border rounded-md p-4">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        disabled={(date) => date < new Date()}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Check-out / End Date</p>
                    <div className="border rounded-md p-4">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        disabled={(date) => date < (startDate || new Date())}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="special-requests">Special Requests</Label>
                <Textarea
                  id="special-requests"
                  placeholder="Any special requests or requirements..."
                  className="min-h-[120px]"
                />
              </div>
              
              <Button type="submit" className="w-full md:w-auto">
                Submit Booking Request
              </Button>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookNow;
