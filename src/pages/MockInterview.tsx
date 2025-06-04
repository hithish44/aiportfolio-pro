
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Users, Loader2, Play } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { groqService } from '@/services/groqService';

const MockInterview = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [questions, setQuestions] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const [formData, setFormData] = useState({
    jobRole: '',
    experienceLevel: 'mid',
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateQuestions = async () => {
    if (!formData.jobRole) {
      toast({
        title: "Missing Information",
        description: "Please specify the job role.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const interviewQuestions = await groqService.generateInterviewQuestions(
        formData.jobRole,
        formData.experienceLevel
      );
      
      setQuestions(interviewQuestions);
      setCurrentQuestionIndex(0);
      
      toast({
        title: "Interview Questions Generated!",
        description: "Your mock interview is ready to begin.",
      });
    } catch (error) {
      console.error('Error generating questions:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate interview questions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const nextQuestion = () => {
    if (questions && currentQuestionIndex < Object.keys(questions).length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>

          <Card className="bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent flex items-center">
                <Users className="w-6 h-6 mr-2 text-indigo-600" />
                AI Mock Interviewer
              </CardTitle>
              <CardDescription>
                Practice interviews with AI-powered feedback and analysis.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!questions && (
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="jobRole">Job Role *</Label>
                      <Input
                        id="jobRole"
                        value={formData.jobRole}
                        onChange={(e) => handleInputChange('jobRole', e.target.value)}
                        placeholder="e.g., Software Engineer, Product Manager"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="experienceLevel">Experience Level</Label>
                      <Select value={formData.experienceLevel} onValueChange={(value) => handleInputChange('experienceLevel', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                          <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                          <SelectItem value="senior">Senior Level (5+ years)</SelectItem>
                          <SelectItem value="lead">Lead/Principal (8+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button
                    onClick={generateQuestions}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating Questions...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Start Mock Interview
                      </>
                    )}
                  </Button>
                </div>
              )}

              {questions && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">Mock Interview for {formData.jobRole}</h3>
                    <p className="text-sm text-muted-foreground">
                      Question {currentQuestionIndex + 1} of {Object.keys(questions).length}
                    </p>
                  </div>

                  <div className="p-6 bg-indigo-50 rounded-lg">
                    <h4 className="font-semibold text-indigo-900 mb-4">Interview Questions:</h4>
                    <div className="bg-white p-4 rounded border">
                      <pre className="whitespace-pre-wrap text-sm">
                        {typeof questions === 'string' ? questions : JSON.stringify(questions, null, 2)}
                      </pre>
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      onClick={prevQuestion}
                      disabled={currentQuestionIndex === 0}
                      variant="outline"
                    >
                      Previous Question
                    </Button>
                    
                    <Button
                      onClick={() => {
                        setQuestions(null);
                        setCurrentQuestionIndex(0);
                      }}
                      variant="outline"
                    >
                      New Interview
                    </Button>
                    
                    <Button
                      onClick={nextQuestion}
                      disabled={currentQuestionIndex >= Object.keys(questions).length - 1}
                    >
                      Next Question
                    </Button>
                  </div>
                </div>
              )}

              <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
                <h3 className="font-semibold text-indigo-900 mb-2">Interview Tips:</h3>
                <ul className="text-sm text-indigo-700 space-y-1">
                  <li>• Use the STAR method (Situation, Task, Action, Result)</li>
                  <li>• Practice clear and concise communication</li>
                  <li>• Prepare specific examples from your experience</li>
                  <li>• Ask thoughtful questions about the role and company</li>
                  <li>• Research the company and role beforehand</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default MockInterview;
