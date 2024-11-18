/** @type {import('next').NextConfig} */
const nextConfig = {
  //To protect your application from malicious users, configuration is required in order to use external images. This ensures that only external images from your account can be served from the Next.js Image Optimization API.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'https://s3-inventory-app.s3.us-west-2.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
