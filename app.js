const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

const url = 'https://leetcode.com/graphql';

app.get('/userInfo/:user', async (req, res) => {
  const username = req.params.user;

  const query = `{
    matchedUser(username: "${username}") {
      username
      submitStats: submitStatsGlobal {
        acSubmissionNum {
          difficulty
          count
          submissions
        }
      }
    }
  }`;

try {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
  }

  const data = await response.json();

  if (data.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(data.errors)}`);
  }

  res.json(data);
} catch (error) {
  console.error('Error fetching data:', error);
  res.status(500).json({ error: error.message });
}

});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
