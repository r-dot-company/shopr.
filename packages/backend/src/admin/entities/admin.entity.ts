import { Admin } from ".prisma/client"
import { Exclude, Expose, Type } from "class-transformer"
import { Role } from "src/role/role.enum"
import { UserEntity } from "src/user/entities/user.entity"

export class AdminEntity implements Admin {
    id: string

    @Type(() => UserEntity)
    user: Partial<UserEntity>
    
    @Exclude()
    userId: string

    protected: boolean
    
    @Expose({ groups: [Role.Admin] })
    createdAt: Date

    @Expose({ groups: [Role.Admin] })
    updatedAt: Date
    
    constructor(partial: Partial<AdminEntity>) {
        Object.assign(this, partial)
    }
}
