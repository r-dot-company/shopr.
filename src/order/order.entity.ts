import { Order, OrderStatus, CartProduct, User } from ".prisma/client"
import { Exclude } from "class-transformer"
import { CartProductEntity } from "src/cart/cart-product.entity"

export class OrderEntity {
    id: string

    status: OrderStatus

    @Exclude()
    user: User

    @Exclude()
    userId: string

    products: CartProductEntity[]

    @Exclude()
    createAt: Date

    @Exclude()
    updateAt: Date

    constructor(order: Partial<Order & {
        products: CartProduct[]
    }>) {
        Object.assign(this, {
            ...order,
            products: order.products?.map((product) => new CartProductEntity(product))
        })
    }
}
