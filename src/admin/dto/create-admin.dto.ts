import { IsNotEmpty, IsString } from "class-validator"
import { UserExists } from "src/rules/decorators"

export class CreateAdminDTO {
    @IsString()
    @IsNotEmpty()
    @UserExists()
    userId: string
}
