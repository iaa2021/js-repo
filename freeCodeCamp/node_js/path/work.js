import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log('Current file is:', __filename);
console.log('Current directory is:', __dirname);
console.log('Current file name is:', path.basename(__filename));
console.log('Current directory name is:', path.basename(__dirname));
console.log('Current file extension is:', path.extname(__filename));
console.log('Parse method : ', path.parse(__filename));
const formattedDirectory = path.format({
  dir: "/users/johndoe/docs",
  name: "file",
  ext: ".txt",
});
console.log('Formatted directory is:', formattedDirectory);