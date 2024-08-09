import { IsDefined, IsEmail, IsNumber, Matches, MaxLength, MinLength, } from "class-validator";

class CreateUserDto {
    @MinLength(1)
    @MaxLength(20)
    @IsDefined()
    fullName: string;
    @IsDefined()
    @IsEmail()
    email: string;
    @IsDefined()
    @MinLength(8)
    @Matches(/^(?=.*[A-Z])/, { message: "Password must contain at least one uppercase letter" })
    password: string;
    @IsNumber()
    @MinLength(11)
    @MaxLength(11)
    phoneNumber: number;
}

export default CreateUserDto;