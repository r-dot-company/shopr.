import { Category } from "@prisma/client"
import { Expose } from "class-transformer"
import { Role } from "src/role/role.enum"

export class CategoryEntity implements Category {
    @Expose({ groups: [Role.Admin] })
    id: number

    key: string

    name: string

    constructor(partial: Partial<CategoryEntity>) {
        Object.assign(this, partial)
    }
}
