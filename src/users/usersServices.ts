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
   const { fullName, email, password } = data
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
   const filter = { _id: id } // Use a filter object for clarity
   const updatedTime = Date.now()
   const update = { $set: { fullName, email, password: hashedPassword, updated_at: updatedTime } } // Use update operator
   const user = await userSchema.findOneAndUpdate(filter, update, { new: true })
   if (!user) {
      throw new ServerError(404, 'not found')
   }

   return user
}

export const deleteOneUser = async (id: string) => {

   const item = await userSchema.findOne({ _id: id })
   if (!item) {
      throw new ServerError(404, 'item dosnot Exist')
   }
   const deleteduser = await userSchema.findByIdAndDelete({ _id: id })
   return deleteduser
}


export const createNewUser = async (data: User) => {
   const { fullName, email, password } = data
   const user = await userSchema.findOne({ email });
   if (user) throw new ServerError(409, 'user already exists');

   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
   const newUser = await userSchema.create({
      email: email,
      password: hashedPassword,
      fullName: fullName,
   });

   return newUser

};
