const express = require("express");
const app = express();

const cors = require("cors");

const port = 3000;

app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.get("/test", (req, res) => res.send("Test working"));

app.get('/userInfo/:user', async (req, res) => {
  const username = req.params.user;
  const url = `https://leetcode-api-faisalshohag.vercel.app/${username}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch user info' });
  }
});


app.listen(port, () => console.log(`Express app running on port ${port}!`));
