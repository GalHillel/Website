# Gal Hillel - Personal Portfolio Website

This is the personal portfolio website for Gal Hillel, a software developer. It's built with Next.js, Tailwind CSS, and `react-i18next` for a modern, responsive, bilingual, and editable experience.

## Features

*   **Bilingual Interface**: English and Hebrew with full RTL/LTR support.
*   **Dark/Light Mode**: User-selectable theme preference (Note: `next-themes` package installation is currently pending due to an environment issue, so persistence might be affected).
*   **Admin Panel**: A simple admin interface at `/admin` for content editing.
*   **Responsive Design**: Optimized for mobile, tablet, and desktop devices.
*   **Project Gallery**: Displays projects with tags, images, and links.
*   **Skills Breakdown**: Categorized skills with visual proficiency indicators.
*   **Working Contact Form**: (Currently logs to console; backend integration like EmailJS/Formspree can be added).
*   **Resume Download**: Link to download PDF resume.
*   **Animations**: Subtle animations using Framer Motion.

## Tech Stack

*   **Framework**: Next.js 15 (App Router)
*   **Styling**: Tailwind CSS
*   **Language/UI**: TypeScript, React
*   **Internationalization (i18n)**: `react-i18next`, `i18next-browser-languagedetector`
*   **Animations**: Framer Motion
*   **State Management**: React Context API / Local Component State
*   **Linting/Formatting**: ESLint (as per Next.js setup)
*   **Content Management**: JSON file (`src/entities/SiteContent.json`) edited via a basic Admin Panel.

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
    *Note: There's an ongoing environment issue affecting `cd` commands and some `npm install` operations within the development environment. If you encounter issues, ensure you are in the correct `portfolio` directory before running `npm install`. The `next-themes` package, specifically, might be missing due to this.*

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
    *   Set `NEXT_PUBLIC_ADMIN_PASSWORD` to your desired admin panel password.
    *   Set `NEXT_PUBLIC_SITE_URL` to your production domain (e.g., `https://www.yourdomain.com`). This is used for metadata.
6.  Click "Deploy".

### Deploying on Netlify

1.  Push your code to a Git repository.
2.  Go to [Netlify](https://app.netlify.com/signup) and sign up or log in.
3.  Click "New site from Git".
4.  Connect to your Git provider and select your repository.
5.  Netlify should detect it as a Next.js project. Build command is typically `npm run build` (or `next build`) and publish directory is `.next`. If using static export, it might be `out`. For App Router, default Next.js deployment is usually server-based.
6.  **Environment Variables**:
    *   Set `NEXT_PUBLIC_ADMIN_PASSWORD` to your desired admin panel password.
    *   Set `NEXT_PUBLIC_SITE_URL` to your production domain.
7.  Click "Deploy site".

## Admin Panel Usage

1.  Navigate to `/admin` on your website (e.g., `http://localhost:3000/admin`).
2.  You will be prompted for a password.
    *   For local development, if `NEXT_PUBLIC_ADMIN_PASSWORD` is not set in a `.env.local` file, the default password is `admin123`.
    *   For production, use the password you set as an environment variable.
3.  Once authenticated, you will see the Admin Dashboard.
4.  Currently, the dashboard displays forms for editing User Information and the About Me section. Other sections (Projects, Skills, etc.) will have their forms added in future development.
5.  **Important**: The "Save Changes" functionality (writing back to `SiteContent.json`) is **not yet implemented** in this phase. Modifications made in the admin panel are currently only reflected in the component's state and are not persisted.

## Updating Content

All user-facing content (text, project details, skills, etc.) is primarily managed through the `src/entities/SiteContent.json` file.

### Manual Content Update (Current Method)

1.  Open the `src/entities/SiteContent.json` file in your code editor.
2.  Locate the section you wish to update (e.g., `hero`, `about`, `projects`, `skills`).
3.  Modify the text content directly within the JSON structure.
    *   For bilingual fields (like `tagline`, `bio`), ensure you update both `en` (English) and `he` (Hebrew) versions.
    *   For arrays like `projects` or `skills`, you can add, remove, or modify objects within the array.
4.  Save the `SiteContent.json` file.
5.  If your development server is running, changes should be reflected automatically (or may require a page refresh).
6.  Commit and push your changes to your Git repository to update the live site after deployment.

### Future Content Update (Via Admin Panel)

Once the "Save Changes" functionality is implemented in the Admin Panel:
1.  Access the `/admin` route and log in.
2.  Navigate to the relevant section (e.g., "Edit About Me", "Manage Projects").
3.  Make your changes using the forms provided.
4.  Click "Save Changes". This will (in the future) update the `SiteContent.json` file or a backend data source.

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
│   │   ├── I18nProviderClientComponent.tsx
│   │   ├── ThemeProviderComponent.tsx
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
