import type { NextFunction, Request, Response } from "express";
import * as productService from "../services/product.service";

export const getProductsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const search = String(req.query.search || "");
    const sort = String(req.query.sort || "price_asc")

    const products = await productService.getProducts(page, limit,search,sort);

    return res.json(products);
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, price, server, account, password } = req.body;

    const product = await productService.createProduct(
      name,
      price,
      server,
      account,
      password,
    );

    return res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    const product = await productService.getProductById(id);

    return res.json(product);
  } catch (error) {
    next(error);
  }
};

export const deleteProductController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = Number(req.params.id);

    const product = await productService.deleteProduct(id);

    return res.json(product);
  } catch (error) {
    next(error);
  }
};
