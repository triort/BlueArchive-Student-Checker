# Claude Context for BlueArchive-Student-Checker

## Project Overview
This is a React-based web application for checking and managing Blue Archive student characters. The app allows users to view student cards, filter by various criteria, and save collections as images.

## Key Technologies
- React with TypeScript
- Vite for build tooling
- CSS modules for styling
- HTML2Canvas for image generation

## Project Structure
- `src/App.tsx` - Main application component
- `src/components/` - React components including CharacterCard, FilterPanel, SaveImageButton, StatusBar
- `src/assets/students.json` - Student data
- `src/assets/img/student/` - Student images (webp format)
- `src/hooks/` - Custom React hooks

## Build Commands
- Development: `npm run dev`
- Build: `npm run build`
- Preview: `npm run preview`

## Todo Management
- Check `TODO.md` for current tasks and project todos

## Notes
- Student images are stored as webp files
- The app uses a JSON file for student data management
- Components are modular and use TypeScript for type safety