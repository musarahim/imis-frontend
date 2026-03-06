/**
 * Utility function to convert backend URLs to use the frontend proxy
 * This helps avoid CORS issues when loading files from the backend
 */

export function convertToProxyUrl(backendUrl: string): string {
  if (!backendUrl) return backendUrl;

  // If it's already a proxy URL, return as is
  if (backendUrl.startsWith("/api/")) {
    return backendUrl;
  }

  // Convert backend URLs to use the proxy
  const backendBaseUrl = "http://127.0.0.1:8000";

  if (backendUrl.startsWith(backendBaseUrl)) {
    // Replace backend base URL with proxy path
    return backendUrl.replace(backendBaseUrl, "/api");
  }

  // If it's a relative URL starting with /, prepend /api
  if (backendUrl.startsWith("/") && !backendUrl.startsWith("/api/")) {
    return `/api${backendUrl}`;
  }

  // For other URLs, return as is (external URLs, blob URLs, etc.)
  return backendUrl;
}

/**
 * Get the full backend URL for debugging purposes
 */
export function getFullBackendUrl(path: string): string {
  const backendBaseUrl = "http://127.0.0.1:8000";
  if (path.startsWith("http")) {
    return path;
  }
  return `${backendBaseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
