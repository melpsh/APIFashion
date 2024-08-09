import { User } from "./dtos/userDto";
import userSchema from "../Models/userSchema";
import * as bcrypt from 'bcrypt';
import ServerError from "../helper/serverError";

export const getUser = async (userID: string) => {
   const user = await userSchema.findOne({ _id: userID })
   if (!user) {
      throw new ServerError(404, 'Not Found any user')
   }
   return user
};

export const getOneUser = async (id: any) => {
   const user = await userSchema.findOne({ _id: id })
   if (!user || user === null) throw new ServerError(404, 'user not found')
   return user
}

export const updateOneUser = async (id: string, data: User) => {
  
}

export const deleteOneUser = async (id: string) => {

}


export const createNewUser = async (data: User) => {
   

};
