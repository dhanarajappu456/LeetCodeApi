const express = require("express");
const app = express();
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
//const axios = require("./axios");
const port = 3000;

app.get("/test", (req, res) => res.send("Test working"));

app.get("/userInfo/:user", (req, res) => {
  const url = "https://leetcode.com/graphql";

  let query = `{
  allQuestionsCount {
    difficulty
    count
  }
  matchedUser(username :"dan_stark123") {
    problemsSolvedBeatsStats {
      difficulty
      percentage
    }
    submitStatsGlobal {
      acSubmissionNum {
        difficulty
        count
      }
    }
  }
}`;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://leetcode.com",
    },
    body: JSON.stringify({ query: query }),
  })
    .then((result) => result.json())
    .then((result) => {
      res.status(200).json({
        data: result.data,
      });
    })
    .catch((err) => {
      res.status(500).json({ message: "err.message" });
    });
});

// axios.post(url)

app.listen(port, () => console.log(`Express app running on port ${port}!`));
