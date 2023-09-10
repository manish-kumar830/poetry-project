
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config()

// const url = `mongodb://127.0.0.1:27017/shayaridb`;

const url = process.env.MONGO_URL;

mongoose.connect(url,{
   useNewUrlParser: true,
   useUnifiedTopology: true
}).then(()=>{
   console.log("Database Connected");
}).catch(()=>{
   console.log("Connection Failed");
});
