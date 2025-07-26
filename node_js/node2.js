const os = require('os');
console.log(os.platform());
const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Hello World! I am iaa.'));
app.listen(8080);