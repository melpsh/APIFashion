import { IsDefined, IsEmail, IsOptional, Matches, MaxLength, MinLength, isEmail, minLength } from "class-validator";

class loginDto {
    @IsDefined()
    // @IsEmail()
    userName : string;
    @IsDefined()
    // @MinLength(8)
    // @Matches(/^(?=.*[A-Z])/, { message: "Password must contain at least one uppercase letter" })
    password : string;
}

export default loginDto;