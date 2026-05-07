# Blog Management Implementation Guide

## Status: ✅ COMPLETE

The blog management system is fully implemented and integrated with MongoDB. Admins can now create, edit, publish, unpublish, and delete blog articles through the admin panel.

## Overview

This guide explains the blog management functionality in the admin panel, allowing you to create, edit, publish, and delete blog articles.

## Database Schema

The blog posts are stored in MongoDB with the following structure:

```typescript
export interface BlogPost {
  _id?: ObjectId;
  title: string;           // Article title
  slug: string;            // URL-friendly slug (e.g., "my-article")
  excerpt: string;         // Short summary
  content: string;         // Full article content (markdown supported)
  featured_image: string;  // Path to featured image
  author: string;          // Author name
  published: boolean;      // Published status
  created_at: Date;        // Creation timestamp
  updated_at: Date;        // Last update timestamp
}
```

## Database Functions Added

The following functions have been added to `server/db.ts`:

### List Blog Posts
```typescript
listBlogPosts(db: Db, publishedOnly = false): Promise<BlogPost[]>
```
- Returns all blog posts, optionally filtered by published status
- Sorted by creation date (newest first)

### Get Single Post
```typescript
getBlogPost(db: Db, id: string): Promise<BlogPost | null>
getBlogPostBySlug(db: Db, slug: string): Promise<BlogPost | null>
```
- Retrieve a single post by ID or slug

### Create Post
```typescript
insertBlogPost(db: Db, data: Omit<BlogPost, "_id" | "created_at" | "updated_at">)
```
- Creates a new blog post
- Automatically sets created_at and updated_at timestamps

### Update Post
```typescript
updateBlogPost(db: Db, id: string, data: Partial<Omit<BlogPost, "_id" | "created_at">>)
```
- Updates an existing blog post
- Automatically updates the updated_at timestamp

### Delete Post
```typescript
deleteBlogPost(db: Db, id: string)
```
- Permanently deletes a blog post

## Admin Panel Features

The blog management panel in the admin interface includes:

### List View
- Display all blog posts (published and drafts)
- Show title, excerpt, author, publish status, and creation date
- Quick actions: Edit, Publish/Unpublish, Delete
- "New Article" button to create posts

### Create/Edit Form
- **Title**: Auto-generates URL slug
- **Slug**: Editable URL-friendly identifier
- **Excerpt**: Brief summary for listings
- **Content**: Full article content (supports markdown)
- **Featured Image**: Path to header image
- **Author**: Author name (defaults to "SJT Coaches")
- **Published**: Checkbox to publish immediately

### Features
- Auto-generate slug from title
- Draft/Published status toggle
- Confirmation before deletion
- Real-time preview of featured images
- Form validation

## Server Functions

✅ **IMPLEMENTED** - The following server functions have been added to `src/routes/admin.tsx`:

### Get All Blog Posts
```typescript
export const getBlogPostsFn = createServerFn({ method: "GET" }).handler(async ({ context }) => {
  const env = context?.cloudflare?.env;
  if (!env?.MONGODB_URI) throw new Error("MongoDB URI not configured");
  
  const db = await getMongoDb(env);
  const posts = await listBlogPosts(db, false);
  return posts.map(post => ({
    ...post,
    _id: post._id?.toString(),
  }));
});
```

### Create New Blog Post
```typescript
export const createBlogPostFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({
    title: z.string(),
    slug: z.string(),
    excerpt: z.string(),
    content: z.string(),
    featured_image: z.string(),
    author: z.string(),
    published: z.boolean(),
  }))
  .handler(async ({ data, context }) => {
    const env = context?.cloudflare?.env;
    if (!env?.MONGODB_URI) throw new Error("MongoDB URI not configured");
    
    const db = await getMongoDb(env);
    const result = await insertBlogPost(db, data);
    return { ok: true, id: result.insertedId.toString() };
  });
```

### Update Existing Blog Post
```typescript
export const updateBlogPostFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({
    id: z.string(),
    updates: z.object({
      title: z.string().optional(),
      slug: z.string().optional(),
      excerpt: z.string().optional(),
      content: z.string().optional(),
      featured_image: z.string().optional(),
      author: z.string().optional(),
      published: z.boolean().optional(),
    }),
  }))
  .handler(async ({ data, context }) => {
    const env = context?.cloudflare?.env;
    if (!env?.MONGODB_URI) throw new Error("MongoDB URI not configured");
    
    const db = await getMongoDb(env);
    await updateBlogPost(db, data.id, data.updates);
    return { ok: true };
  });
```

### Delete Blog Post
```typescript
export const deleteBlogPostFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string() }))
  .handler(async ({ data, context }) => {
    const env = context?.cloudflare?.env;
    if (!env?.MONGODB_URI) throw new Error("MongoDB URI not configured");
    
    const db = await getMongoDb(env);
    await deleteBlogPost(db, data.id);
    return { ok: true };
  });
```

All server functions are integrated with the BlogPanel component and handle MongoDB operations with proper error handling.

## Database Indexes

The seed script creates these indexes for optimal performance:

```typescript
await db.collection("blog_posts").createIndex({ created_at: -1 });
await db.collection("blog_posts").createIndex({ slug: 1 }, { unique: true });
await db.collection("blog_posts").createIndex({ published: 1 });
```

## Usage Workflow

### Creating a New Article

1. Click "New Article" button
2. Enter title (slug auto-generates)
3. Write excerpt and content
4. Add featured image path
5. Check "Publish immediately" if ready
6. Click "Publish" or "Save as Draft"

### Editing an Article

1. Click "Edit" on any article
2. Modify fields as needed
3. Click "Update" to save changes

### Publishing/Unpublishing

- Click "Publish" button on draft articles
- Click "Unpublish" to revert to draft status

### Deleting an Article

1. Click "Delete" button
2. Confirm deletion in popup
3. Article is permanently removed

## Frontend Display

To display blog posts on the public site, create a journal route:

```typescript
// src/routes/journal/index.tsx
export const Route = createFileRoute("/journal/")({
  loader: async () => {
    const posts = await listBlogPosts(db, true); // published only
    return { posts };
  },
  component: JournalPage,
});

// src/routes/journal/$slug.tsx
export const Route = createFileRoute("/journal/$slug")({
  loader: async ({ params }) => {
    const post = await getBlogPostBySlug(db, params.slug);
    if (!post) throw new Error("Post not found");
    return { post };
  },
  component: BlogPostPage,
});
```

## Markdown Support

To render markdown content, install a markdown parser:

```bash
npm install marked
```

Then use it in your blog post component:

```typescript
import { marked } from 'marked';

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const htmlContent = marked(post.content);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </article>
  );
}
```

## Security Considerations

- Only authenticated admin users can create/edit/delete posts
- Validate and sanitize all input data
- Use parameterized queries (MongoDB handles this)
- Implement rate limiting for API endpoints
- Validate image paths to prevent directory traversal

## Next Steps

1. ✅ Database schema and functions added
2. ✅ Server functions created and integrated
3. ✅ Admin panel UI implemented
4. ✅ Database integration complete - blog management is fully functional
5. ⏳ Create public journal pages
6. ⏳ Add markdown rendering
7. ⏳ Add image upload functionality
8. ⏳ Add rich text editor (optional)
9. ⏳ Add categories/tags (optional)

## Troubleshooting

**"MongoDB URI not configured"**
- Ensure MONGODB_URI environment variable is set
- Run the seed script to initialize the database

**Slug conflicts**
- Slugs must be unique
- Edit the slug manually if auto-generation creates duplicates

**Images not displaying**
- Verify image paths are correct
- Ensure images exist in the assets folder
- Check browser console for 404 errors

