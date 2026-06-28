/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  // redirects() is ignored with output: 'export' — use LegacyRedirect + .htaccess instead.
};

export default nextConfig;
