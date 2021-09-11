import { Asset } from ".prisma/client"
import { Exclude, Type } from "class-transformer"
import { AssetTypeEntity } from "src/asset-type/entities/asset-type.entity"
import { ProductEntity } from "src/product/entities/product.entity"

export class AssetEntity implements Asset {
    id: string

    filename: string

    @Type(() => AssetTypeEntity)
    type: Partial<AssetTypeEntity>

    @Exclude()
    typeKey: string

    @Type(() => ProductEntity)
    product: Partial<ProductEntity>

    @Exclude()
    productId: number

    constructor(partial: Partial<AssetEntity>) {
        Object.assign(this, partial)
    }
}
