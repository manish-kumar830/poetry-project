const mongoose = require("mongoose");

const ShayariSchema = new mongoose.Schema(
   {
      shayari:String,
      category:String
   }
);

module.exports = mongoose.model("Shayari", ShayariSchema);