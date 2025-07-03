// Use proxy in development, direct URL in production
export const BASE_URL = import.meta.env.DEV 
  ? "" // Use relative URLs to work with Vite proxy
  : "https://localheroes.vercel.app"