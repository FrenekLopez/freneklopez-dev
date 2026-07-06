import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 1. Internal redirect configuration (Metrics)
  allowedDevOrigins: ["192.168.86.24"],
  async rewrites() {
    return [
      {
        source: "/stats/:match*",
        destination: "http://3.144.237.139:3000/:match*",
      },
    ];
  },

  // 2. Global security headers configuration
  async headers() {
    const cspPolicy = `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' http://3.144.237.139:3000;
      style-src 'self' 'unsafe-inline';
      img-src 'self' blob: data:;
      connect-src 'self' ${process.env.NEXT_PUBLIC_API_URL || ""} http://3.144.237.139:3000;
      font-src 'self';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
    `
      .replace(/\s{2,}/g, " ")
      .trim(); // Strips extra spaces and line breaks to ensure valid header formatting

    return [
      {
        source: "/(.*)", // Applies safety headers across all application routes
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspPolicy,
          },
          {
            key: "X-Frame-Options",
            value: "DENY", // Prevents Clickjacking attacks by disabling iframe embedding
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff", // Mitigates MIME-type sniffing vulnerabilities
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin", // Protects user navigation data privacy
          },
        ],
      },
    ];
  },
};

export default nextConfig;
