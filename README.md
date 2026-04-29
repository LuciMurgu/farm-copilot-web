# Farm Copilot (Web)

Farm Copilot is a procurement and margin intelligence assistant for Romanian crop farms. This repository contains the Next.js frontend, featuring the "Quiet Authority" design system and strict alignment with the FastAPI backend.

## Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Shadcn UI
- **State/Data**: React Query + Axios
- **Validation**: Zod (strictly matching backend Pydantic models)

## Setup

### 1. Prerequisites
- Node.js 20+
- `pnpm` package manager

### 2. Install dependencies
```bash
pnpm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory. The only required variable is the API URL:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```
*(Note: Do not append `/api/v1` to the URL. The Axios client handles the base paths.)*

### 4. Run the development server
```bash
pnpm dev
```
The application will be available at [http://localhost:3000](http://localhost:3000).

## Building for Production

To create an optimized production build:
```bash
pnpm build
```

## Deployment

This application is configured for seamless deployment on **Vercel**.

1. Push your code to GitHub.
2. Import the project in your Vercel Dashboard.
3. Vercel will automatically detect Next.js and apply the configurations in `vercel.json`.
4. Inside Vercel's environment variables settings, add `NEXT_PUBLIC_API_URL` pointing to your live production backend IP or Cloudflare domain.
