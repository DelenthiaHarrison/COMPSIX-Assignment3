const fs = require('fs');
const csv = require('csv-parser');

async function workoutCalculator(filePath) {
  return new Promise((resolve, reject) => {
    const workouts = [];
    
    if (!fs.existsSync(filePath)) {
      const error = new Error('File not found');
      reject(error);
      return;
    }
    
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        workouts.push(row);
      })
      .on('end', () => {
        const totalWorkouts = workouts.length;
        let totalMinutes = 0;
        for (let i = 0; i < workouts.length; i++) {
          totalMinutes += parseInt(workouts[i].duration || 0);
        }
        console.log('Total workouts: ' + totalWorkouts);
        console.log('Total minutes: ' + totalMinutes);
        resolve({ totalWorkouts, totalMinutes, workouts });
      })
      .on('error', (error) => {
        console.error('Error reading workout data:', error.message);
        reject(error);
      });
  });
}

module.exports = { workoutCalculator };
