
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-martil-blue">MartiStay</span>
        </Link>

        <div className="hidden md:flex items-center gap-2 mr-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search locations..."
              className="pl-9 w-[200px] lg:w-[300px] bg-background"
            />
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/properties" className="text-sm font-medium hover:text-primary transition-colors">
            Properties
          </Link>
          <Link to="/vehicles" className="text-sm font-medium hover:text-primary transition-colors">
            Vehicles
          </Link>
          <Link to="/restaurants" className="text-sm font-medium hover:text-primary transition-colors">
            Restaurants
          </Link>
          <Link to="/admin" className="text-sm font-medium hover:text-primary transition-colors">
            Admin
          </Link>
          <Button variant="outline" size="sm" className="gap-1">
            <User className="h-4 w-4" />
            <span>Login</span>
          </Button>
          <Button>Book Now</Button>
        </nav>

        <div className="md:hidden flex items-center">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="container md:hidden py-4 px-4 animate-fade-in">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search locations..."
              className="pl-9 w-full bg-background"
            />
          </div>
          <nav className="flex flex-col space-y-3">
            <Link to="/properties" className="text-sm font-medium p-2 hover:bg-muted rounded-md" onClick={toggleMenu}>
              Properties
            </Link>
            <Link to="/vehicles" className="text-sm font-medium p-2 hover:bg-muted rounded-md" onClick={toggleMenu}>
              Vehicles
            </Link>
            <Link to="/restaurants" className="text-sm font-medium p-2 hover:bg-muted rounded-md" onClick={toggleMenu}>
              Restaurants
            </Link>
            <Link to="/admin" className="text-sm font-medium p-2 hover:bg-muted rounded-md" onClick={toggleMenu}>
              Admin
            </Link>
            <Button variant="outline" size="sm" className="justify-center gap-1 w-full">
              <User className="h-4 w-4" />
              <span>Login</span>
            </Button>
            <Button className="w-full">Book Now</Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
