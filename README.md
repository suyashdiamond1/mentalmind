# Next.js

A modern Next.js 14 application built with TypeScript and Tailwind CSS.

## 🚀 Features

- **Next.js 14** - Latest version with improved performance and features
- **React 18** - Latest React version with enhanced capabilities
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development

## 📋 Prerequisites

- Node.js (v14.x or higher)
- npm or yarn


## 🛠️ Installation

1. Install dependencies:
  ```bash
  npm install
  # or
  yarn install
  ```

2. Start the development server:
  ```bash
  npm run dev
  # or
  yarn dev
  ```
3. Open [http://localhost:4028](http://localhost:4028) with your browser to see the result.

## 📁 Project Structure

```
nextjs-js-tailwind/
├── public/             # Static assets
├── src/
│   ├── app/            # App router components
│   │   ├── layout.tsx  # Root layout component
│   │   └── page.tsx    # Main page component
│   ├── components/     # Reusable UI components
│   ├── styles/         # Global styles and Tailwind configuration
├── next.config.mjs     # Next.js configuration
├── package.json        # Project dependencies and scripts
├── postcss.config.js   # PostCSS configuration
└── tailwind.config.js  # Tailwind CSS configuration

```

## 🧩 Page Editing

You can start editing the page by modifying `src/app/page.tsx`. The page auto-updates as you edit the file.

## 🎨 Styling

This project uses Tailwind CSS for styling with the following features:
- Utility-first approach for rapid development
- Custom theme configuration
- Responsive design utilities
- PostCSS and Autoprefixer integration

## 📦 Available Scripts

- `npm run dev` - Start development server on port 4028
- `npm run build` - Build the application for production
- `npm run start` - Start the development server
- `npm run serve` - Start the production server
- `npm run lint` - Run ESLint to check code quality
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier

## 📱 Deployment

Build the application for production:

  ```bash
  npm run build
  ```

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial

You can check out the [Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🙏 Acknowledgments

- Built with [Rocket.new](https://rocket.new)
- Powered by Next.js and React
- Styled with Tailwind CSS

Built with ❤️ on Rocket.new

## 🔐 Authentication (Google Sign-in)

This project uses Supabase for authentication. A Google Sign-in button is included on the login page and uses Supabase OAuth to authenticate users.

Setup steps:

1. Create a Google Cloud project and configure OAuth credentials:
  - Go to the [Google Cloud Console](https://console.cloud.google.com/).
  - Create a project (or use an existing one).
  - Configure the OAuth consent screen (set application name, support email, and any required scopes).
  - Create OAuth 2.0 Client ID (Application type: Web application).
  - Add the following Authorized redirect URI for the Google credential:
    - `https://<your-supabase-project>.supabase.co/auth/v1/callback`

2. Configure Google provider in Supabase:
  - Open your Supabase project → Authentication → Settings → External OAuth Providers.
  - Paste the Google Client ID and Client Secret from the Google Cloud Console.
  - Save changes.

3. Ensure environment variables are set locally and in production:
  - `NEXT_PUBLIC_SUPABASE_URL` — your Supabase project URL
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` — your Supabase anon/public key

4. Optional: Redirect after login
  - The app currently requests a redirect to `/dashboard` after successful OAuth sign-in. Adjust the redirect target in `src/contexts/AuthContext.tsx` if you need a different path.

After configuration, click the "Sign in with Google" button on the login page to sign in.
