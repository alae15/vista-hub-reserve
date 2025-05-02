
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center bg-martil-beige">
        <div className="text-center max-w-md mx-auto px-4 py-16">
          <h1 className="text-6xl font-bold mb-4 text-martil-navy">404</h1>
          <h2 className="text-2xl font-semibold mb-4 text-martil-blue">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <div className="space-y-2">
            <Button asChild className="w-full">
              <Link to="/">Return to Home</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link to="/properties">Browse Properties</Link>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
