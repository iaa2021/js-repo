 import { performance } from 'perf_hooks';

performance.mark('startProcess');

let result = 0;
for (let i = 0; i < 1000000; i++) {
  result += Math.sqrt(i);
}

performance.mark('endProcess');

const marks = performance.getEntriesByType('mark');

const start = marks.find(mark => mark.name === 'startProcess');
const end = marks.find(mark => mark.name === 'endProcess');

console.log(
  `Operation took ${(end.startTime - start.startTime).toFixed(2)} milliseconds`
);