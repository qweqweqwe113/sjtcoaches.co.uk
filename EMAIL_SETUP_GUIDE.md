# Contact Form Email Setup Guide

## Overview

When users submit the contact form, the system will:
1. ✅ Save the message to MongoDB database
2. ✅ Send an email notification to `miroclejohn@gmail.com`

## Quick Setup (5 minutes)

### Step 1: Sign up for Resend

1. Go to: https://resend.com
2. Click "Sign Up" (it's free!)
3. Verify your email address
4. Login to your dashboard

### Step 2: Get Your API Key

1. In Resend dashboard, click "API Keys" in the sidebar
2. Click "Create API Key"
3. Name it: "SJT Coaches Contact Form"
4. Copy the API key (starts with `re_...`)

### Step 3: Add API Key to .env

Open your `.env` file and replace the placeholder:

```env
RESEND_API_KEY=re_your_actual_api_key_here
```

### Step 4: Restart Your Server

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 5: Test It!

1. Go to: http://localhost:8082/contact
2. Fill out the contact form
3. Click "SEND TO CONCIERGE"
4. Check `miroclejohn@gmail.com` for the email!

## Email Details

### From Address
- **Default:** `SJT Coaches <onboarding@resend.dev>`
- **Note:** This is Resend's test domain - works immediately!

### To Address
- **Email:** `miroclejohn@gmail.com`
- **Can be changed in:** `server/contact.ts` (line with `to:` field)

### Email Content Includes:
- Customer name
- Customer email (clickable)
- Customer phone (clickable, if provided)
- Journey date (if provided)
- Full message
- Submission timestamp

## Using Your Own Domain (Optional)

To send emails from your own domain (e.g., `noreply@sjtcoaches.co.uk`):

### 1. Add Domain to Resend

1. In Resend dashboard, click "Domains"
2. Click "Add Domain"
3. Enter your domain: `sjtcoaches.co.uk`
4. Follow DNS setup instructions

### 2. Verify Domain

Add these DNS records to your domain:
- SPF record
- DKIM record
- DMARC record (optional)

### 3. Update Code

In `server/contact.ts`, change the `from` field:

```typescript
from: 'SJT Coaches Concierge <concierge@sjtcoaches.co.uk>',
```

## Email Template

The email sent to you includes:

```
Subject: New Contact Form Message from [Customer Name]

┌─────────────────────────────────────┐
│ New Contact Form Submission         │
├─────────────────────────────────────┤
│ Name: John Smith                    │
│ Email: john@example.com             │
│ Phone: +44 20 1234 5678            │
│ Journey Date: 2026-06-15           │
├─────────────────────────────────────┤
│ Message:                            │
│ I need a luxury coach for 20       │
│ passengers from London to Bath...   │
├─────────────────────────────────────┤
│ Submitted at: 03/05/2026, 14:30    │
└─────────────────────────────────────┘
```

## Troubleshooting

### "Email not received"

**Check these:**
1. ✅ RESEND_API_KEY is set in `.env`
2. ✅ Server was restarted after adding API key
3. ✅ Check spam/junk folder
4. ✅ Check Resend dashboard for delivery logs

### "API key invalid"

- Make sure you copied the full API key (starts with `re_`)
- No spaces before or after the key
- Key should be on the same line as `RESEND_API_KEY=`

### "Email sending failed but form submitted"

This is **normal behavior**! The system:
- ✅ Always saves messages to database
- ⚠️ Tries to send email (but doesn't fail if it can't)
- ✅ Shows success to user

You can still view all messages in the admin panel under "Messages".

## Resend Free Tier

**Limits:**
- 100 emails per day
- 3,000 emails per month
- Perfect for contact forms!

**Upgrade if needed:**
- $20/month for 50,000 emails
- Pay-as-you-go available

## Alternative: Using Gmail SMTP (Not Recommended)

If you prefer Gmail SMTP instead of Resend, you'll need:
- Enable 2FA on Gmail
- Create App Password
- Use nodemailer package
- Configure SMTP settings

**Why Resend is better:**
- ✅ Easier setup (just API key)
- ✅ Better deliverability
- ✅ No Gmail security issues
- ✅ Professional email service
- ✅ Free tier is generous

## Testing Without API Key

If you don't set up Resend:
- ✅ Contact form still works
- ✅ Messages saved to database
- ✅ View messages in admin panel
- ❌ No email notifications

## Viewing Messages Without Email

All contact form submissions are saved to MongoDB:

1. Go to: http://localhost:8082/admin
2. Login with admin credentials
3. Click "Messages" in sidebar
4. View all submissions

## Production Deployment

When deploying to production:

1. **Add environment variable** to your hosting platform:
   ```
   RESEND_API_KEY=re_your_key_here
   ```

2. **Verify your domain** in Resend (optional but recommended)

3. **Update from address** to use your domain

4. **Test thoroughly** before going live

## Support

- **Resend Docs:** https://resend.com/docs
- **Resend Support:** support@resend.com
- **API Status:** https://resend.com/status

## Summary

✅ **Contact form saves to database** (always works)  
✅ **Email notifications to miroclejohn@gmail.com** (when API key is set)  
✅ **Professional email templates** (HTML formatted)  
✅ **Free tier available** (100 emails/day)  
✅ **5 minute setup** (just add API key)

Get your API key at: https://resend.com/api-keys
