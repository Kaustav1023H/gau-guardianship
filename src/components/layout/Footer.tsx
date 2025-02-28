
import { Link } from "react-router-dom";
import { Leaf, Heart, ExternalLink } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 text-primary mb-4">
              <Leaf className="h-6 w-6" />
              <span className="font-display text-xl font-semibold">GauSeva</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-md">
              Preserving India's cow heritage through technology, community, and sustainable practices.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/breeding" className="text-muted-foreground hover:text-foreground transition-colors">
                  Breeding Assistant
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Environmental Impact
                </Link>
              </li>
              <li>
                <Link to="/marketplace" className="text-muted-foreground hover:text-foreground transition-colors">
                  Marketplace
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors flex items-center">
                  Documentation
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors flex items-center">
                  Kamdhenu Program
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors flex items-center">
                  Research Papers
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a href="mailto:info@gauseva.org" className="text-muted-foreground hover:text-foreground transition-colors">
                  info@gauseva.org
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="text-muted-foreground hover:text-foreground transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li>
                <span className="text-muted-foreground">
                  New Delhi, India
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} GauSeva. All rights reserved.
          </p>
          <div className="flex items-center text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 mx-1 text-destructive animate-pulse-gentle" />
            <span>for India's heritage breeds</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
