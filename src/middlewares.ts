import { Request, Response, NextFunction } from "express";
import market from "./database";

export function checkItemById(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  const productExists = market.find((product) => product.id === id);

  if (!productExists) {
    return res.status(404).json({ message: "Product not found." });
  }
  next();
}

export function checkItemByName(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name } = req.body;

  const productExists = market.some((product) => product.name === name);

  if (productExists) {
    return res.status(409).json({ message: "Product already registered." });
  }
  next();
}
