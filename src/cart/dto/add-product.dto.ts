import { IsInt, IsNotEmpty, Max, Min, Validate } from "class-validator"
import { ProductExistsRule } from "src/rules/product-exists.rule"

export class AddProductDTO {
    @Validate(ProductExistsRule)
    @IsInt()
    @IsNotEmpty()
    productId: number

    @IsInt()
    @Min(0)
    @Max(99)
    amount: number
}
