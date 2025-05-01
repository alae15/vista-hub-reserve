
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { CalendarIcon, Search } from "lucide-react";

interface SearchFiltersProps {
  type: "properties" | "vehicles" | "restaurants";
}

const SearchFilters = ({ type }: SearchFiltersProps) => {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(new Date());
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(
    checkInDate ? new Date(checkInDate.getTime() + 86400000) : undefined
  );
  const [priceRange, setPriceRange] = useState([100, 500]);

  // Update checkout date when checkin date changes to ensure it's always later
  const handleCheckInDateChange = (date: Date | undefined) => {
    setCheckInDate(date);
    if (date && (!checkOutDate || checkOutDate <= date)) {
      // Set checkout date to the next day if it's not set or if it's before/equal to checkin
      setCheckOutDate(new Date(date.getTime() + 86400000));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div>
          <Label htmlFor="location">Location</Label>
          <div className="mt-1 flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring">
            <Search className="ml-3 h-4 w-4 text-muted-foreground flex-shrink-0" />
            <Input id="location" placeholder="Martil, Morocco" className="border-0 focus-visible:ring-0 focus-visible:ring-transparent" />
          </div>
        </div>

        {(type === "properties" || type === "vehicles") && (
          <>
            <div>
              <Label>Check-in</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal mt-1"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkInDate ? format(checkInDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50">
                  <Calendar
                    mode="single"
                    selected={checkInDate}
                    onSelect={handleCheckInDateChange}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label>Check-out</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal mt-1"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {checkOutDate ? format(checkOutDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 z-50">
                  <Calendar
                    mode="single"
                    selected={checkOutDate}
                    onSelect={setCheckOutDate}
                    disabled={(date) => date < (checkInDate || new Date())}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </>
        )}

        <div>
          <Label>{type === "properties" ? "Type" : type === "vehicles" ? "Vehicle Type" : "Cuisine"}</Label>
          <Select>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder={type === "properties" ? "Property type" : type === "vehicles" ? "Vehicle type" : "Cuisine type"} />
            </SelectTrigger>
            <SelectContent>
              {type === "properties" && (
                <>
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="apartment">Apartments</SelectItem>
                  <SelectItem value="house">Houses</SelectItem>
                  <SelectItem value="villa">Villas</SelectItem>
                </>
              )}
              {type === "vehicles" && (
                <>
                  <SelectItem value="all">All Vehicles</SelectItem>
                  <SelectItem value="car">Cars</SelectItem>
                  <SelectItem value="motorcycle">Motorcycles</SelectItem>
                </>
              )}
              {type === "restaurants" && (
                <>
                  <SelectItem value="all">All Cuisines</SelectItem>
                  <SelectItem value="moroccan">Moroccan</SelectItem>
                  <SelectItem value="mediterranean">Mediterranean</SelectItem>
                  <SelectItem value="seafood">Seafood</SelectItem>
                  <SelectItem value="international">International</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </div>

        {type === "properties" && (
          <div>
            <Label>Guests</Label>
            <Select>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Number of guests" />
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
        )}

        {type === "vehicles" && (
          <div>
            <Label>Transmission</Label>
            <Select>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Transmission type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="automatic">Automatic</SelectItem>
                <SelectItem value="manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        {type === "restaurants" && (
          <div>
            <Label>Price Range</Label>
            <Select>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Price range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="$">$ (Budget)</SelectItem>
                <SelectItem value="$$">$$ (Moderate)</SelectItem>
                <SelectItem value="$$$">$$$ (Expensive)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="md:col-span-3 lg:col-span-1">
          <Label>Price Range (${priceRange[0]} - ${priceRange[1]})</Label>
          <Slider
            defaultValue={[100, 500]}
            min={0}
            max={1000}
            step={50}
            value={priceRange}
            onValueChange={setPriceRange}
            className="mt-6"
          />
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Button>Search</Button>
      </div>
    </div>
  );
};

export default SearchFilters;
