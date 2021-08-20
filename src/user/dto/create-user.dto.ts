import { IsEmail, IsNotEmpty, MinLength } from "class-validator"

export class CreateUserDTO {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @MinLength(8)
    password: string
}
