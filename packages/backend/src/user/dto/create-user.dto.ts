import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"
import { EmailAvailable } from "src/rules/decorators"

export class CreateUserDTO {
    @IsEmail()
    @IsNotEmpty()
    @EmailAvailable()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string

    @IsNotEmpty()
    @IsString()
    firstname: string

    @IsNotEmpty()
    @IsString()
    lastname: string
}
