import { Access } from ".prisma/client"
import {
    ArrayUnique,
    IsArray,
    IsIn,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    Max,
    MaxLength,
} from "class-validator"
import { CategoryExists } from "src/rules/decorators"

export class CreateProductDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string

    @IsNumber()
    @IsPositive()
    @Max(1e9)
    price: number

    @IsIn(Object.values(Access))
    access: Access

    @IsArray()
    @ArrayUnique()
    @CategoryExists({ each: true })
    categories: number[]
}
