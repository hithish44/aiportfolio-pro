import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, User, MessageSquare, Target, Users, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const features = [
    {
      icon: FileText,
      title: 'AI Portfolio Builder',
      description: 'Create stunning portfolios from your PDF resume',
      action: 'Create Portfolio',
      gradient: 'from-blue-500 to-cyan-500',
      route: '/portfolio-builder'
    },
    {
      icon: User,
      title: 'AI CV Generator',
      description: 'Generate ATS-friendly resumes with AI assistance',
      action: 'Generate CV',
      gradient: 'from-purple-500 to-pink-500',
      route: '/cv-generator'
    },
    {
      icon: MessageSquare,
      title: 'AI Cover Letter Writer',
      description: 'Write personalized cover letters instantly',
      action: 'Write Letter',
      gradient: 'from-green-500 to-teal-500',
      route: '/cover-letter'
    },
    {
      icon: Target,
      title: 'Resume Optimizer',
      description: 'Optimize your resume for specific job descriptions',
      action: 'Optimize Resume',
      gradient: 'from-orange-500 to-red-500',
      route: '/resume-optimizer'
    },
    {
      icon: Users,
      title: 'AI Mock Interviewer',
      description: 'Practice interviews with AI-powered feedback',
      action: 'Start Interview',
      gradient: 'from-indigo-500 to-blue-500',
      route: '/mock-interview'
    },
    {
      icon: BookOpen,
      title: 'Career Coaching',
      description: 'Get personalized career guidance and skill analysis',
      action: 'Start Coaching',
      gradient: 'from-pink-500 to-purple-500',
      route: '/career-coaching'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-lg border-b sticky top-0 z-50"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Portfolio Pro
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.user_metadata?.full_name || user?.email}
              </span>
              <Button variant="outline" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Dashboard Content */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Your AI Career Hub
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose a tool below to accelerate your career growth
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02 }}
              className="h-full"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className={`w-full bg-gradient-to-r ${feature.gradient} hover:opacity-90 transition-opacity`}
                    onClick={() => navigate(feature.route)}
                  >
                    {feature.action}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 grid md:grid-cols-4 gap-6"
        >
          <Card className="text-center bg-white/60 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-blue-600">0</div>
              <div className="text-sm text-muted-foreground">Portfolios Created</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-white/60 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-purple-600">0</div>
              <div className="text-sm text-muted-foreground">Resumes Generated</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-white/60 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-green-600">0</div>
              <div className="text-sm text-muted-foreground">Cover Letters Written</div>
            </CardContent>
          </Card>
          <Card className="text-center bg-white/60 backdrop-blur-sm">
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-orange-600">0</div>
              <div className="text-sm text-muted-foreground">Mock Interviews</div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
