# Gal Hillel - Personal Portfolio Website

A modern, responsive, and production-grade personal portfolio website built with **Next.js 15**, **Tailwind CSS**, and **TypeScript**.

## Features

*   **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
*   **Theming**: Integrated Dark/Light mode support.
*   **Dynamic Content**: Content managed via `src/data/SiteContent.json` for easy updates.
*   **Admin Panel**: Built-in `/admin` interface for local content preview (changes saved to `localStorage`).
*   **Animations**: Smooth, performance-optimized animations using Framer Motion.
*   **Contact Form**: Functional integration with EmailJS.
*   **SEO Optimized**: Semantic HTML and metadata configuration.

## Tech Stack

*   **Framework**: Next.js 15 (App Router)
*   **Styling**: Tailwind CSS
*   **Language**: TypeScript
*   **Animation**: Framer Motion
*   **Icons**: Lucide React
*   **Data**: JSON-based static content

## Getting Started

### Prerequisites

*   Node.js (v18+ recommended)
*   npm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

Create an optimized production build:

```bash
npm run build
npm start
```

## Project Structure

```
/portfolio
├── public/                 # Static assets
├── src/
│   ├── app/                # Next.js App Router pages & layouts
│   ├── components/         # Reusable React components
│   │   ├── admin/          # Admin dashboard components
│   │   └── ...
│   ├── data/               # Static content (SiteContent.json)
│   ├── lib/                # Utilities (cn, etc.)
│   └── services/           # Data fetching services
├── next.config.ts          # Next.js config
├── tailwind.config.ts      # Tailwind config
└── tsconfig.json           # TypeScript config
```

## Configuration

### Contact Form (EmailJS)

To enable the contact form, create a `.env.local` file with your EmailJS credentials:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

### Admin Panel

The admin panel is accessible at `/admin`.
- **Default Password**: `admin123` (for development)
- **Production**: Set `NEXT_PUBLIC_ADMIN_PASSWORD` in your environment variables.

> **Note**: Changes made in the Admin Panel are saved to **Local Storage** for preview purposes and do not persist to the server file system.

## Deployment

Deploy easily to **Vercel** or **Netlify**. Ensure you configure the Environment Variables listed above in your project settings.
