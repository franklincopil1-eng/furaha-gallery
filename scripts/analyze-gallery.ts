import { GoogleGenAI, Type } from "@google/genai";
import fs from "fs";
import path from "path";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

interface ImageAnalysis {
  filename: string;
  visualSummary: string;
  primarySubject: string;
  recommendedCategory:
    | "faith-discipleship"
    | "books-study"
    | "classroom-desks"
    | "school-uniforms"
    | "nutrition-community"
    | "sanitation-repairs";
  categoryConfidence: "high" | "medium" | "low";
  suggestedTitle: string;
  suggestedSubtitle: string;
  detectedPeople: string;
  keyObjects: string[];
  suggestedOrientation: "standard" | "wide" | "portrait";
  isFeaturedQuality: boolean;
}

const CATEGORY_DEFINITIONS = `
Categories to classify into:
1. 'faith-discipleship': Church services, worship, prayer circles, Christian fellowship, youth ministry, Bibles, religious gatherings.
2. 'books-study': Textbooks, exercise notebooks, library books, study materials, educational supplies, reading/literacy sessions.
3. 'classroom-desks': Classrooms, wooden student desks, teachers at blackboards, school learning facilities, campus grounds, educational infrastructure.
4. 'school-uniforms': Students in school uniforms, school sweaters, school uniforms being fitted or hung, student portraits, school sports/activities.
5. 'nutrition-community': Food distribution, grain bags, foodbank, community food relief, cooking, nutrition support, clothing donations/sorting.
6. 'sanitation-repairs': Washrooms, latrines, toilets, plumbing, construction of sanitation facilities, carpentry, doors, renovation materials.
`;

export async function analyzeImage(filePath: string): Promise<ImageAnalysis> {
  const filename = path.basename(filePath);
  const ext = path.extname(filePath).toLowerCase();
  let mimeType = "image/jpeg";
  if (ext === ".png") mimeType = "image/png";
  if (ext === ".webp") mimeType = "image/webp";

  const fileData = fs.readFileSync(filePath);
  const base64Data = fileData.toString("base64");

  const prompt = `
You are an expert visual archivist and metadata specialist for Furaha Ministries, a humanitarian Christian non-profit working with vulnerable children and youth in Kenya.

Carefully examine this photograph:
1. What is genuinely depicted in the image? Describe the exact visual contents without making unfounded assumptions.
2. Categorize it accurately into the single best category based strictly on the image content:
${CATEGORY_DEFINITIONS}

3. Provide:
- visualSummary: 1-2 factual sentences describing what is in the photo.
- primarySubject: main focus of the photo.
- recommendedCategory: one of 'faith-discipleship', 'books-study', 'classroom-desks', 'school-uniforms', 'nutrition-community', 'sanitation-repairs'.
- categoryConfidence: 'high', 'medium', or 'low'.
- suggestedTitle: A dignified, evocative editorial title (3-6 words), suitable for an art/photo gallery exhibition.
- suggestedSubtitle: A descriptive caption (1-2 sentences) explaining the significance of what is depicted in the context of Kenya community ministry.
- detectedPeople: Description of individuals or groups (e.g. "Primary school students in blue sweaters", "Church congregation singing", "Teacher in front of blackboard").
- keyObjects: Array of 3-6 key visible objects or elements (e.g. ["wooden desks", "blackboard", "exercise books"]).
- suggestedOrientation: 'wide' (if horizontal aspect ratio and landscape focus), 'portrait' (if vertical portrait of individual), or 'standard' (general 4:3 or standard shot).
- isFeaturedQuality: boolean (true if the photo is emotionally powerful, sharp, compelling composition suitable for featured exhibition highlight).
`;

  const modelsToTry = ["gemini-flash-latest", "gemini-3.1-flash-lite", "gemini-3.8-flash"];
  let lastError: any = null;

  for (const modelName of modelsToTry) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: {
            parts: [
              {
                inlineData: {
                  mimeType,
                  data: base64Data,
                },
              },
              {
                text: prompt,
              },
            ],
          },
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                visualSummary: { type: Type.STRING },
                primarySubject: { type: Type.STRING },
                recommendedCategory: {
                  type: Type.STRING,
                  enum: [
                    "faith-discipleship",
                    "books-study",
                    "classroom-desks",
                    "school-uniforms",
                    "nutrition-community",
                    "sanitation-repairs",
                  ],
                },
                categoryConfidence: {
                  type: Type.STRING,
                  enum: ["high", "medium", "low"],
                },
                suggestedTitle: { type: Type.STRING },
                suggestedSubtitle: { type: Type.STRING },
                detectedPeople: { type: Type.STRING },
                keyObjects: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                suggestedOrientation: {
                  type: Type.STRING,
                  enum: ["standard", "wide", "portrait"],
                },
                isFeaturedQuality: { type: Type.BOOLEAN },
              },
              required: [
                "visualSummary",
                "primarySubject",
                "recommendedCategory",
                "categoryConfidence",
                "suggestedTitle",
                "suggestedSubtitle",
                "keyObjects",
                "suggestedOrientation",
                "isFeaturedQuality",
              ],
            },
          },
        });

        const parsed = JSON.parse(response.text || "{}");
        return {
          filename,
          ...parsed,
        };
      } catch (err: any) {
        lastError = err;
        console.warn(`Model ${modelName} attempt ${attempt} failed: ${err.message || err}. Waiting before retry...`);
        await new Promise((r) => setTimeout(r, 1500 * attempt));
      }
    }
  }

  throw lastError;
}

async function run() {
  const sampleFiles = [
    "./public/images/discipleship-kibera-church.jpg",
    "./public/images/education-books-students.jpg",
    "./public/images/video_frame_new_bathrooms.jpg",
  ];

  for (const file of sampleFiles) {
    console.log(`Analyzing ${file}...`);
    const result = await analyzeImage(file);
    console.log("Result:", JSON.stringify(result, null, 2));
  }
}

if (process.argv[1]?.includes("analyze-gallery.ts")) {
  run().catch(console.error);
}
