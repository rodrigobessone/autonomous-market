import express from "express";
import {
  createAdditionalsProducts,
  deleteProduct,
  findByIdProductList,
  getProductsList,
  updateProducts,
} from "./logic";
import { checkItemById, checkItemByName } from "./middlewares";

const app = express();

app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost/${PORT}`);
});

app.get("/products", getProductsList);

app.post("/products", checkItemByName, createAdditionalsProducts);

app.get("/products/:id", checkItemById, findByIdProductList);

app.patch("/products/:id", checkItemById, checkItemByName, updateProducts);

app.delete("/products/:id", checkItemById, deleteProduct);
