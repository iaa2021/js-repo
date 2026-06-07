 import { performance } from 'perf_hooks';

performance.mark('startProcess');

let result = 0;
for (let i = 0; i < 1000000; i++) {
  result += Math.sqrt(i);
}

performance.mark('endProcess');

performance.measure('processDuration', 'startProcess', 'endProcess');

const measurements = performance.getEntriesByType('measure');

console.log(measurements);

console.log(
  `Operation took ${measurements[0].duration.toFixed(2)} milliseconds`
);