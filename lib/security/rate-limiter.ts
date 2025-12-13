/**
 * Rate Limiting Middleware
 * Purpose: Prevent abuse and DDoS attacks by limiting request frequency
 * 
 * Note: This is a template file. This Next.js project uses custom rate limiting
 * in middleware.ts instead of express-rate-limit.
 * 
 * For Express.js projects, install: npm install express-rate-limit
 * 
 * Example Express.js usage:
 * 
 * import rateLimit from 'express-rate-limit';
 * 
 * export const generalLimiter = rateLimit({
 *   windowMs: 15 * 60 * 1000, // 15 minutes
 *   max: 100, // Limit each IP to 100 requests per windowMs
 *   message: {
 *     success: false,
 *     error: 'Too many requests from this IP, please try again later.'
 *   },
 *   standardHeaders: true,
 *   legacyHeaders: false,
 * });
 * 
 * // Usage:
 * app.use('/api/', generalLimiter);
 */

