# Admin Credentials Management Guide

## Overview

The admin panel now includes full credential management functionality, allowing administrators to change their email and password directly from the Settings page without touching code.

---

## Features Implemented

### 1. **Change Email Address** 📧
- Update admin email from the Settings page
- Email validation
- Real-time updates
- Success/error feedback

### 2. **Change Password** 🔒
- Secure password update flow
- Current password verification
- Password strength requirement (minimum 6 characters)
- Password confirmation
- Show/hide password toggles
- Success/error feedback

### 3. **Security Features** 🛡️
- Current password verification required
- Password mismatch detection
- Email format validation
- Visual feedback for all operations
- Secure password input fields

---

## How to Use

### Changing Email

1. **Navigate to Settings**
   - Login to admin panel
   - Click "Settings" in sidebar

2. **Edit Email**
   - Click "Change Email" button
   - Enter new email address
   - Click "Save Email"

3. **Confirmation**
   - Success message appears
   - New email is displayed
   - Use new email for next login

### Changing Password

1. **Navigate to Settings**
   - Login to admin panel
   - Click "Settings" in sidebar

2. **Edit Password**
   - Click "Change Password" button
   - Enter current password
   - Enter new password (min 6 characters)
   - Confirm new password
   - Click "Save Password"

3. **Confirmation**
   - Success message appears
   - Use new password for next login

---

## Default Credentials

**Initial Login:**
- Email: `admin@test.com`
- Password: `admin123`

**⚠️ Important:** Change these credentials immediately after first login!

---

## API Functions

### Get Current Credentials
```typescript
getCredentialsFn()
// Returns: { email: string, hasPassword: boolean }
```

### Update Email
```typescript
updateEmailFn({ data: { email: "new@example.com" } })
// Returns: { ok: true, message: "Email updated successfully" }
```

### Update Password
```typescript
updatePasswordFn({ 
  data: { 
    currentPassword: "old123", 
    newPassword: "new456" 
  } 
})
// Returns: { ok: true, message: "Password updated successfully" }
// Throws: Error if current password is incorrect
```

---

## Validation Rules

### Email Validation
- ✅ Must be valid email format
- ✅ Cannot be empty
- ✅ Must contain @ symbol

### Password Validation
- ✅ Minimum 6 characters
- ✅ Current password must be correct
- ✅ New password and confirmation must match
- ✅ Cannot be empty

---

## User Interface

### Settings Page Layout

```
Settings
├── Admin Email Section
│   ├── Current Email Display
│   ├── Change Email Button
│   └── Edit Form (when editing)
│       ├── Email Input
│       ├── Save Button
│       └── Cancel Button
│
└── Admin Password Section
    ├── Password Display (masked)
    ├── Change Password Button
    └── Edit Form (when editing)
        ├── Current Password Input (with show/hide)
        ├── New Password Input (with show/hide)
        ├── Confirm Password Input (with show/hide)
        ├── Save Button
        └── Cancel Button
```

### Visual Feedback

**Success Messages:**
- Green background with checkmark icon
- Auto-dismiss after 3 seconds
- Clear success text

**Error Messages:**
- Red background
- Clear error description
- Stays until dismissed or corrected

---

## Security Considerations

### Current Implementation
- ✅ Credentials stored in memory (server-side)
- ✅ Session-based authentication
- ✅ HttpOnly cookies
- ✅ Current password verification required
- ✅ Password confirmation required
- ✅ Input validation

### Limitations
- ⚠️ Credentials reset on server restart
- ⚠️ No password hashing (in-memory only)
- ⚠️ Single admin user only

### Production Recommendations

For production use, implement:

1. **Database Storage**
   ```typescript
   // Store in MongoDB
   {
     _id: ObjectId,
     email: string,
     password_hash: string,  // bcrypt hash
     created_at: Date,
     updated_at: Date
   }
   ```

2. **Password Hashing**
   ```typescript
   import bcrypt from 'bcrypt';
   
   // Hash password
   const hash = await bcrypt.hash(password, 10);
   
   // Verify password
   const match = await bcrypt.compare(password, hash);
   ```

3. **Additional Security**
   - Rate limiting on login attempts
   - Password complexity requirements
   - Password history (prevent reuse)
   - Two-factor authentication
   - Account lockout after failed attempts
   - Password expiration policy
   - Audit logging

---

## Error Handling

### Common Errors

**"Current password is incorrect"**
- User entered wrong current password
- Solution: Re-enter correct current password

**"New passwords do not match"**
- Password and confirmation don't match
- Solution: Ensure both fields have same value

**"New password must be at least 6 characters"**
- Password too short
- Solution: Use longer password

**"Please enter a valid email address"**
- Invalid email format
- Solution: Use proper email format (user@domain.com)

---

## Code Examples

### Updating Email in Frontend

```typescript
async function handleUpdateEmail() {
  try {
    await updateEmailFn({ data: { email: newEmail } });
    setSuccess("Email updated successfully");
  } catch (err) {
    setError(err.message);
  }
}
```

### Updating Password in Frontend

```typescript
async function handleUpdatePassword() {
  if (newPassword !== confirmPassword) {
    setError("Passwords do not match");
    return;
  }
  
  try {
    await updatePasswordFn({ 
      data: { 
        currentPassword, 
        newPassword 
      } 
    });
    setSuccess("Password updated successfully");
  } catch (err) {
    setError(err.message);
  }
}
```

---

## Testing

### Test Scenarios

1. **Change Email**
   - ✅ Valid email update
   - ✅ Invalid email format
   - ✅ Empty email
   - ✅ Cancel operation

2. **Change Password**
   - ✅ Valid password update
   - ✅ Wrong current password
   - ✅ Password too short
   - ✅ Passwords don't match
   - ✅ Empty fields
   - ✅ Cancel operation

3. **Login After Changes**
   - ✅ Login with new email
   - ✅ Login with new password
   - ✅ Old credentials fail

---

## Migration to Database

To migrate from in-memory to database storage:

### 1. Update Schema

```typescript
// server/db.ts
export interface AdminUser {
  _id?: ObjectId;
  email: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}
```

### 2. Add Database Functions

```typescript
export async function getAdminUser(db: Db): Promise<AdminUser | null> {
  return db.collection<AdminUser>("admin_users").findOne({});
}

export async function updateAdminEmail(db: Db, email: string) {
  return db.collection<AdminUser>("admin_users").updateOne(
    {},
    { $set: { email, updated_at: new Date() } }
  );
}

export async function updateAdminPassword(db: Db, passwordHash: string) {
  return db.collection<AdminUser>("admin_users").updateOne(
    {},
    { $set: { password_hash: passwordHash, updated_at: new Date() } }
  );
}
```

### 3. Update Auth Functions

```typescript
import bcrypt from 'bcrypt';

export const updatePasswordFn = createServerFn({ method: "POST" })
  .handler(async ({ data, context }) => {
    const db = await getMongoDb(context.env);
    const admin = await getAdminUser(db);
    
    // Verify current password
    const match = await bcrypt.compare(
      data.currentPassword, 
      admin.password_hash
    );
    
    if (!match) {
      throw new Error("Current password is incorrect");
    }
    
    // Hash new password
    const hash = await bcrypt.hash(data.newPassword, 10);
    
    // Update in database
    await updateAdminPassword(db, hash);
    
    return { ok: true };
  });
```

---

## Troubleshooting

### Credentials Not Updating
1. Check browser console for errors
2. Verify server is running
3. Check network tab for API calls
4. Ensure session is valid

### Can't Login After Change
1. Verify new credentials were saved
2. Check for typos
3. Clear browser cache/cookies
4. Restart server if needed

### Server Restart Resets Credentials
- This is expected behavior with in-memory storage
- Implement database storage for persistence
- See "Migration to Database" section

---

## Best Practices

1. **Change Default Credentials**
   - Always change on first login
   - Use strong, unique password

2. **Regular Updates**
   - Change password periodically
   - Use different passwords for different systems

3. **Secure Passwords**
   - Minimum 12 characters recommended
   - Mix of letters, numbers, symbols
   - Avoid common words/patterns

4. **Email Security**
   - Use business email
   - Enable 2FA on email account
   - Monitor for suspicious activity

---

## Summary

The admin credentials management system provides:

✅ **Easy Email Updates** - Change email without code  
✅ **Secure Password Changes** - With verification and validation  
✅ **User-Friendly Interface** - Clear forms and feedback  
✅ **Input Validation** - Prevent invalid data  
✅ **Error Handling** - Clear error messages  
✅ **Success Feedback** - Confirmation of changes  
✅ **Security Features** - Current password verification  

The system is production-ready for development/staging environments. For production, implement database storage and password hashing as outlined in this guide.
