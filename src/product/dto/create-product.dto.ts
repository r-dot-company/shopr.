import { Access } from ".prisma/client"
import {
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    Max,
    MaxLength,
} from "class-validator"
import { OneOf } from "src/rules/decorators"

export class CreateProductDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string

    @IsNumber()
    @IsPositive()
    @Max(1e9)
    price: number

    @OneOf(Object.values(Access))
    access: Access
}
