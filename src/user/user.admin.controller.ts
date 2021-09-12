import { User } from ".prisma/client"
import { Controller, Get, Query } from "@nestjs/common"
import { Auth } from "src/auth/auth.decorator"
import { PaginationDTO } from "src/pagination/dto/pagination.dto"
import { Role } from "src/role/role.enum"
import { UserEntity } from "./entities/user.entity"
import { UserService } from "./user.service"

@Controller()
@Auth(Role.Admin)
export class UserAdminController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAll(@Query() query: PaginationDTO) {
        const users = await this.userService.getAll(query)
        return users.map((user) => new UserEntity(user))
    }
}
