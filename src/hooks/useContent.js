import { useState, useEffect } from "react";
import * as cms from "../lib/cms";

function useAsync(fetcher, fallback = null, deps = []) {
  const [data, setData] = useState(fallback);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetcher()
      .then((result) => {
        if (!cancelled) {
          setData(result && (Array.isArray(result) ? result.length > 0 : result) ? result : fallback);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err);
          setData(fallback);
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, deps); // eslint-disable-line react-hooks/exhaustive-deps

  return { data, loading, error };
}

export function useHeroSection(page) {
  return useAsync(() => cms.getHeroSection(page), null, [page]);
}

export function useServices() {
  return useAsync(() => cms.getServices(true), []);
}

export function useProjects() {
  return useAsync(() => cms.getProjects(true), []);
}

export function useTeamMembers() {
  return useAsync(() => cms.getTeamMembers(true), []);
}

export function usePricingPlans() {
  return useAsync(() => cms.getPricingPlans(true), []);
}

export function useTimelineEvents() {
  return useAsync(() => cms.getTimelineEvents(true), []);
}

export function useMetrics(page = "home") {
  return useAsync(() => cms.getMetrics(page), [], [page]);
}

export function useTestimonials() {
  return useAsync(() => cms.getTestimonials(true), []);
}

export function useSiteSettings() {
  return useAsync(() => cms.getSettings(), {});
}
