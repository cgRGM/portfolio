# CG Stewart | Full Stack Developer

A modern, responsive portfolio website built with Next.js 16, Convex, and shadcn/ui. Features a clean dark theme, blog functionality, project showcase, and admin dashboard for content management.

## Features

- **Portfolio Homepage**: Dynamic bio, featured projects, and recent blog posts
- **Blog System**: Markdown content with SEO-optimized individual post pages
- **Project Showcase**: Detailed project pages with GitHub links and live demos
- **Admin Dashboard**: Full CRUD operations for bio, posts, and projects
- **Responsive Design**: Mobile-first approach with dark theme
- **SEO Optimized**: Dynamic metadata generation for social sharing

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Convex (serverless database)
- **Deployment**: Vercel
- **Analytics**: Vercel Analytics & Speed Insights

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up Convex**
   ```bash
   npx convex dev
   ```
   Follow the prompts to create/configure your Convex project.

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## Project Structure

```
├── app/                 # Next.js app router pages
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   └── ...             # Feature components
├── convex/             # Convex backend functions & schema
├── lib/                # Utility functions
└── public/             # Static assets
```

## Deployment

Deploy to Vercel with Convex integration:

1. Push to GitHub
2. Connect repository to Vercel
3. Add Convex environment variables
4. Deploy

## SEO Features

- Dynamic Open Graph and Twitter card metadata
- Structured data for search engines
- Social sharing optimized titles: "CG Stewart | {Post/Project Name}"
- Responsive meta tags for all devices

## Setup Notes

- Create an `og-image.png` (1200x630) in the `public/` folder for social sharing
- Update the `metadataBase` URL in `app/layout.tsx` with your actual domain
- Update Twitter handle in metadata if you have one

## License

Personal project - all rights reserved.