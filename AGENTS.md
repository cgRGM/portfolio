# Agent Guidelines for Portfolio Project

## Build Commands
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm lint` - Run ESLint (no test scripts configured)
- `pnpm start` - Start production server
- `npx convex dev` - Start Convex development server

## Routes & Data Flow
- `/` - Portfolio homepage (uses bio, posts, projects from Convex)
- `/posts` - Blog posts listing (queries published posts)
- `/posts/[slug]` - Individual blog post (uses slug for public URLs)
- `/projects` - Projects listing (shows all projects)
- `/projects/[id]` - Individual project (uses ID for routing)
- `/dashboard` - Admin dashboard (full CRUD for bio, posts, projects)

## Convex Integration
- **Schema**: `bios`, `posts`, `projects` tables with system `_id` fields
- **Functions**: Separate files for bio, posts, projects with full CRUD operations
- **Data Shapes**: Posts(slug, title, content, date, published), Projects(title, description, image, tags, github, live, featured)
- **Routing**: Public routes use slugs/IDs, admin operations use Convex IDs

## Code Style Guidelines

### Imports & Structure
- Use `@/` alias for internal imports (tsconfig.json configured)
- Import order: React → third-party → internal components → utils
- Use shadcn/ui components from `@/components/ui`
- Follow Next.js App Router conventions

### TypeScript & Types
- Strict TypeScript enabled with proper type safety
- Use `React.ComponentProps` for component prop extension
- Prefer `type` over `interface` unless extending
- Use `VariantProps` from class-variance-authority for variants

### Component Patterns
- shadcn/ui patterns with `cn()` utility for class merging
- `cva()` for component variants with consistent styling
- `asChild` prop pattern for composition
- File structure: components/ui/, components/, app/, lib/, hooks/

### Styling & Error Handling
- Tailwind CSS with dark mode support via `cn()` utility
- shadcn/ui "new-york" style variants
- Semantic HTML elements throughout
- TypeScript strict mode for error prevention
- Toast notifications for user feedback