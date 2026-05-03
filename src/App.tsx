import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import ServicePage from "./pages/ServicePage.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";
import StatePage from "./pages/StatePage.tsx";
import ServiceAreas from "./pages/ServiceAreas.tsx";
import ServiceStatePage from "./pages/ServiceStatePage.tsx";
import CityPage from "./pages/CityPage.tsx";
import ServiceCityPage from "./pages/ServiceCityPage.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="/categories/:slug" element={<CategoryPage />} />
            <Route path="/service-areas" element={<ServiceAreas />} />
            <Route path="/service-areas/:slug" element={<StatePage />} />
            <Route path="/service-areas/:state/:city" element={<CityPage />} />
            <Route path="/:service/:state" element={<ServiceStatePage />} />
            <Route path="/:service/:state/:city" element={<ServiceCityPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
