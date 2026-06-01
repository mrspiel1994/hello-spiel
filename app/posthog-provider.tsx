'use client';

import { useEffect } from 'react';
import posthog from 'posthog-js';

let initialized = false;

function initPosthog(token?: string, host?: string) {
  if (initialized) {
    return;
  }

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
  token,
  host,
}: {
  children: React.ReactNode;
  token?: string;
  host?: string;
}) {
  useEffect(() => {
    initPosthog(token, host);
  }, [host, token]);

  return <>{children}</>;
}
