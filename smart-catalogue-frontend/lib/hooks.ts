import { useAuth } from "@clerk/nextjs";
import useSWR from "swr";

const fetcher = async (url: string, token: string | null) => {
  if (!token) return null;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

export function useBusiness() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  
  const { data, error, isLoading, mutate } = useSWR(
    isLoaded && isSignedIn ? "http://localhost:5000/api/business/my" : null,
    async (url) => fetcher(url, await getToken())
  );

  return { business: data, isLoading, error, mutate };
}

export function useProducts() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  
  const { data, error, isLoading, mutate } = useSWR(
    isLoaded && isSignedIn ? "http://localhost:5000/api/products/my" : null,
    async (url) => fetcher(url, await getToken())
  );

  return { products: data || [], isLoading, error, mutate };
}

export function useDashboardAnalytics() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  
  const { data, error, isLoading } = useSWR(
    isLoaded && isSignedIn ? "http://localhost:5000/api/analytics/dashboard" : null,
    async (url) => fetcher(url, await getToken())
  );

  return { analytics: data, isLoading, error };
}

// ── SUPER ADMIN HOOKS ──

export function useSuperAdminStats() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  
  const { data, error, isLoading } = useSWR(
    isLoaded && isSignedIn ? "http://localhost:5000/api/founder/stats/platform" : null,
    async (url) => fetcher(url, await getToken())
  );

  return { stats: data, isLoading: !isLoaded || isLoading, error };
}

export function useSuperAdminBusinesses(page = 1, search = "") {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  
  const { data, error, isLoading, mutate } = useSWR(
    isLoaded && isSignedIn 
      ? `http://localhost:5000/api/founder/businesses?page=${page}&search=${encodeURIComponent(search)}`
      : null,
    async (url) => fetcher(url, await getToken())
  );

  return { 
    businesses: data?.data || [], 
    pagination: data?.pagination || null, 
    isLoading: !isLoaded || isLoading, 
    error,
    mutate 
  };
}

export function useSuperAdminSystemHealth() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  
  // Refetch health stats every 5 seconds for a "live" feel
  const { data, error, isLoading } = useSWR(
    isLoaded && isSignedIn ? "http://localhost:5000/api/founder/system/health" : null,
    async (url) => fetcher(url, await getToken()),
    { refreshInterval: 5000 }
  );

  return { health: data, isLoading: !isLoaded || isLoading, error };
}
