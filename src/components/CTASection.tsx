
import { motion } from "framer-motion";
import { ArrowUp, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  onGetStarted: () => void;
}

const CTASection = ({ onGetStarted }: CTASectionProps) => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex items-center justify-center mb-6"
          >
            <div className="flex items-center bg-white/20 backdrop-blur-lg px-4 py-2 rounded-full border border-white/30">
              <Star className="w-4 h-4 text-yellow-300 mr-2" />
              <span className="text-sm font-medium text-white">Join Thousands of Successful Professionals</span>
            </div>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Ready to Transform
            <br />
            Your Career?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Start building your AI-powered portfolio today and join the thousands of professionals 
            who have accelerated their careers with our platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
              onClick={onGetStarted}
            >
              Start Building Free
              <ArrowUp className="w-5 h-5 ml-2 rotate-45" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg font-semibold"
            >
              Schedule Demo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-2">No Credit Card</h3>
              <p className="text-white/80">Start free and upgrade when ready</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-2">14-Day Trial</h3>
              <p className="text-white/80">Try all premium features risk-free</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-2">24/7 Support</h3>
              <p className="text-white/80">Get help whenever you need it</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
