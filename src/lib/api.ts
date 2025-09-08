// TrendScouter API Layer with retry, timeout, and caching

import { Trend, Subtrend, Startup, ApiError } from '@/types';

// Import mock data
import mockTrends from '@/mocks/trends.json';
import mockSubtrendsDefenseTech from '@/mocks/subtrends-defense-tech.json';
import mockSubtrendsClimateSolutions from '@/mocks/subtrends-climate-solutions.json';
import mockStartupsMilitaryDrones from '@/mocks/startups-military-drones.json';
import mockStartupsCarbon from '@/mocks/startups-carbon-capture.json';

const API_TIMEOUT = 10000; // 10 seconds
const MAX_RETRIES = 2;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();

// API configuration
const getApiBaseUrl = (): string | null => {
  return import.meta.env.VITE_API_BASE_URL || localStorage.getItem('apiBaseUrl') || null;
};

const shouldUseMocks = (): boolean => {
  return !getApiBaseUrl() || localStorage.getItem('useMocks') === 'true';
};

// Cache utilities
const getCacheKey = (endpoint: string): string => `api:${endpoint}`;

const getCachedData = (key: string): any => {
  const cached = cache.get(key);
  if (!cached) return null;
  
  const isExpired = Date.now() - cached.timestamp > CACHE_DURATION;
  if (isExpired) {
    cache.delete(key);
    return null;
  }
  
  return cached.data;
};

const setCachedData = (key: string, data: any): void => {
  cache.set(key, { data, timestamp: Date.now() });
};

// Mock data helpers
const getMockData = async (endpoint: string): Promise<any> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));
  
  if (endpoint.startsWith('/trends')) {
    if (endpoint.includes('limit=3') || endpoint === '/trends') {
      return mockTrends.slice(0, 3);
    }
  }
  
  if (endpoint.includes('/subtrends')) {
    const trendId = endpoint.split('/')[2];
    if (trendId === 'defense-tech') {
      return mockSubtrendsDefenseTech;
    }
    if (trendId === 'climate-solutions') {
      return mockSubtrendsClimateSolutions;
    }
  }
  
  if (endpoint.includes('/startups')) {
    const subtrendId = endpoint.split('/')[2];
    if (subtrendId === 'military-drones') {
      return mockStartupsMilitaryDrones;
    }
    if (subtrendId === 'carbon-capture') {
      return mockStartupsCarbon;
    }
  }
  
  throw new Error(`Mock data not found for endpoint: ${endpoint}`);
};

// HTTP client with retry and timeout
const fetchWithRetry = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
  
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      return response;
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry on abort (timeout) or client errors (4xx)
      if (error instanceof Error && 
          (error.name === 'AbortError' || 
           (error.message.includes('HTTP 4')))) {
        break;
      }
      
      // Wait before retry (exponential backoff)
      if (attempt < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 1000));
      }
    }
  }
  
  clearTimeout(timeoutId);
  throw lastError || new Error('Request failed');
};

// Main API functions
export const fetchTrends = async (limit?: number): Promise<Trend[]> => {
  const endpoint = `/trends${limit ? `?limit=${limit}` : ''}`;
  const cacheKey = getCacheKey(endpoint);
  
  // Check cache first
  const cached = getCachedData(cacheKey);
  if (cached) return cached;
  
  try {
    if (shouldUseMocks()) {
      const data = await getMockData(endpoint);
      setCachedData(cacheKey, data);
      return data;
    }
    
    const baseUrl = getApiBaseUrl();
    if (!baseUrl) {
      throw new Error('API base URL not configured');
    }
    
    const response = await fetchWithRetry(`${baseUrl}${endpoint}`);
    const data = await response.json();
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching trends:', error);
    throw new Error(`Failed to fetch trends: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const fetchSubtrends = async (trendId: string): Promise<Subtrend[]> => {
  const endpoint = `/trends/${trendId}/subtrends`;
  const cacheKey = getCacheKey(endpoint);
  
  const cached = getCachedData(cacheKey);
  if (cached) return cached;
  
  try {
    if (shouldUseMocks()) {
      const data = await getMockData(endpoint);
      setCachedData(cacheKey, data);
      return data;
    }
    
    const baseUrl = getApiBaseUrl();
    if (!baseUrl) {
      throw new Error('API base URL not configured');
    }
    
    const response = await fetchWithRetry(`${baseUrl}${endpoint}`);
    const data = await response.json();
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching subtrends:', error);
    throw new Error(`Failed to fetch subtrends: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

export const fetchStartups = async (subtrendId: string, limit: number = 3): Promise<Startup[]> => {
  const endpoint = `/subtrends/${subtrendId}/startups?limit=${limit}`;
  const cacheKey = getCacheKey(endpoint);
  
  const cached = getCachedData(cacheKey);
  if (cached) return cached;
  
  try {
    if (shouldUseMocks()) {
      const data = await getMockData(endpoint);
      setCachedData(cacheKey, data);
      return data;
    }
    
    const baseUrl = getApiBaseUrl();
    if (!baseUrl) {
      throw new Error('API base URL not configured');
    }
    
    const response = await fetchWithRetry(`${baseUrl}${endpoint}`);
    const data = await response.json();
    setCachedData(cacheKey, data);
    return data;
  } catch (error) {
    console.error('Error fetching startups:', error);
    throw new Error(`Failed to fetch startups: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

// Utility functions for settings
export const testConnection = async (): Promise<{ success: boolean; latency?: number; error?: string }> => {
  const startTime = Date.now();
  
  try {
    if (shouldUseMocks()) {
      await getMockData('/trends?limit=1');
      return { success: true, latency: Date.now() - startTime };
    }
    
    const baseUrl = getApiBaseUrl();
    if (!baseUrl) {
      return { success: false, error: 'API base URL not configured' };
    }
    
    await fetchWithRetry(`${baseUrl}/trends?limit=1`);
    return { success: true, latency: Date.now() - startTime };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Connection failed' 
    };
  }
};

export const clearCache = (): void => {
  cache.clear();
};