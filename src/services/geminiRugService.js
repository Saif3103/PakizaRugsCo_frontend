// ==========================================================================
// PAKIZA RUGS & CO. — GOOGLE GEMINI AI RUG ATELIER SERVICE
// Connects to Google Gemini API for natural language rug understanding,
// specification extraction, and dynamic photorealistic rug generation.
// ==========================================================================

import { STYLE_PRESETS_MAP } from '../pages/AiRugDesignerPage';

const GEMINI_STORAGE_KEY = 'pakiza_gemini_api_key';

// Get active Gemini API Key
export function getGeminiApiKey() {
  try {
    return (
      localStorage.getItem(GEMINI_STORAGE_KEY) ||
      import.meta.env.VITE_GEMINI_API_KEY ||
      ''
    );
  } catch {
    return '';
  }
}

// Save Gemini API Key
export function setGeminiApiKey(key) {
  try {
    if (key) {
      localStorage.setItem(GEMINI_STORAGE_KEY, key.trim());
    } else {
      localStorage.removeItem(GEMINI_STORAGE_KEY);
    }
  } catch (err) {
    console.warn('Could not save Gemini key to localStorage:', err);
  }
}

// Generate a random seed for variation uniqueness
export function generateSeed() {
  return Math.floor(Math.random() * 1000000);
}

// Construct dynamic photorealistic rug image URL
export function createDynamicRugImageUrl(promptText, seed = generateSeed()) {
  const cleanPrompt = encodeURIComponent(
    `top-down studio flatlay photograph of a genuine handmade Indian wool carpet, ${promptText}, authentic hand-knotted New Zealand wool and bamboo silk texture, natural fringe edges, soft ambient catalog lighting, ultra realistic architectural digest product photo, high resolution, no text, no watermark, no digital frames`
  );
  return `https://image.pollinations.ai/prompt/${cleanPrompt}?width=800&height=1000&nologo=true&seed=${seed}`;
}

// Preload an image URL before rendering to ensure no flicker
export function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = () => reject(new Error('Image failed to load'));
    img.src = url;
  });
}

// Master Gemini Rug Synthesis Function
export async function generateRugWithGemini(userPrompt, options = {}) {
  const apiKey = getGeminiApiKey();
  const seed = options.seed || generateSeed();

  // If Gemini API Key is available, use Google Gemini API
  if (apiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are the Master Loom Designer for Pakiza Rugs & Co. in Bhadohi, India.
A client requested this custom rug: "${userPrompt}".

Analyze their prompt and return a valid JSON object (WITHOUT markdown formatting, no backticks, only pure JSON) with the following fields:
{
  "title": "A poetic luxury name (e.g. The Imperial Emerald Oushak Heirloom)",
  "style": "One of: Oushak Heirloom, Persian Imperial, Modern Minimal, Botanical Floral, Geometric Kilim, Vintage Distressed, Abstract Contour, Traditional Mughal",
  "primary": "Hex color code matching their primary color request (e.g. #0c3b2e)",
  "secondary": "Hex color code for accent/border (e.g. #fbf8f3)",
  "pattern": "Specific motif description",
  "border": "Border design description",
  "medallion": "Medallion description",
  "texture": "Texture specification (e.g. Antique Hand-Washed Matte Wool)",
  "pile": "Pile depth (e.g. Medium Luxury Pile 12mm)",
  "material": "Fiber specification (e.g. 100% Pure New Zealand Wool & Bamboo Silk)",
  "size": "Suggested size (e.g. 8x10 ft (240x300 cm))",
  "visualPrompt": "A detailed 25-word visual description of the rug for photorealistic image generation, focusing on colors, motifs, borders, and hand-knotted fibers"
}`
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 800
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const textOutput = data?.candidates?.[0]?.content?.parts?.[0]?.text;

        if (textOutput) {
          // Parse JSON safely
          const cleanJsonStr = textOutput.replace(/```json/gi, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleanJsonStr);

          // Generate dynamic AI image from Gemini's refined visual prompt
          const dynamicUrl = createDynamicRugImageUrl(parsed.visualPrompt || userPrompt, seed);

          // Attempt to preload the dynamic image, fallback to matched preset if network is slow
          try {
            await Promise.race([
              preloadImage(dynamicUrl),
              new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000))
            ]);
            return {
              ...parsed,
              image: dynamicUrl,
              prompt: userPrompt,
              isGeminiPowered: true
            };
          } catch {
            return {
              ...parsed,
              image: dynamicUrl,
              prompt: userPrompt,
              isGeminiPowered: true
            };
          }
        }
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to local synthesis:', err);
    }
  }

  // Fallback: Intelligent Local Synthesis + Dynamic AI Generation
  const t = userPrompt.toLowerCase();
  let basePreset = STYLE_PRESETS_MAP.oushak;

  if (t.includes('geometric') || t.includes('kilim') || t.includes('diamond') || t.includes('tribal')) {
    basePreset = STYLE_PRESETS_MAP.geometric;
  } else if (t.includes('floral') || t.includes('botanical') || t.includes('flower') || t.includes('vine') || t.includes('lotus')) {
    basePreset = STYLE_PRESETS_MAP.floral;
  } else if (t.includes('vintage') || t.includes('distressed') || t.includes('washed') || t.includes('antique') || t.includes('patina')) {
    basePreset = STYLE_PRESETS_MAP.vintage;
  } else if (t.includes('traditional') || t.includes('mughal') || t.includes('court') || t.includes('royal')) {
    basePreset = STYLE_PRESETS_MAP.traditional;
  } else if (t.includes('persian') || t.includes('burgundy') || t.includes('red') || t.includes('wine')) {
    basePreset = STYLE_PRESETS_MAP.persian;
  } else if (t.includes('minimal') || t.includes('sculpted') || t.includes('contour') || t.includes('wave') || t.includes('abstract')) {
    basePreset = STYLE_PRESETS_MAP.minimal;
  }

  // Create real dynamic AI image for the prompt
  const dynamicImageUrl = createDynamicRugImageUrl(userPrompt, seed);

  return {
    ...basePreset,
    title: `Bespoke ${basePreset.style}: ${userPrompt.slice(0, 32)}...`,
    prompt: userPrompt,
    image: dynamicImageUrl,
    fallbackImage: basePreset.image,
    isGeminiPowered: false
  };
}
