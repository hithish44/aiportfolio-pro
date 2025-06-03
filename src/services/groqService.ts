
interface GroqChatResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

class GroqService {
  private apiKey: string | null = null;
  private baseURL = 'https://api.groq.com/openai/v1';

  constructor() {
    // For now, we'll use a placeholder. In production, this should be handled via environment variables
    // or a secure backend endpoint
    this.apiKey = import.meta.env.VITE_GROQ_API_KEY || null;
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async makeRequest(endpoint: string, data: any): Promise<any> {
    if (!this.apiKey) {
      throw new Error('Groq API key not configured. Please add your API key.');
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.statusText}`);
    }

    return response.json();
  }

  async generateCoverLetter(jobDescription: string, userProfile: any, tone: string = 'professional'): Promise<string> {
    const prompt = `Write a compelling cover letter for the following job description. Use a ${tone} tone.

Job Description: ${jobDescription}

User Profile:
- Name: ${userProfile.full_name || 'Professional'}
- Skills: ${userProfile.skills || 'Various technical and soft skills'}
- Experience: ${userProfile.experience || 'Relevant industry experience'}

Make the cover letter personalized, highlighting relevant skills and experience. Keep it concise and professional.`;

    const response = await this.makeRequest('/chat/completions', {
      model: 'mixtral-8x7b-32768',
      messages: [
        {
          role: 'system',
          content: 'You are an expert career consultant and writer specializing in creating compelling cover letters.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 800,
      temperature: 0.7
    });

    return response.choices[0].message.content;
  }

  async generateResume(userInfo: any): Promise<any> {
    const prompt = `Generate a professional ATS-friendly resume in JSON format based on this information:
    
User Information: ${JSON.stringify(userInfo)}

Return a JSON object with sections: header, summary, experience, education, skills, projects. Make it comprehensive and professional.`;

    const response = await this.makeRequest('/chat/completions', {
      model: 'mixtral-8x7b-32768',
      messages: [
        {
          role: 'system',
          content: 'You are an expert resume writer. Generate ATS-friendly resumes in JSON format.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.7
    });

    try {
      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      return { content: response.choices[0].message.content };
    }
  }

  async optimizeResume(resumeContent: string, jobDescription: string): Promise<any> {
    const prompt = `Analyze this resume against the job description and provide optimization suggestions:

Resume: ${resumeContent}

Job Description: ${jobDescription}

Provide:
1. ATS Score (0-100)
2. Missing keywords
3. Specific improvement suggestions
4. Optimized version

Return in JSON format with these sections.`;

    const response = await this.makeRequest('/chat/completions', {
      model: 'mixtral-8x7b-32768',
      messages: [
        {
          role: 'system',
          content: 'You are an ATS optimization expert. Analyze resumes and provide detailed improvement suggestions.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1200,
      temperature: 0.3
    });

    try {
      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      return { analysis: response.choices[0].message.content };
    }
  }

  async generateInterviewQuestions(jobRole: string, level: string = 'mid'): Promise<any> {
    const prompt = `Generate interview questions for a ${level}-level ${jobRole} position. Include:
    
1. 5 technical questions
2. 5 behavioral questions
3. 3 situational questions

Return in JSON format with question categories and expected answer guidelines.`;

    const response = await this.makeRequest('/chat/completions', {
      model: 'mixtral-8x7b-32768',
      messages: [
        {
          role: 'system',
          content: 'You are an expert interviewer and talent acquisition specialist.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    });

    try {
      return JSON.parse(response.choices[0].message.content);
    } catch (error) {
      return { questions: response.choices[0].message.content };
    }
  }

  async analyzeCareerPath(userProfile: any): Promise<string> {
    const prompt = `Analyze this user's career profile and provide personalized career coaching advice:

Profile: ${JSON.stringify(userProfile)}

Provide:
1. Career path analysis
2. Skill gap identification
3. Growth recommendations
4. Industry insights
5. Next steps

Make it actionable and specific.`;

    const response = await this.makeRequest('/chat/completions', {
      model: 'mixtral-8x7b-32768',
      messages: [
        {
          role: 'system',
          content: 'You are an expert career coach with deep industry knowledge across multiple fields.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1200,
      temperature: 0.6
    });

    return response.choices[0].message.content;
  }
}

export const groqService = new GroqService();
