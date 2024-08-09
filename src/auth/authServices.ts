import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import authSchema from "../Models/authSchema";
import { ILogin, IRegister } from "./dtos/authDto";
import ServerError from "../helper/serverError";
import RegisterDto from "./dtos/registerDto";
import loginDto from "./dtos/loginDto";
import { decodeToken, encodeToken } from "../helper/tokenTolls";
import jwt from 'jsonwebtoken'
import userSchema from "../Models/userSchema";


export const registerUser = async (data: RegisterDto) => {
   const { email, password } = data
   const checkEmail = await authSchema.findOne({ email: email })
   if (checkEmail) {
      throw new ServerError(409, 'email exist')
   }
   const hashedPass = await bcrypt.hash(password, 10)
   const updatedRegister = { ...data, password: hashedPass }
   const user = await authSchema.create(updatedRegister)
   return user

};

export const loginUser = async (data: loginDto) => {
   const { userName, password } = data
   if (userName !== 'admin' || password !== '123') {
      throw new ServerError(400, `not found`)
   }

   const token = encodeToken({ id: userName })
   return { token }
   // const secureKey = process.env.MY_SECCRET_KEY;
   // const decodedToken = decodeToken(token)

}

export const updateOneUser = async (id: string) => {

}

export const deleteOneUser = async (id: string) => {
   console.log(id)
}


export const createNewUser = async (user) => {
};
