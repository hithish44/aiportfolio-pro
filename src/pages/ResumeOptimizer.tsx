
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Target, Loader2, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { groqService } from '@/services/groqService';

const ResumeOptimizer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  
  const [formData, setFormData] = useState({
    resumeContent: '',
    jobDescription: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const analyzeResume = async () => {
    if (!formData.resumeContent || !formData.jobDescription) {
      toast({
        title: "Missing Information",
        description: "Please provide both your resume content and the job description.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    try {
      const analysis = await groqService.optimizeResume(
        formData.resumeContent,
        formData.jobDescription
      );
      
      setAnalysisResult(analysis);
      
      toast({
        title: "Analysis Complete!",
        description: "Your resume has been analyzed with optimization suggestions.",
      });
    } catch (error) {
      console.error('Error analyzing resume:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze resume. Please try again.",
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
              <CardTitle className="text-2xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center">
                <Target className="w-6 h-6 mr-2 text-orange-600" />
                Resume Optimizer
              </CardTitle>
              <CardDescription>
                Optimize your resume for specific job descriptions with AI analysis.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="resumeContent">Your Resume Content *</Label>
                  <Textarea
                    id="resumeContent"
                    value={formData.resumeContent}
                    onChange={(e) => handleInputChange('resumeContent', e.target.value)}
                    placeholder="Paste your resume content here or upload a file..."
                    rows={12}
                  />
                  <div className="mt-2">
                    <Button variant="outline" size="sm">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Resume File
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="jobDescription">Target Job Description *</Label>
                  <Textarea
                    id="jobDescription"
                    value={formData.jobDescription}
                    onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                    placeholder="Paste the job description you're targeting..."
                    rows={12}
                  />
                </div>
              </div>

              <Button
                onClick={analyzeResume}
                disabled={isAnalyzing}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing Resume...
                  </>
                ) : (
                  'Analyze & Optimize Resume'
                )}
              </Button>

              {analysisResult && (
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h3 className="font-semibold text-blue-900 mb-2">ATS Score & Analysis:</h3>
                    <pre className="text-sm bg-white p-4 rounded border overflow-auto max-h-96 whitespace-pre-wrap">
                      {typeof analysisResult === 'string' ? analysisResult : JSON.stringify(analysisResult, null, 2)}
                    </pre>
                  </div>
                </div>
              )}

              <div className="mt-8 p-4 bg-orange-50 rounded-lg">
                <h3 className="font-semibold text-orange-900 mb-2">Tips for ATS Optimization:</h3>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li>• Use keywords from the job description</li>
                  <li>• Include relevant technical skills</li>
                  <li>• Use standard section headings</li>
                  <li>• Quantify achievements with numbers</li>
                  <li>• Keep formatting simple and clean</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ResumeOptimizer;
