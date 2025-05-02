
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
          <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring pointer-events-auto">
            <Search className="ml-3 h-4 w-4 text-muted-foreground flex-shrink-0" />
            <Input
              type="search"
              placeholder="Search locations..."
              className="w-[200px] lg:w-[300px] border-0 focus-visible:ring-0 focus-visible:ring-transparent pointer-events-auto"
            />
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <Link to="/properties" className="text-sm font-medium hover:text-primary transition-colors pointer-events-auto">
            Properties
          </Link>
          <Link to="/vehicles" className="text-sm font-medium hover:text-primary transition-colors pointer-events-auto">
            Vehicles
          </Link>
          <Link to="/restaurants" className="text-sm font-medium hover:text-primary transition-colors pointer-events-auto">
            Restaurants
          </Link>
          <Link to="/admin" className="text-sm font-medium hover:text-primary transition-colors pointer-events-auto">
            Admin
          </Link>
          <Button variant="outline" size="sm" className="gap-1 pointer-events-auto">
            <User className="h-4 w-4" />
            <span>Login</span>
          </Button>
          <Button className="pointer-events-auto">Book Now</Button>
        </nav>

        <div className="md:hidden flex items-center pointer-events-auto">
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="pointer-events-auto">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="container md:hidden py-4 px-4 animate-fade-in pointer-events-auto">
          <div className="mb-4 flex items-center border rounded-md focus-within:ring-1 focus-within:ring-ring pointer-events-auto">
            <Search className="ml-3 h-4 w-4 text-muted-foreground flex-shrink-0" />
            <Input
              type="search"
              placeholder="Search locations..."
              className="border-0 focus-visible:ring-0 focus-visible:ring-transparent pointer-events-auto"
            />
          </div>
          <nav className="flex flex-col space-y-3 pointer-events-auto">
            <Link to="/properties" className="text-sm font-medium p-2 hover:bg-muted rounded-md pointer-events-auto" onClick={toggleMenu}>
              Properties
            </Link>
            <Link to="/vehicles" className="text-sm font-medium p-2 hover:bg-muted rounded-md pointer-events-auto" onClick={toggleMenu}>
              Vehicles
            </Link>
            <Link to="/restaurants" className="text-sm font-medium p-2 hover:bg-muted rounded-md pointer-events-auto" onClick={toggleMenu}>
              Restaurants
            </Link>
            <Link to="/admin" className="text-sm font-medium p-2 hover:bg-muted rounded-md pointer-events-auto" onClick={toggleMenu}>
              Admin
            </Link>
            <Button variant="outline" size="sm" className="justify-center gap-1 w-full pointer-events-auto">
              <User className="h-4 w-4" />
              <span>Login</span>
            </Button>
            <Button className="w-full pointer-events-auto">Book Now</Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
