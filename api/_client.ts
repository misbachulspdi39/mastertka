import { GoogleGenAI, GenerateContentConfig } from '@google/genai';

const FALLBACK_MODELS = [
  'gemini-3.8-flash',
  'gemini-3.8-flash-lite',
  'gemini-3.0-flash',
];

export async function generateWithFallback(
  apiKey: string,
  contents: string,
  config: GenerateContentConfig
) {
  const ai = new GoogleGenAI({ apiKey });
  let lastError: unknown;

  for (const model of FALLBACK_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents,
        config,
      });
      return { response, modelUsed: model };
    } catch (err: unknown) {
      lastError = err;
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('503') || msg.includes('UNAVAILABLE') || msg.includes('429')) {
        continue;
      }
      throw err;
    }
  }

  throw lastError || new Error('Semua server AI sedang sibuk, silakan coba beberapa detik lagi.');
}