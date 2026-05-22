import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

let db;

async function start() {
  try {
    const client = await MongoClient.connect(uri);
    db = client.db("");
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Mongo error:", err);
  }
}
start();

//todos los menus
app.get("/api/menus", async (req, res) => {
  const menus = await db.collection("menus").find().toArray();

  res.send(menus);
});


//nuevo menu
app.post("/api/nuevoMenu", async (req, res) => {
  const propiedades = req.body;
  const menu = await db.collection("menu").insertOne({ propiedades });

  res.send({ data: menu });
});