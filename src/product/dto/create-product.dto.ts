import { Access } from ".prisma/client"
import { Transform } from "class-transformer"
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
    @Transform(({ value }) => value?.map((str: string) => parseInt(str)))
    categories: number[]
}
