import { User } from ".prisma/client"
import { Exclude } from "class-transformer"

export class UserEntity implements User {
    id: string

    email: string

    @Exclude()
    password: string
    
    @Exclude()
    admin: any

    @Exclude()
    createdAt: Date

    @Exclude()
    updatedAt: Date

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial)
    }
}
