
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-martil-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">MartiStay</h3>
            <p className="text-sm text-gray-300">
              Your perfect vacation in Martil, Morocco. Find properties, vehicles, and restaurants all in one place.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/properties" className="text-sm text-gray-300 hover:text-white">Properties</Link></li>
              <li><Link to="/vehicles" className="text-sm text-gray-300 hover:text-white">Vehicles</Link></li>
              <li><Link to="/restaurants" className="text-sm text-gray-300 hover:text-white">Restaurants</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-sm text-gray-300">Email: info@martistay.com</li>
              <li className="text-sm text-gray-300">Phone: +212 123-456789</li>
              <li className="text-sm text-gray-300">Address: Martil, Morocco</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-sm text-gray-300 hover:text-white">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-sm text-gray-300 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/admin" className="text-sm text-gray-300 hover:text-white">Admin Access</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-300">© {new Date().getFullYear()} MartiStay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
