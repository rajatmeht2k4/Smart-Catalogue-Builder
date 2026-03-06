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
