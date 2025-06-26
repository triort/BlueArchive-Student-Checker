# Gemini Project Overview: BlueArchive-Student-Checker

This document provides a high-level overview of the Blue Archive Student Checker project for the Gemini agent.

## 1. Project Description

This is a web application designed to help users track which students they own from the game "Blue Archive". It displays a list of students, allows filtering by various criteria, and lets users mark the students they have. It also includes a feature to export the current view as an image.

The project is built as a single-page application using React and TypeScript.

## 2. Core Technologies

-   **Framework**: React (`^19.0.0`)
-   **Language**: TypeScript (`~5.7.2`)
-   **Build Tool**: Vite (`^6.2.0`)
-   **Styling**: Tailwind CSS (`^4.0.9`)
-   **Linting**: ESLint (`^9.21.0`)

## 3. Project Structure

-   `src/`: Contains all the main source code.
    -   `components/`: Reusable React components.
    -   `hooks/`: Custom React hooks for managing state and logic.
    -   `assets/`: Static assets like JSON data and images.
    -   `types.ts`: Global TypeScript type definitions.
    -   `main.tsx`: The main entry point of the application.
-   `public/`: Static assets that are served directly.
    -   `img/student/`: Student character images.
-   `package.json`: Defines project dependencies and scripts.
-   `vite.config.ts`: Vite configuration file.
-   `tsconfig.json`: TypeScript configuration.

## 4. Available Scripts

The following scripts are defined in `package.json`:

-   `npm run dev`: Starts the development server with hot-reloading.
-   `npm run build`: Compiles TypeScript and builds the project for production.
-   `npm run lint`: Lints the codebase using ESLint to check for code quality and style issues.
-   `npm run preview`: Serves the production build locally for previewing.

## 5. TODOs and Known Issues

For a detailed list of pending tasks, bugs, and potential improvements, please refer to the **[TODO.md](TODO.md)
