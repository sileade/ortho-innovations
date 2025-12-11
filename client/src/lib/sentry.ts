import * as Sentry from "@sentry/react";

/**
 * Initialize Sentry for error monitoring
 * DSN should be set via environment variable VITE_SENTRY_DSN
 */
export function initSentry() {
  const dsn = import.meta.env.VITE_SENTRY_DSN;
  
  // Only initialize if DSN is provided
  if (!dsn) {
    console.log("[Sentry] No DSN provided, error monitoring disabled");
    return;
  }

  Sentry.init({
    dsn,
    environment: import.meta.env.MODE || "development",
    
    // Performance monitoring
    tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
    
    // Session replay for debugging
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    
    // Filter out non-critical errors
    beforeSend(event, hint) {
      // Ignore network errors that are expected
      const error = hint.originalException;
      if (error instanceof Error) {
        // Ignore canceled requests
        if (error.message.includes("canceled") || error.message.includes("aborted")) {
          return null;
        }
        // Ignore auth errors (handled by app)
        if (error.message.includes("UNAUTHORIZED") || error.message.includes("401")) {
          return null;
        }
      }
      return event;
    },
    
    // Add user context
    initialScope: {
      tags: {
        app: "ortho-patient-app",
        version: import.meta.env.VITE_APP_VERSION || "1.0.0",
      },
    },
  });

  console.log("[Sentry] Error monitoring initialized");
}

/**
 * Set user context for error tracking
 */
export function setSentryUser(user: { id: string; email?: string; name?: string } | null) {
  if (user) {
    Sentry.setUser({
      id: user.id,
      email: user.email,
      username: user.name,
    });
  } else {
    Sentry.setUser(null);
  }
}

/**
 * Capture a custom error with additional context
 */
export function captureError(error: Error, context?: Record<string, any>) {
  Sentry.captureException(error, {
    extra: context,
  });
}

/**
 * Add breadcrumb for debugging
 */
export function addBreadcrumb(message: string, category: string, data?: Record<string, any>) {
  Sentry.addBreadcrumb({
    message,
    category,
    data,
    level: "info",
  });
}

/**
 * Capture a custom message
 */
export function captureMessage(message: string, level: "info" | "warning" | "error" = "info") {
  Sentry.captureMessage(message, level);
}

export { Sentry };
