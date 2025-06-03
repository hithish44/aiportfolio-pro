
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

    // Generate portfolio content using Groq
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: [
          {
            role: 'system',
            content: 'You are a professional web developer and designer. Create a modern, professional portfolio website structure with sections for about, skills, experience, projects, and contact. Return the content as a JSON object with sections and their content.'
          },
          {
            role: 'user',
            content: `Create a professional portfolio website structure for subdomain: ${subdomain}. Include modern sections like hero, about, skills, experience, projects, and contact. Make it professional and engaging.`
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.statusText}`);
    }

    const data = await response.json();
    const portfolioContent = data.choices[0].message.content;

    // Parse and structure the portfolio content
    let structuredContent;
    try {
      structuredContent = JSON.parse(portfolioContent);
    } catch {
      // If JSON parsing fails, create a structured response
      structuredContent = {
        hero: {
          title: "Professional Portfolio",
          subtitle: "Welcome to my digital showcase",
          description: portfolioContent
        },
        about: {
          title: "About Me",
          content: "Professional with diverse experience and skills."
        },
        skills: {
          title: "Skills",
          items: ["JavaScript", "Python", "React", "Node.js", "SQL"]
        },
        experience: {
          title: "Experience",
          items: []
        },
        projects: {
          title: "Projects",
          items: []
        },
        contact: {
          title: "Contact",
          email: "contact@example.com"
        }
      };
    }

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
