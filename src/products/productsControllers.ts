import { Router, Request, Response, NextFunction } from "express";
import { validationMiddlware, validationUserMiddlware } from "../middlewares";
import {
  createNewProduct,
  deleteOneProduct,
  getproducts,
  updateProduct,
} from "../products/productsServices";
import usersCreateDto from "./dtos/usersCreateDto";
import UserUPdateDto from "./dtos/usersUpdate";
import ServerError from "../helper/serverError";
import { IRequestWithProduct } from "../types";
import { stringify } from "querystring";
import { IProduct } from "./dtos/productDto";
const router = Router();

// get all products
router.get("/", async (req: Request, res: Response) => {
  try {
    const products = await getproducts();
    res.status(200).json({ products });
  } catch (error) {
    console.log(error);
  }
});

// create new product
router.post("/create", async (req: Request, res: Response) => {
  try {
    const newProduct = await createNewProduct(req.body);
    const resUserData = {
      productName: newProduct.productName,
      create_at: newProduct.create_at,
      price: newProduct.price,
      imgUrl: newProduct.imgUrl,
      category: newProduct.category,
    };
    res.status(201).json({ resUserData });
  } catch (error) {
    console.log(error);
  }
});

router.put("/update", async (req: Request, res: Response) => {
  try {
    let { id: productID } = req.query;
    const data: IProduct = req.body;
    const updatedProduct = await updateProduct(productID.toString(), data);
    if (updatedProduct === null) {
      return res.status(404).json({ msg: `Product not found` });
    }
    res.status(200).json({ updatedProduct });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/delete", async (req: Request, res: Response) => {
  try {
    let { id: productID } = req.query;
    const deletedItem = await deleteOneProduct(productID.toString());
    const products = await getproducts();

    res.status(200).json(products);
  } catch (error) {
    console.log("error:", error);
  }
});

export default router;
