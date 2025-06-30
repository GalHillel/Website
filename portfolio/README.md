# Gal Hillel - Personal Portfolio Website

This is the personal portfolio website for Gal Hillel, a software developer. It's built with Next.js, Tailwind CSS, and `react-i18next` for a modern, responsive, English-only, and editable experience.

## Features

*   **English-Only Interface**: Clean and professional.
*   **Dark/Light Mode**: User-selectable theme preference (Note: `next-themes` package installation is currently pending due to an environment issue, so full persistence/system preference matching might be affected).
*   **Admin Panel**: A simple admin interface at `/admin` for content editing (changes saved to browser's `localStorage`).
*   **Responsive Design**: Optimized for mobile, tablet, and desktop devices.
*   **Project Gallery**: Displays projects with tags, images, and links.
*   **Skills Breakdown**: Categorized skills with visual proficiency indicators.
*   **Working Contact Form**: Integrated with EmailJS (requires user configuration).
*   **Resume Download**: Link to download PDF resume.
*   **Animations**: Subtle animations using Framer Motion.

## Tech Stack

*   **Framework**: Next.js 15 (App Router)
*   **Styling**: Tailwind CSS
*   **Language/UI**: TypeScript, React
*   **Internationalization (i18n)**: `react-i18next` (configured for English only).
*   **Animations**: Framer Motion
*   **Contact Form**: EmailJS (`emailjs-com` package - needs to be installed by user).
*   **State Management**: React Context API / Local Component State.
*   **Linting/Formatting**: ESLint (as per Next.js setup).
*   **Content Management**: JSON file (`src/entities/SiteContent.json`) with edits managed via Admin Panel (saved to `localStorage`).

## Getting Started

### Prerequisites

*   Node.js (v18.x or later recommended)
*   npm (or yarn/pnpm)

### Installation

1.  **Clone the repository (if applicable):**
    ```bash
    git clone <repository-url>
    cd portfolio
    ```
    (Or, if you already have the files, navigate to the `portfolio` directory.)

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    *Note: There's an ongoing environment issue affecting `cd` commands and some `npm install` operations within the development environment. If you encounter issues, ensure you are in the correct `portfolio` directory before running `npm install`. The `next-themes` and `emailjs-com` packages, specifically, might be missing due to this. If so, try installing them manually:*
    ```bash
    # From within the 'portfolio' directory if cd works, or using --prefix if it doesn't
    npm install next-themes emailjs-com
    # OR if cd fails:
    # npm install next-themes emailjs-com --prefix ./portfolio
    ```

### Running the Development Server

Execute the following command:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The page auto-updates as you edit files.

## Deployment

This Next.js application is optimized for deployment on platforms like Vercel (from the creators of Next.js) or Netlify.

### Deploying on Vercel

1.  Push your code to a Git repository (GitHub, GitLab, Bitbucket).
2.  Go to [Vercel](https://vercel.com/new) and sign up or log in.
3.  Click "Import Project" and select your Git repository.
4.  Vercel will automatically detect that it's a Next.js project and configure the build settings.
5.  **Environment Variables**:
    *   `NEXT_PUBLIC_ADMIN_PASSWORD`: Your desired admin panel password.
    *   `NEXT_PUBLIC_SITE_URL`: Your production domain (e.g., `https://www.yourdomain.com`), used for metadata.
    *   `NEXT_PUBLIC_EMAILJS_SERVICE_ID`: Your EmailJS Service ID.
    *   `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`: Your EmailJS Template ID.
    *   `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`: Your EmailJS Public Key (User ID).
6.  Click "Deploy".

### Deploying on Netlify

1.  Push your code to a Git repository.
2.  Go to [Netlify](https://app.netlify.com/signup) and sign up or log in.
3.  Click "New site from Git".
4.  Connect to your Git provider and select your repository.
5.  Netlify should detect it as a Next.js project. Build command is typically `npm run build` (or `next build`) and publish directory is `.next`. If using static export, it might be `out`. For App Router, default Next.js deployment is usually server-based.
6.  **Environment Variables**:
    *   `NEXT_PUBLIC_ADMIN_PASSWORD`: Your desired admin panel password.
    *   `NEXT_PUBLIC_SITE_URL`: Your production domain.
    *   `NEXT_PUBLIC_EMAILJS_SERVICE_ID`: Your EmailJS Service ID.
    *   `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`: Your EmailJS Template ID.
    *   `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`: Your EmailJS Public Key (User ID).
7.  Click "Deploy site".

## Configuring Contact Form (EmailJS)

To make the contact form functional, you need to sign up for a free account at [EmailJS](https://www.emailjs.com/) and configure it:

1.  **Create an Email Service**: In your EmailJS dashboard, add a new email service (e.g., Gmail, Outlook, or your own SMTP server).
2.  **Create an Email Template**: Create a new email template. It should include variables for `from_name`, `from_email`, and `message`. For example:
    ```
    New message from: {{from_name}} ({{from_email}})

    Message:
    {{message}}
    ```
3.  **Find Your Credentials**: Note down your:
    *   Service ID
    *   Template ID
    *   Public Key (User ID - found under Account > API Keys)
4.  **Set Environment Variables**: Create a `.env.local` file in the root of your `portfolio` directory (if it doesn't exist) and add your EmailJS credentials. For deployment, set these in your hosting provider's environment variable settings:
    ```env
    NEXT_PUBLIC_EMAILJS_SERVICE_ID=YOUR_SERVICE_ID
    NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=YOUR_TEMPLATE_ID
    NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=YOUR_PUBLIC_KEY
    ```
    Replace `YOUR_SERVICE_ID`, etc., with your actual credentials.
5.  **Install `emailjs-com` package** (if not already installed due to environment issues):
    ```bash
    npm install emailjs-com
    ```

## Admin Panel Usage

1.  Navigate to `/admin` on your website (e.g., `http://localhost:3000/admin`).
2.  You will be prompted for a password.
    *   For local development, if `NEXT_PUBLIC_ADMIN_PASSWORD` is not set in your `.env.local` file, the default password is `admin123`.
    *   For production, use the password you set as an environment variable.
3.  Once authenticated, you will see the Admin Dashboard.
4.  You can edit content for various sections (User Info, About, Hero, Projects, Skills, Site Metadata).
5.  **Important**: Changes made in the admin panel are currently **saved locally to your browser's `localStorage`**. They do *not* update the actual `src/entities/SiteContent.json` file on the server and will not be reflected for other users or in new browser sessions if local storage is cleared. This is for demonstration and local preview purposes. To make permanent changes to the site's content, you must directly edit `src/entities/SiteContent.json` and redeploy.

## Updating Content

### Permanent Content Updates (Recommended)

1.  Open the `src/entities/SiteContent.json` file in your code editor.
2.  Locate the section you wish to update (e.g., `hero`, `about`, `projects`, `skills`).
3.  Modify the text content directly within the JSON structure. (All content is now English-only).
4.  For arrays like `projects` or `skills`, you can add, remove, or modify objects. Ensure IDs for projects are unique.
5.  Save the `SiteContent.json` file.
6.  Commit and push your changes to your Git repository. This will trigger a new deployment on Vercel/Netlify, making your changes live.

### Temporary Local Preview (Via Admin Panel)

As described in "Admin Panel Usage", changes made via `/admin` are stored in `localStorage` and allow you to preview edits in your current browser session. These changes are not permanent and do not affect the deployed site.

## Folder and File Structure

Here's an overview of the key directories and files:

```
/portfolio
├── public/                     # Static assets (images, favicon, etc.)
│   ├── favicon.ico
│   ├── og-image.png
│   └── apple-touch-icon.png
│   └── placeholder-profile.jpg
├── resume/                     # Resume PDF
│   └── Gal_Hillel_Resume.pdf
├── src/
│   ├── app/                    # Next.js App Router: Pages and layouts
│   │   ├── (default)/          # Default route group for main pages
│   │   │   ├── about/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── projects/page.tsx
│   │   │   └── skills/page.tsx
│   │   ├── admin/page.tsx      # Admin panel page
│   │   ├── layout.tsx          # Root layout for the entire application
│   │   └── page.tsx            # Home page
│   │   └── globals.css         # Global styles, Tailwind @imports
│   ├── components/             # Reusable React components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Layout.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── AnimatedSection.tsx
│   │   ├── LoadI18n.tsx            # Client-side i18n loader
│   │   ├── ThemeProviderComponent.tsx
│   │   ├── DynamicSkillsHighlight.tsx
│   │   └── admin/
│   │       └── AdminDashboardClient.tsx # Client component for admin dashboard UI
│   ├── entities/               # Data structures, JSON content
│   │   └── SiteContent.json    # Main content file for the website
│   └── i18n.js                 # i18next configuration and translations
├── next.config.ts              # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── postcss.config.mjs          # PostCSS configuration (often for Tailwind)
├── package.json                # Project dependencies and scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

## Inline Code Comments

Inline comments have been added to key components and logic throughout the codebase to explain functionality, especially for more complex parts or future improvements.

---

This README provides a comprehensive guide to understanding, running, deploying, and managing this portfolio website.
