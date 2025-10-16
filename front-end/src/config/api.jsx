// Detect which subdomain we're on
const getSubdomain = () => {
  if (typeof window === 'undefined') return null; // SSR safety
  
  const hostname = window.location.hostname;
  console.log('Current hostname:', hostname);
  
  const parts = hostname.split('.');
  return parts.length > 2 ? parts[0] : null;
};

// Base API URL setup
export const API_BASE = import.meta.env.DEV 
  ? '/api' // local dev proxy (vite.config.js)
  : 'https://api.csaap.com'; // production

// Get subdomain
export const SUBDOMAIN = getSubdomain();

// Final API endpoint (tenant-aware)
export const TENANT_API = SUBDOMAIN
  ? `${API_BASE}/api/${SUBDOMAIN}`
  : `${API_BASE}/api`;

// For use in components
export default {
  SUBDOMAIN,
  API_BASE,
  TENANT_API,
};