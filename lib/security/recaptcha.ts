/**
 * Google reCAPTCHA Integration
 * Purpose: Prevent bot submissions and spam
 * 
 * Installation:
 * npm install react-google-recaptcha  # For frontend (if using React)
 * 
 * No npm package needed for server-side (uses fetch)
 * 
 * Setup:
 * 1. Get keys from https://www.google.com/recaptcha/admin
 * 2. Add to .env:
 *    NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-site-key
 *    RECAPTCHA_SECRET_KEY=your-secret-key
 */

/**
 * Server-side reCAPTCHA Verification
 * Verifies the token sent from frontend
 */
export async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    return false;
  }
  
  if (!token) {
    return false;
  }
  
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `secret=${secretKey}&response=${token}`
    });
    
    const data = await response.json();
    
    // reCAPTCHA v3 returns a score (0.0 to 1.0)
    // Score > 0.5 is typically considered human
    if (data.success && (data.score === undefined || data.score > 0.5)) {
      return true;
    }
    
    return false;
  } catch {
    return false;
  }
}

/**
 * Express Middleware for reCAPTCHA Verification
 */
export const recaptchaMiddleware = async (req: any, res: any, next: any) => {
  const token = req.body.recaptchaToken || req.headers['x-recaptcha-token'];
  
  if (!token) {
    return res.status(400).json({
      success: false,
      error: 'reCAPTCHA token is required'
    });
  }
  
  const isValid = await verifyRecaptcha(token);
  
  if (!isValid) {
    return res.status(403).json({
      success: false,
      error: 'reCAPTCHA verification failed'
    });
  }
  
  next();
};

/**
 * Next.js API Route Example with reCAPTCHA
 * 
 * File: app/api/contact/route.ts
 */
export const contactWithRecaptcha = async (req: Request) => {
  const body = await req.json();
  const { recaptchaToken, name, email, message } = body;
  
  // Verify reCAPTCHA
  const isValid = await verifyRecaptcha(recaptchaToken);
  
  if (!isValid) {
    return new Response(JSON.stringify({
      success: false,
      error: 'reCAPTCHA verification failed'
    }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' }
    });
  }
  
  // Process form submission...
  // (your existing form handling code)
  
  return new Response(JSON.stringify({
    success: true,
    message: 'Form submitted successfully'
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

