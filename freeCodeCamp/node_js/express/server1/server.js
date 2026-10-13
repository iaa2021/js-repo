import express from "express";
const app = express();
const port = 3000;

app.use(express.static("public"));
// Handle requests to the home page
app.get("/", (req, res) => {
  res.send("Hello, World from Express!");
});
// Handle requests to the about page
app.get("/about", (req, res) => {
  res.send("This is my first Express page.");
});
app.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  res.send(`User ID: ${userId}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});