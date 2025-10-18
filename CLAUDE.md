# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

PainPoint AI is a healthcare hackathon web application for mapping and tracking body pain points. It provides an interactive anatomy-based interface where users can click on body parts to record pain details, track changes over time, and export reports.

## Development Commands

```bash
# Start development server (runs on http://localhost:5173 or next available port)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Tech Stack Configuration

- **React 19** with Vite 7
- **TailwindCSS v4** - IMPORTANT: Uses new `@import "tailwindcss"` syntax in CSS files, NOT the old `@tailwind` directives
- **PostCSS** with `@tailwindcss/postcss` plugin (required for Tailwind v4)
- **localStorage** for client-side data persistence (no backend)

## Architecture

### Single-Page Application Structure

The app uses a single-page design (no routing) with modal-based interactions:

1. **App.jsx** - Main application state and orchestration
   - Manages all pain points state
   - Handles localStorage persistence
   - Controls modal open/close
   - Implements add/edit/delete/export/clear operations

2. **SVG Body Components** - Interactive anatomy diagrams
   - `MaleBodyFront.jsx` - 24 clickable front view body parts
   - `MaleBodyBack.jsx` - 22 clickable back view body parts
   - Both use inline SVG with click handlers
   - Visual feedback: dashed borders, orange fill (#FB923C) when selected
   - Display intensity numbers inside selected regions

3. **PainDetailsModal.jsx** - Pain assessment form
   - Opens on body part click
   - Handles both adding new and editing existing pain points
   - Required fields: Pain Type, Intensity, Sensation, Duration
   - Optional fields: Suspected Cause, Other Symptoms

### Data Flow

```
User clicks body part → App.jsx opens modal with body part data
                     → PainDetailsModal collects pain details
                     → onSave callback updates painPoints state
                     → App.jsx saves to localStorage
                     → SVG components re-render with updated pain markers
```

### Pain Point Data Structure

```javascript
{
  bodyPartId: 'front-head',        // Unique identifier
  bodyPartName: 'Head',            // Display name
  view: 'front',                   // 'front' or 'back'
  suspectedCause: '',              // Optional string
  painType: 'Acute',               // One of 8 types
  intensity: 5,                    // 1-10 number
  sensation: 'Sharp',              // One of 8 sensations
  duration: 'Few days (1-3 days)', // One of 7 durations
  otherSymptoms: ''                // Optional textarea
}
```

### State Management

All state is managed in App.jsx using React hooks:
- `painPoints` - Array of pain point objects
- `modalOpen` - Boolean for modal visibility
- `selectedBodyPart/Name/View` - Currently selected body part for modal
- `editingPoint` - Existing pain point being edited (null for new)

localStorage is used for persistence:
- Key: `'painPoints'`
- Automatic save on painPoints state change
- Automatic load on app mount

## Important Implementation Details

### TailwindCSS v4 Configuration

The project uses TailwindCSS v4 which has a different configuration than v3:

**CSS Files** must use:
```css
@import "tailwindcss";
```

**PostCSS config** must use:
```javascript
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

Do NOT use the old `@tailwind base;` directives - they will cause PostCSS errors.

### SVG Component Pattern

Body part SVGs follow a consistent pattern:

```jsx
<g onClick={() => onBodyPartClick('body-part-id', 'Body Part Name', 'front')}
   className="cursor-pointer">
  <rect/ellipse/circle
    stroke="#D1D5DB"
    strokeWidth="2"
    strokeDasharray="4 4"
    fill={isPainPoint('body-part-id') ? '#FB923C' : 'transparent'}
    className="transition-all duration-200 hover:fill-orange-100"
  />
  {isPainPoint('body-part-id') && (
    <text>{getPainIntensity('body-part-id')}</text>
  )}
</g>
```

### Modal Edit/Add Flow

The modal supports both adding new and editing existing pain points:
- Click on empty body part → `editingPoint = null` → Add mode
- Click on filled body part → `editingPoint = existing data` → Edit mode
- Edit mode shows Delete button and pre-fills form
- Add mode hides Delete button and shows empty form

### Export Functionality

Export creates a JSON file with structure:
```javascript
{
  exportDate: ISO timestamp,
  gender: 'Male' or 'Female',
  totalPainPoints: number,
  painPoints: [...] // Array of pain data without internal IDs
}
```

## Component Props Interface

**MaleBodyFront/MaleBodyBack:**
- `painPoints` - Array of pain point objects
- `onBodyPartClick(bodyPartId, bodyPartName, view)` - Click handler

**PainDetailsModal:**
- `isOpen` - Boolean to show/hide modal
- `onClose()` - Close handler
- `onSave(painData)` - Save handler with complete pain data
- `onDelete(bodyPartId)` - Delete handler
- `bodyPart` - Body part ID string
- `bodyPartName` - Display name string
- `view` - 'front' or 'back'
- `existingData` - Pain point object for editing (null for new)

## File Structure

```
src/
├── App.jsx                          # Main app with state management
├── main.jsx                         # React entry point
├── index.css                        # Global styles with Tailwind import
├── App.css                          # App-specific styles
└── components/
    ├── MaleBodyFront.jsx           # Front view SVG (24 body parts)
    ├── MaleBodyBack.jsx            # Back view SVG (22 body parts)
    └── PainDetailsModal.jsx        # Pain assessment form modal
```

## Gender Support

Currently both Male and Female options use the same MaleBodyFront/MaleBodyBack components. This is intentional for the MVP demo. Future implementations can create FemaleBodyFront/FemaleBodyBack components following the same pattern.

1. First think through the problem, read the codebase for relevant files, and write a plan to tasks/todo.md.
2. The plan should have a list of todo items that you can check off as you complete them
3. Before you begin working, check in with me and I will verify the plan.
4. Then, begin working on the todo items, marking them as complete as you go.
5. Please every step of the way just give me a high level explanation of what changes you made
6. Make every task and code change you do as simple as possible. We want to avoid making any massive or complex changes. Every change should impact as little code as possible. Everything is about simplicity.
7. Finally, add a review section to the todo.md file with a summary of the changes you made and any other relevant information.
8. DO NOT BE LAZY. NEVER BE LAZY. IF THERE IS A BUG FIND THE ROOT CAUSE AND FIX IT. NO TEMPORARY FIXES. YOU ARE A SENIOR DEVELOPER. NEVER BE LAZY
9. MAKE ALL FIXES AND CODE CHANGES AS SIMPLE AS HUMANLY POSSIBLE. THEY SHOULD ONLY IMPACT NECESSARY CODE RELEVANT TO THE TASK AND NOTHING ELSE. IT SHOULD IMPACT AS LITTLE CODE AS POSSIBLE. YOUR GOAL IS TO NOT INTRODUCE ANY BUGS. IT'S ALL ABOUT SIMPLICITY
