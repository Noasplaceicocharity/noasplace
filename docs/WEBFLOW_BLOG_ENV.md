## Webflow Blog Environment Variables

Add these to your `.env.local` when you are ready to source new blog posts from Webflow.

| Variable | Required | Purpose |
| --- | --- | --- |
| `WEBFLOW_API_TOKEN` | Yes | Server-side Webflow API token with CMS read access. |
| `WEBFLOW_BLOG_COLLECTION_ID` | Yes | The Webflow CMS collection ID for blog posts. |
| `WEBFLOW_BLOG_TITLE_FIELD` | No | Override the field slug used for the blog title. Default matches: `title`, `name`, `post-title`. |
| `WEBFLOW_BLOG_SLUG_FIELD` | No | Override the field slug used for the blog slug. Default: `slug`. |
| `WEBFLOW_BLOG_CONTENT_FIELD` | No | Override the field slug used for the blog body HTML. Default matches: `content`, `body`, `post-body`, `rich-text`. |
| `WEBFLOW_BLOG_EXCERPT_FIELD` | No | Override the field slug used for the excerpt. Default matches: `excerpt`, `summary`, `short-description`. |
| `WEBFLOW_BLOG_META_DESCRIPTION_FIELD` | No | Override the field slug used for SEO description. Default matches: `meta-description`, `metadescription`, `seo-description`, `description`. |
| `WEBFLOW_BLOG_IMAGE_FIELD` | No | Override the field slug used for the post image. Default matches: `image`, `thumbnail`, `cover-image`, `featured-image`, `main-image`. |
| `WEBFLOW_BLOG_AUTHOR_FIELD` | No | Override the field slug used for the author. Default matches: `author`, `author-name`. |
| `WEBFLOW_BLOG_DATE_FIELD` | No | Override the field slug used for the publish date. Default matches: `date`, `publish-date`, `published-on`, `post-date`. |
| `WEBFLOW_BLOG_FEATURED_FIELD` | No | Override the field slug used for the featured toggle. Default matches: `featured`, `is-featured`, `is-this-featured`, `featured-post`. |
| `WEBFLOW_BLOG_TAGS_FIELD` | No | Override the field slug used for tags/categories. Default matches: `tags`, `categories`, `topics`. |
| `WEBFLOW_BLOG_CATEGORY_FIELD` | No | Override the blog post reference field used for category. Default: `category`. |
| `WEBFLOW_BLOG_CATEGORIES_COLLECTION_ID` | No | Override the category collection ID if you want to force a specific Webflow collection for category lookup. By default this is discovered from the blog collection schema. |

### Notes

- Existing Markdown posts in `src/content/blog` continue to work exactly as before.
- Webflow posts are merged into the same `/blog` listing and `/blog/[slug]` pages.
- If a Webflow post uses the same slug as an existing Markdown file, the Markdown post wins.
- Webflow content should be stored as HTML-rich content so it can render directly in the blog post page.
