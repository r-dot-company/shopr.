import { Prisma } from "@prisma/client"
import { Access } from "@prisma/client"
import { Exclude, Expose, Transform } from "class-transformer"
import { Role } from "src/role/role.enum"

export class ProductEntity {
    id: number

    name: string

    @Transform(({ value }) => value.toNumber())
    price: Prisma.Decimal

    @Expose({ groups: [Role.Admin] })
    access: Access

    @Exclude()
    createdAt: Date

    @Exclude()
    updatedAt: Date

    constructor(partial: Partial<ProductEntity>) {
        Object.assign(this, partial)
    }
}
