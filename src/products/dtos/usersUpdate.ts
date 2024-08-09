import { IsDefined, IsEmail,  Matches, MaxLength, MinLength, } from "class-validator";

class UserUPdateDto {
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
   
}

export default UserUPdateDto;