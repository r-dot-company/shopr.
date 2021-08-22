import { IsInt, IsNotEmpty, Max, Min } from "class-validator"
import { ProductExists } from "src/rules/decorators"

export class AddProductDTO {
    @IsInt()
    @IsNotEmpty()
    @ProductExists()
    productId: number

    @IsInt()
    @Min(0)
    @Max(99)
    amount: number
}
