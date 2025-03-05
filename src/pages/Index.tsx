
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Testimonials from "@/components/home/Testimonials";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CowSilhouettes from "@/components/decoration/CowSilhouettes";

const Index = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced background */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-b from-gauseva-cream/30 to-white/80"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-40 left-10 w-64 h-64 rounded-full bg-gauseva-leaf/5 blur-3xl -z-10"></div>
      <div className="absolute bottom-60 right-10 w-80 h-80 rounded-full bg-gauseva-earth/5 blur-3xl -z-10"></div>
      
      {/* Animated cow silhouettes */}
      <CowSilhouettes className="absolute bottom-0 left-0 right-0 w-full h-40 -z-10 opacity-15" />
      
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
