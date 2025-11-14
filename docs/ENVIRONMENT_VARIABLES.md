# Environment Variables Configuration

## Overview

This document describes the environment variables used in the application and how they are configured for testing.

## Required Environment Variables

### Star Wars API

- **NEXT_PUBLIC_SW_API_BASE_URL**: Base URL for the Star Wars API
  - **Production**: `https://sw-api.starnavi.io/api`
  - **Tests**: `https://sw-api.starnavi.io/api`
  - **Usage**: Used in `src/api/starWars/index.ts` for API calls

### Weather API

- **NEXT_PUBLIC_WEATHERAPI_BASE_URL**: Base URL for OpenWeatherMap API
  - **Production**: `https://api.openweathermap.org/data/2.5`
  - **Tests**: `https://api.openweathermap.org/data/2.5`
  - **Usage**: Used in `src/api/weather/index.ts` for weather data

- **NEXT_PUBLIC_WEATHERAPI**: API key for OpenWeatherMap
  - **Production**: Real API key from OpenWeatherMap
  - **Tests**: `test-weather-api-key`
  - **Usage**: Used in weather API calls

### Google Maps API

- **NEXT_PUBLIC_MAP**: API key for Google Maps
  - **Production**: Real API key from Google Cloud Console
  - **Tests**: `test-google-maps-api-key`
  - **Usage**: Used in `src/pages/_app.tsx` for Google Maps integration

## Test Configuration

### Setup

Environment variables for tests are configured in `src/setupTests.ts`:

```typescript
// Setup environment variables for tests
process.env.NEXT_PUBLIC_SW_API_BASE_URL = "https://sw-api.starnavi.io/api";
process.env.NEXT_PUBLIC_WEATHERAPI_BASE_URL =
  "https://api.openweathermap.org/data/2.5";
process.env.NEXT_PUBLIC_WEATHERAPI = "test-weather-api-key";
process.env.NEXT_PUBLIC_MAP = "test-google-maps-api-key";
```

### Why This Approach?

1. **Consistency**: All tests use the same environment configuration
2. **Isolation**: Tests don't depend on external .env files
3. **Security**: No real API keys in test code
4. **Reliability**: Tests work in any environment (CI/CD, local, etc.)

## Test Coverage

### Environment Variable Tests

- **Basic Configuration**: Tests that all required variables are set
- **URL Validation**: Tests that API URLs are valid and reachable
- **API Key Validation**: Tests that API keys are non-empty
- **Next.js Convention**: Tests that variables follow Next.js public variable naming

### Integration Tests

- **API Configuration**: Tests in Redux operations verify that APIs use correct base URLs
- **Component Tests**: Components that use environment variables are tested with mock values

## Production Setup

### .env.local (local development)

```env
NEXT_PUBLIC_SW_API_BASE_URL=https://sw-api.starnavi.io/api
NEXT_PUBLIC_WEATHERAPI_BASE_URL=https://api.openweathermap.org/data/2.5
NEXT_PUBLIC_WEATHERAPI=your_openweather_api_key
NEXT_PUBLIC_MAP=your_google_maps_api_key
```

### Deployment

For production deployment, set these environment variables in your hosting platform:

- Vercel: Add variables in Project Settings → Environment Variables
- Netlify: Add variables in Site Settings → Build & Deploy → Environment
- Docker: Use .env file or docker-compose environment section

## Best Practices

1. **Never commit real API keys** to version control
2. **Use NEXT*PUBLIC* prefix** for client-side variables in Next.js
3. **Provide fallback values** where appropriate (as done in Star Wars API)
4. **Validate environment variables** in tests and application startup
5. **Document all variables** and their purposes
6. **Use different values** for different environments (dev, staging, prod)

## Troubleshooting

### Tests Failing Due to Missing Variables

If tests fail with environment variable issues:

1. Check that `src/setupTests.ts` is properly configured
2. Verify Jest configuration includes `setupFilesAfterEnv`
3. Ensure all required variables are set in the setup file

### API Calls Failing in Tests

If API-related tests fail:

1. Verify that API modules are properly mocked
2. Check that environment variables are set before API module import
3. Ensure mock data matches the expected API response format

### Production Issues

If environment variables don't work in production:

1. Verify variables are set in the deployment platform
2. Check that variable names match exactly (case-sensitive)
3. Ensure Next.js public variables start with `NEXT_PUBLIC_`
4. Restart the application after adding new variables
