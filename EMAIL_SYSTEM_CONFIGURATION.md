# Email System Configuration

## ✅ Current Setup: Formspree

The contact form uses **Formspree** for email submissions.

### Configuration

**Environment Variable Required:**
```env
NEXT_PUBLIC_FORMSPREE_ID=your-formspree-form-id
```

### How It Works

1. User submits contact form on `/contact` page
2. Form data is sanitized and validated client-side
3. Data is sent to Formspree endpoint: `https://formspree.io/f/${NEXT_PUBLIC_FORMSPREE_ID}`
4. Formspree handles email delivery
5. User sees success/error message

### Setup Instructions

1. **Create Formspree Account:**
   - Go to [formspree.io](https://formspree.io)
   - Sign up for a free account
   - Create a new form

2. **Get Your Form ID:**
   - After creating a form, you'll get a form ID
   - Example: `xqkzpqwn` (your actual ID will be different)

3. **Set Environment Variable:**
   - Add to `.env.local` (development):
     ```env
     NEXT_PUBLIC_FORMSPREE_ID=xqkzpqwn
     ```
   - Add to Hostinger environment variables (production):
     ```
     NEXT_PUBLIC_FORMSPREE_ID=xqkzpqwn
     ```

4. **Test the Form:**
   - Submit a test message
   - Check your email (Formspree sends to your registered email by default)
   - You can configure custom email addresses in Formspree dashboard

### Advantages of Formspree

- ✅ Simple setup (no SMTP configuration needed)
- ✅ Built-in spam protection
- ✅ Free tier available
- ✅ Email delivery handled by Formspree
- ✅ No server-side email configuration required

### Form Validation

The contact form includes:
- ✅ Client-side validation (name, email, message)
- ✅ Input sanitization (XSS protection)
- ✅ Error messages for invalid inputs
- ✅ Success/error state handling

### Form Fields

- **Name:** Required, 2-100 characters
- **Email:** Required, valid email format
- **Message:** Required, 10-2000 characters

---

## 📝 Notes

- The form will fail gracefully if `NEXT_PUBLIC_FORMSPREE_ID` is not set
- All form data is sanitized before submission
- Formspree handles rate limiting automatically

---

**Status:** ✅ Configured and ready to use

