
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, BookOpen, Loader2, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { groqService } from '@/services/groqService';

const CareerCoaching = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [coachingAdvice, setCoachingAdvice] = useState('');
  
  const [formData, setFormData] = useState({
    currentRole: '',
    experience: '',
    targetRole: '',
    industry: '',
    skills: '',
    challenges: '',
    goals: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateCoaching = async () => {
    if (!formData.currentRole || !formData.experience) {
      toast({
        title: "Missing Information",
        description: "Please fill in your current role and experience level.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const userProfile = {
        currentRole: formData.currentRole,
        experience: formData.experience,
        targetRole: formData.targetRole,
        industry: formData.industry,
        skills: formData.skills,
        challenges: formData.challenges,
        goals: formData.goals
      };

      const advice = await groqService.analyzeCareerPath(userProfile);
      setCoachingAdvice(advice);
      
      toast({
        title: "Career Analysis Complete!",
        description: "Your personalized career coaching advice is ready.",
      });
    } catch (error) {
      console.error('Error generating coaching advice:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to generate career coaching advice. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
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
              <CardTitle className="text-2xl bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent flex items-center">
                <BookOpen className="w-6 h-6 mr-2 text-pink-600" />
                Career Coaching
              </CardTitle>
              <CardDescription>
                Get personalized career guidance and skill analysis with AI coaching.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="currentRole">Current Role *</Label>
                    <Input
                      id="currentRole"
                      value={formData.currentRole}
                      onChange={(e) => handleInputChange('currentRole', e.target.value)}
                      placeholder="e.g., Junior Developer"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="experience">Years of Experience *</Label>
                    <Select value={formData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">0-1 years</SelectItem>
                        <SelectItem value="1-3">1-3 years</SelectItem>
                        <SelectItem value="3-5">3-5 years</SelectItem>
                        <SelectItem value="5-8">5-8 years</SelectItem>
                        <SelectItem value="8+">8+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="targetRole">Target Role</Label>
                    <Input
                      id="targetRole"
                      value={formData.targetRole}
                      onChange={(e) => handleInputChange('targetRole', e.target.value)}
                      placeholder="e.g., Senior Developer, Tech Lead"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Input
                      id="industry"
                      value={formData.industry}
                      onChange={(e) => handleInputChange('industry', e.target.value)}
                      placeholder="e.g., Tech, Finance, Healthcare"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="skills">Current Skills</Label>
                    <Textarea
                      id="skills"
                      value={formData.skills}
                      onChange={(e) => handleInputChange('skills', e.target.value)}
                      placeholder="List your technical and soft skills..."
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="challenges">Career Challenges</Label>
                    <Textarea
                      id="challenges"
                      value={formData.challenges}
                      onChange={(e) => handleInputChange('challenges', e.target.value)}
                      placeholder="What challenges are you facing in your career?"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="goals">Career Goals</Label>
                    <Textarea
                      id="goals"
                      value={formData.goals}
                      onChange={(e) => handleInputChange('goals', e.target.value)}
                      placeholder="What are your short-term and long-term career goals?"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <Button
                onClick={generateCoaching}
                disabled={isAnalyzing}
                className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing Career Path...
                  </>
                ) : (
                  <>
                    <Target className="w-4 h-4 mr-2" />
                    Get Career Coaching
                  </>
                )}
              </Button>

              {coachingAdvice && (
                <div className="mt-6 p-4 bg-pink-50 rounded-lg">
                  <h3 className="font-semibold text-pink-900 mb-2">Your Personalized Career Coaching:</h3>
                  <div className="text-sm bg-white p-4 rounded border whitespace-pre-wrap max-h-96 overflow-auto">
                    {coachingAdvice}
                  </div>
                </div>
              )}

              <div className="mt-8 p-4 bg-purple-50 rounded-lg">
                <h3 className="font-semibold text-purple-900 mb-2">Career Development Tips:</h3>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>• Set SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound)</li>
                  <li>• Continuously learn new skills relevant to your field</li>
                  <li>• Build a strong professional network</li>
                  <li>• Seek feedback regularly from peers and supervisors</li>
                  <li>• Consider finding a mentor in your target role</li>
                  <li>• Keep your resume and LinkedIn profile updated</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CareerCoaching;
