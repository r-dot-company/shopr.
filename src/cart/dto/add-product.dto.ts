import { IsInt, IsNotEmpty, Max, Min, Validate } from "class-validator"

export class AddProductDTO {
    // @Validate(ProductExistsRule)
    @IsInt()
    @IsNotEmpty()
    productId: number

    @IsInt()
    @Min(0)
    @Max(99)
    amount: number
}
