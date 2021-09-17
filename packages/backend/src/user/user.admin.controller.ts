import { Controller, Get, NotFoundException, Param, Query, UseInterceptors } from "@nestjs/common"
import { Auth } from "src/auth/auth.decorator"
import { ContentRangeInterceptor } from "src/pagination/content-range.interceptor"
import { PaginationDTO } from "src/pagination/dto/pagination.dto"
import { Role } from "src/role/role.enum"
import { UserEntity } from "./entities/user.entity"
import { UserService } from "./user.service"

@Controller()
@Auth(Role.Admin)
export class UserAdminController {
    constructor(private readonly userService: UserService) {}

    @Get()
    @UseInterceptors(ContentRangeInterceptor)
    async getAll(@Query() query: PaginationDTO) {
        const size = await this.userService.getSize()
        const users = await this.userService.getAll(query)
        return [size, users.map((user) => new UserEntity(user))]
    }

    @Get(":id")
    async getOne(@Param("id") id: string) {
        const user = await this.userService.findById(id)
        if (!user) {
            throw new NotFoundException()
        }
        return new UserEntity(user)
    }
}
