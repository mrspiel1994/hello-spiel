'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';

export default function Home() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      posthog.capture('home_page_viewed', {
        referrer: document.referrer || null,
        dark_mode: window.matchMedia('(prefers-color-scheme: dark)').matches,
      });
    }, 250);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
      <h1 className="text-5xl font-bold text-black dark:text-white">
        привет Spiel
      </h1>
    </div>
  );
}
