
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="flex items-center justify-center py-20 flex-grow">
        <div className="container flex items-center justify-center px-4 md:px-6">
          <div className="text-center space-y-5 max-w-md">
            <h1 className="text-6xl md:text-8xl font-display font-bold text-primary">404</h1>
            <h2 className="text-2xl md:text-3xl font-medium">Page Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The page you are looking for might have been removed or is temporarily unavailable.
            </p>
            <Link
              to="/"
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
