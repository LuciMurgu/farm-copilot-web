"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuthStore } from "@/hooks/use-auth";

/**
 * Protected layout — wraps all (auth) routes.
 * Responsibilities:
 * 1. Check auth on mount via checkAuth() → GET /api/v1/auth/me
 * 2. Redirect to /login if unauthenticated
 * 3. Show loading skeleton while the auth check is in-flight
 * 4. Provide QueryClient to all child pages
 *
 * Auth strategy: cookie-based session (DEC-0017). No token storage.
 */

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 30_000,
      refetchOnWindowFocus: false,
    },
  },
});

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, isLoading, isInitialized, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isInitialized && !user) {
      router.replace("/login");
    }
  }, [isInitialized, user, router]);

  // Show nothing (blank) while checking, then show spinner
  if (!isInitialized || isLoading) {
    return <AuthCheckSkeleton />;
  }

  // Still authenticated but user resolved successfully
  if (!user) {
    // This state is transient — the effect above will redirect.
    return <AuthCheckSkeleton />;
  }

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

function AuthCheckSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="flex flex-col items-center gap-4">
        {/* Branded spinner */}
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-slate-200" />
          <div className="absolute inset-0 w-12 h-12 rounded-full border-4 border-brand-700 border-t-transparent animate-spin" />
        </div>
        <p className="text-sm text-slate-500">Se verifică sesiunea...</p>
      </div>
    </div>
  );
}
