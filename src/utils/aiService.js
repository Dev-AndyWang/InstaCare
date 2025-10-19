import Anthropic from '@anthropic-ai/sdk';

const API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

export async function generateDiagnosis(userData) {
  if (!API_KEY || API_KEY === 'your_api_key_here') {
    throw new Error('AI Diagnosis unavailable. Please configure your Anthropic API key in the .env file.');
  }

  const anthropic = new Anthropic({
    apiKey: API_KEY,
    dangerouslyAllowBrowser: true // Note: For production, use a backend server
  });

  // Check if any pain points have images
  const hasImages = userData.painPoints.some(point => point.image);

  // Format pain points data into readable text
  const painPointsText = userData.painPoints.map((point, index) => `
${index + 1}. Location: ${point.bodyPartName} (${point.view} view)
   - Suspected Cause: ${point.suspectedCause || 'Not specified'}
   - Pain Type: ${point.painType}
   - Intensity: ${point.intensity}/10
   - Sensation: ${point.sensation}
   - Duration: ${point.duration}
   - Other Symptoms: ${point.otherSymptoms || 'None specified'}
   - Image: ${point.image ? `Included (Image ${index + 1})` : 'Not provided'}
  `).join('\n');

  const prompt = `You are a medical AI assistant analyzing symptoms to provide CONCISE, ACTIONABLE health guidance.

PATIENT INFORMATION:
- Age: ${userData.age || 'Not specified'}
- Gender: ${userData.gender}

PAIN POINTS:
${painPointsText}

${hasImages ? `\nIMAGES PROVIDED:
I have included ${userData.painPoints.filter(p => p.image).length} image(s) of the affected area(s). Please carefully examine these images and incorporate your visual observations into the diagnosis. Look for:
- Visible signs of injury, swelling, or inflammation
- Skin discoloration, rashes, or abnormalities
- Posture or positioning issues
- Any other visual indicators that might help with diagnosis

**IMPORTANT**: Reference each image by its number (Image 1, Image 2, etc.) when discussing visual findings in the "Why We Think This" section.
` : ''}

CRITICAL FORMATTING INSTRUCTIONS:
- ALL content MUST be in bullet point format using asterisk (*)
- NO long paragraphs - break everything into concise bullet points
- Each bullet should be 1-2 lines maximum
- Use **Bold Text** for subsection headers
- Keep content ULTRA-MINIMAL (2-3 bullets max per subsection)
- ONLY include sections directly relevant to this specific condition
- Skip irrelevant sections entirely
- Be conversational, empathetic, and reassuring
- Use beginner-friendly language - avoid medical jargon
- Reference images naturally (e.g., "Based on Image 1...")

Please provide your analysis in EXACTLY this bullet-point format:

---

# 🔍 WHY WE THINK THIS

${hasImages ? '* Based on Image 1, [describe what you observe in the image]\n* [Connect visual findings to reported symptoms]\n* [Explain why this points to the diagnosis]' : '* [Bullet explaining primary symptom pattern]\n* [Bullet connecting symptoms to condition]\n* [Bullet providing reassurance or context]'}

**Most Likely Condition**: [Condition name]

---

# 📊 QUICK SUMMARY

**Severity**: [ONE emoji: 🟢 Mild | 🟡 Moderate | 🟠 Significant | 🔴 Severe]

**What This Means**: [One sentence]

**What You Should Do**: [One sentence with clear timeline]

---

# ⚠️ WHEN TO SEE A DOCTOR

**Timeline**: [When to seek care]

**Emergency Warning Signs** (seek immediate care if you experience):
* [Critical sign 1]
* [Critical sign 2]
* [Critical sign 3]
[Maximum 5 bullets - only the most critical warnings]

---

# 🏠 HOME CARE ESSENTIALS

**Rest & Activity**
* [Guideline 1]
* [Guideline 2]
* [Guideline 3]
[Maximum 3 bullets]

**Ice/Heat Therapy**
* [Guideline 1]
* [Guideline 2]
* [Guideline 3]
[Maximum 3 bullets - ONLY include if relevant to this condition]

**Over-the-Counter Medication**
* [Medication 1 (Brand Name)]: [Dosage] - [Frequency]
* [Medication 2 (Brand Name)]: [Dosage] - [Frequency]
[Maximum 2 medications with simple dosing - ONLY if OTC meds help]

[ONLY INCLUDE THESE SUBSECTIONS IF DIRECTLY RELEVANT:]

**Diet & Nutrition** [ONLY if nutrition impacts this condition]
* [Key recommendation 1]
* [Key recommendation 2]
* [Key recommendation 3]
[Maximum 3 bullets - SKIP if diet doesn't affect the condition]

**Exercises/Stretches** [ONLY if movement therapy helps]
* [Simple exercise 1]
* [Simple exercise 2]
* [Simple exercise 3]
[Maximum 3 bullets - SKIP if rest is needed]

**Posture/Positioning** [ONLY if relevant]
* [Position guideline 1]
* [Position guideline 2]
[Maximum 2 bullets - SKIP if not relevant]

---

# 📅 WHAT TO EXPECT

**Recovery Timeline**
* [Expected healing time with milestones]
* [What to expect during recovery]

**Key Milestones**
* [Day 1-3: What to expect]
* [Week 1-2: What to expect]
* [Full recovery: Timeline]
[Maximum 3 bullets with timeframes]

[ONLY INCLUDE IF SPECIALIST NEEDED:]
**Which Doctor to See**
* **[Specialist type 1]**: [When/why to see them]
* **[Specialist type 2]**: [When/why to see them]
[Maximum 2 specialists - SKIP if primary care is sufficient]

---

# 🤔 OTHER POSSIBILITIES

[ONLY include if confidence is not very high - otherwise SKIP this entire section]

* **[Alternative 1]**: [One sentence why it's possible]
* **[Alternative 2]**: [One sentence why it's possible]
[Maximum 2 alternatives]

---

FORMATTING RULES - STRICTLY FOLLOW:
1. Use asterisk (*) for ALL bullet points - NEVER use dash (-)
2. Each bullet is 1-2 lines maximum
3. Subsection headers use **Bold Text**
4. Main sections use # with emoji
5. Separate sections with ---
6. NO paragraphs - only bullets
7. Reference images naturally in bullets (e.g., "Based on Image 1, I can see...")
8. Keep spacing tight and content scannable
9. SKIP any section that doesn't apply to this specific condition
10. Make every bullet actionable and clear`;

  try {
    // Build content array for multimodal support
    const contentArray = [{ type: 'text', text: prompt }];

    // Add images if present
    if (hasImages) {
      userData.painPoints.forEach((point, index) => {
        if (point.image) {
          // Extract base64 data and media type from data URL
          const matches = point.image.match(/^data:([^;]+);base64,(.+)$/);
          if (matches) {
            const mediaType = matches[1];
            const base64Data = matches[2];

            contentArray.push({
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: base64Data
              }
            });
          }
        }
      });
    }

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 4096,
      messages: [{
        role: 'user',
        content: contentArray
      }]
    });

    return {
      success: true,
      diagnosis: message.content[0].text
    };
  } catch (error) {
    // Detailed console logging for debugging
    console.error('AI Diagnosis Error Details:', {
      message: error.message,
      status: error.status,
      type: error.type,
      error: error,
      fullError: JSON.stringify(error, null, 2)
    });

    // Check for specific error types
    if (error.status === 401) {
      throw new Error('Invalid API key. Please check your Anthropic API key in the .env file.');
    } else if (error.status === 403) {
      throw new Error('API key does not have permission. Please check your API key permissions.');
    } else if (error.status === 429) {
      throw new Error('Too many requests. Please wait a moment and try again.');
    } else if (error.status === 400) {
      throw new Error('Bad request to AI service. Error: ' + (error.message || 'Unknown'));
    } else if (error.message?.includes('fetch') || error.message?.includes('network')) {
      throw new Error('Unable to connect to AI service. Please check your internet connection.');
    } else if (error.message?.includes('CORS')) {
      throw new Error('Browser security error (CORS). The API key may need to be used from a backend server.');
    } else {
      // Provide more details in the generic error
      throw new Error('AI service error: ' + (error.message || 'Please try again later.'));
    }
  }
}
