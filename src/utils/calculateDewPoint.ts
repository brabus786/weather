/**
 * Calculates the dew point based on temperature and humidity.
 * @param tempC - The temperature in Celsius.
 * @param humidity - The humidity percentage.
 * @returns The calculated dew point in Celsius.
 */

export const calculateDewPoint = (tempC: number, humidity: number): number => {
  const a = 17.27;
  const b = 237.7;

  const alpha = (a * tempC) / (b + tempC) + Math.log(humidity / 100);
  const dewPoint = (b * alpha) / (a - alpha);

  return parseFloat(dewPoint.toFixed(1));
};
