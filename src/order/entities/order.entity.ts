import { OrderStatus } from ".prisma/client"
import { Exclude, Type } from "class-transformer"
import { CartProductEntity } from "src/cart/entities/cart-product.entity"
import { UserEntity } from "src/user/entities/user.entity"

export class OrderEntity {
    id: string

    status: OrderStatus

    @Exclude()
    user: Partial<UserEntity>

    @Exclude()
    userId: string

    @Type(() => CartProductEntity)
    products: Partial<CartProductEntity>[]

    @Exclude()
    createAt: Date

    @Exclude()
    updateAt: Date

    constructor(partial: Partial<OrderEntity>) {
        Object.assign(this, partial)
    }
}
