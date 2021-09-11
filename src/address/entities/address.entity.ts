import { Exclude } from "class-transformer"
import { UserEntity } from "src/user/entities/user.entity"

export class AddressEntity {
    id: string

    country: string

    city: string

    street: string

    zip: string

    @Exclude()
    user: Partial<UserEntity>

    @Exclude()
    userId: string

    constructor(partial: Partial<AddressEntity>) {
        Object.assign(this, partial)
    }
}
