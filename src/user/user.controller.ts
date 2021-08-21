import {
    Body,
    Controller,
    Delete,
    Post,
    Put,
    Request
} from "@nestjs/common"
import { Auth } from "src/auth/auth.decorator"
import { TakenException } from "src/exceptions/taken.exception"
import { CreateUserDTO } from "./dto/create-user.dto"
import { UpdateUserDTO } from "./dto/update-user.dto"
import { UserEntity } from "./user.entity"
import { UserService } from "./user.service"

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    async create(@Body() creatUserDTO: CreateUserDTO) {
        const existingUser = await this.userService.findByEmail(creatUserDTO.email)
        if (existingUser) {
            throw new TakenException("Email")
        }
        const user = await this.userService.create(creatUserDTO)
        return new UserEntity(user)
    }

    @Auth()
    @Put()
    async update(@Request() req, @Body() updateUserDTO: UpdateUserDTO) {
        const user = await this.userService.update(req.user.id, updateUserDTO)
        return new UserEntity(user)
    }

    @Auth()
    @Delete()
    async delete(@Request() req) {
        const user = await this.userService.delete(req.user.id)
        return new UserEntity(user)
    }
}
