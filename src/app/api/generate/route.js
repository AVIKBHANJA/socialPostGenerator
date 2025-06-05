import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const PLATFORM_SPECS = {
  instagram: {
    maxLength: 2200,
    features: ["hashtags", "emojis", "mentions"],
    style: "visual-focused with engaging captions",
  },
  twitter: {
    maxLength: 280,
    features: ["hashtags", "mentions", "links"],
    style: "concise and attention-grabbing",
  },
  linkedin: {
    maxLength: 3000,
    features: ["mentions", "links", "formatting"],
    style: "professional and industry-focused",
  },
  threads: {
    maxLength: 500,
    features: ["mentions", "links"],
    style: "conversational and engaging",
  },
  discord: {
    maxLength: 2000,
    features: ["mentions", "emojis", "formatting"],
    style: "community-focused and interactive",
  },
  whatsapp: {
    maxLength: 65536,
    features: ["emojis", "formatting"],
    style: "direct and personal",
  },
  facebook: {
    maxLength: 63206,
    features: ["hashtags", "mentions", "links"],
    style: "engaging and shareable",
  },
  YouTube: {
    maxLength: 5000,
    features: ["hashtags", "mentions", "links"],
    style: "visual and informative",
  },
};

export async function POST(request) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  if (!GEMINI_API_KEY) {
    return NextResponse.json(
      { success: false, error: "Gemini API key is not configured" },
      { status: 500 }
    );
  }

  // Initialize the Generative AI
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  try {
    const body = await request.json();
    const { platform, topic, targetAudience, tone, context } = body;

    if (!platform || !topic || !targetAudience || !tone) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
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
- Available features: ${platformSpec.features.join(", ")}

Please provide:
1. Optimized title for the post
2. The main post content, optimized for ${platform}'s style and length limits
3. Include all Relevant hashtags and search terms across the platform/search engines (if applicable)
4. Any platform-specific formatting recommendations

Ensure the content is engaging and appropriate for the platform's typical audience.`; // Get the Gemini model (using Gemini 2.5 Pro)
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash"});

    // Generate content with Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();

    return NextResponse.json({
      success: true,
      content: content,
      platformSpecs: platformSpec,
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
