import { IsDefined, IsEmail, IsOptional, Matches, MaxLength, MinLength, isEmail, minLength } from "class-validator";

class RegisterDto{
    @MinLength(1)
    @MaxLength(20)
    @IsDefined()
    name : string;
    @IsDefined()
    @IsEmail()
    email : string;
    @IsDefined()
    @MinLength(8)
    @Matches(/^(?=.*[A-Z])/, { message: "Password must contain at least one uppercase letter" })
    password : string;
}

export default RegisterDto;