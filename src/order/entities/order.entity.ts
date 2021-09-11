import { OrderStatus } from ".prisma/client"
import { Exclude } from "class-transformer"
import { CartProductEntity } from "src/cart/entities/cart-product.entity"
import { UserEntity } from "src/user/entities/user.entity"

export class OrderEntity {
    id: string

    status: OrderStatus

    @Exclude()
    user: Partial<UserEntity>

    @Exclude()
    userId: string

    products: Partial<CartProductEntity>[]

    @Exclude()
    createAt: Date

    @Exclude()
    updateAt: Date

    constructor(order: Partial<OrderEntity>) {
        Object.assign(this, {
            ...order,
            products: order.products?.map((product) => new CartProductEntity(product))
        })
    }
}
