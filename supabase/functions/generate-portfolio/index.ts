
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { subdomain, userId } = await req.json();
    const groqApiKey = Deno.env.get('GROQ_API_KEY');

    if (!groqApiKey) {
      throw new Error('GROQ_API_KEY not found in environment variables');
    }

    console.log('Generating portfolio for subdomain:', subdomain);

    // Generate portfolio content using Groq
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are a professional web developer and designer. Create a modern, professional portfolio website structure with sections for about, skills, experience, projects, and contact. Return the content as a JSON object with sections and their content. Make it professional and engaging.'
          },
          {
            role: 'user',
            content: `Create a professional portfolio website structure for someone with subdomain: ${subdomain}. Include sections: hero (with name, title, description), about (personal background), skills (technical skills list), experience (work history), projects (portfolio projects), and contact (contact information). Return as valid JSON.`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    console.log('Groq API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Groq API error response:', errorText);
      throw new Error(`Groq API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Groq API response received');
    
    const portfolioContent = data.choices[0].message.content;

    // Parse and structure the portfolio content
    let structuredContent;
    try {
      structuredContent = JSON.parse(portfolioContent);
    } catch (parseError) {
      console.log('JSON parsing failed, creating structured response');
      // If JSON parsing fails, create a structured response
      structuredContent = {
        hero: {
          name: subdomain.charAt(0).toUpperCase() + subdomain.slice(1),
          title: "Professional Developer",
          description: "Passionate about creating innovative solutions and building amazing digital experiences."
        },
        about: {
          title: "About Me",
          content: "I am a dedicated professional with expertise in modern web technologies. I enjoy solving complex problems and creating user-friendly applications that make a difference."
        },
        skills: {
          title: "Skills",
          items: ["JavaScript", "React", "Node.js", "Python", "SQL", "Git", "HTML/CSS", "TypeScript"]
        },
        experience: {
          title: "Experience",
          items: [
            {
              company: "Tech Company",
              position: "Software Developer",
              period: "2022 - Present",
              description: "Developing and maintaining web applications using modern technologies."
            }
          ]
        },
        projects: {
          title: "Projects",
          items: [
            {
              name: "Portfolio Website",
              description: "A responsive portfolio website built with modern web technologies.",
              technologies: ["React", "TypeScript", "Tailwind CSS"]
            }
          ]
        },
        contact: {
          title: "Contact",
          email: `${subdomain}@example.com`,
          location: "Available for remote work"
        }
      };
    }

    console.log('Portfolio content structured successfully');

    return new Response(JSON.stringify({ 
      content: structuredContent,
      subdomain: subdomain 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-portfolio function:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
