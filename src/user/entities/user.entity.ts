import { Exclude } from "class-transformer"

export class UserEntity {
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
