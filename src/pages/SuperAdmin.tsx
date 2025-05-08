
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SuperAdminLogin from "@/components/SuperAdminLogin";

const SuperAdmin = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 bg-martil-beige">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-martil-navy">
            Super Admin Dashboard
          </h1>
          <p className="text-lg text-muted-foreground text-center mb-8">
            Login to manage all website content, properties, vehicles, restaurants, and site settings
          </p>
          
          <div className="max-w-md mx-auto">
            <SuperAdminLogin />
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-xl font-semibold mb-4">Full Access Admin Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-medium mb-2">Complete Content Management</h3>
                <p className="text-sm text-muted-foreground">Edit any text, properties, vehicles, and restaurant listings</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-medium mb-2">Website Configuration</h3>
                <p className="text-sm text-muted-foreground">Manage site settings, layouts, and appearance</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-medium mb-2">Full Media Control</h3>
                <p className="text-sm text-muted-foreground">Upload and manage all photos, videos and media files</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SuperAdmin;
