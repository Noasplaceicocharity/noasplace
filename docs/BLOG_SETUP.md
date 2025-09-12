# Blog Setup Instructions

This guide will help you set up the Notion-powered blog for Noa's Place.

## Prerequisites

1. A Notion account
2. A Notion workspace where you can create pages and databases

## Step 1: Create a Notion Integration

1. Go to [Notion Integrations](https://www.notion.so/my-integrations)
2. Click "Create new integration"
3. Choose your workspace
4. Give it a name like "Noas Place Blog"
5. Copy the "Internal Integration Token" - you'll need this for `NOTION_TOKEN`

## Step 2: Create the Blog Database

1. In your Notion workspace, create a new page
2. Add a database with the following properties:

### Required Properties:
- **Title** (Title) - The blog post title
- **Slug** (Text) - URL-friendly version of title (e.g., "my-first-post")
- **Date** (Date) - When the post was published
- **Cover Image** (Files & Media OR URL) - Header image for the post
- **Published** (Checkbox) - Whether the post is live

## Step 3: Share Database with Integration

1. In your database page, click "Share" in the top right
2. Click "Invite" and search for your integration name
3. Select your integration and give it "Edit" permissions
4. Click "Invite"

## Step 4: Get Database ID

1. Open your database in Notion
2. Copy the URL - it will look like:
   `https://www.notion.so/your-workspace/DATABASE_ID?v=VIEW_ID`
3. The `DATABASE_ID` is the long string between the workspace name and the `?v=`
4. Copy this ID - you'll need it for `NOTION_DATABASE_ID`

## Step 5: Configure Environment Variables

Create a `.env.local` file in your project root with:

```env
NOTION_TOKEN=secret_your_notion_integration_token_here
NOTION_DATABASE_ID=your_database_id_here
```

## Step 6: Create Your First Post

1. In your Notion database, click "New" to create a post
2. Fill in all the required fields:
   - **Title**: "Welcome to Our Blog"
   - **Slug**: "welcome-to-our-blog" 
   - **Date**: Today's date
   - **Cover Image**: Upload a relevant image or add a URL
   - **Published**: ✓ (checked)

3. Add your content in the page body using Notion's rich text editor
4. Save the page

## Step 7: Test the Blog

1. Start your development server: `npm run dev`
2. Navigate to `http://localhost:3000/blog`
3. You should see your published posts
4. Click on a post to view the full content

## Content Guidelines

### Writing Posts
- Use Notion's built-in formatting for rich content
- Add headings with Notion's heading blocks
- Include images, videos, and other media
- Use callout blocks for important information
- Add lists, quotes, and code blocks as needed

### SEO Best Practices
- Use descriptive, keyword-rich titles
- Include cover images for social sharing
- Write engaging, informative content
- Set a proper date for chronological ordering

### Publishing Workflow
1. Create draft posts with `Published` unchecked
2. Review and edit content
3. Add cover image and set the date
4. Check the `Published` checkbox when ready to go live

## Troubleshooting

### "Failed to fetch blog posts" Error
- Check your `NOTION_TOKEN` is correct
- Verify `NOTION_DATABASE_ID` is the right database
- Ensure your integration has access to the database
- Check that your database has the required properties

### Posts Not Showing
- Verify the `Published` checkbox is checked
- Check that `Published Date` is set
- Ensure your database is shared with the integration

### Styling Issues
- Notion content uses custom CSS in `src/styles/notion.css`
- Modify this file to customize the appearance
- The styling follows Noa's Place brand colors and typography

## Advanced Features

### Custom Components
You can extend the NotionRenderer in `src/components/NotionRenderer.tsx` to add custom components for specific block types.

### Caching
The blog system includes built-in caching for better performance. Cache is automatically cleared every 5 minutes.

### Static Generation
Blog posts are statically generated at build time for optimal performance and SEO.

## Support

If you need help setting up the blog, please check:
1. This documentation
2. The Notion API documentation
3. The react-notion-x documentation
4. Create an issue in the project repository
