import { IsEmail, IsNotEmpty, MinLength } from "class-validator"
import { EmailAvailable } from "src/rules/decorators"

export class CreateUserDTO {
    @IsEmail()
    @IsNotEmpty()
    @EmailAvailable()
    email: string

    @IsNotEmpty()
    @MinLength(8)
    password: string
}
