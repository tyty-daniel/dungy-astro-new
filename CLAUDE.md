# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

All commands run from the project root:

- `npm run dev` - Start local dev server at localhost:4321
- `npm run build` - Build production site to ./dist/
- `npm run preview` - Preview production build locally
- `npm run astro ...` - Run Astro CLI commands

## Project Architecture

This is an Astro-based personal blog featuring "husbandos" (fictional character profiles) and regular blog posts.

### Tech Stack
- **Framework**: Astro v5 with TypeScript
- **Styling**: Tailwind CSS
- **Content**: Markdown/MDX with content collections
- **UI Components**: Preact for interactive elements
- **Deployment**: Netlify adapter configured

### Content Structure

The site uses Astro's content collections system with two main collections:

1. **Blog Collection** (`src/content/blog/`):
   - Schema: `title`, `description`, `pubDate`, `updatedDate`, `heroImage`, `starterParagraph`
   - Layout: `src/layouts/BlogPost.astro`

2. **Husbandos Collection** (`src/content/husbandos/`):
   - Schema: `name`, `series`, `heroImage`, `heroImages[]`, `heroImageAlt`, `megaLink`, `birthday`
   - Layout: `src/layouts/HusbandoPage.astro`
   - Supports multiple hero images with ImageSwitcher component

### Key Components

- **ImageSwitcher** (`src/components/ImageSwitcher.jsx`): Preact component for cycling through multiple images
- **UpcomingBirthdays** (`src/components/UpcomingBirthdays.astro`): Display character birthdays
- **BaseHead**, **Header**, **Footer**: Standard layout components

### Routing

- `/` - Homepage
- `/blog/` - Blog index with post listings
- `/blog/[slug]` - Individual blog posts
- `/husbandos/` - Husbandos index with character grid
- `/husbandos/[slug]` - Individual character pages
- `/about` - About page
- `/startpage` - Custom start page

### Content Guidelines

- Blog posts and husbando profiles support MDX with embedded YouTube videos
- Images stored in `/public/images/` with organized subdirectories
- Husbando profiles can have single or multiple hero images
- Content includes personal commentary and merchandise collections

### Development Notes

- Uses strict TypeScript configuration
- Preact components for interactivity
- Custom CSS with CSS variables for theming
- Responsive design with mobile-first approach
- Favicon generation via astro-favicons plugin