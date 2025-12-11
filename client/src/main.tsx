import { trpc } from "@/lib/trpc";
import { UNAUTHED_ERR_MSG } from '@shared/const';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import { createRoot } from "react-dom/client";
import superjson from "superjson";
import App from "./App";
import { getLoginUrl } from "./const";
import { initSentry, captureError } from "./lib/sentry";
import { registerServiceWorker, setupNetworkListeners } from "./lib/serviceWorker";
import "./index.css";

// Initialize Sentry for error monitoring
initSentry();

// Register service worker for offline support (production only)
registerServiceWorker({
  onUpdate: () => {
    console.log('[App] New version available');
  },
  onSuccess: () => {
    console.log('[App] App ready for offline use');
  },
});

// Setup network listeners
setupNetworkListeners({
  onOffline: () => console.log('[App] Network offline'),
  onOnline: () => console.log('[App] Network online'),
});

const queryClient = new QueryClient();

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError)) return;
  if (typeof window === "undefined") return;

  const isUnauthorized = error.message === UNAUTHED_ERR_MSG;

  if (!isUnauthorized) return;

  window.location.href = getLoginUrl();
};

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.query.state.error;
    redirectToLoginIfUnauthorized(error);
    // Send error to Sentry
    if (error instanceof Error) {
      captureError(error, { type: 'query', queryKey: event.query.queryKey });
    }
    console.error("[API Query Error]", error);
  }
});

queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") {
    const error = event.mutation.state.error;
    redirectToLoginIfUnauthorized(error);
    // Send error to Sentry
    if (error instanceof Error) {
      captureError(error, { type: 'mutation' });
    }
    console.error("[API Mutation Error]", error);
  }
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "/api/trpc",
      transformer: superjson,
      fetch(input, init) {
        return globalThis.fetch(input, {
          ...(init ?? {}),
          credentials: "include",
        });
      },
    }),
  ],
});

createRoot(document.getElementById("root")!).render(
  <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </trpc.Provider>
);
