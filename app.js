const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
//const axios = require("./axios");
const port = 3000;

app.get("/test", (req, res) => res.send("Test working"));

app.get("/userInfo/:user", (req, res) => {
  const url = "https://leetcode.com/graphql";
  console.log("data", req.params.user);
  let query = `{
  allQuestionsCount {
    difficulty
    count
  }
  matchedUser(username: "dan_stark123") {
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
      console.log(JSON.stringify(result));
      res.status(200).json({
        data: result.data,
      });
    })
    .catch((err) => console.log("err", err));
});

// axios.post(url)

app.listen(port, () => console.log(`Express app running on port ${port}!`));
