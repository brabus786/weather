# Weather App

A Next.js application with weather data and Star Wars integration.

## Prerequisites

- Node.js 18+
- Yarn package manager
- API Keys (see Environment Setup)

## Environment Setup

1. Copy the environment template:

```bash
cp .env.example .env.local
```

2. Get your API keys:
   - **Google Maps API**: [Get API Key](https://developers.google.com/maps/documentation/javascript/get-api-key)
   - **OpenWeatherMap API**: [Get API Key](https://openweathermap.org/api)

3. Fill in your `.env.local` file with the actual API keys.

## Getting Started

1. Install dependencies:

```bash
yarn install
```

2. Start the development server:

```bash
yarn dev
```

3. Open [http://localhost:4040](http://localhost:4040) with your browser.

## Available Scripts

```bash
yarn dev          # Start development server
yarn build        # Build for production
yarn start        # Start production server
yarn test         # Run tests
yarn lint         # Run ESLint
yarn format       # Format code with Prettier
```

## Running Tests

```bash
yarn jest
```
