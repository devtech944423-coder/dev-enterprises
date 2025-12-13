# Dev Enterprises - Next.js Website

A modern, responsive Next.js website for Dev Enterprises, featuring a dark-themed design with semiconductor-inspired colors (slate background with cyan and sky blue accents).

## Features

- **Four Main Pages**: Home, Products, About, and Contact
- **Responsive Design**: Fully mobile-friendly using Tailwind CSS responsive utilities
- **Interactive Carousel**: Auto-rotating carousel on the home page
- **Contact Form**: Footer contact form with email integration
- **Modern UI/UX**: Clean design with proper spacing, typography, and accessible color contrasts
- **TypeScript**: All components and pages written in TypeScript

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Email Configuration

To enable the contact form email functionality, create a `.env.local` file in the root directory with the following variables:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=noreply@deventerprises.com
CONTACT_EMAIL=contact@deventerprises.com
```

**Note**: For Gmail, you'll need to use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password. For other email providers, adjust the SMTP settings accordingly.

## Project Structure

```
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # API route for contact form
│   ├── about/
│   │   └── page.tsx              # About page
│   ├── contact/
│   │   └── page.tsx              # Contact page
│   ├── products/
│   │   └── page.tsx              # Products page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── components/
│   ├── Navbar.tsx                # Navigation component
│   ├── Footer.tsx                # Footer with contact form
│   └── Carousel.tsx              # Carousel component
└── tailwind.config.js            # Tailwind configuration
```

## Pages

- **Home** (`/`): Features a carousel with three slides and an overview of product categories
- **Products** (`/products`): Lists five product categories with descriptions and sample items
- **About** (`/about`): Company information, values, and achievements
- **Contact** (`/contact`): Contact details, business hours, and information

## Technologies Used

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Nodemailer (for email functionality)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Remember to add your environment variables in the Vercel dashboard for email functionality to work in production.
