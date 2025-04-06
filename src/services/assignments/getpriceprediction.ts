'use server'

import axios from 'axios'
import pdfParse from 'pdf-parse'

const API_KEY = process.env.GEMINI_API_KEY!
const MODEL_NAME = 'models/gemini-1.5-pro-latest'

interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: {
        text?: string
      }[]
    }
  }[]
}

// ✅ Extract text from a remote PDF
async function extractPdfText(pdfUrl: string): Promise<string> {
  try {
    console.log('Fetching PDF from URL:', pdfUrl)

    const response = await axios.get(pdfUrl, { responseType: 'arraybuffer' })
    const buffer = Buffer.from(response.data)

    if (!Buffer.isBuffer(buffer)) {
      throw new Error('Returned data is not a buffer')
    }

    const parsed = await pdfParse(buffer)
    console.log('PDF parsed successfully',parsed)
    return parsed.text || ''
  } catch (error) {
    console.error('PDF extraction failed:', error)
    return ''
  }
}

// ✅ Build the LLM prompt
function createLLMPrompt({
  title,
  description,
  pdfText,
  deadline,
}: {
  title: string
  description: string
  pdfText: string
  deadline: number
}): string {
  return `
You are a pricing assistant for software projects.

🔹 1. Deadline factor
- Ideal duration = 15 days.
- If the deadline is shorter, increase cost proportionally (e.g., 5 days ≈ +40 % to +60 %).
- If the deadline is longer, decrease cost proportionally (e.g., 30 days ≈ -20 % to -30 %).

🔹 2. Complexity factor
Rate the project's technical difficulty on a scale of 1 (low) - 5 (high) using the description below.  
Apply a multiplier:
- 1 → -25 %
- 2 → -10 %
- 3 → 0 %
- 4 → +20 %
- 5 → +40 %

🔹 3. Scope factor
Estimate effort level from 1 - 3 (Small, Medium, Large).  
Apply a multiplier:
- 1 → -10 %
- 2 → 0 %
- 3 → +15 %

🔹 4. Price boundaries
After all adjustments, clamp the final price to the range 100 USD - 250 USD.

🔹 5. Output format
Return only the final price as a whole number in USD (no $ sign, no commas, no text).

————————
Project Title: ${title}
Project Description: ${description}
${pdfText ? `Extracted from PDF:\n${pdfText}` : ''}

Deadline (days): ${deadline || 15}
`
}

// ✅ Main function to call Gemini and estimate price
export async function estimateProjectPrice({
  title,
  description,
  pdfUrl,
  deadline = 15,
}: {
  title: string
  description: string
  pdfUrl?: string
  deadline?: number
}): Promise<{ estimatedPrice?: string; raw?: string; error?: string }> {
  try {
    const pdfText = pdfUrl ? await extractPdfText(pdfUrl) : ''
    const prompt = createLLMPrompt({ title, description, pdfText, deadline })

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    )

    if (!geminiRes.ok) {
      throw new Error(`Gemini API error: ${geminiRes.statusText}`)
    }

    const geminiData = (await geminiRes.json()) as GeminiResponse
    const text = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || ''

    const priceMatch = text.match(/\b(1[0-9]{2}|2[0-4][0-9]|250)\b/)
    const estimatedPrice = priceMatch ? `${priceMatch[0]}$` : undefined

    return estimatedPrice
      ? { estimatedPrice, raw: text }
      : { error: 'Could not extract a price from the model response', raw: text }
  } catch (error) {
    console.error('Error in estimateProjectPrice:', error)
    return { error: 'Internal server error' }
  }
}
