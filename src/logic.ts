import { Request, Response } from "express";
import market from "./database";
import Product from "./interfaces";

export function getProductsList(req: Request, res: Response) {
  const { section } = req.query;

  if (section) {
    const filteredProducts = market.filter(
      (filtered) => filtered.section === section
    );
    const total = filteredProducts.reduce(
      (sum, filtered) => sum + filtered.price,
      0
    );
    return res.status(200).json({ total, products: filteredProducts });
  } else {
    const total = market.reduce((sum, filtered) => sum + filtered.price, 0);
    return res.status(200).json({ total, products: market });
  }
}

export function createAdditionalsProducts(req: Request, res: Response) {
  const { name, price, weight, section, calories } = req.body;

  const id = createNewId();
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 365);

  const item: Product = {
    id,
    name,
    price,
    weight,
    section,
    calories,
    expirationDate,
  };

  market.push(item);
  return res.status(201).json(item);
}

export function findByIdProductList(req: Request, res: Response) {
  const id = Number(req.params.id);
  const product = market.find((product) => product.id === id);
    return res.status(200).json(product);
}

export function updateProducts(req: Request, res: Response) {
  const id = Number(req.params.id);
  const { name, price, weight, calories, section } = req.body;
  const index = market.findIndex((product) => product.id === id);

  const updatedProduct = {
    ...market[index],
    name: name || market[index].name,
    price: price || market[index].price,
    weight: weight || market[index].weight,
    calories: calories || market[index].calories,
    section: section || market[index].section,
  };

  market[index] = updatedProduct;
  return res.status(200).json(updatedProduct);
}

export function deleteProduct(req: Request, res: Response) {
  const id = Number(req.params.id);
  const index = market.findIndex((product) => product.id === id);

  market.splice(index, 1);

  return res.status(204).end();
}

function createNewId() {
  const maxId = market.reduce(
    (max, produto) => (produto.id > max ? produto.id : max),
    0
  );
  return maxId + 1;
}
