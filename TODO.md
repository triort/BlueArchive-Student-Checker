# Gemini TODO

This file tracks the remaining issues and potential improvements for the Blue Archive Student Checker application.

## Critical Issues (Build Breaking)

-   [ ] **Fix TypeScript Build Errors**:
    -   [ ] Fix Promise.all type safety in `useImageExporter.ts:40` - loadedImages parameter needs proper typing
    -   [ ] Fix lexical declaration error in `useCharacterFilters.ts:31` - wrap case statements in blocks
    -   [ ] Standardize `rarity` type in `types.ts:8` - currently `string | number` causes confusion

## High Priority

-   [x] **Fix Type Inconsistencies**:
    -   [x] Remove the local `Character` interface in `CharacterCard.tsx` and use the global `Student` type from `src/types.ts`.
    -   [x] Ensure the `rarity` property has a consistent type across all components and hooks. It's currently a `string` of '☆'s in the state but `CharacterCard.tsx` has logic that expects a `number`.

-   [x] **Resolve Data Issues**:
    -   [x] Correct the typo `attackType: "penetration"` to `"piercing"` in `src/assets/students.json` for the student "Akane".
    -   [x] Implement the `filterElement` logic in the `useCharacterFilters` hook. It's currently unused.

-   [ ] **Add Error Handling**:
    -   [ ] Add image loading error handling in `CharacterCard.tsx` - no fallback for broken images
    -   [ ] Add canvas context error handling in `useImageExporter.ts` - silent failures in export
    -   [ ] Add data validation in `useStudents.ts` - no handling for malformed data

-   [ ] **Fix React Hook Issues**:
    -   [ ] Add missing `filterElement` to useMemo dependencies in `useCharacterFilters.ts:45`
    -   [ ] Remove unused `rarityMapping` variable in `FilterPanel.tsx:27`

## Medium Priority

-   [ ] **Refactor Hardcoded Values**:
    -   [ ] In `useImageExporter.ts`, replace magic numbers for canvas layout (e.g., `20`, `40`, `60`, `100`) with named constants for better readability.
    -   [ ] In `CharacterCard.tsx`, abstract the rarity color logic (e.g., `text-yellow-600`) into a utility function or a more scalable mapping object to avoid hardcoding Tailwind classes directly in the component logic.
-   [x] **Fix `FilterPanel.tsx` Rarity Bulk Actions**:
    -   [x] The `toggleAllByRarity` function in `FilterPanel.tsx` is called with string values ('☆☆☆', '☆☆', '☆'), but the `useStudents` hook expects a number. This needs to be corrected.

## Low Priority

-   [ ] **Add Unit & Integration Tests**:
    -   [ ] Set up a testing framework like `Vitest`.
    -   [ ] Write unit tests for the `useStudents` hook logic (e.g., toggling ownership).
    -   [ ] Write unit tests for the `useCharacterFilters` hook to verify filtering and sorting logic.
    -   [ ] Write basic rendering tests for components like `CharacterCard` and `FilterPanel`.

-   [ ] **Improve Data Loading Strategy**:
    -   [ ] For better scalability, consider changing the data loading strategy for `students.json`. Instead of bundling it directly, load it asynchronously using `fetch` within a `useEffect` hook in `useStudents.ts`. This will reduce the initial bundle size.

## New Issues Found (Code Analysis)

### Performance & Optimization
-   [ ] **Performance Issues**:
    -   [ ] Optimize data transformation in `useStudents.ts:5-9` - happens on every render
    -   [ ] Add image preloading/caching for `useImageExporter.ts:28-37`
    -   [ ] Implement responsive grid in `CharacterList.tsx:11` instead of fixed `grid-cols-5`

### Accessibility & UX
-   [ ] **Accessibility Improvements**:
    -   [ ] Add ARIA labels throughout `FilterPanel.tsx` form elements
    -   [ ] Fix keyboard navigation in `CharacterCard.tsx:16` - use button or add tabIndex
    -   [ ] Add non-color indicators for rarity (colorblind accessibility)
    -   [ ] Add search result highlighting in character names

### Security & Error Handling
-   [ ] **Security Concerns**:
    -   [ ] Validate image paths in `CharacterCard.tsx:24` to prevent XSS
    -   [ ] Add Content Security Policy to `index.html`

### Missing Features
-   [ ] **User Experience Enhancements**:
    -   [ ] Add data persistence (localStorage) for user selections
    -   [ ] Implement element sorting in `useCharacterFilters.ts:37-38`
    -   [ ] Add proper fallback images for broken character images

### Development & Maintenance
-   [ ] **Code Quality**:
    -   [ ] Create shared utility for rarity logic (duplicated across components)
    -   [ ] Create shared image path utility (duplicated in CharacterCard and useImageExporter)
    -   [ ] Add Tailwind configuration file
    -   [ ] Update `index.html:7` title from generic Vite to app-specific
    -   [ ] Add `"type-check": "tsc --noEmit"` script to package.json
    -   [ ] Add Prettier configuration for consistent formatting