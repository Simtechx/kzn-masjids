
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Create the QueryClient outside of the component
const queryClient = new QueryClient();

const App: React.FC = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Future routes */}
            <Route path="/region/:regionId" element={<Index />} /> {/* Will be replaced with RegionPage */}
            <Route path="/masjid/:masjidId" element={<Index />} /> {/* Will be replaced with MasjidPage */}
            <Route path="/about" element={<Index />} /> {/* Will be replaced with AboutPage */}
            <Route path="/contact" element={<Index />} /> {/* Will be replaced with ContactPage */}
            <Route path="/contribute" element={<Index />} /> {/* Will be replaced with ContributePage */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
