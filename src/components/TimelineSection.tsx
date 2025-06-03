
import { motion } from "framer-motion";
import { CheckCircle, Circle, ArrowUp } from "lucide-react";

const TimelineSection = () => {
  const timelineItems = [
    {
      year: "2024",
      title: "AI-Powered Career Revolution",
      description: "Launch of comprehensive AI career tools including portfolio builder, resume optimizer, and mock interviewer",
      completed: true,
      highlight: true
    },
    {
      year: "2023",
      title: "Advanced Analytics Integration",
      description: "Real-time performance tracking, skill gap analysis, and personalized career coaching recommendations",
      completed: true,
      highlight: false
    },
    {
      year: "2023",
      title: "Multi-Platform Support",
      description: "Custom domain hosting, exportable formats (PDF/DOCX/HTML), and seamless integrations",
      completed: true,
      highlight: false
    },
    {
      year: "2022",
      title: "Smart Content Generation",
      description: "AI-driven cover letter writing, ATS optimization, and dynamic interview preparation",
      completed: true,
      highlight: false
    },
    {
      year: "2022",
      title: "Foundation & Vision",
      description: "Initial concept development for AI-powered career advancement platform",
      completed: true,
      highlight: false
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <section id="experience" className="py-24 bg-gradient-to-b from-muted/20 to-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our Journey to
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Career Innovation</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From concept to comprehensive platform - see how we've evolved to become 
            the leading AI-powered career development solution.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative"
          >
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 to-purple-500"></div>

            {timelineItems.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative flex items-start mb-12 last:mb-0"
              >
                {/* Timeline Dot */}
                <div className="relative z-10 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${
                      item.highlight
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 border-white shadow-lg'
                        : item.completed
                        ? 'bg-green-500 border-white'
                        : 'bg-gray-300 border-white'
                    }`}
                  >
                    {item.completed ? (
                      <CheckCircle className="w-8 h-8 text-white" />
                    ) : (
                      <Circle className="w-8 h-8 text-white" />
                    )}
                  </motion.div>
                </div>

                {/* Content */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={`ml-8 flex-1 ${
                    item.highlight
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950'
                      : 'bg-white dark:bg-gray-800'
                  } p-6 rounded-xl border shadow-lg`}
                >
                  <div className="flex items-center mb-2">
                    <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                      item.highlight
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {item.year}
                    </span>
                    {item.highlight && (
                      <motion.div
                        animate={{ y: [-2, 2, -2] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="ml-2"
                      >
                        <ArrowUp className="w-4 h-4 text-blue-500" />
                      </motion.div>
                    )}
                  </div>
                  <h3 className={`text-xl font-bold mb-3 ${
                    item.highlight
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'
                      : ''
                  }`}>
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Future Roadmap */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-2xl p-8 border">
              <h3 className="text-2xl font-bold mb-4">What's Next?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We're continuously innovating with AI-powered features including advanced personality 
                assessments, industry-specific coaching, and real-time market insights to keep you 
                ahead in your career journey.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full border">
                  <span className="font-medium">Personality AI</span>
                </div>
                <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full border">
                  <span className="font-medium">Market Intelligence</span>
                </div>
                <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full border">
                  <span className="font-medium">Industry Coaching</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
