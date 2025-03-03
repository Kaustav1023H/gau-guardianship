
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BreedingAssistant from "./pages/BreedingAssistant";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import OfflineCapability from "./pages/OfflineCapability";
import GeminiAssistant from "./pages/GeminiAssistant";
import NotFound from "./pages/NotFound";

// Create a new QueryClient outside the component to avoid React hook issues
const queryClient = new QueryClient();

// Define App as a proper function component
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gradient-to-b from-background to-background/90">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="max-w-7xl mx-auto">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/breeding" element={<BreedingAssistant />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/offline" element={<OfflineCapability />} />
                <Route path="/gemini" element={<GeminiAssistant />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
