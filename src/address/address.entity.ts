import { User } from "@prisma/client"
import { Exclude } from "class-transformer"

export class AddressEntity {
    id: string

    country: string

    city: string

    street: string

    zip: string

    @Exclude()
    user: User

    constructor(partial: Partial<AddressEntity>) {
        Object.assign(this, partial)
    }
}
