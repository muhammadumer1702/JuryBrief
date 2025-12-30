import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Backend is working (GET)",
  });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // Build a natural-language description with actual user values
    const garmentCategories = Array.isArray(data.garmentCategory) 
      ? data.garmentCategory.join(", ") 
      : data.garmentCategory || "";
    
    const userPrompt = `Analyze the following design project and generate a detailed, jury-ready explanation:

Project: ${data.projectTitle || ""}
Discipline: ${data.designDiscipline || ""}
Theme: ${data.theme || ""}
Inspiration: ${data.inspiration || ""}
Keywords/Mood: ${data.keywords || ""}
Target Audience: ${data.targetAudience || ""}
Garment Categories: ${garmentCategories}
Colors: ${data.colorPalette || ""}
Fabrics/Materials: ${data.materialPreference || ""}
${data.specialInstructions ? `Additional Notes: ${data.specialInstructions}` : ""}

Generate a thorough, professional explanation using ONLY the information above. For each section, provide sufficient detail: include 1-2 extra explanatory sentences that expand on the reasoning behind design choices and clearly connect the concept to materials, colors, and garment selections. Structure your response under these exact headings:
1. Concept Overview
2. Inspiration Source
3. Color & Fabric Justification
4. Silhouette & Garment Categories
5. Overall Design Narrative

Write in third person. Use clear, simple language that fashion students can understand and explain orally. Avoid academic jargon and research-paper phrasing. Explain WHY choices were made, not just WHAT they are. Connect the theme to colors, colors to fabrics, and fabrics to garments. Be complete and confident, but remain concise and readable. Start directly with "1. Concept Overview". Do not greet, describe the input, use placeholders, or add commentary.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        messages: [
          { role: "system", content: "You are a generator of detailed, jury-ready fashion design explanations. Write in clear, simple, professional English. Use short to medium sentences. Avoid overly complex academic jargon and research-paper phrasing. Write so fashion students can easily understand and explain your text orally. Keep the tone formal but readable, not theoretical or abstract. For each section, provide sufficient depth: include extra explanatory sentences that explain WHY design choices were made and clearly connect the concept, colors, fabrics, and garments. Expand on reasoning and relationships between elements. Be thorough and complete, but remain concise and readable. NEVER greet, reflect, comment on your process, or describe the input. ALWAYS directly analyze and use the provided design details. Structure responses under these exact headings: 1. Concept Overview 2. Inspiration Source 3. Color & Fabric Justification 4. Silhouette & Garment Categories 5. Overall Design Narrative. Write in third person." },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    const resultText = await response.text();

    // 👇 TEMP: log raw response for debugging
    console.log("OPENAI RAW RESPONSE:", resultText);

    const result = JSON.parse(resultText);

if (result.error) {
  return NextResponse.json({
    output: "AI generation is currently unavailable. Please try again later.",
  });
}

return NextResponse.json({
  output: result.choices[0].message.content,
});

  } catch (error: any) {
    console.error("BACKEND ERROR:", error);

    return NextResponse.json(
      {
        error: "Backend failed",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
