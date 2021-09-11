import { User } from ".prisma/client"
import { Exclude, Expose, Transform, Type } from "class-transformer"
import { AdminEntity } from "src/admin/entities/admin.entity"
import { Role } from "src/role/role.enum"

export class UserEntity implements User {
    id: string

    email: string

    @Exclude()
    password: string
    
    @Expose({ groups: [Role.Admin] })
    @Type(() => AdminEntity)
    @Transform(({ value }) => !!value)
    admin: Partial<AdminEntity>

    @Exclude()
    createdAt: Date

    @Exclude()
    updatedAt: Date

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial)
    }
}
