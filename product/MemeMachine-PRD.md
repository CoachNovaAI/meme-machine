# MemeMachine PRD

*AI-Powered Meme Generator*

## Overview

MemeMachine lets users upload photos and instantly generate viral-ready memes using AI-powered caption generation and trending templates.

## Jobs to be Done

1. **Create memes quickly** — When I have a funny photo, I want to turn it into a shareable meme in seconds, not minutes.

2. **Get caption inspiration** — When I'm stuck on what to write, I want AI to suggest witty captions so I don't stare at a blank screen.

3. **Use trending formats** — When I want engagement, I want access to popular meme templates so my content feels current.

4. **Share instantly** — When my meme is ready, I want to post it directly to social media without extra steps.

## Epics

### Epic 1: Image Upload & Management
- Drag-and-drop image upload
- Image preview and cropping
- Support for JPG, PNG, GIF formats

### Epic 2: AI Caption Generation
- Claude API integration for caption generation
- Multiple caption suggestions per image
- Tone selector (funny, sarcastic, wholesome)

### Epic 3: Meme Editor
- Text overlay with positioning
- Font style and size options
- Meme template library

### Epic 4: Export & Share
- Download as PNG/JPG
- Copy to clipboard
- Direct share to Twitter/X, Instagram, Discord

## Tech Stack

- **Frontend:** Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **AI:** Claude API (Anthropic)
- **Hosting:** Vercel
- **Storage:** Vercel Blob

## Success Metrics

- Time to create first meme < 30 seconds
- AI caption acceptance rate > 60%
- Share rate > 40% of created memes
