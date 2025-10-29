// const dotenv = require("dotenv");
// const path = require("path");

import dotenv from "dotenv";
import path from "path";

const __dirname = path.resolve();

const envPaths = {
  DEV: ".env.dev",
  PROD: ".env.prod",
};

dotenv.config({
  path: envPaths[process.env.PROJECT_ENV]
});

const MS_PER_SECOND = 1000;
const SECONDS_PER_DAY = 86400;

const nextConfig = {
  onDemandEntries: {
    maxInactiveAge: SECONDS_PER_DAY * MS_PER_SECOND,
    pagesBufferLength: 100
  },
  reactStrictMode: false,

  // Добавляем пустую конфигурацию Turbopack для совместимости
  turbopack: {},

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },

  // rewrites: async () => [
  //   { source: `/quickbooks`, destination: '/auth/register/quickbooks' },
  //   { source: '/xero', destination: '/auth/register/xero' },
  //   { source: '/sage-intacct', destination: '/auth/register/sage-intacct' },
  //   { source: '/netsuite', destination: '/auth/register/netsuite' },
  // ],

  webpack(config) {
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      use: [
        {
          loader: "url-loader",
          options: {
            name: "[name]-[hash].[ext]"
          }
        }
      ]
    });

    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto"
    });

    //SVG из assets/icons обрабатываются через @svgr/webpack (как компоненты)
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      include: path.resolve(__dirname, "src/assets/images/svrWebpack"),
      use: ["@svgr/webpack"]
    });

    // Остальные SVG — как обычные файлы (из assets/images и других мест)
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      include: [
        path.resolve(__dirname, "src/assets/images/icons"),
        path.resolve(__dirname, "src/assets/images/loaders")
      ],
      type: "asset/resource"
    });

    return config;
  }
};

export default nextConfig;



// const nextConfig = {
//   /* config options here */
//   reactStrictMode: true,
// };

// export default nextConfig;
