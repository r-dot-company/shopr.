import { Category } from "@prisma/client"
import { Exclude, Expose, Type } from "class-transformer"
import { ProductEntity } from "src/product/entities/product.entity"
import { Role } from "src/role/role.enum"

export class CategoryEntity implements Category {
    @Expose({ groups: [Role.Admin] })
    id: number

    key: string

    name: string

    @Type(() => CategoryEntity)
    children: Partial<CategoryEntity>[]

    @Type(() => CategoryEntity)
    parents: Partial<CategoryEntity>[]

    @Exclude()
    @Type(() => ProductEntity)
    products: Partial<ProductEntity>[]

    constructor(partial: Partial<CategoryEntity>) {
        Object.assign(this, partial)
    }
}
