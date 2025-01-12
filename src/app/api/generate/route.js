import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const PLATFORM_SPECS = {
  instagram: {
    maxLength: 2200,
    features: ['hashtags', 'emojis', 'mentions'],
    style: 'visual-focused with engaging captions'
  },
  twitter: {
    maxLength: 280,
    features: ['hashtags', 'mentions', 'links'],
    style: 'concise and attention-grabbing'
  },
  linkedin: {
    maxLength: 3000,
    features: ['mentions', 'links', 'formatting'],
    style: 'professional and industry-focused'
  },
  threads: {
    maxLength: 500,
    features: ['mentions', 'links'],
    style: 'conversational and engaging'
  },
  discord: {
    maxLength: 2000,
    features: ['mentions', 'emojis', 'formatting'],
    style: 'community-focused and interactive'
  },
  whatsapp: {
    maxLength: 65536,
    features: ['emojis', 'formatting'],
    style: 'direct and personal'
  }
};

export async function POST(request) {
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { success: false, error: 'OpenAI API key is not configured' },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { platform, topic, targetAudience, tone, context } = body;

    if (!platform || !topic || !targetAudience || !tone) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const platformSpec = PLATFORM_SPECS[platform];
    
    const prompt = `Act as a professional social media content writer. Create a ${platform} post with the following details:

Topic: ${topic}
Target Audience: ${targetAudience}
Tone: ${tone}
Additional Context: ${context} 

Platform-specific requirements:
- Maximum length: ${platformSpec.maxLength} characters
- Style: ${platformSpec.style}
- Available features: ${platformSpec.features.join(', ')}

Please provide:
1. Optimized title for the post
2. The main post content, optimized for ${platform}'s style and length limits
3. Include all Relevant hashtags and search terms across the platform/search engines (if applicable)
4. Any platform-specific formatting recommendations

Ensure the content is engaging and appropriate for the platform's typical audience.`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4o-mini",
      temperature: 0.7,
      max_tokens: 800,
    });

    return NextResponse.json({ 
      success: true, 
      content: completion.choices[0].message.content,
      platformSpecs: platformSpec
    });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}