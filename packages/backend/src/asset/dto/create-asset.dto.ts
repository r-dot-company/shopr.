import { IsNotEmpty } from "class-validator"
import { AssetTypeExists, ProductExists } from "src/rules/decorators"

export class CreateAssetDTO {
    @IsNotEmpty()
    @AssetTypeExists()
    typeKey: string

    @IsNotEmpty()
    @ProductExists()
    productId: string
}
