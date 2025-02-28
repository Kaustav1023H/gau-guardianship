
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ShoppingBag, Search, Filter, Tag, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const marketplaceItems = [
  {
    id: 1,
    title: "Fresh Cow Milk",
    seller: "Ramesh Farms",
    location: "Rajasthan",
    distance: "5 km",
    price: "₹60/liter",
    quantity: "20 liters available",
    rating: 4.8,
    reviews: 24,
    category: "milk",
    tags: ["A2 Milk", "Organic", "Gir Cow"]
  },
  {
    id: 2,
    title: "Organic Cow Dung",
    seller: "GreenLife Farms",
    location: "Gujarat",
    distance: "12 km",
    price: "₹15/kg",
    quantity: "100 kg available",
    rating: 4.5,
    reviews: 18,
    category: "dung",
    tags: ["Organic", "Fertilizer", "Biogas"]
  },
  {
    id: 3,
    title: "Cow Ghee",
    seller: "Annapurna Dairy",
    location: "Maharashtra",
    distance: "8 km",
    price: "₹800/kg",
    quantity: "5 kg available",
    rating: 4.9,
    reviews: 35,
    category: "dairy",
    tags: ["A2 Ghee", "Desi Cow", "Organic"]
  },
  {
    id: 4,
    title: "Vermicompost",
    seller: "EcoFarm Solutions",
    location: "Karnataka",
    distance: "15 km",
    price: "₹20/kg",
    quantity: "200 kg available",
    rating: 4.7,
    reviews: 42,
    category: "fertilizer",
    tags: ["Organic", "Cow Dung Based", "Chemical-free"]
  }
];

const categories = [
  { name: "Milk Products", count: 28 },
  { name: "Dung & Biogas", count: 45 },
  { name: "Breeding Services", count: 12 },
  { name: "Equipment", count: 19 },
  { name: "Ayurvedic Products", count: 23 }
];

const Marketplace = () => {
  const handleContact = (itemId: number) => {
    toast.success("Seller has been notified of your interest.");
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center rounded-full px-3 py-1 text-sm bg-primary/10 text-primary mb-4">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Connect & Trade
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-semibold mb-4">
              Decentralized Marketplace
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Connect directly with buyers and sellers in your area for cow products, 
              biogas, and agricultural supplies.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <div className="w-full md:w-64 lg:w-72 shrink-0 space-y-6">
              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="font-medium text-lg mb-3 flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Categories</h4>
                    <ul className="space-y-2">
                      {categories.map((category, index) => (
                        <li key={index}>
                          <label className="flex items-center justify-between cursor-pointer">
                            <span className="text-muted-foreground">{category.name}</span>
                            <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                              {category.count}
                            </span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Distance</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" size="sm" className="h-8">
                        &lt;5km
                      </Button>
                      <Button variant="outline" size="sm" className="h-8">
                        5-15km
                      </Button>
                      <Button variant="outline" size="sm" className="h-8">
                        &gt;15km
                      </Button>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Price Range</h4>
                    <div className="flex items-center space-x-2">
                      <Input placeholder="Min" className="h-8" />
                      <span>-</span>
                      <Input placeholder="Max" className="h-8" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search marketplace" className="pl-9" />
                </div>
                <Button variant="outline" className="shrink-0">
                  <Filter className="h-4 w-4 mr-2" />
                  Sort
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {marketplaceItems.map((item) => (
                  <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <CardContent className="p-0">
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-semibold text-lg">{item.title}</h3>
                          <Badge variant="outline">{item.category}</Badge>
                        </div>
                        
                        <div className="flex items-center text-sm text-muted-foreground mb-2">
                          <span>{item.seller}</span>
                          <span className="mx-2">•</span>
                          <span>{item.location}</span>
                          <span className="mx-2">•</span>
                          <span>{item.distance}</span>
                        </div>
                        
                        <div className="flex items-center mb-4">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                            <span className="ml-1 text-sm font-medium">{item.rating}</span>
                          </div>
                          <span className="mx-2 text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">
                            {item.reviews} reviews
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.tags.map((tag, tagIndex) => (
                            <div key={tagIndex} className="flex items-center text-xs px-2 py-1 rounded-full bg-accent text-accent-foreground">
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex justify-between items-end">
                          <div>
                            <div className="font-semibold text-lg">{item.price}</div>
                            <div className="text-sm text-muted-foreground">{item.quantity}</div>
                          </div>
                          
                          <Button 
                            size="sm" 
                            onClick={() => handleContact(item.id)}
                          >
                            Contact Seller
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Marketplace;
