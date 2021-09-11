import { AssetType, Product } from ".prisma/client"
import { Exclude } from "class-transformer"
import { AssetTypeEntity } from "src/asset-type/entities/asset-type.entity"
import { ProductEntity } from "src/product/entities/product.entity"

export class AssetEntity {
    id: string

    filename: string

    type: Partial<AssetTypeEntity>

    @Exclude()
    typeKey: string

    product: Partial<ProductEntity>

    @Exclude()
    productId: number

    constructor(partial: Partial<AssetEntity & {
        type: Partial<AssetType>,
        product: Partial<Product>
    }>) {
        Object.assign(this, {
            ...partial,
            type: partial.type && new AssetTypeEntity(partial.type),
            product: partial.product && new ProductEntity(partial.product)
        })
    }
}
