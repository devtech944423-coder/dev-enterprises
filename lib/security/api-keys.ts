/**
 * Secure API Key Management
 * Purpose: Store and use API keys securely without exposing them to frontend
 * 
 * NEVER expose API keys in:
 * - Frontend code
 * - Client-side JavaScript
 * - Public repositories
 * - Browser console
 */

/**
 * Environment Variables Setup
 * 
 * Create .env file in project root:
 * 
 * # API Keys (NEVER commit this file!)
 * SECRET_API_KEY=your-secret-key-here
 * FIREBASE_API_KEY=your-firebase-key
 * FORMSPREE_ID=your-formspree-id
 * RECAPTCHA_SECRET_KEY=your-recaptcha-secret
 * 
 * Add to .gitignore:
 * .env
 * .env.local
 * .env.production
 */

/**
 * Get API Key from Environment Variables
 * Throws error if key is missing (prevents silent failures)
 */
export function getApiKey(keyName: string): string {
  const key = process.env[keyName];
  
  if (!key) {
    throw new Error(`API key ${keyName} is not set in environment variables`);
  }
  
  return key;
}

/**
 * Example: Server-side API Proxy
 * Purpose: Frontend calls your server, server calls third-party API with key
 * 
 * Frontend (NEVER includes API key):
 * fetch('/api/weather?city=NewYork')
 * 
 * Backend (has API key):
 * GET /api/weather -> calls weather API with secret key
 */

// Example Express route for proxying API calls
export const createApiProxy = (apiKeyEnvName: string, baseUrl: string) => {
  return async (req: any, res: any) => {
    try {
      // Get API key from environment (server-side only)
      const apiKey = getApiKey(apiKeyEnvName);
      
      // Get query parameters from client request
      const queryParams = new URLSearchParams(req.query).toString();
      
      // Make request to third-party API with secret key
      const response = await fetch(`${baseUrl}?${queryParams}&api_key=${apiKey}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      const data = await response.json();
      
      // Return data to client (API key never exposed)
      res.json(data);
    } catch {
      res.status(500).json({
        success: false,
        error: 'Failed to fetch data'
      });
    }
  };
};

/**
 * Example Usage:
 * 
 * // In your Express app:
 * import { createApiProxy } from './lib/security/api-keys';
 * 
 * // Weather API proxy
 * app.get('/api/weather', createApiProxy('WEATHER_API_KEY', 'https://api.weather.com/v1'));
 * 
 * // Frontend calls:
 * // fetch('/api/weather?city=NewYork') - API key is hidden
 */

/**
 * Validate API Key Format (if needed)
 */
export function validateApiKeyFormat(key: string, expectedLength?: number): boolean {
  if (!key || typeof key !== 'string') {
    return false;
  }
  
  if (expectedLength && key.length !== expectedLength) {
    return false;
  }
  
  // Add custom validation logic here
  return true;
}

/**
 * Rotate API Keys Safely
 * 
 * 1. Generate new key
 * 2. Update .env file
 * 3. Test with new key
 * 4. Update in production
 * 5. Revoke old key
 */
export function rotateApiKey(oldKeyEnvName: string, newKeyEnvName: string): void {
  const oldKey = process.env[oldKeyEnvName];
  const newKey = process.env[newKeyEnvName];
  
  if (!oldKey || !newKey) {
    throw new Error('Both old and new keys must be set');
  }
  
  // Update environment variable
  // Note: In production, use proper logging service instead of console.log
  process.env[oldKeyEnvName] = newKey;
}

