
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
            Login to manage your properties, vehicles, restaurants, and site settings
          </p>
          
          <div className="max-w-md mx-auto">
            <AdminLogin />
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-xl font-semibold mb-4">Site Management Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-medium mb-2">Content Management</h3>
                <p className="text-sm text-muted-foreground">Manage properties, vehicles, and restaurant listings</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-medium mb-2">Map Configuration</h3>
                <p className="text-sm text-muted-foreground">Customize map display, locations, and markers</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-medium mb-2">Media Management</h3>
                <p className="text-sm text-muted-foreground">Upload and manage photos and videos for your reel</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Admin;
