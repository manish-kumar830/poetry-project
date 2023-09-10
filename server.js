
const express = require("express");
const dotenv = require("dotenv");
require("./DbConnection/db_conn.js");
const ShayariModel = require("./Model/shayarimodel.js");
const CategoryModel = require("./Model/categorymodel.js");


dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
   res.send("<h1>Welcome to poetry panel</h1>");
 });

/*
==================================================

             Start Category Properties

==================================================

*/


// Get All Category For Admin Panel
app.get("/get/category", async (req, resp) => {
   try {
      let data = await CategoryModel.find({});
      const jsonContent = JSON.stringify(data);
      resp.status(200).send(jsonContent);
   } catch (error) {
      resp.status(400).send({ error: error });
   }
});

// Get Category For Admin Panel With Id
app.get("/get/category/id/:id", async (req, resp) => {
   const { id } = req.params;
   try {
      let data = await CategoryModel.find({ _id: id });
      const jsonContent = JSON.stringify(data);
      resp.status(200).send(jsonContent);
   } catch (error) {
      resp.status(400).send({ error: error });
   }
});

// Get All Category For Android App
app.get("/get/category/android", async (req, resp) => {
   try {
      let data = await CategoryModel.find({}, { 'category': 1, 'imageUrl': 1, '_id': false });
      const jsonContent = JSON.stringify(data);
      resp.status(200).send(jsonContent);
   } catch (error) {
      resp.status(400).send({ error: 'error' });
   }
});

// Insert Category In Document
app.post("/insert/category", async (req, resp) => {
   try {
      let category = new CategoryModel(req.body);
      let result = await category.save();
      const jsonContent = JSON.stringify(result);
      resp.status(200).send(jsonContent);
   } catch (error) {
      resp.status(400).send({ error: 'error' });
   }
});

// Delete Category From Document
app.delete("/delete/category/:id", async (req, resp) => {
   const { id } = req.params;
   try {
      let result = await CategoryModel.deleteOne({ _id: id });
      if (result.acknowledged) {
         const jsonContent = JSON.stringify(result);
         resp.status(200).send(jsonContent);
      }
   } catch (error) {
      resp.status(400).send({ error: 'error' });
   }
});

// Update Category From Document
app.put("/update/category/:id", async (req, resp) => {
   const { id } = req.params;
   try{
      let result = await CategoryModel.updateOne(
         { _id: id }, {
         $set: { category: req.body.category, imageUrl: req.body.imageUrl }
      });
      if (result.acknowledged) {
         const jsonContent = JSON.stringify(result);
         resp.status(200).send(jsonContent);
      }
   } catch(error){
      resp.status(400).send({ error: 'error' });
   }
});



/*
==================================================

             End Category Properties

==================================================

*/


/*
==================================================

             Start Shayari Properties

==================================================

*/

// Get All Shayari
app.get("/get/shayari", async (req, resp) => {
   try {
      let data = await ShayariModel.find({});
      const jsonContent = JSON.stringify(data);
      resp.status(200).send(jsonContent);
   } catch (error) {
      resp.status(400).send({ error: error });
   }
});


// Get All Shayari For Particular Category
app.get("/get/shayari/category/:category", async (req, resp) => {
   const { category } = req.params;
   try {
      let data = await ShayariModel.find({ category: category });
      const jsonContent = JSON.stringify(data);
      resp.status(200).send(jsonContent);
   } catch (error) {
      resp.status(400).send({ error: error });
   }
});

// Get Shayari Of Particular Id
app.get("/get/shayari/:id", async (req, resp) => {
   const { id } = req.params;
   try {
      let data = await ShayariModel.findById(id);
      const jsonContent = JSON.stringify(data);
      resp.status(200).send(jsonContent);
   } catch (error) {
      resp.status(400).send({ error: error });
   }
});


// Insert Shayari In Document
app.post("/insert/shayari", async (req, resp) => {
   try {
      let shayari = new ShayariModel(req.body);
      let result = await shayari.save();
      const jsonContent = JSON.stringify(result);
      resp.status(200).send(jsonContent);
   } catch (error) {
      resp.status(400).send({ error: 'error' });
   }
})

// Delete Shayari From Document
app.delete("/delete/shayari/:id", async (req, resp) => {
   const { id } = req.params;
   try {
      let result = await ShayariModel.deleteOne({ _id: id });
      if (result.acknowledged) {
         const jsonContent = JSON.stringify(result);
         resp.status(200).send(jsonContent);
      }
   } catch (error) {
      resp.status(400).send({ error: 'error' });
   }
});

// Delete All Shayari From Document
app.delete("/delete/shayari/category/:category", async (req, resp) => {
   const { category } = req.params;
   try {
      let result = await ShayariModel.deleteMany({ 'category': category });
      if (result.acknowledged) {
         const jsonContent = JSON.stringify(result);
         resp.status(200).send(jsonContent);
      }
   } catch (error) {
      resp.status(400).send({ error: 'error' });
   }
});


// Update Shayari With Id
app.put("/update/shayari/:id", async (req, resp) => {
   const { id } = req.params;
   try{
      let result = await ShayariModel.updateOne(
         { _id: id }, {
         $set: { shayari: req.body.shayari, category: req.body.category }
      });
      if (result.acknowledged) {
         const jsonContent = JSON.stringify(result);
         resp.status(200).send(jsonContent);
      }
   } catch(error){
      resp.status(400).send({ error: 'error' });
   }
});

// Update Shayari With Category
app.put("/update/shayari/category/:ctg", async (req, resp) => {
   const { ctg } = req.params;
   try{
      let result = await ShayariModel.updateMany(
         { 'category': ctg }, {
         $set: { "category": req.body.category }
      });
      if (result.acknowledged) {
         const jsonContent = JSON.stringify(result);
         resp.status(200).send(jsonContent);
      }
   } catch(error){
      resp.status(400).send({ error: 'error' });
   }
});

/*
==================================================

             End Shayari Properties

==================================================

*/

const PORT = process.env.PORT || 8080;

app.listen(PORT);
