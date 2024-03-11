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

app.get("/userInfo/:user", async (req, res) => {
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
  // try {
  //   const response = await fetch(url, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Referer: "https://leetcode.com",
  //     },
  //     body: JSON.stringify({ query: query }),
  //   });
  //   const result = await response.json();
  //   result = {
  //     data: {
  //       allQuestionsCount: [
  //         {
  //           difficulty: "All",
  //           count: 3073,
  //         },
  //         {
  //           difficulty: "Easy",
  //           count: 778,
  //         },
  //         {
  //           difficulty: "Medium",
  //           count: 1613,
  //         },
  //         {
  //           difficulty: "Hard",
  //           count: 682,
  //         },
  //       ],
  //       matchedUser: {
  //         problemsSolvedBeatsStats: [
  //           {
  //             difficulty: "Easy",
  //             percentage: 98.71,
  //           },
  //           {
  //             difficulty: "Medium",
  //             percentage: 98.98,
  //           },
  //           {
  //             difficulty: "Hard",
  //             percentage: 98.16,
  //           },
  //         ],
  //         submitStatsGlobal: {
  //           acSubmissionNum: [
  //             {
  //               difficulty: "All",
  //               count: 770,
  //             },
  //             {
  //               difficulty: "Easy",
  //               count: 228,
  //             },
  //             {
  //               difficulty: "Medium",
  //               count: 428,
  //             },
  //             {
  //               difficulty: "Hard",
  //               count: 114,
  //             },
  //           ],
  //         },
  //       },
  //     },
  //   };
  //   res.status(200).json({
  //     data: result.data,
  //   });
  // } catch (err) {
  //   res.status(500).json({ message: "err.message" });
  // }
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://leetcode.com",
    },
    body: JSON.stringify({ query: query }),
  })
    .then((result) => {
      console.log("one", result);
      return result.text();
    })
    .then((result) => {
      console.log("two", result);
      const data = JSON.parse(result);
      res.status(200).json({
        data: data.data,
      });
      console.log("four");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "err" });
    });
});

app.get("/meal", async (req, res) => {
  const response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((result) => {
      console.log("one", result);

      return result.json();
    })
    .then((result) => {
      console.log("two", result);
      res.status(200).json({
        data: result,
      });
      console.log("four");
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "err" });
    });
});

app.listen(port, () => console.log(`Express app running on port ${port}!`));
