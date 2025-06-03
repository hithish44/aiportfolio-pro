
import { motion } from "framer-motion";
import { ArrowDown, Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="pt-32 pb-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.3) 0%, transparent 50%)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 90, 180, 270, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="flex items-center bg-white/20 backdrop-blur-lg px-4 py-2 rounded-full border border-white/30">
              <Sparkles className="w-4 h-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-600">AI-Powered Career Acceleration</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight"
          >
            Transform Your Career with{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI-Powered
            </span>{" "}
            Portfolio Tools
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            Create stunning portfolios, generate ATS-friendly resumes, write compelling cover letters, 
            and practice interviews with our comprehensive AI career toolkit.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8 py-4 text-lg font-semibold"
              onClick={onGetStarted}
            >
              Start Building Free
              <ArrowDown className="w-5 h-5 ml-2 rotate-[-45deg]" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 py-4 text-lg font-semibold border-2"
            >
              Watch Demo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex items-center justify-center space-x-6 text-sm text-muted-foreground"
          >
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              <span>10k+ Users</span>
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              <span>Free Trial</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
