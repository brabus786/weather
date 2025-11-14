describe("API Environment Variables Configuration", () => {
  test("should have all required environment variables set", () => {
    // Test Star Wars API configuration
    expect(process.env.NEXT_PUBLIC_SW_API_BASE_URL).toBeDefined();
    expect(process.env.NEXT_PUBLIC_SW_API_BASE_URL).toBe(
      "https://sw-api.starnavi.io/api"
    );

    // Test Weather API configuration
    expect(process.env.NEXT_PUBLIC_WEATHERAPI_BASE_URL).toBeDefined();
    expect(process.env.NEXT_PUBLIC_WEATHERAPI_BASE_URL).toBe(
      "https://api.openweathermap.org/data/2.5"
    );
    expect(process.env.NEXT_PUBLIC_WEATHERAPI).toBeDefined();
    expect(process.env.NEXT_PUBLIC_WEATHERAPI).toBe("test-weather-api-key");

    // Test Google Maps API configuration
    expect(process.env.NEXT_PUBLIC_MAP).toBeDefined();
    expect(process.env.NEXT_PUBLIC_MAP).toBe("test-google-maps-api-key");
  });

  test("should use Next.js public environment variable naming convention", () => {
    const envVars = Object.keys(process.env).filter((key) =>
      key.startsWith("NEXT_PUBLIC_")
    );

    expect(envVars).toContain("NEXT_PUBLIC_SW_API_BASE_URL");
    expect(envVars).toContain("NEXT_PUBLIC_WEATHERAPI_BASE_URL");
    expect(envVars).toContain("NEXT_PUBLIC_WEATHERAPI");
    expect(envVars).toContain("NEXT_PUBLIC_MAP");
  });

  test("should have valid URL formats for API endpoints", () => {
    const swApiUrl = process.env.NEXT_PUBLIC_SW_API_BASE_URL;
    const weatherApiUrl = process.env.NEXT_PUBLIC_WEATHERAPI_BASE_URL;

    expect(swApiUrl).toMatch(/^https?:\/\/.+/);
    expect(weatherApiUrl).toMatch(/^https?:\/\/.+/);

    // Test that URLs are properly formatted
    expect(() => new URL(swApiUrl!)).not.toThrow();
    expect(() => new URL(weatherApiUrl!)).not.toThrow();
  });

  test("should have non-empty API keys", () => {
    expect(process.env.NEXT_PUBLIC_WEATHERAPI).toBeTruthy();
    expect(process.env.NEXT_PUBLIC_MAP).toBeTruthy();
    expect(process.env.NEXT_PUBLIC_WEATHERAPI?.length).toBeGreaterThan(0);
    expect(process.env.NEXT_PUBLIC_MAP?.length).toBeGreaterThan(0);
  });
});
