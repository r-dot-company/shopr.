import { User } from ".prisma/client"
import { Exclude, Expose, Type } from "class-transformer"
import { AdminEntity } from "src/admin/entities/admin.entity"
import { Role } from "src/role/role.enum"
import { ToBooleanTransform } from "src/transforms/to-boolean.transform"

export class UserEntity implements User {
    id: string

    email: string

    @Exclude()
    password: string

    firstname: string

    lastname: string

    @Expose()
    get fullname() {
        return `${this.firstname} ${this.lastname}`
    }

    @Type(() => AdminEntity)
    @ToBooleanTransform()
    admin: Partial<AdminEntity>

    @Expose({ groups: [Role.Admin] })
    createdAt: Date

    @Expose({ groups: [Role.Admin] })
    updatedAt: Date

    constructor(partial: Partial<UserEntity>) {
        Object.assign(this, partial)
    }
}
