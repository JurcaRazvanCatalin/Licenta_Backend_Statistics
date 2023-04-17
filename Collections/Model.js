const mongoose = require("mongoose");

const statsSchema = new mongoose.Schema({
  phase: { type: String },
  stats: { type: String },
  ranking: { type: String },
  playerName: { type: String },
  playerNameSmall: { type: String },
  teamName: { type: String },
  smallTeamName: { type: String },
  matchesPlayed: { type: String },
  mediumStats: { type: String },
});

module.exports = mongoose.model("statistics", statsSchema);
