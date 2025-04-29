
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminLogin from "@/components/AdminLogin";

const Admin = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-martil-beige">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-martil-navy">
            Admin Dashboard
          </h1>
          <p className="text-lg text-muted-foreground text-center mb-8">
            Login to manage your properties, vehicles, and restaurant listings
          </p>
          
          <div className="max-w-md mx-auto">
            <AdminLogin />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
