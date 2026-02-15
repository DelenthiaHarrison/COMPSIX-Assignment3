const { healthMetricsCounter } = require('../healthReader');

describe('healthMetricsCounter', () => {
  test('reads valid JSON file', async () => {
    const result = await healthMetricsCounter('./data/health-metrics.json');
    expect(result.count).toBe(8);
    expect(result.count).toBeGreaterThan(0);
  });
  
  test('throws error for missing file', async () => {
    await expect(healthMetricsCounter('./fake.json')).rejects.toThrow();
  });
});