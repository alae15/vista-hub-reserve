
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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "",
    bookingType: "",
    specialRequests: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Prepare the booking data
      const bookingData = {
        id: Date.now(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: formData.bookingType,
        guests: formData.guests,
        checkIn: startDate ? format(startDate, "yyyy-MM-dd") : "",
        checkOut: endDate ? format(endDate, "yyyy-MM-dd") : "",
        specialRequests: formData.specialRequests,
        date: format(new Date(), "yyyy-MM-dd"),
        status: "pending"
      };
      
      // Prepare the email data
      const emailData = {
        to: "admin@martistay.com", // Replace with your actual email
        subject: `New Booking Request: ${formData.bookingType}`,
        message: `
          New booking request from ${formData.name}
          
          Contact Information:
          - Email: ${formData.email}
          - Phone: ${formData.phone}
          
          Booking Details:
          - Type: ${formData.bookingType}
          - Guests: ${formData.guests}
          - Check-in: ${startDate ? format(startDate, "PPP") : "Not specified"}
          - Check-out: ${endDate ? format(endDate, "PPP") : "Not specified"}
          
          Special Requests:
          ${formData.specialRequests || "None"}
        `
      };
      
      // In a real implementation, this would send to an endpoint
      console.log("Sending email with data:", emailData);
      
      // Store the booking data in localStorage for the admin dashboard
      const existingBookings = JSON.parse(localStorage.getItem('bookingRequests') || '[]');
      const updatedBookings = [...existingBookings, bookingData];
      localStorage.setItem('bookingRequests', JSON.stringify(updatedBookings));
      
      // For demonstration, we'll simulate a successful email send
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Booking request sent!",
        description: "We'll contact you shortly with confirmation details.",
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        guests: "",
        bookingType: "",
        specialRequests: ""
      });
      
    } catch (error) {
      console.error("Error sending booking email:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
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
                  <Input 
                    id="name" 
                    placeholder="Enter your full name" 
                    required 
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    required 
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input 
                    id="phone" 
                    placeholder="Enter your phone number" 
                    required 
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="guests">Number of Guests</Label>
                  <Select onValueChange={(value) => handleSelectChange("guests", value)}>
                    <SelectTrigger id="guests">
                      <SelectValue placeholder="Select number of guests" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Guest</SelectItem>
                      <SelectItem value="2">2 Guests</SelectItem>
                      <SelectItem value="3">3 Guests</SelectItem>
                      <SelectItem value="4">4 Guests</SelectItem>
                      <SelectItem value="5+">5+ Guests</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="booking-type">What would you like to book?</Label>
                  <Select onValueChange={(value) => handleSelectChange("bookingType", value)}>
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
                <Label htmlFor="specialRequests">Special Requests</Label>
                <Textarea
                  id="specialRequests"
                  placeholder="Any special requests or requirements..."
                  className="min-h-[120px]"
                  value={formData.specialRequests}
                  onChange={handleInputChange}
                />
              </div>
              
              <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Booking Request"}
              </Button>

              <div className="text-sm text-muted-foreground mt-4">
                <p>Your booking request will be sent directly to our team, and we'll contact you via email to confirm your reservation.</p>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookNow;
