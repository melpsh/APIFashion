import { Request } from "express";
// import CreateProductsDto from "./products/dtos/productsCreateDto";

export interface IRequestWithProduct extends Request {
    productID: string
}
// export interface ICreateNewProduct extends CreateProductsDto {
//     userID: string
// }