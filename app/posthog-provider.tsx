'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';

let initialized = false;

function initPosthog() {
  if (initialized) {
    return;
  }

  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  if (!token) {
    return;
  }

  posthog.init(token, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? '/ingest',
    ui_host: 'https://eu.posthog.com',
    defaults: '2026-01-30',
    capture_exceptions: true,
    debug: process.env.NODE_ENV === 'development',
  });

  initialized = true;
}

export function PosthogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log('[posthog] provider mounted', {
      hasToken: Boolean(process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN),
      host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? '/ingest',
    });
    initPosthog();
  }, []);

  return <>{children}</>;
}
