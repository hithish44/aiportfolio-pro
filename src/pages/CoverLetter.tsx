
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, MessageSquare, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { groqService } from '@/services/groqService';
import { useAuth } from '@/contexts/AuthContext';

const CoverLetter = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState('');
  
  const [formData, setFormData] = useState({
    companyName: '',
    jobTitle: '',
    jobDescription: '',
    tone: 'professional',
    userSkills: '',
    userExperience: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateCoverLetter = async () => {
    if (!formData.companyName || !formData.jobTitle || !formData.jobDescription) {
      toast({
        title: "Missing Information",
        description: "Please fill in company name, job title, and job description.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const userProfile = {
        full_name: user?.user_metadata?.full_name || 'Professional',
        skills: formData.userSkills || 'Various technical and soft skills',
        experience: formData.userExperience || 'Relevant industry experience'
      };

      const coverLetter = await groqService.generateCoverLetter(
        formData.jobDescription,
        userProfile,
        formData.tone
      );
      
      setGeneratedLetter(coverLetter);
      
      toast({
        title: "Cover Letter Generated!",
        description: "Your personalized cover letter has been generated successfully.",
      });
    } catch (error) {
      console.error('Error generating cover letter:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate cover letter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
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
              <CardTitle className="text-2xl bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent flex items-center">
                <MessageSquare className="w-6 h-6 mr-2 text-green-600" />
                AI Cover Letter Writer
              </CardTitle>
              <CardDescription>
                Write personalized cover letters instantly with AI assistance.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      value={formData.companyName}
                      onChange={(e) => handleInputChange('companyName', e.target.value)}
                      placeholder="Google"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="jobTitle">Job Title *</Label>
                    <Input
                      id="jobTitle"
                      value={formData.jobTitle}
                      onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                      placeholder="Software Engineer"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="tone">Tone</Label>
                    <Select value={formData.tone} onValueChange={(value) => handleInputChange('tone', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select tone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Professional</SelectItem>
                        <SelectItem value="enthusiastic">Enthusiastic</SelectItem>
                        <SelectItem value="confident">Confident</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="userSkills">Your Key Skills</Label>
                    <Textarea
                      id="userSkills"
                      value={formData.userSkills}
                      onChange={(e) => handleInputChange('userSkills', e.target.value)}
                      placeholder="List your relevant skills..."
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="userExperience">Your Experience</Label>
                    <Textarea
                      id="userExperience"
                      value={formData.userExperience}
                      onChange={(e) => handleInputChange('userExperience', e.target.value)}
                      placeholder="Brief description of your relevant experience..."
                      rows={3}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <Label htmlFor="jobDescription">Job Description *</Label>
                <Textarea
                  id="jobDescription"
                  value={formData.jobDescription}
                  onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                  placeholder="Paste the job description here..."
                  rows={6}
                />
              </div>

              <Button
                onClick={generateCoverLetter}
                disabled={isGenerating}
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating Cover Letter...
                  </>
                ) : (
                  'Generate Cover Letter'
                )}
              </Button>

              {generatedLetter && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Generated Cover Letter:</h3>
                  <div className="text-sm bg-white p-4 rounded border whitespace-pre-wrap max-h-96 overflow-auto">
                    {generatedLetter}
                  </div>
                  <Button 
                    className="mt-4" 
                    onClick={() => navigator.clipboard.writeText(generatedLetter)}
                  >
                    Copy to Clipboard
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CoverLetter;
