import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static('public'));
app.get('/', (req, res) => {
  res.send('Hello from server2! \n GET request to the homepage');
});

app.post('/', (req, res) => {
  res.send('POST request to the homepage');
});
app.get('/about', (req, res) => {
  res.send('About page');
});
app.get('/contact', (req, res) => {
  res.send('Contact page');
});

//app.all('*', (req, res) => {
  //res.status(404).send('404 Not Found');
//}); deprecated, replaced with app.use() below
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});
app.use((req, res) => {
  res.status(404).send('404 Not Found');
});
app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});