import { performance } from 'perf_hooks';

// Create some performance entries
performance.mark('mark1');
performance.mark('mark2');

let sum = 0;
for (let i = 0; i < 100000; i++) {
  sum += i;
}

performance.mark('mark3');
performance.measure('measure1', 'mark1', 'mark2');
performance.measure('measure2', 'mark2', 'mark3');

// Get all performance entries
console.log('All entries:');
console.log(performance.getEntries());

// Get entries by type
console.log('\nMarks:');
console.log(performance.getEntriesByType('mark'));

// Get entries by name
console.log('\nMeasure 1:');
console.log(performance.getEntriesByName('measure1'));