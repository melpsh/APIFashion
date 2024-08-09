import { IProduct } from "./dtos/productDto";
import userSchema from "../Models/userSchema";
import * as bcrypt from "bcrypt";
import ServerError from "../helper/serverError";
import productsSchema from "../Models/productsSchema";
import { ParsedUrlQuery } from "querystring";

export const getproducts = async () => {
  const products = await productsSchema.find({});

  return products;
};

export const updateProduct = async (id: string, data: IProduct) => {
  const { productName, price, category, imgUrl, description } = data;

  const filter = { _id: id }; // Use a filter object for clarity
  const updatedTime = Date.now();
  const numPrice = Number(price);

  const update = {
    $set: {
      productName,
      price: numPrice,
      category,
      imgUrl,
      description,
      updated_at: updatedTime,
    },
  }; // Use update operator
  const product = await productsSchema.findOneAndUpdate(filter, update, {
    new: true,
  });
  if (!product)  return null
  return product;
};

export const deleteOneProduct = async (id: string) => {
  const item = await productsSchema.findOne({ _id: id });
  if (!item) {
    throw new ServerError(404, "item doesnot Exist");
  }
  const deleteduser = await productsSchema.findByIdAndDelete({ _id: id });
  return deleteduser;
};

export const createNewProduct = async (data: IProduct) => {
  const { productName, price, category, description, imgUrl } = data;
  const numPrice = Number(price);

  const newProduct = await productsSchema.create({
    productName,
    price: numPrice,
    category,
    description,
    imgUrl,
  });

  return newProduct;
};
