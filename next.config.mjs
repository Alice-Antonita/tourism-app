/** @type {import('next').NextConfig} */
const nextConfig = {  reactStrictMode: true,
    output: 'standalone',  modularizeImports: {
        '@mui/icons-material': {
          transform: '@mui/icons-material/{{member}}',
          preventFullImport: true
        }
      },};

export default nextConfig;
