const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
   {
      category:String,
      imageUrl:String
   }
);

module.exports = mongoose.model("Category", CategorySchema);