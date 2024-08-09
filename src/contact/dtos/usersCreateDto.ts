import { IsDefined, IsEmail } from "class-validator";

class CreateContactDto {
    @IsDefined()
    name: string;
    @IsDefined()
    @IsEmail()
    email: string;
    @IsDefined()
    message: string;
    @IsDefined()
    subject: number;
}

export default CreateContactDto;