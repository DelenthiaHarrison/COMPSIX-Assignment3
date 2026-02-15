// dataProcessor.js
require('dotenv').config();

const { healthMetricsCounter } = require('./healthReader');
const { workoutCalculator } = require('./workoutReader');

async function processFiles() {
  try {
    const userName = process.env.USER_NAME;
    const weeklyGoal = parseInt(process.env.WEEKLY_GOAL);
    
    console.log(`Processing data for: ${userName}`);
    
    // Read workout data
    console.log('📁 Reading workout data...');
    const workoutData = await workoutCalculator('./data/workouts.csv');
    
    // Read health data
    console.log('📁 Reading health data...');
    const healthData = await healthMetricsCounter('./data/health-metrics.json');
    
    // Display summary
    console.log('=== SUMMARY ===');
    console.log(`Workouts found: ${workoutData.totalWorkouts}`);
    console.log(`Total workout minutes: ${workoutData.totalMinutes}`);
    console.log(`Health entries found: ${healthData.count}`);
    console.log(`Weekly goal: ${weeklyGoal} minutes`);
    
    // Check if goal met
    if (workoutData.totalMinutes >= weeklyGoal) {
      console.log(`🎉 Congratulations ${userName}! You have exceeded your weekly goal!`);
    } else {
      console.log(`Keep going ${userName}! You need ${weeklyGoal - workoutData.totalMinutes} more minutes.`);
    }
    
  } catch (error) {
    console.error('Error processing files:', error.message);
  }
}

processFiles();