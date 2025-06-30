// @/components/ThemeProviderComponent.tsx
"use client";

import { ThemeProvider } from 'next-themes';
import type { ThemeProviderProps } from 'next-themes/dist/types'; // Import type for props
import { useEffect, useState } from 'react';

// This component ensures that the ThemeProvider is only rendered on the client
// and helps avoid hydration mismatches.
export function ThemeProviderComponent({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return null or a loader on the server and during initial client render
    // to prevent hydration mismatch if the theme is loaded from localStorage.
    // Children are rendered to ensure layout consistency if needed.
    return <>{children}</>;
  }

  return <ThemeProvider {...props}>{children}</ThemeProvider>;
}
