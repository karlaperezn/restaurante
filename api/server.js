import e from "express";
import { MongoClient } from "mongodb";
import cors from "cors";

const app = e();

app.use(cors());
app.use(e.urlencoded({ extended: false }));
app.use(e.json());

app.listen(process.env.PORT || 3000);

const url = "mongodb://admin:admin123@127.0.0.1:27017";
const client = await MongoClient.connect(url);
app.locals.db = client.db("hotel")


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