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

export interface ClassifiedImage {
  id: string;
  filename: string;
  src: string;
  originalCategory: string;
  aiCategory:
    | "faith-discipleship"
    | "books-study"
    | "classroom-desks"
    | "school-uniforms"
    | "nutrition-community"
    | "sanitation-repairs";
  aiConfidence: "high" | "medium";
  aiVisualDescription: string;
  aiDetailedCaption: string;
  suggestedTitle: string;
  detectedElements: string[];
  recommendedLayout: "standard" | "wide" | "portrait";
  isFeaturedCandidate: boolean;
  objectPosition: "object-center" | "object-top" | "object-bottom";
}

const CATEGORY_GUIDELINES = `
You are an expert visual archivist classifying photographs for Furaha Ministries in Kenya.
Analyze the actual contents of the photograph and categorize it into the single most accurate category:

1. 'faith-discipleship':
   Visual cues: Church service, prayer, singing, choir, pastor preaching, Bibles, Christian fellowship, Sunday school in church, youth discipleship.

2. 'books-study':
   Visual cues: Textbooks, exercise books, notebooks, storybooks, students holding books, reading sessions, library/literacy supplies, study materials.

3. 'classroom-desks':
   Visual cues: Classrooms, school desks, blackboards, teaching sessions in school, school grounds, classroom buildings, school infrastructure, teachers at the board.

4. 'school-uniforms':
   Visual cues: Students proudly wearing school uniforms (e.g. green or blue sweaters/tunics/ties), student portraits, school activity/sports, uniform fitting or drying, children in school attire.

5. 'nutrition-community':
   Visual cues: Food distribution, sacks of maize/grain/flour, cooking, meal times, foodbank volunteers, sorting clothes or relief goods, community outreach for families in need.

6. 'sanitation-repairs':
   Visual cues: Latrines, washrooms, toilets, pit latrines, plumbing, sanitation construction, carpenters making wooden doors/frames, building materials (timbers, iron sheets, pipes).
`;

async function analyzeSingleImage(
  id: string,
  src: string,
  origCat: string
): Promise<ClassifiedImage> {
  const filePath = path.join(process.cwd(), "public", src);
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const filename = path.basename(filePath);
  const ext = path.extname(filePath).toLowerCase();
  let mimeType = "image/jpeg";
  if (ext === ".png") mimeType = "image/png";
  if (ext === ".webp") mimeType = "image/webp";

  const fileData = fs.readFileSync(filePath);
  const base64Data = fileData.toString("base64");

  const prompt = `
Carefully inspect this photograph from Furaha Ministries' work in Kenya.

${CATEGORY_GUIDELINES}

Classify and describe this picture accurately:
1. Accurately describe what is visible in the photo without assumptions.
2. Select the single best matching category from the 6 categories above.
3. Create an evocative, dignified, concise exhibition title (3 to 6 words).
4. Write a 1-2 sentence descriptive caption explaining what is taking place and its human significance.
5. Identify 3-5 key visible objects or subjects.
6. Determine the orientation/layout: 'portrait' (tall portrait focus), 'wide' (wide horizontal landscape/group shot), or 'standard'.
7. Suggest focal object position: 'object-center', 'object-top' (if people faces are near top), or 'object-bottom'.
8. Indicate if this is a strong candidate for a featured exhibition spotlight (high visual clarity, emotional impact).
`;

  const models = [
    "gemini-3.5-flash-lite",
    "gemini-3.5-flash",
    "gemini-2.5-flash-lite",
    "gemini-flash-lite-latest",
  ];
  let lastErr: any = null;

  for (const model of models) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model,
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
                aiCategory: {
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
                aiConfidence: {
                  type: Type.STRING,
                  enum: ["high", "medium"],
                },
                aiVisualDescription: {
                  type: Type.STRING,
                },
                aiDetailedCaption: {
                  type: Type.STRING,
                },
                suggestedTitle: {
                  type: Type.STRING,
                },
                detectedElements: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                recommendedLayout: {
                  type: Type.STRING,
                  enum: ["standard", "wide", "portrait"],
                },
                isFeaturedCandidate: {
                  type: Type.BOOLEAN,
                },
                objectPosition: {
                  type: Type.STRING,
                  enum: ["object-center", "object-top", "object-bottom"],
                },
              },
              required: [
                "aiCategory",
                "aiConfidence",
                "aiVisualDescription",
                "aiDetailedCaption",
                "suggestedTitle",
                "detectedElements",
                "recommendedLayout",
                "isFeaturedCandidate",
                "objectPosition",
              ],
            },
          },
        });

        const parsed = JSON.parse(response.text || "{}");
        return {
          id,
          filename,
          src,
          originalCategory: origCat,
          ...parsed,
        };
      } catch (e: any) {
        lastErr = e;
        console.warn(`[${model}][${filename}] attempt ${attempt} failed: ${e.message}`);
        await new Promise((r) => setTimeout(r, 1500));
      }
    }
  }

  throw lastErr;
}

async function main() {
  const galleryModule = await import("../src/components/gallery/galleryData.ts");
  const items = galleryModule.GALLERY_ITEMS;
  const outputPath = path.join(process.cwd(), "scripts", "ai-classified-gallery.json");

  let existingResults: ClassifiedImage[] = [];
  if (fs.existsSync(outputPath)) {
    try {
      existingResults = JSON.parse(fs.readFileSync(outputPath, "utf-8"));
    } catch {
      existingResults = [];
    }
  }

  const processedMap = new Map<string, ClassifiedImage>();
  existingResults.forEach((r) => processedMap.set(r.id, r));

  console.log(`Starting AI classification for ${items.length} images (${processedMap.size} already cached)...`);

  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    if (processedMap.has(it.id)) {
      console.log(`[${i + 1}/${items.length}] Skipping ${it.id} (already classified as "${processedMap.get(it.id)?.aiCategory}")`);
      continue;
    }

    console.log(`[${i + 1}/${items.length}] Analyzing ${it.id} (${it.src})...`);
    try {
      const result = await analyzeSingleImage(it.id, it.src, it.category);
      processedMap.set(it.id, result);
      
      // Save immediately after each image!
      const currentList = Array.from(processedMap.values());
      fs.writeFileSync(outputPath, JSON.stringify(currentList, null, 2), "utf-8");
      
      console.log(
        `✓ [${i + 1}/${items.length}] AI Classified as: "${result.aiCategory}" | Title: "${result.suggestedTitle}"`
      );
    } catch (err: any) {
      console.error(`✗ Error on ${it.id}:`, err.message || err);
    }

    await new Promise((r) => setTimeout(r, 800));
  }

  const finalResults = Array.from(processedMap.values());
  fs.writeFileSync(outputPath, JSON.stringify(finalResults, null, 2), "utf-8");
  console.log(`\nAll done! Total images classified: ${finalResults.length}/${items.length}`);
}

main().catch(console.error);
