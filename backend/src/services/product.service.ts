import * as productRepositories from "../repositories/product.repository";
import { AppError } from "../errors/AppError";

export const getProducts = async (page: number, limit: number,search:string,sort:string) => {
  const skip = (page - 1) * limit;
  let sortOrder: "asc" | "desc" = "asc"

  if (sort === "price_desc") {
    sortOrder = "desc"
  }

  return productRepositories.getProducts(skip,limit,search,sortOrder);
};

export const createProduct = async (
  name: string,
  price: number,
  server: string,
  account: string,
  password: string,
) => {
  if (!name.trim()) {
    throw new AppError(400, "PRODUCT_NAME_REQUIRED", "Tên không được để trống");
  }

  if (price <= 0) {
    throw new AppError(400, "INVALID_PRODUCT_PRICE", "Giá phải lớn hơn 0");
  }

  return productRepositories.createProduct({
    name,
    price,
    server,
    account,
    password,
  });
};

export const getProductById = async (id: number) => {
  const product = await productRepositories.getProductById(id);

  if (!product) {
    throw new AppError(404, "PRODUCT_NOT_FOUND", "Nick không tồn tại");
  }

  return product;
};

export const deleteProduct = async (id: number) => {
  const product = await productRepositories.getProductById(id);

  if (!product) {
    throw new AppError(404, "PRODUCT_NOT_FOUND", "Nick không tồn tại");
  }

  return productRepositories.deleteProduct(id);
};
