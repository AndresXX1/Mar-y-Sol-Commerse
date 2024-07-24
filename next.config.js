const path = require('path');

module.exports = {
  trailingSlash: true,
  reactStrictMode: false,
  experimental: {
    esmExternals: false,
  },
  webpack: config => {
    config.resolve.alias = {
     ...config.resolve.alias,
      apexcharts: path.resolve(__dirname, './node_modules/apexcharts-clevision')
    };

    return config;
  },
  async rewrites() {
    return [
      {
        source: '/:path*', // Ruta en tu aplicación Next.js
        destination: 'http://localhost:3001/:path*', // Ruta en tu backend
      },
    ];
  },
};
