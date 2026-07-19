# 🚗 Modern VIN Decoder SPA

A high-performance, responsive Single Page Application (SPA) designed for instant Vehicle Identification Number (VIN) decoding and specification lookup using the official NHTSA vPIC API. Built with a modern, production-ready tech stack prioritizing smart caching, predictable state flow, and proactive UX validation.

🔗 **Live Demo:** [https://vindecoder-max.netlify.app/](https://vindecoder-max.netlify.app/)

---

## ✨ Key Features & Functionality

*   **Proactive UX Validation (ISO 3779 Standard):** Input field physically blocks illegal characters (`I`, `O`, `Q`, Cyrillic, and special characters) at the input level via strict regex sanitization. Includes state-driven validation feedback for field completeness.
*   **Intelligent Network-Aware Caching:** Fully migrated to a hybrid query mechanism using TanStack Query (`useQuery` + `queryClient.ensureQueryData`). The app respects `staleTime` (5 mins) and `gcTime` (30 mins), serving data instantly from memory for previously decoded VINs without redundant network overhead.
*   **Search History Tracking:** Persists the **3 most recent successful lookups** via `localStorage` sync. Users can instantly re-apply any historical VIN with a zero-millisecond render penalty.
*   **Robust Error & API Feedback:** Seamless integration of localized validation errors and structural API response messaging (`Message` field fallback) displayed elegantly within the interface.
*   **Polished UI Components:** Clean, accessible Shadcn-style architecture utilizing atomic UI primitives, smooth local copy-to-clipboard interactions, and intuitive "doc-style" header navigation for deep traversal.

---

## 🛠️ Tech Stack

*   **Core:** React 19+, TypeScript, Vite
*   **State Management & Data Fetching:** TanStack Query v5 (React Query)
*   **Utilities & Persistence:** `usehooks-ts` (`useLocalStorage`)
*   **Styling:** CSS Modules (Scannable & Lightweight layouts)
*   **Notifications:** Sonner (Toast notifications)

---

## 🚀 Getting Started (Local Development)

Follow these steps to clone the repository and run the application locally.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (v24 or higher recommended). This project can be run using standard package managers or high-performance runtimes like **Bun**.

### Installation

1. **Clone the repository:**
 ```bash
 git clone [https://github.com/Yanbellq/vindecoder.git](https://github.com/Yanbellq/vindecoder.git)
 cd vindecoder

```

2. **Install dependencies:**
 ```bash
npm install
# or using Bun
bun install

```

3. **Run the development server:**
 ```bash
npm run dev
# or using Bun
bun run dev

```

4. **Open the app:**
**Navigate to [http://localhost:3000](http://localhost:3000) in your browser.**

---

## 🏗️ Architecture & Code Quality

The codebase strictly adheres to standard production-ready patterns:

- **Separation of Concerns:** Component UI, validation logic (hooks/), and API configuration (services/, lib/query.client.ts) are completely decoupled.
- **Type Safety:** 100% strict TypeScript types for data models, API responses, and custom query options wrappers
- **Scannability:** Clean, modular CSS structure preventing global namespace pollution.


---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
