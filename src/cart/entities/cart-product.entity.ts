import { Product, User, Order } from "@prisma/client"
import { Exclude } from "class-transformer"
import { ProductEntity } from "src/product/entities/product.entity"
import { Override } from "src/utils"

export class CartProductEntity {
    @Exclude()
    id: string

    amount: number

    product: ProductEntity

    @Exclude()
    productId: number

    @Exclude()
    user: User

    @Exclude()
    userId: string

    @Exclude()
    order: Order

    @Exclude()
    orderId: string

    constructor(partial: Partial<Override<CartProductEntity, "product", Product>>) {
        Object.assign(this, {
            ...partial,
            product: partial.product && new ProductEntity(partial.product)
        })
    }
}
