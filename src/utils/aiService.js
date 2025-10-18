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

  const prompt = `Analyze these symptoms and provide a comprehensive health assessment:

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

Reference each image by its number (Image 1, Image 2, etc.) when discussing visual findings.
` : ''}
Please provide a detailed analysis in EXACTLY this 5-section format. Use clear headers and markdown formatting:

# 📋 WHAT THIS MIGHT BE

## Most Likely Condition
[Name of condition]

### In Simple Terms
[Explain in beginner-friendly language what this condition means]

### Why We Think This
[Explain how the symptoms match this condition]

## Other Possibilities
1. [Alternative condition 1] - [Brief explanation]
2. [Alternative condition 2] - [Brief explanation]
3. [Alternative condition 3] - [Brief explanation]

---

# ⚠️ HOW SERIOUS IS THIS?

## Severity Level
[Choose ONE: 🟢 Mild | 🟡 Moderate | 🟠 Significant | 🔴 Severe]

### What This Means
[Explain the severity level in simple terms]

## What You Should Do
[Clear, actionable instruction with timeframe]

## Warning Signs to Watch For
- [Red flag 1]
- [Red flag 2]
- [Red flag 3]

---

# 🏠 WHAT YOU CAN DO AT HOME

## Diet & Nutrition
### Foods to Eat More
- [Food 1]
- [Food 2]
- [Food 3]

### Foods to Avoid
- [Food 1]
- [Food 2]

### Hydration
[Hydration recommendations]

## Physical Treatments

### Rest & Activity
[Instructions on rest and activity levels]

### Hot/Cold Therapy
[When to use ice vs heat, how long, how often]

### Stretches & Exercises
[Step-by-step instructions with frequency]

### Posture & Positioning
[How to sit, sleep, or move]

## Lifestyle Changes
- [Change 1]
- [Change 2]
- [Change 3]

## Over-the-Counter Medications
### Recommended Options
- [Medication name (brand names)] - [Dosage] - [Frequency]

### Important Warnings
[Side effects or precautions]

## When to Stop Home Treatment
[Signs that DIY treatment isn't working]

---

# 🏥 WHAT A DOCTOR MIGHT DO

## The Doctor's Visit
### Questions They'll Ask
- [Question 1]
- [Question 2]
- [Question 3]

### Physical Examination
[What examination they might perform]

## Tests & Diagnosis
### Possible Tests
- [Test 1] - In Simple Terms: [What it does]
- [Test 2] - In Simple Terms: [What it does]

## Treatment Options

### Prescription Medications
[Types they might prescribe and what they do]

### Physical Therapy
[When and why it might be recommended]

### Procedures
[Any medical procedures that might be suggested]

## Recovery Timeline
[Expected healing time and milestones]

---

# 👨‍⚕️ WHICH DOCTOR TO SEE

## Start Here
### Primary Care Doctor / Family Doctor
[When to see them and what they can help with]

## Specialists You Might Need
### [Specialist Name]
- **What They Treat**: [Explanation]
- **When to See Them**: [Specific reasons]
- **What to Expect**: [Brief overview]

## Emergency Situations
### When to Call 911
- [Emergency sign 1]
- [Emergency sign 2]
- [Emergency sign 3]

### When to Visit Urgent Care
[Situations for urgent care vs ER]

---

Remember to use simple, beginner-friendly language throughout. Avoid medical jargon unless you explain it immediately. Be empathetic and supportive in tone.`;

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
