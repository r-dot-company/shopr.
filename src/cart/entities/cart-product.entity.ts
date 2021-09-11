import { Exclude } from "class-transformer"
import { OrderEntity } from "src/order/entities/order.entity"
import { ProductEntity } from "src/product/entities/product.entity"
import { UserEntity } from "src/user/entities/user.entity"

export class CartProductEntity {
    @Exclude()
    id: string

    amount: number

    product: Partial<ProductEntity>

    @Exclude()
    productId: number

    @Exclude()
    user: Partial<UserEntity>

    @Exclude()
    userId: string

    @Exclude()
    order: Partial<OrderEntity>

    @Exclude()
    orderId: string

    constructor(partial: Partial<CartProductEntity>) {
        Object.assign(this, {
            ...partial,
            product: partial.product && new ProductEntity(partial.product)
        })
    }
}
