import { IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, Max, MaxLength, Min, MinLength } from "class-validator"

export class CreateProductDTO {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    name: string

    @IsNumber()
    @IsPositive()
    @Max(1e9)
    price: number
}
