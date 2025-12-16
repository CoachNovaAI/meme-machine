import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const anthropic = new Anthropic();

type Tone = "funny" | "sarcastic" | "wholesome";

const tonePrompts: Record<Tone, string> = {
  funny:
    "Generate witty, humorous captions that would make people laugh. Use wordplay, puns, or absurd observations.",
  sarcastic:
    "Generate sarcastic, ironic captions with a dry wit. Use exaggeration and mock seriousness.",
  wholesome:
    "Generate heartwarming, positive captions that spread joy. Be uplifting and kind.",
};

export async function POST(request: NextRequest) {
  try {
    const { image, tone } = await request.json();

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    if (!tone || !["funny", "sarcastic", "wholesome"].includes(tone)) {
      return NextResponse.json({ error: "Valid tone is required" }, { status: 400 });
    }

    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const mediaType = image.match(/^data:(image\/\w+);base64,/)?.[1] || "image/jpeg";

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mediaType as "image/jpeg" | "image/png" | "image/gif" | "image/webp",
                data: base64Data,
              },
            },
            {
              type: "text",
              text: `You are a meme caption generator. Analyze this image and generate exactly 5 short, punchy meme captions.

${tonePrompts[tone as Tone]}

Rules:
- Each caption should be 1-2 sentences max
- Make them suitable for top/bottom meme text format
- Be creative and original
- Reference specific elements visible in the image

Return ONLY a JSON array of 5 strings, no other text. Example format:
["Caption 1", "Caption 2", "Caption 3", "Caption 4", "Caption 5"]`,
            },
          ],
        },
      ],
    });

    const responseText =
      message.content[0].type === "text" ? message.content[0].text : "";

    let captions: string[];
    try {
      captions = JSON.parse(responseText);
      if (!Array.isArray(captions)) {
        throw new Error("Response is not an array");
      }
    } catch {
      const matches = responseText.match(/"([^"]+)"/g);
      captions = matches
        ? matches.map((m) => m.replace(/"/g, "")).slice(0, 5)
        : ["Could not generate captions. Please try again."];
    }

    return NextResponse.json({ captions });
  } catch (error) {
    console.error("Caption generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate captions" },
      { status: 500 }
    );
  }
}
