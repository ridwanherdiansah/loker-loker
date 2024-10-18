/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  env: {
    apiUrl: "http://127.0.0.1:8000/api/",
  },

  images: {
    domains: [
      "https://via.placeholder.com"
    ],
  },

};

module.exports = nextConfig;



