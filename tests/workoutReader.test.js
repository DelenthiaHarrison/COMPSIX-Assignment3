const { workoutCalculator } = require('../workoutReader');

describe('workoutCalculator', () => {
  test('reads valid CSV file', async () => {
    const result = await workoutCalculator('./data/workouts.csv');
    expect(result.totalWorkouts).toBe(10);
    expect(result.totalMinutes).toBe(330);
    expect(result.totalWorkouts).toBeGreaterThan(0);
    expect(result.totalMinutes).toBeGreaterThan(0);
  });
  
  test('throws error for missing file', async () => {
    await expect(workoutCalculator('./fake.csv')).rejects.toThrow();
  });
});// Test your workoutReader.js module here