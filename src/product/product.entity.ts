import { Prisma } from "@prisma/client"
import { Exclude } from "class-transformer"

export class ProductEntity {
    id: number

    name: string

    price: number

    @Exclude()
    createdAt: Date

    @Exclude()
    updatedAt: Date

    constructor(partial: Partial<Omit<ProductEntity, "price"> & {
        price?: Prisma.Decimal
    }>) {
        Object.assign(this, {
            ...partial,
            price: partial.price?.toNumber()
        })
    }
}
