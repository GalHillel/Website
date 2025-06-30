// @/components/LoadI18n.tsx
'use client';

import { useEffect } from 'react';

export default function LoadI18n() {
  useEffect(() => {
    // Dynamically import i18n.js only on the client-side
    import('@/i18n'); // Assuming your i18n.js is in src/i18n.js
  }, []);

  return null; // This component does not render anything
}
