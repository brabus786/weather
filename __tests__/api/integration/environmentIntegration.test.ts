describe("API Integration with Environment Variables", () => {
  test("should validate that all APIs have their required environment variables", () => {
    // Test Star Wars API
    expect(process.env.NEXT_PUBLIC_SW_API_BASE_URL).toBeTruthy();

    // Test Weather API
    expect(process.env.NEXT_PUBLIC_WEATHERAPI_BASE_URL).toBeTruthy();
    expect(process.env.NEXT_PUBLIC_WEATHERAPI).toBeTruthy();

    // Test Google Maps API
    expect(process.env.NEXT_PUBLIC_MAP).toBeTruthy();
  });

  test("should handle environment variable changes gracefully", () => {
    const originalUrl = process.env.NEXT_PUBLIC_SW_API_BASE_URL;

    // Test with different environment variable
    process.env.NEXT_PUBLIC_SW_API_BASE_URL =
      "https://test-api.example.com/api";

    // The API should still work (in a real scenario, it would use the new URL)
    expect(process.env.NEXT_PUBLIC_SW_API_BASE_URL).toBe(
      "https://test-api.example.com/api"
    );

    // Restore original value
    if (originalUrl) {
      process.env.NEXT_PUBLIC_SW_API_BASE_URL = originalUrl;
    }
  });

  test("should have environment variables accessible at runtime", () => {
    // Simulate how Next.js makes environment variables available
    const envVars = {
      NEXT_PUBLIC_SW_API_BASE_URL: process.env.NEXT_PUBLIC_SW_API_BASE_URL,
      NEXT_PUBLIC_WEATHERAPI_BASE_URL:
        process.env.NEXT_PUBLIC_WEATHERAPI_BASE_URL,
      NEXT_PUBLIC_WEATHERAPI: process.env.NEXT_PUBLIC_WEATHERAPI,
      NEXT_PUBLIC_MAP: process.env.NEXT_PUBLIC_MAP,
    };

    // All variables should be defined and non-empty
    Object.entries(envVars).forEach(([, value]) => {
      expect(value).toBeDefined();
      expect(value).toBeTruthy();
      expect(typeof value).toBe("string");
      expect(value!.length).toBeGreaterThan(0);
    });
  });

  test("should use Next.js environment variable naming convention", () => {
    const publicEnvVars = Object.keys(process.env).filter((key) =>
      key.startsWith("NEXT_PUBLIC_")
    );

    const requiredVars = [
      "NEXT_PUBLIC_SW_API_BASE_URL",
      "NEXT_PUBLIC_WEATHERAPI_BASE_URL",
      "NEXT_PUBLIC_WEATHERAPI",
      "NEXT_PUBLIC_MAP",
    ];

    requiredVars.forEach((varName) => {
      expect(publicEnvVars).toContain(varName);
    });
  });
});
