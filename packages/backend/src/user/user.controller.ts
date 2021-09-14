import { User } from ".prisma/client"
import { Body, Controller, Delete, Post, Put } from "@nestjs/common"
import { AuthUser } from "src/auth/auth-user.decorator"
import { Auth } from "src/auth/auth.decorator"
import { CreateUserDTO } from "./dto/create-user.dto"
import { UpdateUserDTO } from "./dto/update-user.dto"
import { UserEntity } from "./entities/user.entity"
import { UserService } from "./user.service"

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() creatUserDTO: CreateUserDTO) {
        const user = await this.userService.create(creatUserDTO)
        return new UserEntity(user)
    }

    @Auth()
    @Put()
    async update(@AuthUser() user: User, @Body() updateUserDTO: UpdateUserDTO) {
        const newUser = await this.userService.update(user.id, updateUserDTO)
        return new UserEntity(newUser)
    }

    @Auth()
    @Delete()
    async delete(@AuthUser() user: User) {
        await this.userService.delete(user.id)
        return new UserEntity(user)
    }
}
