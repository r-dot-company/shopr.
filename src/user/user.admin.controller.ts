import { User } from ".prisma/client"
import { Controller, Get } from "@nestjs/common"
import { Auth } from "src/auth/auth.decorator"
import { Role } from "src/role/role.enum"
import { UserEntity } from "./entities/user.entity"
import { UserService } from "./user.service"

@Controller()
@Auth(Role.Admin)
export class UserAdminController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAll() {
        const users = await this.userService.getAll()
        return users.map((user) => new UserEntity(user))
    }
}
