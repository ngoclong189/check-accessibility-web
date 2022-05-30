//es5
import express from "express";
import axios from "axios";
import pa11y from "pa11y";
require("dotenv").config();
const app = express();

app.use(express.static("public"));

// let checkURL = async (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let res = await axios.get(data);
//       resolve(res);
//     } catch (error) {
//       reject("wrong url");
//     }
//   });
// };

app.get("/api/v1", async (req, res) => {
  try {
    let data = await axios.get(req.query.url);
    console.log(">>check data", data);
  } catch (error) {
    res.status(404).json({ error: "url is wrong" });
  }
  if (!req.query.url) {
    res.status(400).json({ error: "url is require" });
  } else {
    const results = await pa11y(req.query.url);
    res.status(200).json(results);
  }
});

app.get("/", (req, res) => {
  return res.render("index");
});

let port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`app is runing in http://localhost:${port}`);
});
