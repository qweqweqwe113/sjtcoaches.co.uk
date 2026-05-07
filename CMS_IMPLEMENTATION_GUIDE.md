# Content Management System (CMS) Implementation Guide

## Overview

The admin panel now includes a comprehensive Content Management System that allows administrators to manage all site content including text, images, prices, and more without touching code.

---

## Features Implemented

### 1. **Site Content Management** 📝
Manage all text and images across the website from a single interface.

**Location:** Admin Panel → Site Content

**Capabilities:**
- Edit homepage hero text
- Update contact information (phone, email, address)
- Change images across the site
- Modify section titles and descriptions
- Update footer content
- Change call-to-action text

**Content Types Supported:**
- `text` - Short text fields
- `textarea` - Long text content
- `image` - Image paths/URLs
- `email` - Email addresses
- `phone` - Phone numbers
- `url` - Website URLs
- `number` - Numeric values
- `price` - Pricing information

### 2. **Pricing Management** 💰
Control pricing rules for different vehicle types.

**Location:** Admin Panel → Pricing

**Capabilities:**
- Set base prices per vehicle type
- Configure price per mile
- Set price per hour
- Define minimum hours
- Enable/disable pricing rules
- Add new vehicle pricing tiers

### 3. **Fleet Management** 🚗
Manage vehicle information and images.

**Location:** Admin Panel → Fleet

**Capabilities:**
- Update vehicle images
- Edit pricing ranges
- Modify vehicle descriptions
- Add/remove vehicles

### 4. **Blog Management** ✍️
Create and publish blog articles.

**Location:** Admin Panel → Blog

**Capabilities:**
- Create new articles
- Edit existing posts
- Publish/unpublish content
- Manage featured images
- SEO optimization

---

## Database Schema

### SiteContent Collection
```typescript
{
  _id: ObjectId,
  key: string,              // Unique identifier (e.g., "hero_title")
  section: string,          // Group (e.g., "homepage", "contact")
  type: string,             // "text" | "image" | "price" | etc.
  label: string,            // Human-readable label
  value: string,            // The actual content
  description?: string,     // Help text
  updated_at: Date
}
```

### PricingRule Collection
```typescript
{
  _id: ObjectId,
  vehicle_type: string,     // "Executive Minibus", "Luxury Coach"
  base_price: number,       // Starting price in £
  price_per_mile: number,   // Cost per mile in £
  price_per_hour: number,   // Cost per hour in £
  minimum_hours: number,    // Minimum booking duration
  active: boolean,          // Is this rule active?
  updated_at: Date
}
```

---

## Admin Panel Navigation

```
Admin Panel
├── Settings          - Admin credentials
├── Messages          - Contact form submissions
├── Bookings          - Booking requests
├── Fleet             - Vehicle management
├── Blog              - Article management
├── Site Content      - Text & image management ⭐ NEW
└── Pricing           - Pricing rules ⭐ NEW
```

---

## Usage Guide

### Managing Site Content

1. **Navigate to Site Content**
   - Login to admin panel
   - Click "Site Content" in sidebar

2. **Filter by Section**
   - Click section buttons (all, homepage, contact, etc.)
   - View content grouped by page

3. **Edit Content**
   - Click "Edit" button on any content item
   - Modify the value
   - Click "Save" to apply changes
   - Changes reflect immediately on the site

4. **Content Types**
   - **Text**: Short single-line text
   - **Textarea**: Multi-line text content
   - **Image**: File paths (e.g., `/src/assets/hero.jpg`)
   - **Phone**: Phone numbers with validation
   - **Email**: Email addresses with validation
   - **URL**: Website URLs

### Managing Pricing

1. **Navigate to Pricing**
   - Login to admin panel
   - Click "Pricing" in sidebar

2. **Edit Pricing Rule**
   - Click "Edit" on any vehicle type
   - Update:
     - Base Price (£)
     - Price per Mile (£)
     - Price per Hour (£)
     - Minimum Hours
   - Toggle Active/Inactive
   - Click "Save"

3. **Add New Pricing Rule**
   - Click "Add Rule" button
   - Fill in vehicle details
   - Set pricing parameters
   - Save

---

## Example Content Items

### Homepage Content
```javascript
{
  key: "hero_title",
  section: "homepage",
  type: "text",
  label: "Hero Title",
  value: "Travel without compromise.",
  description: "Main homepage headline"
}

{
  key: "hero_image",
  section: "homepage",
  type: "image",
  label: "Hero Background Image",
  value: "/src/assets/hero-coach-light.jpg",
  description: "Main hero section background"
}
```

### Contact Page Content
```javascript
{
  key: "contact_phone",
  section: "contact",
  type: "phone",
  label: "Contact Phone",
  value: "+44 20 4577 1234",
  description: "Main contact number"
}

{
  key: "contact_email",
  section: "contact",
  type: "email",
  label: "Contact Email",
  value: "concierge@sjtcoaches.co.uk",
  description: "Main contact email"
}
```

### Pricing Example
```javascript
{
  vehicle_type: "Executive Minibus",
  base_price: 280,
  price_per_mile: 2.5,
  price_per_hour: 45,
  minimum_hours: 4,
  active: true
}
```

---

## Seeding Initial Content

To populate the database with initial content, update `server/seed-mongodb.ts`:

```typescript
// Seed site content
const siteContentData = [
  {
    key: "hero_title",
    section: "homepage",
    type: "text",
    label: "Hero Title",
    value: "Travel without compromise.",
    description: "Main homepage headline"
  },
  {
    key: "hero_subtitle",
    section: "homepage",
    type: "textarea",
    label: "Hero Subtitle",
    value: "Luxury coach hire across London & the United Kingdom",
    description: "Homepage subtitle text"
  },
  {
    key: "contact_phone",
    section: "contact",
    type: "phone",
    label: "Contact Phone",
    value: "+44 20 4577 1234",
    description: "Main contact number"
  },
  // Add more content items...
];

await db.collection("site_content").deleteMany({});
await db.collection("site_content").insertMany(siteContentData);

// Seed pricing rules
const pricingData = [
  {
    vehicle_type: "Executive Minibus",
    base_price: 280,
    price_per_mile: 2.5,
    price_per_hour: 45,
    minimum_hours: 4,
    active: true,
    updated_at: new Date()
  },
  {
    vehicle_type: "Luxury Coach",
    base_price: 640,
    price_per_mile: 3.5,
    price_per_hour: 80,
    minimum_hours: 6,
    active: true,
    updated_at: new Date()
  },
  // Add more pricing rules...
];

await db.collection("pricing_rules").deleteMany({});
await db.collection("pricing_rules").insertMany(pricingData);

// Create indexes
await db.collection("site_content").createIndex({ key: 1 }, { unique: true });
await db.collection("site_content").createIndex({ section: 1 });
await db.collection("pricing_rules").createIndex({ vehicle_type: 1 }, { unique: true });
```

---

## Connecting Frontend to CMS

### Reading Content in Pages

```typescript
// In any route file (e.g., src/routes/index.tsx)
import { getSiteContentByKey } from "../../server/db";

export const Route = createFileRoute("/")({
  loader: async ({ context }) => {
    const env = context?.cloudflare?.env;
    if (!env) throw new Error("Environment unavailable");
    
    const heroTitle = await getSiteContentByKey(env.DB, "hero_title");
    const heroImage = await getSiteContentByKey(env.DB, "hero_image");
    
    return { heroTitle, heroImage };
  },
  component: HomePage,
});

function HomePage() {
  const { heroTitle, heroImage } = Route.useLoaderData();
  
  return (
    <div>
      <h1>{heroTitle?.value}</h1>
      <img src={heroImage?.value} alt="Hero" />
    </div>
  );
}
```

### Using Pricing Rules

```typescript
import { listPricingRules } from "../../server/db";

export const Route = createFileRoute("/quote")({
  loader: async ({ context }) => {
    const env = context?.cloudflare?.env;
    const pricingRules = await listPricingRules(env.DB);
    return { pricingRules };
  },
  component: QuotePage,
});

function QuotePage() {
  const { pricingRules } = Route.useLoaderData();
  
  function calculatePrice(vehicleType: string, miles: number, hours: number) {
    const rule = pricingRules.find(r => r.vehicle_type === vehicleType && r.active);
    if (!rule) return 0;
    
    return rule.base_price + 
           (miles * rule.price_per_mile) + 
           (hours * rule.price_per_hour);
  }
  
  return <div>{/* Quote form */}</div>;
}
```

---

## Security Considerations

1. **Authentication Required**
   - All CMS endpoints require admin authentication
   - Session-based auth with HttpOnly cookies

2. **Input Validation**
   - Validate all content before saving
   - Sanitize HTML/script tags
   - Validate image paths
   - Check email/phone formats

3. **Rate Limiting**
   - Implement rate limiting on update endpoints
   - Prevent abuse

4. **Audit Trail**
   - Track who changed what and when
   - Add `updated_by` field to schema

---

## Future Enhancements

### Phase 2 Features
- [ ] Image upload functionality
- [ ] Rich text editor for textarea fields
- [ ] Content versioning/history
- [ ] Bulk edit operations
- [ ] Import/export content
- [ ] Multi-language support
- [ ] Content scheduling
- [ ] Preview changes before publishing

### Phase 3 Features
- [ ] Media library
- [ ] SEO meta tag management
- [ ] A/B testing content
- [ ] Analytics integration
- [ ] Content approval workflow
- [ ] Role-based permissions

---

## API Endpoints

### Site Content
```typescript
// List all content or filter by section
GET /api/content?section=homepage

// Get specific content by key
GET /api/content/:key

// Update content
PUT /api/content/:key
Body: { value: string }

// Create new content
POST /api/content
Body: { key, section, type, label, value, description }

// Delete content
DELETE /api/content/:key
```

### Pricing Rules
```typescript
// List all pricing rules
GET /api/pricing

// Update pricing rule
PUT /api/pricing/:id
Body: { base_price, price_per_mile, price_per_hour, minimum_hours, active }

// Create new rule
POST /api/pricing
Body: { vehicle_type, base_price, ... }

// Delete rule
DELETE /api/pricing/:id
```

---

## Troubleshooting

### Content Not Updating
1. Check MongoDB connection
2. Verify admin authentication
3. Check browser console for errors
4. Ensure content key exists in database

### Pricing Not Calculating
1. Verify pricing rule is active
2. Check vehicle_type matches exactly
3. Ensure all numeric fields are valid
4. Check minimum_hours requirement

### Images Not Displaying
1. Verify image path is correct
2. Check file exists in assets folder
3. Ensure proper file permissions
4. Check browser network tab for 404s

---

## Best Practices

1. **Content Keys**
   - Use descriptive, lowercase keys
   - Use underscores for spaces
   - Group by section (e.g., `homepage_hero_title`)

2. **Sections**
   - Keep section names consistent
   - Use lowercase
   - Common sections: homepage, contact, footer, about

3. **Descriptions**
   - Always add helpful descriptions
   - Explain where content appears
   - Include character limits if applicable

4. **Pricing**
   - Keep vehicle_type names consistent
   - Test calculations after changes
   - Document pricing strategy

5. **Images**
   - Use relative paths from public folder
   - Optimize images before upload
   - Use descriptive filenames

---

## Summary

The CMS implementation provides:

✅ **Site Content Management** - Edit all text and images  
✅ **Pricing Management** - Control vehicle pricing  
✅ **Section Filtering** - Organize content by page  
✅ **Type Safety** - Different input types for different content  
✅ **Real-time Updates** - Changes reflect immediately  
✅ **User-Friendly Interface** - No coding required  
✅ **Scalable Architecture** - Easy to add new content types  

The admin can now manage the entire website content without developer intervention!
