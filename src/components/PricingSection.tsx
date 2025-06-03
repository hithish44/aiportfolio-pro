
import { motion } from "framer-motion";
import { CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started with AI-powered career tools",
      features: [
        "1 AI-generated portfolio",
        "Basic resume templates",
        "5 cover letters per month",
        "Community support",
        "Basic analytics"
      ],
      popular: false,
      gradient: "from-gray-500 to-gray-600"
    },
    {
      name: "Professional",
      price: "$29",
      period: "per month",
      description: "Everything you need for serious career advancement",
      features: [
        "Unlimited portfolios",
        "Custom domain hosting",
        "Unlimited cover letters",
        "AI mock interviews",
        "Advanced analytics",
        "ATS optimization",
        "Priority support",
        "Export in all formats"
      ],
      popular: true,
      gradient: "from-blue-500 to-purple-500"
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      description: "Advanced features for teams and organizations",
      features: [
        "Everything in Professional",
        "Team collaboration",
        "API access",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced security",
        "Custom branding",
        "Bulk processing"
      ],
      popular: false,
      gradient: "from-purple-500 to-pink-500"
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
    <section id="pricing" className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Choose Your
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Career Plan</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Start free and upgrade as you grow. All plans include our core AI features 
            with varying levels of access and support.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {plans.map((plan, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className={`h-full relative overflow-hidden ${
                plan.popular 
                  ? 'border-2 border-blue-500 shadow-2xl scale-105' 
                  : 'border hover:shadow-xl'
              } transition-all duration-300 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg`}>
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-2">
                    <div className="flex items-center justify-center">
                      <Star className="w-4 h-4 mr-1" />
                      <span className="font-medium">Most Popular</span>
                    </div>
                  </div>
                )}
                
                <CardHeader className={plan.popular ? 'pt-12' : ''}>
                  <div className="text-center">
                    <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">/{plan.period}</span>
                    </div>
                    <CardDescription className="text-base">
                      {plan.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    className={`w-full ${
                      plan.popular
                        ? `bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white`
                        : 'border'
                    }`}
                    variant={plan.popular ? 'default' : 'outline'}
                    size="lg"
                  >
                    {plan.price === '$0' ? 'Get Started Free' : 'Start Free Trial'}
                  </Button>
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
          <p className="text-muted-foreground mb-6">
            All plans include a 14-day free trial. No credit card required for the Starter plan.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Cancel anytime
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              24/7 Support
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Data security
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
              Regular updates
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
