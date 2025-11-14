# Agent Guidelines for CG Stewart Portfolio

## Build Commands
- `pnpm dev` - Start development server
- `pnpm build` - Build for production (✓ working)
- `pnpm start` - Start production server
- `npx convex dev` - Start Convex development server
- No lint/test scripts configured - add ESLint/Vitest if needed

## Routes & Data Flow
- `/` - Portfolio homepage (bio, posts, projects from Convex)
- `/posts` - Blog posts listing (published posts only)
- `/posts/[slug]` - Individual blog post (slug-based routing, Markdown content)
- `/projects` - Projects listing (all projects)
- `/projects/[id]` - Individual project (ID-based routing, Markdown about content)
- `/dashboard` - Admin dashboard (full CRUD operations)

## Code Style Guidelines
- **Imports**: `@/` alias, order: React → third-party → internal → utils
- **Types**: Strict TS, prefer `type` over `interface`, use `React.ComponentProps`
- **Components**: shadcn/ui patterns, `cn()` utility, `cva()` variants, `asChild` composition
- **Styling**: Tailwind + dark mode, semantic HTML, "new-york" variants
- **Error Handling**: TypeScript strict mode, toast notifications
- **File Structure**: components/ui/, components/, app/, lib/, hooks/