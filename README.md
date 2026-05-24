```markdown
# Vision Sync 🎵

**Real-time AI music generation from your camera feed** — transforms what you see and how you feel into ambient soundscapes.

## 🎬 Demo Concept

Vision Sync watches your facial expressions and surroundings, then generates a continuous, evolving ambient soundtrack that matches your mood and environment. Smile at your laptop? You get upbeat electronic vibes. Frown while holding coffee? Melancholy jazz emerges.

## ✨ Features

- **Real-time Object Detection** - Identifies people, pets, devices, furniture, and everyday objects
- **Facial Expression Tracking** - Detects 468 facial landmarks to recognize emotions (happy, sad, angry, fear, disgust, surprised)
- **Dual Music Engines**:
  - Google Lyria API - Cloud-based AI music generation
  - Procedural Synth - Local fallback with real-time synthesis
- **Cyberpunk HUD Interface** - Scanlines, vignette effects, and minimalist UI
- **Live Visual Feedback** - Bounding boxes, facial point clouds, emotion sliders
- **Smooth Transitions** - Crossfading between musical vibes without jarring cuts

## 🛠️ Tech Stack

- React + TypeScript
- TensorFlow.js + COCO-SSD (object detection)
- MediaPipe Face Landmarker (facial tracking)
- Google Generative AI (Lyria API)
- Web Audio API + Tone.js
- Framer Motion (animations)
- Tailwind CSS

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- **Google Gemini AI API key** with Lyria RealTime access (experimental allowlist required)
- Webcam/microphone permissions

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/vision-sync.git
cd vision-sync
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here

```

> **Note**: Lyria RealTime is experimental and requires allowlisting. Without API access, the app will fall back to local procedural music generation.

### 3. Run Locally

```bash
npm i
npm run dev
```

The app will open at `http://localhost:5173`

### 4. Using the App

1. Click **START SYSTEM** - camera access will be requested
2. Allow camera permissions
3. Models load automatically (30-60 seconds first time)
4. Music begins playing based on what the camera sees
5. Watch the HUD update with:
   - Detected objects
   - Your current emotion
   - Real-time facial blendshapes
   - Active audio profile

## 📁 Project Structure

```
vision-sync/
├── src/
│   ├── App.tsx              # Main application (all logic + UI)
│   └── main.tsx             # Entry point
├── public/                  # Static assets
├── index.html
├── package.json
├── vite.config.ts
└── .env                     # API keys (gitignored)
```

## ⚙️ How It Works

```
Camera → [Object Detection + Face Tracking] 
       → Emotion Analysis + Entity Detection
       → Music Prompt Generation
       → Lyria API / Procedural Synth
       → Audio Output
```

## 🧪 Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari (may have limited performance)

## 📝 Notes

- All video processing happens locally - no frames are uploaded
- Face data is never saved or transmitted
- Lyria API calls send only text prompts (no images/video)
- Procedural synth works completely offline after initial model download
