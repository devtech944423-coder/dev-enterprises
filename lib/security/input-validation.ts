/**
 * Input Validation and Sanitization
 * Purpose: Prevent XSS attacks by validating and sanitizing user input
 * 
 * Note: This is a template file. The contact form has its own validation.
 * For Express.js projects, install: npm install express-validator xss
 */

import xss from 'xss';

/**
 * XSS Sanitization Function
 * Removes potentially dangerous HTML/JavaScript from user input
 */
export function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  // Remove HTML tags and encode special characters
  return xss(input, {
    whiteList: {}, // No allowed tags
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script', 'style']
  });
}

/**
 * Sanitize object recursively
 */
export function sanitizeObject<T extends Record<string, any>>(obj: T): T {
  const sanitized = { ...obj } as any;
  
  for (const key in sanitized) {
    if (typeof sanitized[key] === 'string') {
      sanitized[key] = sanitizeInput(sanitized[key]);
    } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key] = sanitizeObject(sanitized[key]);
    }
  }
  
  return sanitized as T;
}

/**
 * Note: Express.js validation rules are commented out as express-validator is not installed.
 * This project uses client-side validation in the contact form.
 * 
 * To use Express.js validation in future API routes, install express-validator and uncomment:
 * 
 * import { body, validationResult, ValidationChain } from 'express-validator';
 * 
 * export const contactFormValidation: ValidationChain[] = [
 *   body('name')
 *     .trim()
 *     .notEmpty().withMessage('Name is required')
 *     .isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters')
 *     .matches(/^[a-zA-Z\s'-]+$/).withMessage('Name contains invalid characters')
 *     .customSanitizer((value) => sanitizeInput(value)),
 *   // ... more rules
 * ];
 */

/**
 * Client-side validation helper (for reference - server-side is authoritative)
 */
export const clientValidation = {
  name: (value: string): string | null => {
    if (!value || value.trim().length < 2) {
      return 'Name must be at least 2 characters';
    }
    if (value.length > 100) {
      return 'Name must be less than 100 characters';
    }
    if (!/^[a-zA-Z\s'-]+$/.test(value)) {
      return 'Name contains invalid characters';
    }
    return null;
  },
  
  email: (value: string): string | null => {
    if (!value) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Invalid email format';
    }
    return null;
  },
  
  message: (value: string): string | null => {
    if (!value || value.trim().length < 10) {
      return 'Message must be at least 10 characters';
    }
    if (value.length > 2000) {
      return 'Message must be less than 2000 characters';
    }
    return null;
  }
};

