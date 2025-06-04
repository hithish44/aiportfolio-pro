
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
      const errorText = await response.text();
      console.error('Groq API error:', response.status, errorText);
      throw new Error(`Groq API error: ${response.statusText}`);
    }

    return response.json();
  }

  async generateCoverLetter(jobDescription: string, userProfile: any, tone: string = 'professional'): Promise<string> {
    const prompt = `Write a compelling cover letter for the following job description. Use a ${tone} tone and make it personalized and professional.

Job Description: ${jobDescription}

User Profile:
- Name: ${userProfile.full_name || userProfile.fullName || 'Professional'}
- Skills: ${userProfile.skills || 'Various technical and soft skills'}
- Experience: ${userProfile.experience || 'Relevant industry experience'}

Create a cover letter that:
1. Addresses the specific role and company
2. Highlights relevant skills and experience
3. Shows enthusiasm for the position
4. Is concise but impactful (3-4 paragraphs)
5. Ends with a strong call to action

Format it as a proper business letter.`;

    const response = await this.makeRequest('/chat/completions', {
      model: 'mixtral-8x7b-32768',
      messages: [
        {
          role: 'system',
          content: 'You are an expert career consultant and writer specializing in creating compelling cover letters that get results.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7
    });

    return response.choices[0].message.content;
  }

  async generateResume(userInfo: any): Promise<any> {
    const prompt = `Create a professional, ATS-friendly resume based on the following information. Return it in a well-structured JSON format.

User Information:
- Name: ${userInfo.fullName}
- Email: ${userInfo.email}
- Phone: ${userInfo.phone || 'Not provided'}
- Location: ${userInfo.location || 'Not provided'}
- Summary: ${userInfo.summary || 'Professional seeking opportunities'}
- Experience: ${userInfo.experience || 'Various professional experience'}
- Education: ${userInfo.education || 'Educational background'}
- Skills: ${userInfo.skills || 'Various technical and soft skills'}
- Projects: ${userInfo.projects || 'Notable projects and achievements'}

Return a JSON object with this exact structure:
{
  "header": {
    "name": "Full Name",
    "email": "email@example.com", 
    "phone": "phone number",
    "location": "city, state"
  },
  "summary": "Professional summary paragraph",
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name", 
      "duration": "Start Date - End Date",
      "description": "Job responsibilities and achievements"
    }
  ],
  "education": [
    {
      "degree": "Degree Type",
      "institution": "School Name",
      "year": "Graduation Year"
    }
  ],
  "skills": ["skill1", "skill2", "skill3"],
  "projects": [
    {
      "name": "Project Name",
      "description": "Project description and impact"
    }
  ]
}

Make the content professional, relevant, and ATS-optimized.`;

    const response = await this.makeRequest('/chat/completions', {
      model: 'mixtral-8x7b-32768',
      messages: [
        {
          role: 'system',
          content: 'You are an expert resume writer. Generate professional, ATS-friendly resumes in the exact JSON format requested.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.6
    });

    try {
      const content = response.choices[0].message.content;
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return JSON.parse(content);
    } catch (error) {
      console.error('Error parsing resume JSON:', error);
      return { content: response.choices[0].message.content };
    }
  }

  async optimizeResume(resumeContent: string, jobDescription: string): Promise<any> {
    const prompt = `Analyze this resume against the job description and provide optimization suggestions in JSON format:

Resume Content: ${resumeContent}

Job Description: ${jobDescription}

Return a JSON object with this structure:
{
  "ats_score": 85,
  "missing_keywords": ["keyword1", "keyword2"],
  "strengths": ["strength1", "strength2"],
  "improvements": [
    {
      "section": "section name",
      "suggestion": "specific improvement suggestion"
    }
  ],
  "optimized_summary": "An improved professional summary",
  "recommended_skills": ["skill1", "skill2"]
}

Provide actionable insights for ATS optimization.`;

    const response = await this.makeRequest('/chat/completions', {
      model: 'mixtral-8x7b-32768',
      messages: [
        {
          role: 'system',
          content: 'You are an ATS optimization expert. Analyze resumes and provide detailed improvement suggestions in JSON format.'
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
      const content = response.choices[0].message.content;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return JSON.parse(content);
    } catch (error) {
      console.error('Error parsing optimization JSON:', error);
      return { analysis: response.choices[0].message.content };
    }
  }

  async generateInterviewQuestions(jobRole: string, level: string = 'mid'): Promise<any> {
    const prompt = `Generate interview questions for a ${level}-level ${jobRole} position. Return in JSON format:

{
  "technical_questions": [
    {
      "question": "Technical question",
      "category": "technical category",
      "difficulty": "easy/medium/hard"
    }
  ],
  "behavioral_questions": [
    {
      "question": "Behavioral question",
      "focus": "what this question assesses"
    }
  ],
  "situational_questions": [
    {
      "question": "Situational question",
      "scenario": "brief scenario description"
    }
  ],
  "tips": [
    "Interview tip 1",
    "Interview tip 2"
  ]
}

Include 5 technical, 5 behavioral, and 3 situational questions.`;

    const response = await this.makeRequest('/chat/completions', {
      model: 'mixtral-8x7b-32768',
      messages: [
        {
          role: 'system',
          content: 'You are an expert interviewer and talent acquisition specialist. Create comprehensive interview question sets.'
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
      const content = response.choices[0].message.content;
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return JSON.parse(content);
    } catch (error) {
      console.error('Error parsing interview questions JSON:', error);
      return { questions: response.choices[0].message.content };
    }
  }

  async analyzeCareerPath(userProfile: any): Promise<string> {
    const prompt = `Analyze this user's career profile and provide personalized career coaching advice:

Profile Information:
- Current Role: ${userProfile.currentRole || 'Not specified'}
- Experience Level: ${userProfile.experienceLevel || 'Not specified'}
- Skills: ${userProfile.skills || 'Not specified'}
- Interests: ${userProfile.interests || 'Not specified'}
- Goals: ${userProfile.goals || 'Not specified'}
- Industry: ${userProfile.industry || 'Not specified'}

Provide comprehensive career coaching advice covering:

1. **Career Path Analysis**
   - Current position assessment
   - Natural progression opportunities
   - Alternative career paths

2. **Skill Gap Identification**
   - Skills needed for advancement
   - Emerging skills in the industry
   - Learning priorities

3. **Growth Recommendations**
   - Short-term goals (6-12 months)
   - Medium-term goals (1-3 years)
   - Long-term vision (3-5 years)

4. **Industry Insights**
   - Market trends
   - Emerging opportunities
   - Potential challenges

5. **Actionable Next Steps**
   - Specific actions to take this month
   - Professional development recommendations
   - Networking strategies

Make the advice personalized, actionable, and encouraging.`;

    const response = await this.makeRequest('/chat/completions', {
      model: 'mixtral-8x7b-32768',
      messages: [
        {
          role: 'system',
          content: 'You are an expert career coach with deep industry knowledge across multiple fields. Provide comprehensive, actionable career guidance.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1500,
      temperature: 0.6
    });

    return response.choices[0].message.content;
  }
}

export const groqService = new GroqService();
