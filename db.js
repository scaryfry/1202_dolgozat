import Database from "better-sqlite3";

const db = new Database("./data/database.sqlite");

db.prepare(
  `CREATE TABLE IF NOT EXISTS product
  ( id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
   price INTEGER,
    amount INTEGER)`
).run();

export const getAllProducts = () => {
  db.prepare("SELECT * FROM product").all();
};
export const getProductById = (id) => {
  db.prepare("SELECT * FROM product WHERE id = ?").get(id);
};
export const createProduct = (name, price, amount) => {
  db.prepare("INSERT INTO product (name, price, amount) VALUES(?,?,?)").run(
    name,
    price,
    amount
  );
};
export const updateProduct = (id, name, price, amount) => {
  db.prepare(
    "UPDATE product SET name = ?, price = ?, amount = ?, WHERE id = ?"
  ).run(id, name, price, amount);
};
