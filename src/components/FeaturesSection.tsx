
import { motion } from "framer-motion";
import { FileText, MessageSquare, Star, Image, Link, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FeaturesSection = () => {
  const features = [
    {
      icon: FileText,
      title: "AI Portfolio Builder",
      description: "Upload PDF, get a host-ready site with custom subdomain and exportable HTML",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: FileText,
      title: "AI CV Generator",
      description: "Dynamic interview prompts collect work history and output ATS-friendly PDF/DOCX",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Mail,
      title: "AI Cover Letter Writer",
      description: "One-click job-specific letters using role descriptions with editable tone presets",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Star,
      title: "Resume Optimizer",
      description: "Real-time scoring, keyword gap analysis, and auto-rewrite suggestions",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: MessageSquare,
      title: "AI Mock Interviewer",
      description: "Role-aware questions with live transcript, confidence metrics, and improvement tips",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: Link,
      title: "Career Coaching",
      description: "AI-driven personalized career coaching and comprehensive skill gap analysis",
      gradient: "from-teal-500 to-blue-500"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Powerful AI Features for
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Every Career Need</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From portfolio creation to interview preparation, our comprehensive AI suite 
            provides everything you need to accelerate your career growth.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full group hover:shadow-2xl transition-all duration-300 border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-2xl p-8 border">
            <h3 className="text-2xl font-bold mb-4">Powered by Advanced AI</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Our platform integrates with Groq Cloud for lightning-fast AI processing and Supabase 
              for secure data management, ensuring the best experience for your career development.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full border">
                <span className="font-medium">Groq AI Integration</span>
              </div>
              <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full border">
                <span className="font-medium">Supabase Backend</span>
              </div>
              <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full border">
                <span className="font-medium">Real-time Processing</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
