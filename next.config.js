import dotenv from "dotenv";
import path from "path";

const __dirname = path.resolve();

const envPaths = {
  DEV: ".env.dev",
  PROD: ".env.prod",
};

dotenv.config({
  path: envPaths[process.env.PROJECT_ENV],
});

const MS_PER_SECOND = 1000;
const SECONDS_PER_DAY = 86400;

const nextConfig = {
  onDemandEntries: {
    maxInactiveAge: SECONDS_PER_DAY * MS_PER_SECOND,
    pagesBufferLength: 100,
  },
  reactStrictMode: false,

  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      use: [
        {
          loader: "url-loader",
          options: {
            name: "[name]-[hash].[ext]",
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });

    // Остальные SVG — как обычные файлы (из assets/images и других мест)
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      include: [
        path.resolve(__dirname, "src/assets/icons"),
      ],
      type: "asset/resource",
    });

    return config;
  },

  turbopack: {},

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },


};

export default nextConfig;
