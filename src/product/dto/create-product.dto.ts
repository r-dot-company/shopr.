import { Access } from ".prisma/client"
import {
    ArrayUnique,
    IsArray,
    IsIn,
    IsInt,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsPositive,
    IsString,
    Max,
    MaxLength,
} from "class-validator"
import { CategoryExists } from "src/rules/decorators"
import { ParseIntTransform } from "src/transforms/parse-int.transform"

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

    @IsOptional()
    @IsArray()
    @ArrayUnique()
    @IsInt({ each: true })
    @CategoryExists({ each: true })
    @ParseIntTransform({ each: true })
    categories: number[]
}
