
import { motion } from "framer-motion";
import { ArrowDown, Star, FileText, MessageSquare, Mail, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import TimelineSection from "@/components/TimelineSection";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const handleSignIn = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              AI Portfolio Pro
            </motion.div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">Features</a>
              <a href="#experience" className="text-muted-foreground hover:text-primary transition-colors">Experience</a>
              <a href="#pricing" className="text-muted-foreground hover:text-primary transition-colors">Pricing</a>
              <Button variant="outline" onClick={handleSignIn}>Sign In</Button>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <HeroSection onGetStarted={handleGetStarted} />

      {/* Features Section */}
      <FeaturesSection />

      {/* Timeline Section */}
      <TimelineSection />

      {/* Pricing Section */}
      <PricingSection />

      {/* CTA Section */}
      <CTASection onGetStarted={handleGetStarted} />

      {/* Footer */}
      <footer className="bg-muted/30 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Portfolio Pro
              </h3>
              <p className="text-muted-foreground">
                Transform your career with AI-powered portfolio and resume tools.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Portfolio Builder</li>
                <li>CV Generator</li>
                <li>Cover Letter Writer</li>
                <li>Resume Optimizer</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Documentation</li>
                <li>API Reference</li>
                <li>Support</li>
                <li>Blog</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <Mail className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
                <Youtube className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
                <MessageSquare className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 AI Portfolio Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
