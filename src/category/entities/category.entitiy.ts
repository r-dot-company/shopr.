import { Category } from "@prisma/client"
import { Expose, Type } from "class-transformer"
import { Role } from "src/role/role.enum"

export class CategoryEntity implements Category {
    @Expose({ groups: [Role.Admin] })
    id: number

    key: string

    name: string

    @Type(() => CategoryEntity)
    children: Partial<CategoryEntity>[]

    @Type(() => CategoryEntity)
    parents: Partial<CategoryEntity>[]

    constructor(partial: Partial<CategoryEntity>) {
        Object.assign(this, partial)
    }
}
