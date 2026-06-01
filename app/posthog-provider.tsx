'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';

let initialized = false;

function initPosthog() {
  if (initialized) {
    return;
  }

  const token = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;

  if (!token) {
    return;
  }

  posthog.init(token, {
    api_host: host ?? '/ingest',
    ui_host: 'https://eu.posthog.com',
    defaults: '2026-01-30',
    capture_exceptions: true,
    debug: process.env.NODE_ENV === 'development',
  });

  initialized = true;
}

export function PosthogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    initPosthog();
  }, []);

  return <>{children}</>;
}
