const express = require("express");
const cron = require("node-cron");
const mongoose = require("mongoose");
const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
require("dotenv").config();
const app = express();
const Stats = require("./Collections/Model");
const collectionService = require("./Collections/Service");
const statistics = require("./Collections/statistics");
mongoose.set("strictQuery", true);
const PORT = process.env.PORT;

const createStat = async (stat) => {
  if (
    (await Stats.findOne({
      phase: stat.phase,
      stats: stat.stats,
      playerName: stat.playerName,
    })) == null
  ) {
    collectionService.createRecord(stat);
  } else {
    await Stats.findOneAndUpdate(
      {
        phase: stat.phase,
        stats: stat.stats,
        playerName: stat.playerName,
      },
      stat,
      {
        new: true,
        runValidators: true,
      }
    );
  }
};

let browser;
const scrapeStatistics = async () => {
  try {
    const pages = await browser.newPage();
    for (i = 1396; i <= 1411; i++) {
      if (i === 1396) {
        for (j = 1; j <= 4; j++) {
          await pages.goto(
            `https://baschet.ro/liga-nationala-de-baschet-masculin/statistici?subject=player&season=243&phase=${i}&field=${j}&type=avg`
          );
          const html = await pages.evaluate(() => document.body.innerHTML);
          const $ = await cheerio.load(html);
          const phase = "1";
          let stats;
          if (j === 1) {
            stats = "puncte";
          } else if (j === 2) {
            stats = "pase";
          } else if (j === 3) {
            stats = "recuperari";
          } else if (j === 4) {
            stats = "eff";
          }
          $(
            "#app > div.container > div > div.col-lg-9 > div > div > div.statistic-table-container > table > tbody > tr"
          ).each((i, element) => {
            const ranking = $(element).find("td:nth-child(1)").text();
            const playerName = $(element).find("td:nth-child(2) > a").text();
            const playerNameSmall = $(element)
              .find("td:nth-child(2) > a")
              .text()
              .replace("\n", "")
              .replace("*", "")
              .trim()
              .toLowerCase()
              .replace(" ", "")
              .replace(" ", "")
              .replace("-", "");
            const teamName = $(element).find("td:nth-child(3) > a").text();
            const smallTeamName = $(element)
              .find("td:nth-child(3) > a")
              .text()
              .toLowerCase()
              .replace(" ", "")
              .replace(" ", "")
              .replace("-", "")
              .replace(/["]/g, "")
              .replace("constanța", "")
              .replace(" ", "");
            const matchesPlayed = $(element).find("td:nth-child(4)").text();
            const mediumStats = $(element)
              .find("td:nth-child(6)")
              .text()
              .trim();
            const statistics = {
              phase,
              stats,
              ranking,
              playerName,
              playerNameSmall,
              teamName,
              smallTeamName,
              matchesPlayed,
              mediumStats,
            };
            // console.log(player);
            createStat(statistics);
          });
        }
      } else if (i === 1406) {
        for (j = 1; j <= 4; j++) {
          await pages.goto(
            `https://baschet.ro/liga-nationala-de-baschet-masculin/statistici?subject=player&season=243&phase=${i}&field=${j}&type=avg`
          );
          const html = await pages.evaluate(() => document.body.innerHTML);
          const $ = await cheerio.load(html);
          const phase = "2";
          let stats;
          if (j === 1) {
            stats = "puncte";
          } else if (j === 2) {
            stats = "pase";
          } else if (j === 3) {
            stats = "recuperari";
          } else if (j === 4) {
            stats = "eff";
          }
          $(
            "#app > div.container > div > div.col-lg-9 > div > div > div.statistic-table-container > table > tbody > tr"
          ).each((i, element) => {
            const ranking = $(element).find("td:nth-child(1)").text();
            const playerName = $(element).find("td:nth-child(2) > a").text();
            const playerNameSmall = $(element)
              .find("td:nth-child(2) > a")
              .text()
              .replace("\n", "")
              .replace("*", "")
              .trim()
              .toLowerCase()
              .replace(" ", "")
              .replace(" ", "")
              .replace("-", "");
            const teamName = $(element).find("td:nth-child(3) > a").text();
            const smallTeamName = $(element)
              .find("td:nth-child(3) > a")
              .text()
              .toLowerCase()
              .replace(" ", "")
              .replace(" ", "")
              .replace("-", "")
              .replace(/["]/g, "")
              .replace("constanța", "")
              .replace(" ", "");
            const matchesPlayed = $(element).find("td:nth-child(4)").text();
            const mediumStats = $(element)
              .find("td:nth-child(6)")
              .text()
              .trim();
            const statistics = {
              phase,
              stats,
              ranking,
              playerName,
              playerNameSmall,
              teamName,
              smallTeamName,
              matchesPlayed,
              mediumStats,
            };
            // console.log(player);
            createStat(statistics);
          });
        }
      } else if (i === 1410) {
        for (j = 1; j <= 4; j++) {
          await pages.goto(
            `https://baschet.ro/liga-nationala-de-baschet-masculin/statistici?subject=player&season=243&phase=${i}&field=${j}&type=avg`
          );
          const html = await pages.evaluate(() => document.body.innerHTML);
          const $ = await cheerio.load(html);
          const phase = "playoff";
          let stats;
          if (j === 1) {
            stats = "puncte";
          } else if (j === 2) {
            stats = "pase";
          } else if (j === 3) {
            stats = "recuperari";
          } else if (j === 4) {
            stats = "eff";
          }
          $(
            "#app > div.container > div > div.col-lg-9 > div > div > div.statistic-table-container > table > tbody > tr"
          ).each((i, element) => {
            const ranking = $(element).find("td:nth-child(1)").text();
            const playerName = $(element).find("td:nth-child(2) > a").text();
            const playerNameSmall = $(element)
              .find("td:nth-child(2) > a")
              .text()
              .replace("\n", "")
              .replace("*", "")
              .trim()
              .toLowerCase()
              .replace(" ", "")
              .replace(" ", "")
              .replace("-", "");
            const teamName = $(element).find("td:nth-child(3) > a").text();
            const smallTeamName = $(element)
              .find("td:nth-child(3) > a")
              .text()
              .toLowerCase()
              .replace(" ", "")
              .replace(" ", "")
              .replace("-", "")
              .replace(/["]/g, "")
              .replace("constanța", "")
              .replace(" ", "");
            const matchesPlayed = $(element).find("td:nth-child(4)").text();
            const mediumStats = $(element)
              .find("td:nth-child(6)")
              .text()
              .trim();
            const statistics = {
              phase,
              stats,
              ranking,
              playerName,
              playerNameSmall,
              teamName,
              smallTeamName,
              matchesPlayed,
              mediumStats,
            };
            // console.log(player);
            createStat(statistics);
          });
        }
      } else if (i === 1411) {
        for (j = 1; j <= 4; j++) {
          await pages.goto(
            `https://baschet.ro/liga-nationala-de-baschet-masculin/statistici?subject=player&season=243&phase=${i}&field=${j}&type=avg`
          );
          const html = await pages.evaluate(() => document.body.innerHTML);
          const $ = await cheerio.load(html);
          const phase = "playout";
          let stats;
          if (j === 1) {
            stats = "puncte";
          } else if (j === 2) {
            stats = "pase";
          } else if (j === 3) {
            stats = "recuperari";
          } else if (j === 4) {
            stats = "eff";
          }
          $(
            "#app > div.container > div > div.col-lg-9 > div > div > div.statistic-table-container > table > tbody > tr"
          ).each((i, element) => {
            const ranking = $(element).find("td:nth-child(1)").text();
            const playerName = $(element).find("td:nth-child(2) > a").text();
            const playerNameSmall = $(element)
              .find("td:nth-child(2) > a")
              .text()
              .replace("\n", "")
              .replace("*", "")
              .trim()
              .toLowerCase()
              .replace(" ", "")
              .replace(" ", "")
              .replace("-", "");
            const teamName = $(element).find("td:nth-child(3) > a").text();
            const smallTeamName = $(element)
              .find("td:nth-child(3) > a")
              .text()
              .toLowerCase()
              .replace(" ", "")
              .replace(" ", "")
              .replace("-", "")
              .replace(/["]/g, "")
              .replace("constanța", "")
              .replace(" ", "");
            const matchesPlayed = $(element).find("td:nth-child(4)").text();
            const mediumStats = $(element)
              .find("td:nth-child(6)")
              .text()
              .trim();
            const statistics = {
              phase,
              stats,
              ranking,
              playerName,
              playerNameSmall,
              teamName,
              smallTeamName,
              matchesPlayed,
              mediumStats,
            };
            // console.log(player);
            createStat(statistics);
          });
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
};

const main = async () => {
  browser = await puppeteer.launch({
    headless: false,
    executablePath: "/app/.apt/usr/bin/google-chrome",
  });
  await scrapeStatistics();
};

app.get("/", (req, res) => {
  res.send("Playoffs");
});

const initRoutes = () => {
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
  });
  app.use("/api/v1/statistics", statistics);
};

const startServer = () => {
  app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`));
};

const database = () => {
  if (mongoose.connect(process.env.MONGO_URI))
    console.log("Connected to Database");
};

const startApp = () => {
  startServer();
  initRoutes();
  database();
};

main();
startApp();
