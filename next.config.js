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

  turbopack: {},

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },

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
    // config.module.rules.push({
    //   test: /\.svg$/,
    //   issuer: /\.[jt]sx?$/,
    //   include: path.resolve(__dirname, "src/assets/icons"),
    //   use: ["@svgr/webpack"]
    // });

    // Остальные SVG — как обычные файлы (из assets/images и других мест)
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      include: [
        path.resolve(__dirname, "src/assets/icons"),
        // path.resolve(__dirname, "src/assets/loaders")
      ],
      type: "asset/resource"
    });

     config.plugins.push(
      new NextFederationPlugin({
        name: 'weatherApp', // 👈 имя remote-приложения
        filename: 'static/chunks/remoteEntry.js', // 👈 точка входа, обязательна
        exposes: {
          './FederatedWeatherComponent': './src/components/FederatedWeatherComponent', // 👈 путь к твоему файлу
        },
        shared: {
          'react': { singleton: true, requiredVersion: false },
          'react-dom': { singleton: true, requiredVersion: false },
          'react-hook-form': { singleton: true, requiredVersion: false },
          '@reduxjs/toolkit': { singleton: true, requiredVersion: false },
          'react-redux': { singleton: true, requiredVersion: false },
        },
      })
    );

    return config;
  }
};

export default nextConfig;
