
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, FileText, Loader2, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { groqService } from '@/services/groqService';

interface CVData {
  header?: {
    name?: string;
    email?: string;
    phone?: string;
    location?: string;
  };
  summary?: string;
  experience?: Array<{
    title?: string;
    company?: string;
    duration?: string;
    description?: string;
  }>;
  education?: Array<{
    degree?: string;
    institution?: string;
    year?: string;
  }>;
  skills?: string[];
  projects?: Array<{
    name?: string;
    description?: string;
  }>;
}

const CVGenerator = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCV, setGeneratedCV] = useState<CVData | null>(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    summary: '',
    experience: '',
    education: '',
    skills: '',
    projects: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateCV = async () => {
    if (!formData.fullName || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least your name and email.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    try {
      const cvData = await groqService.generateResume(formData);
      console.log('Generated CV data:', cvData);
      
      // Handle both JSON object and text responses
      if (typeof cvData === 'string') {
        try {
          const parsedData = JSON.parse(cvData);
          setGeneratedCV(parsedData);
        } catch {
          // If it's not JSON, create a structured object from the text
          setGeneratedCV({
            header: {
              name: formData.fullName,
              email: formData.email,
              phone: formData.phone,
              location: formData.location
            },
            summary: formData.summary || 'Professional with diverse experience and skills.',
            experience: formData.experience ? [{ 
              title: 'Professional Experience',
              company: 'Various Companies',
              duration: 'Multiple Years',
              description: formData.experience 
            }] : [],
            education: formData.education ? [{
              degree: 'Education Background',
              institution: 'Educational Institutions',
              year: 'Various Years'
            }] : [],
            skills: formData.skills ? formData.skills.split(',').map(skill => skill.trim()) : [],
            projects: formData.projects ? [{
              name: 'Notable Projects',
              description: formData.projects
            }] : []
          });
        }
      } else {
        setGeneratedCV(cvData);
      }
      
      toast({
        title: "CV Generated!",
        description: "Your professional CV has been generated successfully.",
      });
    } catch (error) {
      console.error('Error generating CV:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate CV. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadCV = () => {
    if (!generatedCV) return;

    const cvText = `
${generatedCV.header?.name || 'N/A'}
${generatedCV.header?.email || ''} | ${generatedCV.header?.phone || ''} | ${generatedCV.header?.location || ''}

PROFESSIONAL SUMMARY
${generatedCV.summary || 'No summary provided'}

EXPERIENCE
${generatedCV.experience?.map(exp => `
${exp.title || 'Position'} at ${exp.company || 'Company'} (${exp.duration || 'Duration'})
${exp.description || 'No description'}
`).join('\n') || 'No experience listed'}

EDUCATION
${generatedCV.education?.map(edu => `
${edu.degree || 'Degree'} - ${edu.institution || 'Institution'} (${edu.year || 'Year'})
`).join('\n') || 'No education listed'}

SKILLS
${generatedCV.skills?.join(', ') || 'No skills listed'}

PROJECTS
${generatedCV.projects?.map(proj => `
${proj.name || 'Project'}: ${proj.description || 'No description'}
`).join('\n') || 'No projects listed'}
    `.trim();

    const blob = new Blob([cvText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedCV.header?.name || 'CV'}_Resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
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

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card className="bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-purple-600" />
                  AI CV Generator
                </CardTitle>
                <CardDescription>
                  Create professional, ATS-friendly resumes with AI assistance.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={formData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      placeholder="New York, NY"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="summary">Professional Summary</Label>
                  <Textarea
                    id="summary"
                    value={formData.summary}
                    onChange={(e) => handleInputChange('summary', e.target.value)}
                    placeholder="Brief professional summary..."
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="experience">Work Experience</Label>
                  <Textarea
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    placeholder="List your work experience..."
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="education">Education</Label>
                  <Textarea
                    id="education"
                    value={formData.education}
                    onChange={(e) => handleInputChange('education', e.target.value)}
                    placeholder="Your educational background..."
                    rows={2}
                  />
                </div>
                
                <div>
                  <Label htmlFor="skills">Skills</Label>
                  <Textarea
                    id="skills"
                    value={formData.skills}
                    onChange={(e) => handleInputChange('skills', e.target.value)}
                    placeholder="List your technical and soft skills..."
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="projects">Projects</Label>
                  <Textarea
                    id="projects"
                    value={formData.projects}
                    onChange={(e) => handleInputChange('projects', e.target.value)}
                    placeholder="Notable projects you've worked on..."
                    rows={3}
                  />
                </div>

                <Button
                  onClick={generateCV}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Generating CV...
                    </>
                  ) : (
                    'Generate Professional CV'
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Generated CV Preview */}
            {generatedCV && (
              <Card className="bg-white/60 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-gray-800">Generated CV Preview</CardTitle>
                    <Button onClick={downloadCV} variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Header */}
                  <div className="text-center border-b pb-4">
                    <h1 className="text-2xl font-bold text-gray-900">{generatedCV.header?.name}</h1>
                    <div className="text-gray-600 mt-2">
                      {generatedCV.header?.email} | {generatedCV.header?.phone} | {generatedCV.header?.location}
                    </div>
                  </div>

                  {/* Summary */}
                  {generatedCV.summary && (
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">Professional Summary</h2>
                      <p className="text-gray-700">{generatedCV.summary}</p>
                    </div>
                  )}

                  {/* Experience */}
                  {generatedCV.experience && generatedCV.experience.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">Experience</h2>
                      <div className="space-y-3">
                        {generatedCV.experience.map((exp, index) => (
                          <div key={index}>
                            <h3 className="font-medium text-gray-800">{exp.title} at {exp.company}</h3>
                            <p className="text-sm text-gray-600">{exp.duration}</p>
                            <p className="text-gray-700 mt-1">{exp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Education */}
                  {generatedCV.education && generatedCV.education.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">Education</h2>
                      <div className="space-y-2">
                        {generatedCV.education.map((edu, index) => (
                          <div key={index}>
                            <h3 className="font-medium text-gray-800">{edu.degree}</h3>
                            <p className="text-gray-600">{edu.institution} - {edu.year}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Skills */}
                  {generatedCV.skills && generatedCV.skills.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">Skills</h2>
                      <div className="flex flex-wrap gap-2">
                        {generatedCV.skills.map((skill, index) => (
                          <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Projects */}
                  {generatedCV.projects && generatedCV.projects.length > 0 && (
                    <div>
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">Projects</h2>
                      <div className="space-y-3">
                        {generatedCV.projects.map((project, index) => (
                          <div key={index}>
                            <h3 className="font-medium text-gray-800">{project.name}</h3>
                            <p className="text-gray-700">{project.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CVGenerator;
