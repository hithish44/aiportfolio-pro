
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import PortfolioBuilder from "./pages/PortfolioBuilder";
import CVGenerator from "./pages/CVGenerator";
import CoverLetter from "./pages/CoverLetter";
import ResumeOptimizer from "./pages/ResumeOptimizer";
import MockInterview from "./pages/MockInterview";
import CareerCoaching from "./pages/CareerCoaching";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/portfolio-builder" element={
              <ProtectedRoute>
                <PortfolioBuilder />
              </ProtectedRoute>
            } />
            <Route path="/cv-generator" element={
              <ProtectedRoute>
                <CVGenerator />
              </ProtectedRoute>
            } />
            <Route path="/cover-letter" element={
              <ProtectedRoute>
                <CoverLetter />
              </ProtectedRoute>
            } />
            <Route path="/resume-optimizer" element={
              <ProtectedRoute>
                <ResumeOptimizer />
              </ProtectedRoute>
            } />
            <Route path="/mock-interview" element={
              <ProtectedRoute>
                <MockInterview />
              </ProtectedRoute>
            } />
            <Route path="/career-coaching" element={
              <ProtectedRoute>
                <CareerCoaching />
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
