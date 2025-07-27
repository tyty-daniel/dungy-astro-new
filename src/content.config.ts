import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		starterParagraph: z.string().optional(),
	}),
});

const husbandos = defineCollection({
	loader: glob({ base: './src/content/husbandos', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		name: z.string(),
		series: z.string(),
		heroImage: z.string().optional(),
		heroImages: z.array(z.string()).optional(),
		heroImageAlt: z.string().optional().default(''),
		megaLink: z.string().optional(),
		birthday: z.string().optional(),}),
});

export const collections = { blog, husbandos };
