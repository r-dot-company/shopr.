import { Prisma, Product } from "@prisma/client"
import { Access } from "@prisma/client"
import { Exclude, Expose, Type } from "class-transformer"
import { AssetEntity } from "src/asset/entities/asset.entity"
import { CategoryEntity } from "src/category/entities/category.entitiy"
import { Role } from "src/role/role.enum"
import { ToNumberTransform } from "src/transforms/to-number.transform"

export class ProductEntity implements Product {
    id: number

    name: string

    @ToNumberTransform()
    price: Prisma.Decimal

    @Expose({ groups: [Role.Admin] })
    access: Access

    @Type(() => AssetEntity)
    assets: Partial<AssetEntity>[]

    @Expose({ groups: [Role.Admin] })
    @Type(() => CategoryEntity)
    categories: Partial<CategoryEntity>[]

    @Exclude()
    categoryId: number

    @Expose({ groups: [Role.Admin] })
    createdAt: Date

    @Expose({ groups: [Role.Admin] })
    updatedAt: Date

    constructor(partial: Partial<ProductEntity>) {
        Object.assign(this, partial)
    }
}
