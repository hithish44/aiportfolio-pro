
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

const PortfolioBuilder = () => {
  const [file, setFile] = useState<File | null>(null);
  const [subdomain, setSubdomain] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      toast({
        title: "PDF Uploaded",
        description: "Your resume PDF has been uploaded successfully.",
      });
    } else {
      toast({
        title: "Invalid File",
        description: "Please upload a PDF file only.",
        variant: "destructive",
      });
    }
  };

  const generatePortfolio = async () => {
    if (!file || !subdomain || !user) {
      toast({
        title: "Missing Information",
        description: "Please upload a PDF and enter a subdomain.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    try {
      // Call the edge function to generate portfolio
      const { data, error } = await supabase.functions.invoke('generate-portfolio', {
        body: {
          subdomain,
          userId: user.id,
        },
      });

      if (error) throw error;

      // Save portfolio to database
      const { error: dbError } = await supabase
        .from('portfolios')
        .insert({
          user_id: user.id,
          title: `${user.user_metadata?.full_name || 'My'} Portfolio`,
          description: 'AI-generated portfolio from resume',
          content: data.content,
          subdomain: subdomain,
          is_published: true,
        });

      if (dbError) throw dbError;

      toast({
        title: "Portfolio Created!",
        description: `Your portfolio is now live at ${subdomain}.portfoliopro.app`,
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Error generating portfolio:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate portfolio. Please try again.",
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
          className="max-w-2xl mx-auto"
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
              <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Portfolio Builder
              </CardTitle>
              <CardDescription>
                Upload your PDF resume and we'll create a beautiful, host-ready portfolio site for you.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* PDF Upload */}
              <div className="space-y-2">
                <Label htmlFor="pdf-upload">Upload Resume PDF</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    id="pdf-upload"
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="pdf-upload"
                    className="cursor-pointer flex flex-col items-center space-y-2"
                  >
                    {file ? (
                      <>
                        <FileText className="w-12 h-12 text-green-600" />
                        <span className="text-sm font-medium text-green-600">
                          {file.name}
                        </span>
                      </>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-gray-400" />
                        <span className="text-sm text-gray-500">
                          Click to upload your resume PDF
                        </span>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Subdomain Input */}
              <div className="space-y-2">
                <Label htmlFor="subdomain">Choose Your Subdomain</Label>
                <div className="flex">
                  <Input
                    id="subdomain"
                    placeholder="yourname"
                    value={subdomain}
                    onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    className="rounded-r-none"
                  />
                  <div className="bg-gray-100 border border-l-0 rounded-r-md px-3 py-2 text-sm text-gray-500 flex items-center">
                    .portfoliopro.app
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Your portfolio will be available at {subdomain || 'yourname'}.portfoliopro.app
                </p>
              </div>

              {/* Generate Button */}
              <Button
                onClick={generatePortfolio}
                disabled={!file || !subdomain || isGenerating}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating Portfolio...
                  </>
                ) : (
                  'Generate AI Portfolio'
                )}
              </Button>

              {/* Features List */}
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">What you'll get:</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Professional portfolio website</li>
                  <li>• Custom subdomain (yourname.portfoliopro.app)</li>
                  <li>• Responsive design that works on all devices</li>
                  <li>• AI-optimized content from your resume</li>
                  <li>• Downloadable HTML for self-hosting</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PortfolioBuilder;
