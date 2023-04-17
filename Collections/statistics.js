const express = require("express");
const { StatusCodes } = require("http-status-codes");
const Stats = require("./Model");
const statsRouter = express.Router();

const getAllStats = async (req, res) => {
  const { phase, stats } = req.query;
  const queryParams = {};
  if (phase) {
    queryParams.phase = phase;
  }
  if (stats) {
    queryParams.stats = stats;
  }
  const statistics = await Stats.find(queryParams).sort("ranking");
  res.status(StatusCodes.OK).json({ statistics });
};

statsRouter.route("/create-stat").get(getAllStats);

module.exports = statsRouter;
