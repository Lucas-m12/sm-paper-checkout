await import("./src/env.mjs");

/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  experimental: {
    instrumentationHook: true,
  }
};

export default nextConfig;
