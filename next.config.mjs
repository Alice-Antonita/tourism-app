/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',

  images: {
    domains: ['source.unsplash.com']
  },
  compiler: {
    removeConsole: { exclude: ['error'] }
  },
  modularizeImports: {
    '@mui/icons-material': {
      transform: '@mui/icons-material/{{member}}',
      preventFullImport: true
    }
  }
};

export default nextConfig;
