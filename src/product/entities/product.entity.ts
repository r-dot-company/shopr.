import { Prisma } from "@prisma/client"
import { Exclude } from "class-transformer"
import { Override } from "src/utils"

export class ProductEntity {
    id: number

    name: string

    price: number

    @Exclude()
    createdAt: Date

    @Exclude()
    updatedAt: Date

    constructor(partial: Partial<Override<ProductEntity, "price", Prisma.Decimal>>) {
        Object.assign(this, {
            ...partial,
            price: partial.price?.toNumber()
        })
    }
}
