import { Admin } from ".prisma/client"
import { Exclude, Type } from "class-transformer"
import { UserEntity } from "src/user/entities/user.entity"

export class AdminEntity implements Admin {
    id: string

    @Type(() => UserEntity)
    user: Partial<UserEntity>
    
    @Exclude()
    userId: string

    protected: boolean
    
    @Exclude()
    createdAt: Date

    @Exclude()
    updatedAt: Date
    
    constructor(partial: Partial<AdminEntity>) {
        Object.assign(this, partial)
    }
}
