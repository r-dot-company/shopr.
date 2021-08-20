import { Body, Controller, Delete, Post, Put, Request } from "@nestjs/common"
import { CreateUserDTO } from "./dto/create-user.dto"
import { UpdateUserDTO } from "./dto/update-user.dto"
import { UserService } from "./user.service"

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() creatUserDTO: CreateUserDTO) {
        await this.userService.create(creatUserDTO)
    }

    @Put()
    async update(@Request() req, @Body() updateUserDTO: UpdateUserDTO) {
        await this.userService.update(req.user.id, updateUserDTO)
    }

    @Delete()
    async delete(@Request() req) {
        await this.userService.delete(req.user.id)
    }
}
