# Noa's Place

A modern Next.js application built with TypeScript and Tailwind CSS.

## Project Structure

```
src/
├── app/              # App router directory
│   ├── api/         # API routes
│   ├── layout.tsx   # Root layout
│   └── page.tsx     # Home page
├── components/       # Reusable components
├── context/         # React context providers
├── hooks/           # Custom React hooks
├── lib/             # Third-party library configurations
├── styles/          # Global styles and Tailwind CSS configurations
├── types/           # TypeScript type definitions
└── utils/           # Utility functions and helpers

```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework for production
- [TypeScript](https://www.typescriptlang.org/) - Static type checking
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [ESLint](https://eslint.org/) - Code linting

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint