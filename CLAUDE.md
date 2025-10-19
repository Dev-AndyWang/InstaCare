# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

InstaCare (formerly PainPoint AI) is a medical AI diagnostic web application with two main sections:
1. **Landing Page**: A marketing site showcasing the platform's features, technology, and team
2. **Diagnosis App**: An interactive anatomy-based interface where users map pain points and receive AI-powered diagnostic analysis from Anthropic's Claude API

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
- **Framer Motion** for page transitions and animations
- **Three.js** for 3D graphics (GeometricHeart component)
- **Lucide React** for icons
- **Anthropic SDK** (@anthropic-ai/sdk) for AI diagnosis generation
- **localStorage** for client-side data persistence (no backend)

## Architecture

### Application Structure

The app uses view-based navigation without React Router, managed through state:

1. **App.jsx** - Root component with view switching
   - Manages `currentView` state: 'landing' or 'diagnosis'
   - Uses Framer Motion's `<AnimatePresence>` for smooth page transitions
   - Passes navigation callbacks to child components

2. **LandingPage** (src/pages/LandingPage.jsx)
   - Marketing page with multiple sections
   - Sections: Hero, InfoCard, Expertise, Technology, Services, Team
   - Features scroll-based section highlighting with IntersectionObserver
   - Includes Header, SideNav, and ScrollIndicator components
   - Contains animated 3D visuals: GeometricHeart (Three.js), DNAStrand, DNAVisual, PurpleBlobVisual
   - Gradient background: `from-[#E5D9F2] via-[#F5E6FF] via-[#FFE5F1] via-[#E5E5FF] to-[#F0E6FF]`

3. **DiagnosisApp** (src/pages/DiagnosisApp.jsx)
   - Main diagnostic interface with pain mapping
   - Personal info inputs: gender and age
   - Interactive SVG body diagrams (front/back views)
   - Pain points summary cards
   - AI diagnosis button (calls Anthropic API via `generateDiagnosis` from `src/utils/aiService.js`)
   - Export report functionality
   - Two modals: PainDetailsModal and DiagnosisModal

4. **SVG Body Components** - Interactive anatomy diagrams
   - `MaleBodyFront.jsx` - 24 clickable front view body parts
   - `MaleBodyBack.jsx` - 22 clickable back view body parts
   - Both use inline SVG with click handlers
   - Visual feedback: dashed borders, orange fill (#FB923C) when selected
   - Display intensity numbers inside selected regions

5. **Modals**
   - `PainDetailsModal.jsx` - Pain assessment form (add/edit pain points)
   - `DiagnosisModal.jsx` - Displays AI-generated diagnosis results

### Data Flow

**Pain Point Management:**
```
User clicks body part → DiagnosisApp opens PainDetailsModal
                     → Modal collects pain details
                     → onSave callback updates painPoints state
                     → DiagnosisApp saves to localStorage
                     → SVG components re-render with updated pain markers
```

**AI Diagnosis Flow:**
```
User clicks "Get AI Diagnosis" → DiagnosisApp calls generateDiagnosis()
                               → aiService.js sends pain data to Anthropic API
                               → API returns structured diagnosis
                               → DiagnosisModal displays results
```

**Navigation Flow:**
```
App.jsx (currentView state) → LandingPage or DiagnosisApp
                            → Components receive navigation callbacks
                            → Framer Motion handles transitions
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

**App.jsx:**
- `currentView` - 'landing' or 'diagnosis' for view switching

**DiagnosisApp.jsx:**
- `painPoints` - Array of pain point objects
- `gender` - 'Male' or 'Female'
- `age` - User's age (number input)
- `modalOpen` - Boolean for PainDetailsModal visibility
- `selectedBodyPart/Name/View` - Currently selected body part
- `editingPoint` - Existing pain point being edited (null for new)
- `diagnosisData` - AI diagnosis results
- `diagnosisLoading` - Loading state for AI request
- `diagnosisError` - Error message from AI request
- `showDiagnosis` - Boolean for DiagnosisModal visibility

**LandingPage.jsx:**
- `activeSection` - Current visible section ID for navigation highlighting
- Uses IntersectionObserver to track which section is in viewport

**localStorage persistence:**
- Key: `'painPoints'`
- Automatic save on painPoints state change
- Automatic load on DiagnosisApp mount

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

### AI Diagnosis Integration

**API Service** (`src/utils/aiService.js`):
- Uses Anthropic's Claude API via `@anthropic-ai/sdk`
- Requires `ANTHROPIC_API_KEY` environment variable (should be in `.env` file)
- Function: `generateDiagnosis({ age, gender, painPoints })`
- Returns structured diagnosis with possible conditions, recommendations, etc.
- Error handling for API failures

**Important**: The Anthropic API key must be kept secure:
- Never commit `.env` files (already in `.gitignore`)
- Use environment variables for production deployments
- The app currently expects the key to be available client-side

### Export Functionality

Export creates a JSON file with structure:
```javascript
{
  exportDate: ISO timestamp,
  gender: 'Male' or 'Female',
  age: number or 'Not specified',
  totalPainPoints: number,
  painPoints: [...] // Array of pain data without internal IDs
}
```

### Three.js Components

**GeometricHeart** (`src/components/landing/GeometricHeart.jsx`):
- Renders animated 3D heart using Three.js
- Features: heartbeat pulse animation, gentle rotation, emissive glow
- Positioned absolutely on the right side of hero section
- Uses `useEffect` for cleanup to prevent memory leaks
- Canvas size: 500x500px with transparent background

**Best Practices for Three.js Components:**
- Always cleanup in `useEffect` return: dispose geometries, materials, renderer
- Use `cancelAnimationFrame` to stop animation loops
- Check if ref is mounted before appending canvas
- Remove canvas from DOM in cleanup

## Component Props Interface

**App.jsx:**
- No props (root component)
- Renders either LandingPage or DiagnosisApp based on state

**LandingPage:**
- `onGetStarted` - Callback function to navigate to diagnosis app

**DiagnosisApp:**
- `onBackToLanding` - Callback function to navigate back to landing page

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

**DiagnosisModal:**
- `isOpen` - Boolean to show/hide modal
- `onClose()` - Close handler
- `diagnosisData` - AI diagnosis results object
- `loading` - Boolean loading state
- `error` - Error message string or null

## File Structure

```
src/
├── App.jsx                          # Root component with view switching
├── main.jsx                         # React entry point
├── index.css                        # Global styles with Tailwind import
├── App.css                          # App-specific styles
├── pages/
│   ├── LandingPage.jsx             # Marketing landing page
│   └── DiagnosisApp.jsx            # Pain diagnosis application
├── components/
│   ├── MaleBodyFront.jsx           # Front view SVG (24 body parts)
│   ├── MaleBodyBack.jsx            # Back view SVG (22 body parts)
│   ├── PainDetailsModal.jsx        # Pain assessment form modal
│   ├── DiagnosisModal.jsx          # AI diagnosis results modal
│   └── landing/                    # Landing page components
│       ├── Header.jsx              # Fixed header with logo/nav
│       ├── SideNav.jsx             # Side navigation dots
│       ├── HeroSection.jsx         # Hero with CTA
│       ├── InfoCard.jsx            # Info section
│       ├── ExpertiseSection.jsx    # Expertise showcase
│       ├── TechnologySection.jsx   # Technology stack
│       ├── ServicesSection.jsx     # Services offered
│       ├── TeamSection.jsx         # Team/contacts
│       ├── ScrollIndicator.jsx     # Scroll prompt
│       ├── GeometricHeart.jsx      # 3D heart (Three.js)
│       ├── DNAStrand.jsx           # DNA animation
│       ├── DNAVisual.jsx           # DNA visual effect
│       └── PurpleBlobVisual.jsx    # Animated blob
└── utils/
    └── aiService.js                # Anthropic API integration
```

## Gender Support

Currently both Male and Female options use the same MaleBodyFront/MaleBodyBack components. This is intentional for the MVP demo. Future implementations can create FemaleBodyFront/FemaleBodyBack components following the same pattern.

## Custom Tailwind Configuration

The `tailwind.config.js` includes custom theme extensions:

**Custom Colors:**
- `electric-blue`: #0066FF
- `hot-pink`: #FF0080
- `vibrant-purple`: #8B5CF6
- `neon-cyan`: #00D9FF
- `bright-orange`: #FF6B35

**Custom Shadow Effects:**
- `glow-purple`, `glow-purple-lg`: Purple glow effects
- `glow-pink`, `glow-pink-lg`: Pink glow effects
- `glow-blue`: Blue glow effect

**Custom Fonts:**
- `font-display`: 'Space Grotesk' (used for headings)
- `font-sans`: 'Inter' (used for body text)

## Development Workflow Guidelines

1. **Planning**: Read relevant files and create a plan before implementing
2. **Simplicity First**: Make minimal changes that impact only necessary code
3. **No Lazy Fixes**: Find and fix root causes, not symptoms
4. **Testing**: Verify changes work before marking tasks complete
5. **Incremental Updates**: Work through tasks one at a time with progress tracking

## Common Issues & Solutions

**PostCSS Errors:**
- Ensure you use `@import "tailwindcss"` in CSS files, NOT `@tailwind` directives
- TailwindCSS v4 requires different syntax than v3

**Three.js Memory Leaks:**
- Always implement cleanup in `useEffect` return functions
- Dispose geometries, materials, and renderers
- Cancel animation frames before unmounting

**API Key Issues:**
- Anthropic API key must be in `.env` file as `ANTHROPIC_API_KEY`
- Never commit `.env` to git (already in `.gitignore`)
- Check that Vite can access env vars (use `import.meta.env.VITE_*` prefix if needed)

**Modal State Issues:**
- Reset `editingPoint` when closing modals to prevent stale data
- Clear error states when reopening modals
