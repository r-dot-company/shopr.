import { Prisma, Product } from "@prisma/client"
import { Access } from "@prisma/client"
import { Exclude, Expose, Transform, Type } from "class-transformer"
import { CategoryEntity } from "src/category/entities/category.entitiy"
import { Role } from "src/role/role.enum"

export class ProductEntity implements Product {
    id: number

    name: string

    @Transform(({ value }) => value.toNumber())
    price: Prisma.Decimal

    @Expose({ groups: [Role.Admin] })
    access: Access

    @Type(() => CategoryEntity)
    category: Partial<CategoryEntity>

    @Exclude()
    categoryId: number

    @Exclude()
    createdAt: Date

    @Exclude()
    updatedAt: Date

    constructor(partial: Partial<ProductEntity>) {
        Object.assign(this, partial)
    }
}
