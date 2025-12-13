/**
 * reCAPTCHA Component (Frontend)
 * Purpose: Add reCAPTCHA to forms
 * 
 * Installation:
 * npm install react-google-recaptcha
 * 
 * For reCAPTCHA v3 (invisible, score-based):
 * - Automatically runs on page load
 * - No user interaction needed
 * - Returns a score (0.0 to 1.0)
 * 
 * For reCAPTCHA v2 (checkbox):
 * - User must check the box
 * - More intrusive but more reliable
 */

'use client';

import { useEffect, useRef } from 'react';

// For reCAPTCHA v3 (Recommended - Invisible)
export function RecaptchaV3({ onVerify }: { onVerify: (token: string) => void }) {
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    
    if (!siteKey) {
      return;
    }
    
    // Load reCAPTCHA script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    
    script.onload = () => {
      // Execute reCAPTCHA on form submission
      const executeRecaptcha = () => {
        if (window.grecaptcha) {
          window.grecaptcha.ready(() => {
            window.grecaptcha.execute(siteKey, { action: 'submit' })
              .then((token: string) => {
                onVerify(token);
              })
              .catch(() => {
                // Silently handle reCAPTCHA errors
              });
          });
        }
      };
      
      // Store execute function globally for form submission
      (window as any).executeRecaptcha = executeRecaptcha;
    };
    
    return () => {
      // Cleanup
      const existingScript = document.querySelector(`script[src*="recaptcha"]`);
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [onVerify]);
  
  return null; // Invisible - no UI
}

// For reCAPTCHA v2 (Checkbox - Alternative)
export function RecaptchaV2({ onVerify }: { onVerify: (token: string) => void }) {
  const recaptchaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    
    if (!siteKey) {
      return;
    }
    
    // Load reCAPTCHA script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    
    script.onload = () => {
      if (window.grecaptcha && recaptchaRef.current) {
        window.grecaptcha.render(recaptchaRef.current, {
          sitekey: siteKey,
          callback: (token: string) => {
            onVerify(token);
          },
          'expired-callback': () => {
            // Silently handle reCAPTCHA expiration
          }
        });
      }
    };
  }, [onVerify]);
  
  return (
    <div ref={recaptchaRef} className="my-4" />
  );
}

// TypeScript declarations
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
      render: (container: HTMLElement, options: any) => number;
    };
  }
}

