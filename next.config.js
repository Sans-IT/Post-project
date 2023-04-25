/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.google.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname:"dojkpsqarrtcdhxhsery.supabase.co",
        pathname: "/**",  
      }
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
