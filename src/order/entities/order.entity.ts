import { Order, OrderStatus, Prisma } from ".prisma/client"
import { Exclude, Expose, Transform, Type } from "class-transformer"
import { CartProductEntity } from "src/cart/entities/cart-product.entity"
import { Role } from "src/role/role.enum"
import { UserEntity } from "src/user/entities/user.entity"

export class OrderEntity implements Order {
    id: string

    status: OrderStatus

    @Transform(({ value }) => value.toNumber())
    total: Prisma.Decimal

    @Expose({ groups: [Role.Admin] })
    @Type(() => UserEntity)
    user: Partial<UserEntity>

    @Exclude()
    userId: string

    @Type(() => CartProductEntity)
    products: Partial<CartProductEntity>[]

    @Exclude()
    createdAt: Date

    @Exclude()
    updatedAt: Date

    constructor(partial: Partial<OrderEntity>) {
        Object.assign(this, partial)
    }
}
