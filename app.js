import express from "express";
import * as db from "./db.js"
const PORT = 3311;

const app = express();

app.use(express.json());

app.get("/api/products", (req, res) => {
  const products = db.getAllProducts();
  return res.status(200).json({ message: products });
});

app.post("api/products", (req, res) => {
  const { name, price, amount } = req.body;
  if (!name || !price || !amount) {
    res.status(404).json({ message: "Nem maradhat üresen mező!" });
  }
  db.createProduct(name, price, amount);
  res.status(201).json({ message: "Sikeresen létrehozás!" });
});
app.put("api/products/:id", (req, res) => {
  const id = +req.params.id;
  const product = db.getProductById(id);
  if (!product) {
    res.status(404).json({ message: "Product was not found!" });
  }
  const { name, price, amount } = req.body;
  if (!name || !price || !amount) {
    res.status(404).json({ message: "Nem maradhat üresen mező!" });
    db.updateProduct(id, name, price, amount);
    res.status(200).json({ message: "Sikeres létrehozás!" });
  }
});
app.listen(() => {
    console.log(`App listens on ${PORT}`)
})