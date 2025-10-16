// Detect which subdomain we’re on
const hostname = window.location.hostname; // e.g. test2.csaap.com
console.log(hostname);

const parts = hostname.split('.');

// Identify tenant subdomain name
export const SUBDOMAIN = parts.length > 2 ? parts[0] : null;

// Base API URL setup
export const API_BASE =
  import.meta.env.MODE === 'development'
    ? '/api' // local dev proxy (vite.config.js)
    : 'https://api.csaap.com'; // production

// Final API endpoint (tenant-aware)
export const TENANT_API = SUBDOMAIN
  ? `${API_BASE}/api/${SUBDOMAIN}`
  : `${API_BASE}/api`;
