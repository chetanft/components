import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: true,
  
  // Configure Turbopack for Next.js 16
  turbopack: {
    resolveAlias: {
      // Add parent directory to module resolution
      '@components': path.resolve(__dirname, '../src'),
    },
  },
  
  // Enable experimental features for better parent directory support
  serverExternalPackages: [],
  
  // Webpack config for raw source imports (fallback when not using Turbopack)
  webpack: (config) => {
    // Add rule for raw file imports (?raw suffix)
    config.module.rules.push({
      resourceQuery: /raw/,
      type: 'asset/source',
    });
    
    return config;
  },
};

export default nextConfig;
