
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-martil-navy text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <h3 className="text-xl font-bold mb-4">MartiStay</h3>
            <p className="text-sm text-gray-300 mb-4">
              Experience the beauty of Martil with our premium properties, vehicle rentals, and local recommendations.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Explore</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/properties" className="hover:text-martil-orange transition-colors">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/vehicles" className="hover:text-martil-orange transition-colors">
                  Vehicles
                </Link>
              </li>
              <li>
                <Link to="/restaurants" className="hover:text-martil-orange transition-colors">
                  Restaurants
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Information</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/about" className="hover:text-martil-orange transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-martil-orange transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-martil-orange transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-martil-orange transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Martil, Morocco</li>
              <li>Email: info@martistay.com</li>
              <li>Phone: +212 123 456789</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} MartiStay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
