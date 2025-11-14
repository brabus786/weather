import "@testing-library/jest-dom";
import React from "react";

// Setup environment variables for tests
process.env.NEXT_PUBLIC_SW_API_BASE_URL = "https://sw-api.starnavi.io/api";
process.env.NEXT_PUBLIC_WEATHERAPI_BASE_URL =
  "https://api.openweathermap.org/data/2.5";
process.env.NEXT_PUBLIC_WEATHERAPI = "test-weather-api-key";
process.env.NEXT_PUBLIC_MAP = "test-google-maps-api-key";

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    return React.createElement("img", props);
  },
}));

// Mock next/router
jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    pathname: "/test",
    query: {},
  })),
}));

// Global mocks for window objects that might be missing in test environment
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
(global as Record<string, unknown>).IntersectionObserver = jest
  .fn()
  .mockImplementation(() => ({
    root: null,
    rootMargin: "",
    thresholds: [],
    observe: jest.fn(),
    disconnect: jest.fn(),
    unobserve: jest.fn(),
    takeRecords: jest.fn(() => []),
  }));
